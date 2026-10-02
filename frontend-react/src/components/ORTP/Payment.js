import React, { useState } from 'react';
// jspdf for PDF file of Js 
import  jsPDF  from 'jspdf';
// To be suto create in the PDF file of JS 
import autoTable from 'jspdf-autotable';
import PaymentOptions from './PaymentOptions';
import OrderSummary from './OrderSummary';
import { paymentStyles } from './Styles';

function Payment(props) {
  const orderSummary = props?.orderSummary;

  // Track the selected payment option
  const [selectedMethod, setSelectedMethod] = useState('kbzpay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!orderSummary) {
    return (
      <div style={paymentStyles.errorContainer}>
        <p style={paymentStyles.errorText}>No booking information found.</p>
        <button onClick={() => window.location.href = '/'} style={paymentStyles.backHomeBtn}>Go Back to Booking</button>
      </div>
    );
  }

  // --- PDF GENERATION INTERNAL FUNCTION ---
  const generateTicketPDF = () => {
    const doc = new jsPDF();

    // 1. Beautiful Header Banner
    doc.setFillColor(16, 79, 162); // Premium deep blue
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('E-TICKET', 14, 15);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Official Electronic Booking & Payment Receipt', 14, 23);

    // 2. Metadata Information Block
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text('Booking Information', 14, 48);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Contact Name: ${orderSummary.contact.name}`, 14, 56);
    doc.text(`Phone Number: ${orderSummary.contact.phone}`, 14, 62);
    doc.text(`Payment Gateway: ${selectedMethod.toUpperCase()}`, 14, 68);
    
    doc.text(`Issue Date: ${new Date().toLocaleDateString('sv-SE')}`, 130, 56);
    doc.text('Status: PAID / SUCCESSFUL', 130, 62);

    // 3. Transform Passengers Data into a Table
    const tableBody = Object.entries(orderSummary.passengers || {}).map(([seatId, passenger]) => [
      `Seat ${seatId}`,
      passenger.name,
      passenger.nrc
    ]);

    // 4. Generate AutoTable Layout
    autoTable(doc,{
        startY: 76,
        head: [['Seat ID', 'Passenger Name', 'NRC / Passport Number']],
        body: tableBody,
        headStyles: { fillColor:'blue', fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 5 },
      });


    // 5. Grand Total Summary Row
    const finalY = doc.lastAutoTable.finalY + 12;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Total Paid: MMK ${orderSummary.netTotal.toLocaleString()}`, 130, finalY);

    // 6. Direct Download Prompt
    doc.save(`Train_Ticket_${orderSummary.contact.name.replace(/\s+/g, '_')}.pdf`);
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    
    // Simulate payment verification time
    setTimeout(() => {
    setIsProcessing(false);
      
    // 1. Download PDF immediately
    generateTicketPDF();
      
      // 2. Alert user and redirect safely
      alert('Payment Successful! Your e-ticket PDF has been generated and downloaded.');
      window.location.href = '/';
    }, 2500);
  };

  return (
    <div style={paymentStyles.pageWrapper}>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {isProcessing && (
        <div style={paymentStyles.loaderOverlay}>
          <div style={paymentStyles.loaderBox}>
            <div style={paymentStyles.spinner}></div>
            <p style={paymentStyles.loaderText}>Processing your transaction securely...</p>
            <p style={{ fontSize: '12px', color: '#777', marginTop: '4px' }}>Please do not refresh or close this window.</p>
          </div>
        </div>
      )}

      <h1 style={paymentStyles.mainHeading}>Secure Checkout</h1>

      <div style={paymentStyles.checkoutGrid}>
        
        {/* --- LEFT COLUMN: PAYMENT OPTIONS --- */}
        <PaymentOptions 
            paymentStyles={paymentStyles}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            handlePayNow={handlePayNow}
            orderSummary={orderSummary}
        />

        {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
        <OrderSummary 
            paymentStyles={paymentStyles}
            orderSummary={orderSummary}
        />

      </div>
    </div>
  );
}



export default Payment;
