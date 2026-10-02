import React from 'react'

export default function OrderSummary(props) {
    const {paymentStyles, orderSummary} = props;
  return (
    <div style={{ ...paymentStyles.card, backgroundColor: '#fcfcfc' }}>
          <h2 style={paymentStyles.sectionHeading}>Trip Ticket Summary</h2>
          
          <div style={paymentStyles.summaryItem}>
            <span style={paymentStyles.summaryLabel}>Primary Contact:</span>
            <span style={paymentStyles.summaryValue}>{orderSummary.contact.name}</span>
          </div>
          <div style={paymentStyles.summaryItem}>
            <span style={paymentStyles.summaryLabel}>Phone Number:</span>
            <span style={paymentStyles.summaryValue}>{orderSummary.contact.phone}</span>
          </div>

          <div style={{ borderTop: '1px dashed #ddd', margin: '16px 0' }}></div>

          <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Passenger List</h3>
          {Object.entries(orderSummary.passengers || {}).map(([seatId, passenger]) => (
            <div key={seatId} style={paymentStyles.passengerRow}>
              <div>
                <span style={paymentStyles.seatBadge}>Seat {seatId}</span>
                <span style={{ fontWeight: '500', color: '#333' }}> {passenger.name}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#777', paddingLeft: '64px' }}>NRC: {passenger.nrc}</div>
            </div>
          ))}

          <div style={{ borderTop: '2px solid #ddd', margin: '20px 0' }}></div>

          <div style={paymentStyles.totalRow}>
            <span>Grand Total Due:</span>
            <span style={paymentStyles.totalPrice}>MMK {orderSummary.netTotal.toLocaleString()}</span>
          </div>
        </div>
  )
}
