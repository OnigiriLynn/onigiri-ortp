import React, { useState } from 'react';

export default function SearchResult(props) {

  const {styles, formData, searchResults, handleSelectSeat } = props;
  
  return (
    <>
      {/* --- Search Results --- */}
      {searchResults !== null && (
        <div style={styles.resultsWrapper}>
          {searchResults.length > 0  && <h3 style={styles.resultsHeading}>
            Available Trains ({formData.departure} → {formData.destination})
          </h3>}
          
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
                    MMK{train.price}
                  </div>
                  <button 
                    onClick={() =>handleSelectSeat(train.name === 'Upper Class'?'upper':'first')} 
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
      </>
  );
}