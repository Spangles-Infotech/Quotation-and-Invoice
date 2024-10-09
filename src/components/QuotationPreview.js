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

  

  return (
    <div className="quotation-form">
      <div
        ref={quotationRef}
        style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}
      >
        <div>
          <label className="pr" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600',paddingBottom:'20px' }}>Quotation </label>
          <div className="form-section">
            <label className="ar" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', width:'200px' }}>
              Quotation No: <span className="quotation-no">{formData.quotationNo}</span>
            </label>
          </div>
          <div className="form-section">
            <label className="ar" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', width:'200px' }}>
              Quotation Date : <span className="quotation-no">{formData.quotationDate}</span>
            </label>
          </div>
        </div>
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

      <div className="form-grid">
        <div className="form-column">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>Quotation From</h1>
          <h3 className="title" style={{color:'#505050',}}>{formData.fromBusinessName}</h3>
          <span className="mailspan " style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
            {formData.fromAddress},<br />
            {formData.fromCity},<br />
            {formData.fromPostalCode},{formData.fromState}
          </span>
          <h3 className="mail" style={{color:'#505050',}}>
            Email: <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }} className="mailspan">{formData.fromEmail}</span>
          </h3>
          <h3 className="mail" style={{color:'#505050',}}>
            Phone no: <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }} className="mailspan">{formData.fromPhone}</span>
          </h3>
        </div>
        <div className="form-column">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>Quotation For</h1>
          <h3 className="title" style={{color:'#505050',}}>{formData.toBusinessName}</h3>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }} className="mailspan">
            {formData.toAddress},<br />
            {formData.toCity},<br />
            {formData.toPostalCode},{formData.toState}
          </span>
          <h3 className="mail" style={{color:'#505050',}}>
            Email: <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }} className="mailspan">{formData.toEmail}</span>
          </h3>
          <h3 className="mail" style={{color:'#505050',}}>
            Phone no: <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }} className="mailspan">{formData.toPhone}</span>
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
          <span className='tam'>Total Amount: ₹</span>{' '}
          {items.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2)}
        </h3>
      </div>

      
    </div>
  );
};

export default QuotationPreview;
