import React, { useState } from 'react';
import './Total.css';

import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const InvoiceTotal = ({ items, setItems }) => {
  const [roundOff, setRoundOff] = useState(false); // State to handle round-off

  const handleAddItem = () => {
    setItems([...items, { itemName: '', amount: '', total: 0 }]);
  };
  
  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleChange = (e, index, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;

    // Calculate total price for the item (with GST)
    if (field === 'amount') {
      const amount = parseFloat(updatedItems[index].amount) || 0;
      const gstRate = 18; // Fixed 18% GST
      updatedItems[index].total = amount * (1 + gstRate / 100);
    }

    setItems(updatedItems);
  };

  // Calculate subtotal (without tax)
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // GST Calculations
  const totalGST = subtotal * 0.18; // 18% GST
  const cgst = totalGST / 2; // CGST 9%
  const sgst = totalGST / 2; // SGST 9%

  // Total Amount (subtotal + GST)
  const totalAmount = subtotal + totalGST;

  // Handle rounding off total
  const finalTotal = roundOff ? Math.round(totalAmount) : totalAmount;

  return (
    <div className="invoice-total">
      <table className="quotation-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Enter Description"
                  value={item.itemName}
                  onChange={(e) => handleChange(e, index, 'itemName')}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="₹ 00.00"
                  value={item.amount}
                  onChange={(e) => handleChange(e, index, 'amount')}
                />
              </td>
              <td onClick={() => handleRemoveItem(index)}>✖</td>
            </tr>
          ))}
          <tr>
            <td style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }} colSpan="3" onClick={handleAddItem} className="add-new-item">
              + Add New Item
            </td>
          </tr>
        </tbody>
      </table>

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
  <label htmlFor="flexCheckChecked" style={{ marginLeft: 5,width:'10px', marginTop:'15px' }}>RoundOff</label> {/* Aligns label next to checkbox */}
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

export default InvoiceTotal;
