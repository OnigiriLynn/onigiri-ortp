import React from "react";
import { useState } from "react";
import { locations, trainsInfo } from "./RouteData";

function SelectRoute() {

    const todayDateString = new Date().toISOString().split('T')[0]

    const [products, setProducts] = useState({
        departure: "",
        destination: "",
        departureDate: "",
        passengers: 1
    });

    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(null);
    const [selectSeat, setSelectSeat] = useState(false);
     const [type, setType] = useState('');


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setProducts((prev) => ({
            ...prev , [name]: value
        }))
        if(error[name]){
            setError((prev) => ({
                ...prev, [name]:""
            }))
        }
    }
    

    const veletation = () => {
        const newError = {};
        if(!products.departure)newError.departure = "Departure city is required";
        if(!products.destination)newError.destination = "Destination city is required";
        if(!products.departureDate)newError.departureDate = "Departure Date is required";
        if(products.passengers < 1)newError.passengers = "passengers";
        setError(newError);
        return Object.keys(newError).length === 0;
    }



    const handleSearch = (e) => {
        e.preventDefault();
        if(veletation()){
            const result = trainsInfo.filter((train) => (train.from === products.departure && train.to === products.destination));
            setSubmit(result)
        }
    }

const SelectSeat = (type) => {
    setSelectSeat(!selectSeat);
    setType(type);
}


  return (
    <div className="Selection">
        <form className="Select_location" onSubmit={handleSearch} >

            <div className="SelectionFrom">
                <div className="dropdown">
                    <select className="dropdown-menu" name="departure" value={products.departure} onChange={handleChange}>
                        <option value="">Select departure city</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                    {error.departure && <span>{error.departure}</span>}
                </div>
            </div>

            <div className="SelectionTO">
                    <div className="dropdown" >
                        <select className="dropdown-menu" name="destination" value={products.destination} onChange={handleChange}>
                            <option value="">Select destination city</option>
                            {locations.map((loc) => (
                                products.departure !== loc && <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                        {error.destination && <span>{error.destination}</span>}
                    </div>
            </div>

            <div className="Departure_Date">
                <div className="Date">
                    <input type="date" className="selectDate" name="departureDate" value={products.departureDate} onChange={handleChange} min={todayDateString}></input>
                </div>
                {error.departureDate && <span>{error.departureDate}</span>}
            </div>


            <div className="SelectPassenger">
                <div className="Passenger">
                    <input type="number" className="PassengerNumber" min={1} max={5} name="passengers" value={products.passengers} onChange={handleChange}></input>
                </div>
                {error.passenger && <span>{error.passenger}</span>}
            </div>
            


            <button type="submit" className="Submit">Search the route</button>

        </form> 

        {submit !== null && <div className="SearchResult">
            <div className="AvailableTrain">
                <div>Available Train is {products.departure} to {products.destination}</div>
                
                {submit.map((train) => (
                    <div key={train.id}>
                        <div>   
                            <div>{train.name}</div>
                            <div>{train.time}</div>
                            <div>{products.passengers}</div>
                        </div>
                        <div>
                            <div>MMK {train.price * products.passengers}</div>
                            <button onClick={() => SelectSeat(train.name)}>Select Seat</button>

                        </div>
                    </div>
                ))}
            
            </div>
        </div>}

        {selectSeat && <div className='model'>
                <div className='SeatModel'>
                    <div className='TitleSeat'>
                        <span>Choose Seat - {type}</span>
                        <button onClick={()=>setSelectSeat(!selectSeat)}>Close</button>
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
                        <tbody>
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
                        </tbody>
                        
                    </table>
                </div>
            </div>}
        
    </div>
  )}

  export default SelectRoute;
