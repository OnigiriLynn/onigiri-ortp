import React, { useState } from 'react';
import { styles } from '../Route/SelectRoute/RouteStyle';
import { locations, trainsInfo } from './SelectRoute/RouteData';
import SearchResult from './SearchResult';
import SelectSeat from './SelectSeat';

export default function RouteSelection() {

  const todayDateString = new Date().toISOString().split('T')[0]; //to get today date
    
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    passengers: 1,
  });
  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev, 
        [name]: '' 
    }));
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
      const results = trainsInfo.filter(
        (train) => train.from === formData.departure && train.to === formData.destination
      );
      
      setSearchResults(results);
    }
  };


  const [selectSeat, setSelectSeat] = useState(false);
  const [seatType, setSeatType] = useState('');

  const handleSelectSeat = (type) => {
    setSelectSeat(!selectSeat);
    setSeatType(type);
  }
  
  const seatConfigs = {
    first: { title: "Select seats for first class", price: 10000 },
    upper: { title: "Select seats for upper class", price: 20000 },
  };
  
  const activeConfig = seatConfigs[seatType] || { title: "Select Seats", price: 0 };

  // Generates an array of seats: A, B, C, D columns across multiple rows



  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select Your Route</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        
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
        <div style={styles.formGroup}>
          <label style={styles.label}>Passengers</label>
          <input
            type="number"
            name="passengers"
            min="1"
            max="5"
            value={formData.passengers}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.passengers && <span style={styles.error}>{errors.passengers}</span>}
        </div>

        <button type="submit" style={styles.button}>
          Search Routes
        </button>
        </form>



      {/* --- Search Results --- */}
      <SearchResult styles={styles} formData={formData} searchResults={searchResults} handleSelectSeat={handleSelectSeat} />
    
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
                  type={seatType} 
                  title={activeConfig.title} 
                  passengers={formData.passengers} 
                  price={activeConfig.price} 
                  onConfirm={() => setSelectSeat(false)} 
              /> 
              </div>
          </div>
          )}
    </div>
  );
}