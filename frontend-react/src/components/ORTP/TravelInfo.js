import React from 'react'

export default function TravelInfo(props) {
    const {styles, travelInfo, seatStyles} = props;
    let netTotal = 0;
  return (
    <div>
    <h2 style={styles.heading}>Travel Information</h2> 
    {[
        { key: 'first', label: 'First Class' },
        { key: 'upper', label: 'Upper Class' }
    ].map(({ key, label }) => {
        const data = travelInfo[key];
        if (!data?.total) return null;

        // Safely calculate totals
        const numericTotal = typeof data.total === 'string' 
            ? parseInt(data.total.replace(/,/g, ''), 10) 
            : data.total;
        netTotal += numericTotal || 0;

        return (
            <div key={key} style={seatStyles.summaryBox}>
                <div style={seatStyles.summaryRow}>
                    <span>Seat Type:</span>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>{label}</span>
                </div>
                
                <div style={seatStyles.summaryRow}>
                    <span>Selected Seat(s):</span>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>{data.seats}</span>
                </div>
                
                <div style={seatStyles.summaryRow}>
                    <span>Price:</span>
                    <span style={seatStyles.totalPrice}>MMK {numericTotal.toLocaleString()}</span>
                </div>
            </div>
        );
    })}

    {/* Consolidated Net Total displayed cleanly outside individual blocks */}
    {netTotal > 0 && (
        <div style={{ ...seatStyles.summaryBox, borderTop: '2px dashed #ccc', marginTop: '8px' }}>
            <div style={seatStyles.summaryRow}>
                <span style={{ fontWeight: 'bold', color: '#ff0000' }}>Net Total Price:</span>
                <span style={{ ...seatStyles.totalPrice, color: '#ff0000', fontSize: '1.2rem' }}>
                    MMK {netTotal.toLocaleString()}
                </span>
            </div>
        </div>
    )}
</div>
  )
}
