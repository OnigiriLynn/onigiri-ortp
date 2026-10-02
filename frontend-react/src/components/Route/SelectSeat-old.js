import React, { useEffect, useState } from 'react';

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '8px',
    color: '#333333',
  },
  subHeading: {
    textAlign: 'center',
    color: '#666666',
    fontSize: '14px',
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '10px',
    fontSize: '12px',
    color: '#555555',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  // Seat state styles
  seatBase: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
  },
  cabinGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '10px',
    justifyItems: 'center',
    marginBottom: '24px',
  },
  cabinGridUpper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '10px',
    justifyItems: 'center',
    marginBottom: '24px',
  },
  aisleGap: {
    gridColumnStart: 4, 
  },
  summaryBox: {
    borderTop: '2px dashed #eee',
    paddingTop: '20px',
    marginTop: '20px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'between',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#555555',
    marginBottom: '8px',
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#28a745',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '12px',
  },
  errorText: {
    color: '#dc3545',
    fontSize: '13px',
    textAlign: 'center',
    marginBottom: '12px',
  },
  

};

export default function SelectSeat(props) {
  const {title, passengers, price, type} = props;
 
  const [selectedSeats, setSelectedSeats] = useState('');
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [error, setError] = useState('');

  const generateSeats = (type, result=[]) => {
    const columns = type === 'upper' ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
    const totalRows = 7;
    const seats = [];
    console.log(occupiedSeats);
    for (let row = 1; row <= totalRows; row++) {
      columns.forEach((col) => {
        const code = `${row}${col}`;
        console.log(code)
        console.log(occupiedSeats)
        seats.push({
          id: code,
          row,
          col,
          isOccupied: ['1A','2A'].includes(code),
          price: 0
        });
      });
    }
    return seats;
  };
   const [seats, setSeats] = useState(generateSeats(type));

  const handleSeatClick = (seat) => {
   // console.log(selectedSeats);
    if (seat.isOccupied) return; // Do nothing if seat is taken
    setError('');

    if (selectedSeats.includes(seat.id)) {
      // Remove seat if already selected
      setSelectedSeats(selectedSeats.filter(seats => seats.seat !== seat.id));
    } else {
      // Add seat checking limit constraints
      const allowedSeats = parseInt(selectedSeats.length) + parseInt(passengers);
      if (selectedSeats.length >= allowedSeats) {
        setError(`You can only select up to ${allowedSeats} seat(s).`);
        return;
      }
      //setSelectedSeats((prev) =>{[...prev],[seat.id]});
      setSelectedSeats([...selectedSeats, seat.id] );
      //updateSeats();
    }
  };

  // Helper function to return dynamic background styles depending on status
  const getSeatStyle = (seat) => {
    if (seat.isOccupied) {
      return { ...styles.seatBase, backgroundColor: '#ff0000', color: '#a0a0a0', cursor: 'not-allowed' };
    }
    if (selectedSeats.includes(seat.id)) {
      return { ...styles.seatBase, backgroundColor: '#007bff', color: '#ffffff' };
    }
    return { ...styles.seatBase, backgroundColor: '#e3f2fd', color: '#007bff', border: '1px solid #90caf9' };
  };

  // Calculate dynamic totals matching your local thousands separator formatting preference
  const calculateTotal = () => {
    const total = seats
      .filter(s => selectedSeats.includes(s.id))
      .reduce((sum, s) => sum + price, 0);

    return total.toLocaleString('en-US', {
      maximumFractionDigits: 2
    });
  };

 const getAPI = async () => {
          try{
              const url = (type === 'upper' ? 'getUpperSeats' : 'getFirstSeats');
              const response = await fetch("http://localhost:4000/"+url);
  
              const result = await response.json();

              //generateSeats(type, result);
              
              
          }catch(error){
              console.error('Error fetching seats:', error);
          }finally{
             
          }
      }
  
      useEffect(()=>{
          getAPI();
      },[])

      const updateSeats = async() => {
         console.log(selectedSeats);
        const newSeats = { 
                seats:selectedSeats,
                type:type
            }

            try {
                const response = await fetch('http://localhost:4000/updateSeats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(newSeats), 
                });

                const data = await response.json(); 
            } catch (error) {
                console.error('Error sending data:', error);
            }
      }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{type === 'upper'?'Upper Class':'First Class'}</h2>
      {/* Map Interactive Legend Statuses */}
      <div style={styles.legendContainer}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.seatBase, width: '16px', height: '16px', backgroundColor: '#e3f2fd', border: '1px solid #90caf9' }}></div>
          <span>Available</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.seatBase, width: '16px', height: '16px', backgroundColor: '#007bff' }}></div>
          <span>Selected</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.seatBase, width: '16px', height: '16px', backgroundColor: '#ff0000' }}></div>
          <span>Occupied</span>
        </div>
      </div>

      {error && <div style={styles.errorText}>{error}</div>}

      {/* Main Grid Render Map */}
      <div style={type === 'upper' ? styles.cabinGridUpper : styles.cabinGrid}>
        {seats.map((seat, index) => {
          return (
            <React.Fragment key={seat.id}>
              <div 
                style={getSeatStyle(seat)} 
                onClick={() => handleSeatClick(seat)}
              >
                {seat.id}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic Summary Panel */}
      <div style={styles.summaryBox}>
        <div style={styles.summaryRow}>
          <span>Chosen Seats:</span>
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {selectedSeats && selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
          </span>
        </div>
        <div style={styles.summaryRow}>
          <span>Total Price:</span>
          <span style={styles.totalPrice}>MMK {calculateTotal()}</span>
        </div>

        <button 
          style={{ ...styles.button, opacity: selectedSeats.length === 0 ? 0.6 : 1 }}
          disabled={selectedSeats.length === 0}
          onClick={() => alert(`Proceeding with seats: ${selectedSeats.join(', ')}`)}
        >
          Confirm Seats
        </button>
      </div>
    </div>
  );
}
