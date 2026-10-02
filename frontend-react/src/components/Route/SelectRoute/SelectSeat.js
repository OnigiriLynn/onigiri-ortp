import React from 'react'

export const SelectSeat = () => {
  return (
    <div className='model'>
        <div className='SeatModel'>
            <div className='TitleSeat'>
                <span>Choose Seat -  First Class</span>
                <button>Close</button>
            </div>

            <div className='SeatColor'>
                <div>
                    <div className='Unavailable'></div>
                    <span>Unavailable</span>
                </div>
                <div>
                    <div className='Available'></div>
                    <span>Available</span>
                </div>
                <div>
                    <div className='Selected'></div>
                    <span>Selected</span>
                </div>
            </div>

            <table className='SeatSelection'>
                <tr>
                    <td>1A</td>
                    <td>1B</td>
                    <td>1C</td>
                </tr>
                <tr>
                    <td>2A</td>
                    <td>2B</td>
                    <td>2C</td>               
                </tr>
                <tr>
                    <td>3A</td>
                    <td>3B</td>
                    <td>3C</td>               
                </tr>
                <tr>
                    <td>4A</td>
                    <td>4B</td>
                    <td>4C</td>               
                </tr>
                <tr>
                    <td>5A</td>
                    <td>5B</td>
                    <td>5C</td>               
                </tr>
            </table>
        </div>
    </div>
    
  )
}
