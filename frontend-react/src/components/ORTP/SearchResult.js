import React from 'react'

export default function SearchResult(props) {
const {styles, formData, travelInfo, searchResults, confirmSeat, handleSelectSeat, setContinueToPersonal} = props;
  return (
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

          {travelInfo[train.type].total && ( 
          <div style={styles.trainInfo}>
            <div style={styles.trainName}>Your Seat(s): <span style={{ color: '#ff0000' }}>{travelInfo[train.type].seats}</span></div>
            <div style={styles.trainName}>Total Price: <span style={{ color: '#ff0000' }}>{travelInfo[train.type].total}</span></div>
          </div>)}

          <div style={{ textAlign: 'right' }}>
            <div style={styles.priceTag}>
              MMK {train.price.toLocaleString('en-US', {
                  maximumFractionDigits: 2
              })}
            </div>
            <button 
              disabled={confirmSeat >= formData.passengers}
              onClick={() => handleSelectSeat(train.type)} 
              style={{
                  ...styles.bookBtn, 
                  cursor: confirmSeat >= formData.passengers ? 'not-allowed' : 'pointer' 
              }}
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
 {confirmSeat > 0 && <div style={{width:'100%', textAlign:'center'}}>
      <button onClick={()=>setContinueToPersonal(true)} type="button" style={{...styles.buttonSubmit,width:'25%'}}>
          {"Continue to Personal Information \u00BB"}
      </button>
  </div>}
     
  </div>
  )
}
