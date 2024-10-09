import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Preview.css';

import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const InvoicePreview = () => {
  const location = useLocation();
  const { formData, businessLogo, items: initialItems, roundOff: initialRoundOff } = location.state || {}; // Safely access formData and businessLogo

  const [items, setItems] = useState(initialItems || [{ itemName: '', amount: 0, total: 0 }]); // Use passed initial items or default to one item
  const [roundOff, setRoundOff] = useState(initialRoundOff || false); // State to handle round-off

  if (!formData) {
    return <h2>No Data Available</h2>;
  }

  // Handle item changes (description and amount)
  const handleChange = (e, index, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;

    // Calculate total price for the item (with GST)
    if (field === 'amount') {
      const amount = parseFloat(updatedItems[index].amount) || 0;
      const gstRate = 18; // Fixed 18% GST
      updatedItems[index].total = amount * (1 + gstRate / 100);
    }

    setItems(updatedItems); // Update items state
  };

  // Calculate subtotal (without tax)
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // GST Calculations
  const totalGST = subtotal * 0.18; // 18% GST
  const cgst = totalGST / 2; // CGST 9%
  const sgst = totalGST / 2; // SGST 9%

  // Total Amount (subtotal + GST)
  const totalAmount = subtotal + totalGST;

  // Apply discount of 5% before rounding off
  const discount = totalAmount * 0.05;
  const amountAfterDiscount = totalAmount - discount;

  // Handle rounding off total
  const finalTotal = roundOff ? Math.round(amountAfterDiscount) : amountAfterDiscount;

  return (
    <div className="quotation-form">
      {/* Invoice Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        <div>
          <label className="pr" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' ,paddingBottom:'15px' }}>Invoice</label>
          <div className="form-section">
            <label className="ar" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500',width:'200px' }}>
              Invoice No: <span className="quotation-no">{formData.quotationNo}</span>
            </label>
          </div>
          <div className="form-section">
            <label className="ar" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500',width:'200px' }}>
              Invoice Date: <span className="quotation-no">{formData.quotationDate}</span>
            </label>
          </div>
        </div>

        {/* Business Logo */}
        <div>
          <div className="Neon-input-inner">
            <div className="Neon-input-icon">
              <img
                src={businessLogo || 'default-logo.png'}
                style={{ objectFit: 'contain', width: '200px', height: '100px' }}
                alt="Business Logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* From and To Sections */}
      <div className="form-grid">
        <div className="form-column">
          <h1>Billed By</h1>
          <h3 className="title">{formData.fromBusinessName}</h3>
          <span className="mailspan">
            {formData.fromAddress},<br />
            {formData.fromCity},<br />
            {formData.fromPostalCode}, {formData.fromState}
          </span>
          <h3 className="mail">
            Email: <span className="mailspan">{formData.fromEmail}</span>
          </h3>
          <h3 className="mail">
            Phone no: <span className="mailspan">{formData.fromPhone}</span>
          </h3>
        </div>

        <div className="form-column">
          <h1>Billed To</h1>
          <h3 className="title">{formData.toBusinessName}</h3>
          <span className="mailspan">
            {formData.toAddress},<br />
            {formData.toCity},<br />
            {formData.toPostalCode}, {formData.toState}
          </span>
          <h3 className="mail">
            Email: <span className="mailspan">{formData.toEmail}</span>
          </h3>
          <h3 className="mail">
            Phone no: <span className="mailspan">{formData.toPhone}</span>
          </h3>
        </div>
      </div>

      {/* Items Table */}
      <table className="quotation-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  value={item.itemName}
                  onChange={(e) => handleChange(e, index, 'itemName')}
                />
              </td>
              <td>
                <input
                  name="amount"
                  type="number"
                  placeholder="₹ 00.00"
                  value={item.amount}
                  onChange={(e) => handleChange(e, index, 'amount')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="total-section" style={{
        padding: '20px', 
        width: '300px', 
        fontFamily: 'Arial, sans-serif', 
        display: 'flex', 
        flexDirection: 'column', 
        marginLeft: 'auto',   
        marginRight: '20px',  
        borderRadius: '5px', 
      }}>
        <h4 style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
          Amount: <span style={{ fontWeight: 'bold' }}>₹ {subtotal.toFixed(2)}</span>
        </h4>
        <h4 style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
          CGST (9%): <span style={{ fontWeight: 'bold' }}>₹ {cgst.toFixed(2)}</span>
        </h4>
        <h4 style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
          SGST (9%): <span style={{ fontWeight: 'bold' }}>₹ {sgst.toFixed(2)}</span>
        </h4>
        <h4 style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
          Discount (-5%): <span style={{ fontWeight: 'bold', color: 'red' }}>₹ {discount.toFixed(2)}</span>
        </h4>

        {/* Form container for checkbox */}
        
        <div className="form-check" style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            style={{ marginRight: 5 }} // Adjust spacing between checkbox and label
            value=""
            name="roundOff"
            id="flexCheckChecked"
            checked={roundOff}
            className="form-check-input"
            onChange={(e) => setRoundOff(e.target.checked)}
            {...label}
            defaultChecked
          />
          <label htmlFor="flexCheckChecked" style={{ marginLeft: 5,width:'auto' }}>Round Off</label>
        </div>

        <div style={{
          borderTop: '1px solid #ccc', 
          borderBottom: '1px solid #ccc', 
          paddingTop: '10px', 
          paddingBottom: '10px', 
          marginTop: '10px'
        }}>
          <h3 style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
            Total Amount: <span style={{ fontWeight: 'bold', color: '#008000' }}>₹ {finalTotal.toFixed(2)}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
