
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import QuotationForm from './components/QuotationForm';
import InvoiceForm from './components/InvoiceForm'; 
import QuotationPreview from './components/QuotationPreview';
import InvoicePreview from './components/InvoicePreview';
import './styles/app.css';
const primaryColor = "#345261";

function App() {
  return (
    <Router>
      <Header color={primaryColor} />  {/* Passing color prop to Header */}
      <Routes>
        <Route path="/" element={<QuotationForm color={primaryColor} />} />
        <Route path="/invoice" element={<InvoiceForm color={primaryColor} />} />
        <Route path="/Preview" element={<QuotationPreview color={primaryColor} />} />
        <Route path="/InvoicePreview" element={<InvoicePreview color={primaryColor} />} />
      </Routes>
    </Router>
  );
}

export default App;