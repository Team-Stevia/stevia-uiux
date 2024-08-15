import roomImg from "../assets/room1.png";
import location from "../assets/location.png";
import done from "../assets/done.png";
import "../styles/Reservation.css"
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import initialReservation from "../../src/utils/ReservationTime.js";


const Reservation = () => {
    const {roomId} = useParams();
    const [reservation, setReservation] = useState(initialReservation);
    const [roomNo, setRoomNo] = useState("");
    const [roomImageUrl, setRoomImageUrl] = useState("");
    const [buildingLocation, setBuildingLocation]= useState("");
    const [buildingName, setBuildingName] = useState("");
    const navigate = useNavigate();



    const useHandleMove = () => {
        navigate("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!roomId) {
                console.error("roomId is not defined");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3003/timetables/${roomId}`);
                const reservedTimes = response.data.reservedTime;
                const roomImageUrl = response.data.roomImageUrl;
                const roomNo = response.data.roomNo;
                const building = response.data.buildingLocation;
                const buildingName = response.data.buildingName;


                const splitTimes = reservedTimes.split(',').map(Number);
                const updatedReservations = reservation.map(reservation => {
                    if (splitTimes.includes(reservation.id)) {
                        return {...reservation, reserved: false};
                    } else {
                        return reservation;
                    }
                });

                setReservation(updatedReservations);
                setRoomNo(roomNo);
                setRoomImageUrl(roomImageUrl);
                setBuildingLocation(building);
                setBuildingName(buildingName);



            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [roomId]);


    const onUpdate = (targetId) => {
        const updatedReservations = reservation.map((slot) =>
            slot.id === targetId ? { ...slot, reserved: !slot.reserved } : slot
        );
        setReservation(updatedReservations);
    };


    return (
        <div className="reservation">
            <div className="roomImg" alt="room" style={{backgroundImage: `url(${roomImg || roomImg})`}}>
                <div className="arrow" onClick={useHandleMove}></div>
                <div className="reservation-board">
                    <div className="reservation-location">
                        <img className="locationImg" src={location} alt="location"/>
                        <p>한밭대학교 유성덕명캠퍼스 {buildingName}<br/>{buildingLocation} {roomNo}</p>
                    </div>

                    <div className="reservation-time">
                        <div className="reservation-info">
                            <div
                                className="date">Today<br/>{new Date().getFullYear()}.{new Date().getMonth()}.{new Date().getDate()}
                            </div>
                            <img className="done-button" src={done} alt="done" onClick={useHandleMove}/>
                        </div>
                        <div className="reservation-time-slot">
                            {reservation.map((slot, id) => (
                                <div key={id} className={`timeSlot ${slot.reserved ? 'reserved' : 'no-reserved'}`} onClick={() => onUpdate(slot.id)}>
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