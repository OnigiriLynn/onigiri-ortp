import React from 'react'

export default function PersonalInfo(props) {
    const {handleFormSubmit, styles, personalInfo, handleContactChange, travelInfo, handlePassengerChange} = props;
  return (
    <form onSubmit={handleFormSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <h2 style={styles.heading}>Contact & Passenger Details</h2>
    
    {/* Primary Contact Information */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', marginTop: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: '600', color: '#444' }}>Contact Name *</label>
            <input 
                type="text" 
                name="contactName"
                value={personalInfo.contactName}
                onChange={handleContactChange}
                placeholder="Enter primary contact name"
                style={styles.input}
                required
            />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: '600', color: '#444' }}>Phone Number *</label>
            <input 
                type="tel" 
                name="contactPhone"
                value={personalInfo.contactPhone}
                onChange={handleContactChange}
                placeholder="09..."
                style={styles.input}
                required
            />
        </div>
    </div>

    {/* Dynamic Passenger Fields based on chosen seats */}
    <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#555', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>
        Passenger Details
    </h3>

    {['first', 'upper'].map(classKey => {
        const seatsStr = travelInfo[classKey]?.seats;
        if (!seatsStr) return null;
        
        const seatsArray = seatsStr.split(',').map(s => s.trim());

        return seatsArray.map(seatId => (
            <div key={seatId} style={{ marginBottom: '16px', padding: '12px', background: '#f9f9f9', borderRadius: '6px' }}>
                <span style={{ fontWeight: 'bold', color: '#007bff' }}>Seat {seatId} ({classKey === 'first' ? 'First' : 'Upper'} Class)</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                    <input 
                        type="text" 
                        value={personalInfo.passengers[seatId]?.name || ''}
                        onChange={(e) => handlePassengerChange(seatId, 'name', e.target.value)}
                        placeholder="Passenger Full Name" 
                        style={styles.input}
                        required
                    />
                    <input 
                        type="text" 
                        value={personalInfo.passengers[seatId]?.nrc || ''}
                        onChange={(e) => handlePassengerChange(seatId, 'nrc', e.target.value)}
                        placeholder="NRC Number / Passport" 
                        style={styles.input}
                        required
                    />
                </div>
            </div>
        ));
    })}

    {/* Action Button trigger */}
    <button 
        type="submit" 
        style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#28a745', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '1rem',
            cursor: 'pointer',
            marginTop: '12px'
        }}
    >
        Confirm & Proceed to Payment
    </button>
</form>
  )
}
