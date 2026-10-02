export const styles = {
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
      // --- Added Loading UI Styles ---
      loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        width: '100%',
      },
      loadingSpinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff', // Matches your theme's core primary blue
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      },
      loadingText: {
        marginTop: '12px',
        fontSize: '14px',
        color: '#555555',
        fontWeight: 'bold',
      }
};

export const seatStyles = {
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

  export const paymentStyles = {
    pageWrapper: {
      maxWidth: '1100px',
      margin: '3% auto',
      padding: '0 20px',
      fontFamily: 'Arial, sans-serif',
    },
    mainHeading: {
      fontSize: '28px',
      color: '#333',
      marginBottom: '24px',
      fontWeight: 'bold',
    },
    checkoutGrid: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '24px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '28px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      border: '1px solid #eee',
    },
    sectionHeading: {
      fontSize: '18px',
      color: '#222',
      marginBottom: '8px',
      fontWeight: 'bold',
    },
    subText: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '20px',
    },
    methodsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '24px',
    },
    methodItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    payButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#28a745',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      marginBottom: '8px',
    },
    summaryLabel: { color: '#666' },
    summaryValue: { fontWeight: 'bold', color: '#333' },
    passengerRow: {
      backgroundColor: '#f4f5f7',
      padding: '10px 12px',
      borderRadius: '6px',
      marginBottom: '8px',
    },
    seatBadge: {
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '11px',
      padding: '2px 6px',
      borderRadius: '4px',
      fontWeight: 'bold',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#333',
    },
    totalPrice: {
      fontSize: '22px',
      color: '#ff0000',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '50px 20px',
    },
    errorText: {
      color: '#dc3545',
      fontSize: '16px',
      marginBottom: '16px',
    },
    backHomeBtn: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    // Spinner overlays
    loaderOverlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    loaderBox: {
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
    },
    spinner: {
      width: '45px',
      height: '45px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #28a745',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px auto',
    },
    loaderText: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#333',
    }
  };