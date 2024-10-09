import React from 'react';
import './Total.css';

const Total = ({ items, setItems }) => {
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
    if (field === 'amount' && !isNaN(updatedItems[index].amount)) {
      updatedItems[index].total = parseFloat(updatedItems[index].amount);
    }
    setItems(updatedItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div>
      <table className="quotation-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}
                  type="text"
                  placeholder="Enter Description"
                  value={item.itemName}
                  onChange={(e) => handleChange(e, index, 'itemName')}
                />
              </td>
              <td>
                <input style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}
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
            <td colSpan="3" onClick={handleAddItem}>
              + Add New Item
            </td>
          </tr>
        </tbody>
      </table>

      <div className="total-section">
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>Total Amount: <span>₹ {totalAmount.toFixed(2)}</span></h3>
      </div>
    </div>
  );
};

export default Total;
