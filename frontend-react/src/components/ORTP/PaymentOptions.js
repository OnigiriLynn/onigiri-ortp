import React from 'react'

export default function PaymentOptions(props) {
    const {paymentStyles, selectedMethod, setSelectedMethod, handlePayNow, orderSummary} = props;
  return (
    <div style={paymentStyles.card}>
          <h2 style={paymentStyles.sectionHeading}>Select Payment Method</h2>
          <p style={paymentStyles.subText}>Choose your preferred Myanmar local mobile wallet payment gateway.</p>

          <div style={paymentStyles.methodsList}>
            {[
              { id: 'kbzpay', name: 'KBZPay', color: '#104fa2', description: 'Pay via KBZPay Application' },
              { id: 'wavepay', name: 'WavePay', color: '#fdb813', description: 'Pay via WaveMoney Account' },
              { id: 'ayapay', name: 'AYA Pay', color: '#da251c', description: 'Pay via AYA Pay Digital Wallet' },
              { id: 'cbpay', name: 'CB Pay', color: '#005ba3', description: 'Pay via CB Bank App Wallet' }
            ].map((method) => (
              <label 
                key={method.id} 
                style={{
                  ...paymentStyles.methodItem,
                  border: selectedMethod === method.id ? `2px solid ${method.color}` : '2px solid #e0e0e0',
                  backgroundColor: selectedMethod === method.id ? '#fcfdfe' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    style={{ transform: 'scale(1.2)', cursor: 'pointer' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{method.name}</div>
                    <div style={{ fontSize: '12px', color: '#777' }}>{method.description}</div>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <span style={{ fontSize: '18px', color: method.color, fontWeight: 'bold' }}>✓</span>
                )}
              </label>
            ))}
          </div>

          <button onClick={handlePayNow} style={paymentStyles.payButton}>
            Pay MMK {orderSummary.netTotal.toLocaleString()}
          </button>
        </div>
  )
}
