import roomImg from "../assets/room1.png";
import location from "../assets/location.png";
import done from "../assets/done.png";
import "../styles/Reservation.css"
import {useEffect, useState} from "react";

const reservations = [
    {id: 1, time: "09:00 ~ 10:00", reserved: true},
    {id: 2, time: "10:00 ~ 11:00", reserved: true},
    {id: 3, time: "11:00 ~ 12:00", reserved: true},
    {id: 4, time: "12:00 ~ 13:00", reserved: false},
    {id: 5, time: "13:00 ~ 14:00", reserved: false},
    {id: 6, time: "14:00 ~ 15:00", reserved: true},
    {id: 7, time: "15:00 ~ 16:00", reserved: false},
    {id: 8, time: "17:00 ~ 18:00", reserved: true},
    {id: 9, time: "18:00 ~ 19:00", reserved: false},
];

const Reservation = () => {
    // const [reservation, setReservation] = useState([]);
    //
    // useEffect(async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/api/reservations');
    //         setReservations(response.data);
    //     } catch (error) {
    //         console.error('error');
    //     }
    // }, []);


    function onCheck() {

    }

    return (
        <div className="reservation">
            <div className="roomImg" alt="room" style={{backgroundImage: `url(${roomImg})`}}>

                <div className="reservation-board">
                    <div className="reservation-location">
                        <div className="reservation-location-1">
                            <img className="locationImg" src={location} alt="location"/>
                            <p>한밭대학교 유성 덕명캠퍼스</p>
                        </div>
                        <p>N5 506</p>
                    </div>

                    <div className="reservation-time">
                        <div className="click">
                            <p>today 6/24</p>
                            <img className="done-button" src={done} alt="done"/>
                        </div>
                        <div className="reservationList" onClick={onCheck}>
                            {reservations.map((slot, id) => (
                                <div key={id} className={`timeSlot ${slot.reserved ? 'reserved' : 'no-reserved'}`}>
                                    {slot.time}
                                </div>
                            ))}
                        </div>
                    </div>

            </div>
            </div>
        </div>
    );
}

export default Reservation;