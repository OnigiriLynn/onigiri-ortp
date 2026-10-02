import React, { useState } from 'react';
export default function SelectSeat(props) {
  const {title, type, handleSeatClick, calculateTotal, selectedSeats, error, seatStyles, generateSeats, occupiedSeats, getSeatStyle} = props;
  const [seats, setSeats] = useState(generateSeats(type,occupiedSeats));
 
 return (
    <div style={seatStyles.container}>
      <h2 style={seatStyles.heading}>{title}</h2>
      {/* Map Interactive Legend Statuses */}
      <div style={seatStyles.legendContainer}>
        <div style={seatStyles.legendItem}>
          <div style={{ ...seatStyles.seatBase, width: '16px', height: '16px', backgroundColor: '#e3f2fd', border: '1px solid #90caf9' }}></div>
          <span>Available</span>
        </div>
        <div style={seatStyles.legendItem}>
          <div style={{ ...seatStyles.seatBase, width: '16px', height: '16px', backgroundColor: '#007bff' }}></div>
          <span>Selected</span>
        </div>
        <div style={seatStyles.legendItem}>
          <div style={{ ...seatStyles.seatBase, width: '16px', height: '16px', backgroundColor: '#ff0000' }}></div>
          <span>Occupied</span>
        </div>
      </div>

      {error && <div style={seatStyles.errorText}>{error}</div>}

      {/* Main Grid Render Map */}
      <div style={type === 'upper' ? seatStyles.cabinGridUpper : seatStyles.cabinGrid}>
        {seats.map((seat, index) => {
          return (
            <React.Fragment key={seat.id}>
              <div 
                style={getSeatStyle(seat, selectedSeats)} 
                onClick={()=>handleSeatClick(seat)}
              >
                {seat.id}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic Summary Panel */}
      <div style={seatStyles.summaryBox}>
        <div style={seatStyles.summaryRow}>
          <span>Chosen Seats:</span>
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
          </span>
        </div>
        <div style={seatStyles.summaryRow}>
          <span>Total Price:</span>
          <span style={seatStyles.totalPrice}>MMK {calculateTotal(seats)}</span>
        </div>

        <button 
          style={{ ...seatStyles.button, opacity: selectedSeats.length === 0 ? 0.6 : 1 }}
          disabled={selectedSeats.length === 0}
          onClick={() => alert(`Proceeding with seats: ${selectedSeats.join(', ')}`)}
        >
          Confirm Seats
        </button>
      </div>
    </div>
  );
}