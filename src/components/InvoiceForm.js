import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuotationForm.css'; 
import InvoiceTotal from './InvoiceTotal.js';
import GroupImage from '../assets/Group.png';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    quotationNo: 'SP001',
    quotationDate: '2024-05-31',
    fromBusinessName: '',
    fromEmail: '',
    fromPhone: '',
    fromAddress: '',
    fromCity: '',
    fromPostalCode: '',
    fromState: '',
    toBusinessName: '',
    toEmail: '',
    toPhone: '',
    toAddress: '',
    toCity: '',
    toPostalCode: '',
    toState: '',
  });

  const [items, setItems] = useState([{ itemName: '', amount: '', total: 0 }]);
  const [businessLogo, setBusinessLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const reader = new FileReader();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessLogo(URL.createObjectURL(file));
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/InvoicePreview', { state: { formData, items, businessLogo } });
  };

  return (
    <div>
      <div className="quotation-form">
        <h1>Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div className="form-section">
                <label>Invoice No.</label>
                <input
                  type="text"
                  value={formData.quotationNo}
                  readOnly
                />
              </div>
              <div className="form-section">
                <label>Invoice Date</label>
                <input
                  type="date"
                  name="quotationDate"
                  value={formData.quotationDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="Neon Neon-theme-dragdropbox">
              <input
                style={{
                  zIndex: 999,
                  opacity: 0,
                  width: '320px',
                  height: '200px',
                  position: 'absolute',
                  right: 0,
                  left: 0,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
                name="files[]"
                id="filer_input2"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <div className="Neon-input-dragDrop">
                <div className="Neon-input-inner">
                  <div className="Neon-input-icon">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                    ) : (
                      <img src={GroupImage} alt="Default" />
                    )}
                  </div>
                  <div className="Neon-input-text">
                    <h3>Add Business Logo</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-grid">
            {/* Billed To Section */}
            <div className="form-column">
              <h2>Billed To</h2>
              <input
                type="text"
                name="fromBusinessName"
                placeholder="Your Business Name"
                value={formData.fromBusinessName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="fromEmail"
                placeholder="Your Email"
                value={formData.fromEmail}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="fromPhone"
                placeholder="Your Phone Number"
                value={formData.fromPhone}
                onChange={handleChange}
                required
              />
              <div className="row">
                <div>
                  <input
                    type="text"
                    name="fromCity"
                    placeholder="Your PAN"
                    value={formData.fromCity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="fromPostalCode"
                    placeholder="GSTIN"
                    value={formData.fromPostalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input
                type="text"
                name="fromAddress"
                placeholder="Address"
                value={formData.fromAddress}
                onChange={handleChange}
              />
              <div className="row">
                <div>
                  <input
                    type="text"
                    name="fromCity"
                    placeholder="City"
                    value={formData.fromCity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="fromPostalCode"
                    placeholder="Postal Code"
                    value={formData.fromPostalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input
                type="text"
                name="fromState"
                placeholder="State"
                value={formData.fromState}
                onChange={handleChange}
              />
            </div>

            {/* Billed By Section */}
            <div className="form-column">
              <h2>Billed By</h2>
              <input
                type="text"
                name="toBusinessName"
                placeholder="Client Business Name"
                value={formData.toBusinessName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="toEmail"
                placeholder="Client Email"
                value={formData.toEmail}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="toPhone"
                placeholder="Client Phone Number"
                value={formData.toPhone}
                onChange={handleChange}
                required
              />
              <div className="row">
                <div>
                  <input
                    type="text"
                    name="toCity"
                    placeholder="PAN"
                    value={formData.toCity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="toPostalCode"
                    placeholder="GSTIN"
                    value={formData.toPostalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input
                type="text"
                name="toAddress"
                placeholder="Address"
                value={formData.toAddress}
                onChange={handleChange}
              />
              <div className="row">
                <div>
                  <input
                    type="text"
                    name="toCity"
                    placeholder="City"
                    value={formData.toCity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="toPostalCode"
                    placeholder="Postal Code"
                    value={formData.toPostalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input
                type="text"
                name="toState"
                placeholder="State"
                value={formData.toState}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Include Total Component */}
          <InvoiceTotal items={items} setItems={setItems} />

          <div className="btn-continue">
            <button type="submit" className="btn-cont">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
