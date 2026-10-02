import React from 'react'

export default function SelectRoute(props) {
  const {styles, formData, locations, errors, handleChange, handleSubmit, todayDateString} = props;
  return (
    <>
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
            value={formData.departureDate }
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
</>
  )
}
