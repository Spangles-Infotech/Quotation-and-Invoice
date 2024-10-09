import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Preview.css';

const QuotationPreview = () => {
  const location = useLocation();
  const { formData, items, businessLogo } = location.state || {}; // Safely access formData and items
  const quotationRef = useRef(); // Use ref to capture the quotation content

  if (!formData || !items) {
    return <h2>No Data Available</h2>;
  }

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([quotationRef.current.innerHTML], {
      type: 'text/html',
    });
    element.href = URL.createObjectURL(file);
    element.download = `Quotation_${formData.quotationNo}.html`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="quotation-form">
      <div
        ref={quotationRef}
        style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}
      >
        <div>
          <label className="pr">Quotation </label>
          <div className="form-section">
            <label className="ar">
              Quotation No: <span className="quotation-no">{formData.quotationNo}</span>
            </label>
          </div>
          <div className="form-section">
            <label className="ar">
              Quotation Date : <span className="quotation-no">{formData.quotationDate}</span>
            </label>
          </div>
        </div>
        <div className="Neon Neon-theme-dragdropbox">
          <div className="Neon-input-dragDrop">
            <div className="Neon-input-inner">
              <div className="Neon-input-icon">
                <img
                  src={businessLogo}
                  style={{
                    objectFit: 'contain',
                    width: '200px',
                    height: '100px',
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-column">
          <h1>Quotation From</h1>
          <h3 className="title">{formData.fromBusinessName}</h3>
          <span className="mailspan">
            {formData.fromAddress},<br />
            {formData.fromCity},<br />
            {formData.fromPostalCode},{formData.fromState}
          </span>
          <h3 className="mail">
            Email: <span className="mailspan">{formData.fromEmail}</span>
          </h3>
          <h3 className="mail">
            Phone no: <span className="mailspan">{formData.fromPhone}</span>
          </h3>
        </div>
        <div className="form-column">
          <h1>Quotation For</h1>
          <h3 className="title">{formData.toBusinessName}</h3>
          <span className="mailspan">
            {formData.toAddress},<br />
            {formData.toCity},<br />
            {formData.toPostalCode},{formData.toState}
          </span>
          <h3 className="mail">
            Email: <span className="mailspan">{formData.toEmail}</span>
          </h3>
          <h3 className="mail">
            Phone no: <span className="mailspan">{formData.toPhone}</span>
          </h3>
        </div>
      </div>

      <div className="quotation-summary">
        <table className="quotation-table">
          <thead>
            <tr>
              <th>SI. No.</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>₹ {parseFloat(item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="totalamount">
          <hr />
          Total Amount: ₹{' '}
          {items.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2)}
        </h3>
      </div>

      <button onClick={handleDownload} className="download-btn">
        Download Quotation
      </button>
    </div>
  );
};

export default QuotationPreview;
