import React, { useState, useEffect, useCallback } from 'react';
import SelectSeat from './SelectSeat';

const styles = {
    container: {
      width: '96%', // Slightly expanded to fit beautiful results
      margin: '5% auto',
      padding: '20px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '0px',
      color: '#333333',
    },
    form: {
      gap: '16px',
    },
    formGroup: {
      gap: '6px',
      width: '20%',
      float:'left',
      marginTop:'1%'
    },
    formGroupPassenger: {
        gap: '6px',
        width: '15%',
        float:'left',
        marginTop:'1%',
        marginLeft:'3%'
      },
    label: {
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#555555',
      marginRight:'10px'
    },
    select: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '15%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '4px',
    },
    buttonSubmit: {
        width: '15%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '1%',
        marginLeft:'0'
      },
    clr:{
        clear:'both'
    },
    error: {
      color: '#dc3545',
      fontSize: '12px',
      marginTop: '2px',
    },
    // --- New Styles for Results UI ---
    resultsWrapper: {
      marginTop: '5px',
      borderTop: '2px dashed #eee',
      paddingTop: '24px',
    },
    resultsHeading: {
      fontSize: '18px',
      color: '#333333',
      marginBottom: '16px',
    },
    trainCard: {
      border: '1px solid #e0e0e0',
      borderRadius: '6px',
      padding: '16px',
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'between',
      alignItems: 'center',
      backgroundColor: '#fdfdfd',
    },
    trainInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1,
    },
    trainName: {
      fontWeight: 'bold',
      color: '#007bff',
      fontSize: '15px',
    },
    routeDetails: {
      fontSize: '14px',
      color: '#555555',
    },
    priceTag: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#28a745',
      textAlign: 'right',
    },
    bookBtn: {
      padding: '6px 12px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '13px',
      cursor: 'pointer',
      marginTop: '4px',
    },
    noResults: {
      textAlign: 'center',
      color: '#777',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      borderRadius: '4px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent backdrop
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000, // Keeps it stacked safely above everything else
        backdropFilter: 'blur(4px)', // Modern background blur layer
      },
      modalContentBox: {
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'relative',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '100vh', // Prevents screen overflow
        overflowY: 'auto', // Adds scrollbar if seat rows are long
      },
      modalCloseBtn: {
        position: 'absolute',
        top: '0px',
        right: '16px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#888888',
        zIndex: 10,
      },
};

const seatStyles = {
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

const locations = ['Yangon', 'Mawlamyine'];

// Mock Flight Database
const trainsInfo = [
  { id: 1, name: 'First CLass', from: 'Yangon', to: 'Mawlamyine', type: 'first', time: '06:00 AM - 12:00 PM', price: 10000 },
  { id: 2, name: 'Upper CLass', from: 'Yangon', to: 'Mawlamyine', type: 'upper', time: '01:00 PM - 07:00 PM', price: 200000 },
  { id: 3, name: 'First CLass', from: 'Mawlamyine', to: 'Yangon', type: 'first', time: '06:00 AM - 12:00 PM', price: 10000 },
  { id: 4, name: 'Upper CLass', from: 'Mawlamyine', to: 'Yangon', type: 'upper', time: '01:00 PM - 07:00 PM', price: 200000 },
];

export default function RouteSelection() {
const [loading, setLoading] = useState(true);
const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    passengers: 1,
    type: 'upper',
    price: 0
  });
  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState({first:[],upper:[]});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [selectSeat, setSelectSeat] = useState(false);
  const [seatType, setSeatType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.departure) newErrors.departure = 'Departure city is required';
    if (!formData.destination) newErrors.destination = 'Destination city is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (formData.passengers < 1) newErrors.passengers = 'Must have at least 1 passenger';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Filter the mock database matching user selections
      const results = trainsInfo.filter(
        (train) => train.from === formData.departure && train.to === formData.destination
      );
      
      setSearchResults(results);
    }
  };

  const todayDateString = new Date().toISOString().split('T')[0];

  
  const handleSelectSeat = (type) => {
    setSelectSeat(!selectSeat);
    setSelectedSeats([]);
    setSeatType(type);
    setLoading(true);
  }
  
  const seatConfigs = {
    first: { title: "Select seats for first class", price: 10000 },
    upper: { title: "Select seats for upper class", price: 20000 },
  };
  
  const activeConfig = seatConfigs[seatType] || { title: "Select Seats", price: 0 };
  
  // Generates an array of seats: A, B, C, D columns across multiple rows
const generateSeats = (type, occupiedSeats = []) => {
    const columns = type === 'upper' ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
    const totalRows = 7;
    const seats = [];
    for (let row = 1; row <= totalRows; row++) {
      columns.forEach((col) => {
        const code = `${row}${col}`;
        seats.push({
          id: code,
          row,
          col,
          isOccupied: occupiedSeats[seatType].includes(code),
          price: 0
        });
      });
    }
    return seats;
  }

  const handleSeatClick = (seat) => {
    if (seat.isOccupied) return; // Do nothing if seat is taken
    setError('');
    if (selectedSeats.includes(seat.id)) {
      // Remove seat if already selected
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      // Add seat checking limit constraints
      if (selectedSeats.length >= formData.passengers) {
        setError(`You can only select up to ${formData.passengers} seat(s).`);
        return;
      }
      setSelectedSeats([...selectedSeats, seat.id]);
      updateSeats(seat.id);
    }
  };

   const updateSeats = async(id) => {
    console.log(id);
        const newSeats = { 
                seat:id,
                type:seatType
            }

            try {
                console.log('trying API');
                const response = await fetch('http://localhost:4000/updateSeats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(newSeats), 
                });

                const data = await response.json(); 
                console.log(data);

            } catch (error) {
                console.error('Error sending data:', error);
            }
      }
  
  // Calculate dynamic totals matching your local thousands separator formatting preference
  const calculateTotal = (seats) => {
    const total = seats
      .filter(s => selectedSeats.includes(s.id))
      .reduce((sum, s) => sum + seatConfigs[seatType].price, 0);

    return total.toLocaleString('en-US', {
      maximumFractionDigits: 2
    });
  };

  // Helper function to return dynamic background styles depending on status
 const getSeatStyle = (seat, selectedSeats=[]) => {
    // If the seat is already taken
    if (seat.isOccupied) {
      return { 
        width: '40px',
        height: '40px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        backgroundColor: '#ff0000', 
        color: '#ffffff', 
        cursor: 'not-allowed' 
      };
    }
    
    // If the user has selected the seat
    if (selectedSeats.includes(seat.id)) {
      return { 
        width: '40px',
        height: '40px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        width:'40px',
        height:'40px',
        borderRadius:'5px',
        backgroundColor: '#007bff', 
        color: '#ffffff' 
      };
    }
    
    // Default available seat style
    return { 
        width: '40px',
        height: '40px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        backgroundColor: '#e3f2fd', 
        color: '#007bff', 
        border: '1px solid #90caf9' 
    };
  };

  const getOccupiedSeats = useCallback(async(seatType) => {
    let occupiedLists = []; 
     try{
            const url = (seatType === 'upper' ? 'getUpperSeats' : 'getFirstSeats');
            const response = await fetch("http://localhost:4000/"+url);
            occupiedLists = await response.json();
              
          }catch(error){
              console.error('Error fetching seats:', error);
          }finally{
              setLoading(false);
          }

    if(seatType === 'upper'){
        setOccupiedSeats((prevState) => ({
            ...prevState,
            'upper': occupiedLists,
        }));
    }else{
        setOccupiedSeats((prevState) => ({
            ...prevState,
            'first': occupiedLists,
        }));
    }
   
  }, []);

  useEffect(() => {
    if(loading){
        getOccupiedSeats(seatType);
    }
  }, [handleSeatClick, seatType, loading]); // Empty array ensures this runs once on mount

  

  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select Your Route</h2>
      <form onSubmit={handleSubmit} style={styles.form} method='POST'>
        
        {/* Departure Selection */}
        <div style={styles.formGroup}>
          <label style={styles.label}>From</label>
          <select
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select departure city</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.departure && <span style={styles.error}>{errors.departure}</span>}
        </div>

        {/* Destination Selection */}
        <div style={styles.formGroup}>
          <label style={styles.label}>To</label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select destination city</option>
            {locations.map((loc) => (
              formData.departure !== loc && <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.destination && <span style={styles.error}>{errors.destination}</span>}
        </div>

        {/* Departure Date */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Departure Date</label>
          <input
            type="date"
            name="departureDate"
            style={styles.input}
            min={todayDateString}
            value={formData.departureDate}
            onChange={handleChange}
          />
          {errors.departureDate && <span style={styles.error}>{errors.departureDate}</span>}
        </div>

        {/* Passengers Count */}
        <div style={styles.formGroupPassenger}>
          <label style={styles.label}>Passengers</label>
          <input
            type="number"
            name="passengers"
            min="1"
            max="10"
            value={formData.passengers}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.passengers && <span style={styles.error}>{errors.passengers}</span>}
        </div>

        <button type="submit" style={styles.buttonSubmit}>
          Search Routes
        </button>
        <div className='clr'></div>
      </form>

      {/* --- Dynamic Search Results UI --- */}
      {searchResults !== null && (
        <div style={styles.resultsWrapper}>
          <h3 style={styles.resultsHeading}>
            Available Trains ({formData.departure} → {formData.destination})
          </h3>
          
          {searchResults.length > 0 ? (
            searchResults.map((train) => (
              <div key={train.id} style={styles.trainCard}>
                <div style={styles.trainInfo}>
                  <div style={styles.trainName}>{train.name}</div>
                  <div style={styles.routeDetails}>🕒 {train.time}</div>
                  <div style={styles.routeDetails}>👤 Passengers: {formData.passengers}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={styles.priceTag}>
                    MMK {train.price.toLocaleString('en-US', {
                        maximumFractionDigits: 2
                    })}
                  </div>
                  <button 
                    onClick={() => handleSelectSeat(train.type)} 
                    style={styles.bookBtn}
                  >
                    Select Seat
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              No trains found for this route on your selected date.
            </div>
          )}
        </div>
      )}

      {selectSeat && (
            <div 
                style={styles.modalOverlay} 
                onClick={() => setSelectSeat(false)}
                role="dialog"
                aria-modal="true"
            >
                <div 
                style={styles.modalContentBox} 
                onClick={(e) => e.stopPropagation()} 
                >
                <button 
                    style={styles.modalCloseBtn} 
                    onClick={() => setSelectSeat(false)}
                    aria-label="Close layout overlay"
                >
                    &times;
                </button>
                <SelectSeat 
                    seatStyles={seatStyles}
                    type={seatType} 
                    title={activeConfig.title} 
                    passengers={formData.passengers} 
                    price={activeConfig.price} 
                    selectedSeats={selectedSeats}
                    occupiedSeats={occupiedSeats}
                    error={error}
                    calculateTotal={calculateTotal}
                    handleSeatClick={handleSeatClick}
                    getSeatStyle={getSeatStyle}
                    generateSeats={generateSeats}
                /> 
                </div>
            </div>
            )}

    </div>
  );
}