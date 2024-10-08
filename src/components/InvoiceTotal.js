import React from 'react';
import './Total.css';

const InvoiceTotal = ({ items, setItems }) => {
  const handleAddItem = () => {
    setItems([...items, { itemName: '', amount: '', quantity: 1, rate: '', gst: 18, total: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleChange = (e, index, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;

    // Calculate total price for the item
    if (field === 'amount' || field === 'quantity' || field === 'rate') {
      const amount = parseFloat(updatedItems[index].amount) || 0;
      const quantity = parseInt(updatedItems[index].quantity) || 1;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      const gstRate = parseFloat(updatedItems[index].gst) || 18;
      
      updatedItems[index].total = (quantity * rate + amount) * (1 + gstRate / 100);
    }

    setItems(updatedItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div>
      <table className="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>GST %</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>Total</th>
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
                  placeholder="GST"
                  value={item.gst}
                  onChange={(e) => handleChange(e, index, 'gst')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleChange(e, index, 'quantity')}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="₹ 00.00"
                  value={item.rate}
                  onChange={(e) => handleChange(e, index, 'rate')}
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
              <td>
                <input
                  type="number"
                  value={(item.total * (item.gst / 100)) / 2}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={(item.total * (item.gst / 100)) / 2}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.total.toFixed(2)}
                  readOnly
                />
              </td>
              <td onClick={() => handleRemoveItem(index)}>✖</td>
            </tr>
          ))}
          <tr>
            <td colSpan="9" onClick={handleAddItem}>
              + Add New Item
            </td>
          </tr>
        </tbody>
      </table>

      <div className="total-section">
      <h4>Amount: <span>₹ {totalAmount.toFixed(2)}</span></h4>
      <h4>CGST: <span>₹ {totalAmount.toFixed(2)}</span></h4>
      <h4>SGST: <span>₹ {totalAmount.toFixed(2)}</span></h4>
        <h3>Total Amount: <span>₹ {totalAmount.toFixed(2)}</span></h3>
      </div>
    </div>
  );
};

export default InvoiceTotal;
