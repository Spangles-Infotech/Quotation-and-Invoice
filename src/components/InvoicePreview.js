import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Preview.css';

const InvoicePreview = () => {
  const location = useLocation();
  const { formData, items, businessLogo } = location.state || {}; // Safely access formData, items, and businessLogo

  const [discount, setDiscount] = useState(0); // State to handle discount
  const [roundOff, setRoundOff] = useState(false); 

  if (!formData || !items) {
    return <h2>No Data Available</h2>;
  }

  // Calculate CGST, SGST, Total Amount, and Discounted Total
  const cgstSgstAmount = items.reduce((sum, item) => sum + (item.total * (item.gst / 100)) / 2, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (totalAmount * discount) / 100;
  const finalAmount = totalAmount + cgstSgstAmount - discountAmount;

  // Round off the final amount if the user has selected the round off option
  const roundedAmount = roundOff ? Math.round(finalAmount) : finalAmount;

  return (
    <div className="quotation-form">
      {/* Invoice Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        <div>
          <label className="pr">Invoice</label>
          <div className="form-section">
            <label className="ar">
              Invoice No: <span className="quotation-no">{formData.quotationNo}</span>
            </label>
          </div>
          <div className="form-section">
            <label className="ar">
              Invoice Date: <span className="quotation-no">{formData.quotationDate}</span>
            </label>
          </div>
        </div>

        {/* Business Logo */}
        <div className="Neon Neon-theme-dragdropbox">
          <div className="Neon-input-dragDrop">
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

      {/* Quotation Summary Table */}
      <div className="quotation-summary">
        <table className="quotation-table">
          <thead>
            <tr>
              <th>SI. No.</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>GST (%)</th>
              <th>CGST</th>
              <th>SGST</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>₹ {parseFloat(item.rate).toFixed(2)}</td>
                <td>{item.gst} %</td>
                <td>₹ {parseFloat(item.cgst).toFixed(2)}</td>
                <td>₹ {parseFloat(item.sgst).toFixed(2)}</td>
                <td>₹ {parseFloat(item.amount).toFixed(2)}</td>
                <td>₹ {parseFloat(item.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Amount */}
        <h3 className="totalamount">
          <hr />
          Total Amount: ₹ {totalAmount.toFixed(2)}
        </h3>

        {/* Additional Calculations */}
        <h5 className="totalamount">
          CGST + SGST: ₹ {cgstSgstAmount.toFixed(2)}
        </h5>
        <h5 className="totalamount">
          Final Amount (Before Discount): ₹ {finalAmount.toFixed(2)}
        </h5>
        <hr></hr>
        <h5 className="totalamount">
          Final Amount (After Discount): ₹ {(finalAmount.toFixed(2))-1200}
        </h5>
        <hr></hr>

        
      </div>
    </div>
  );
};

export default InvoicePreview;
