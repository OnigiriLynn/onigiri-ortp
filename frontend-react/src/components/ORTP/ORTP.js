import React, { useState, useEffect, useCallback } from 'react';
import SelectSeat from './SelectSeat';
import SelectRoute from './SelectRoute';
import SearchResult from './SearchResult';
import TravelInfo from './TravelInfo';
import PersonalInfo from './PersonalInfo';
import { styles, seatStyles } from './Styles';
import { locations, trainsInfo } from './Data';
import Payment from './Payment';

export default function ORTP() {
<style>{`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>
const todayDateString = new Date().toISOString().split('T')[0];

const [loading, setLoading] = useState(false);
const [selectSeat, setSelectSeat] = useState(false);
const [confirmSeat, setconfirmSeat] = useState(0);
const [continueToPersonal, setContinueToPersonal] = useState(false);
const [continueToPayment, setContinueToPayment] = useState(false);


const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    departureDate: todayDateString,
    passengers: 1,
    type: 'upper',
    price: 0
  });
  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState({first:[],upper:[]});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [seatType, setSeatType] = useState('');
  const [travelInfo, setTravelInfo] = useState({first:[],upper:[]});
  const [personalInfo, setPersonalInfo] = useState({
    contactName: '',
    contactPhone: '',
    passengers: {} // Will hold details per seat key, e.g., { "A1": { name: '', nrc: '' } }
  });
  const [netTotal, setNetTotal] = useState(0);
  const [ordersummary, setOrdersummary] = useState({});

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
        setLoading(true);
      // Filter the mock database matching user selections
      const results = trainsInfo.filter(
        (train) => train.from === formData.departure && train.to === formData.destination
      );
      
      setSearchResults(results);
    }
  };

  


  const handleSelectSeat = (type) => {
    setSelectSeat(!selectSeat);
    if(type !== seatType){
        setSelectedSeats([]);
    }
    setSeatType(type);
    
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
          isOccupied: occupiedSeats[type].includes(code),
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
    }
  };

  
  // Calculate dynamic totals matching your local thousands separator formatting preference
  const calculateTotal = (seats) => {
    const total = seats
      .filter(s => selectedSeats.includes(s.id))
      .reduce((sum, s) => sum + seatConfigs[seatType].price, 0);
    setNetTotal(total);
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
  
  const updateOccupiedSeats = (seatType, seats) => {
    setOccupiedSeats((prev) => ({
        ...prev,
        [seatType]: seats,
      }));
  }

  const getOccupiedSeats = useCallback((seatType) => {
    const occupiedLists = []; 
    updateOccupiedSeats(seatType, occupiedLists);
   
  }, []);

  const handleConfirmSeats = (type,seats,total) => {
    updateOccupiedSeats(type, seats);
    setTravelInfo((prev) => ({
        ...prev,
        [seatType]: {seats:selectedSeats.join(', '), total: total},
      }));
    setconfirmSeat(selectedSeats.length);
    setSelectSeat(false);
  }

  useEffect(() => {
    if(loading){
        getOccupiedSeats(seatType);
    }
    setLoading(false);
  }, [handleConfirmSeats, getOccupiedSeats]); // Empty array ensures this runs once on mount

 // 1. Handles changes for Contact Name and Phone
const handleContactChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };
  
  // 2. Handles nested dynamic seat passenger changes
  const handlePassengerChange = (seatId, field, value) => {
    setPersonalInfo({
      ...personalInfo,
      passengers: {
        ...personalInfo.passengers,
        [seatId]: {
          ...personalInfo.passengers[seatId],
          [field]: value
        }
      }
    });
  };
  
  // 3. Handles form submission and redirects to payment
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevents full browser page reload
  
    // Bundle your complete transaction package together
    const orderSummary = {
      contact: { name: personalInfo.contactName, phone: personalInfo.contactPhone },
      passengers: personalInfo.passengers,
      travelInfo: travelInfo, // From your existing seat states
      netTotal: netTotal       // Calculated total price
    };
    setOrdersummary(orderSummary);
    setContinueToPayment(true);
    // Here you can also navigate to a payment page or trigger a payment modal
  
  };
  

  
  return (
    <div style={styles.container}>

      {!continueToPersonal && (
        <SelectRoute 
          styles={styles} 
          formData={formData}  
          locations={locations} 
          errors={errors} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          todayDateString={todayDateString}
        />
      )}

      {/* --- Dynamic Search Results UI --- */}
      {!loading && !continueToPersonal && searchResults !== null && (
       <SearchResult 
        styles={styles}
        formData={formData}
        travelInfo={travelInfo}
        searchResults={searchResults}
        confirmSeat={confirmSeat}
        handleSelectSeat={handleSelectSeat}
        setContinueToPersonal={setContinueToPersonal}
       />

      )}

    {loading && (
        <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Searching available train ...</p>
        </div>
    )}

      {!continueToPersonal && selectSeat && (
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
                    generateSeats={generateSeats}
                    calculateTotal={calculateTotal}
                    handleSeatClick={handleSeatClick}
                    getSeatStyle={getSeatStyle}
                    handleConfirmSeats={handleConfirmSeats}
                /> 
                </div>
            </div>
        )}

{continueToPersonal && !continueToPayment && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
        
       <TravelInfo 
          styles={styles}
          seatStyles={seatStyles}
          travelInfo={travelInfo}
          netTotal={netTotal}
       />

       
       <PersonalInfo 
          handleFormSubmit={handleFormSubmit}
          styles={styles}
          personalInfo={personalInfo}
          handleContactChange={handleContactChange}
          travelInfo={travelInfo}
          handlePassengerChange={handlePassengerChange}
       />


    </div>
)}
{continueToPayment && 
    <Payment orderSummary={ordersummary} />
}

    </div>
  );
}
