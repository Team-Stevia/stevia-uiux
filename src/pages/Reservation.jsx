import roomImg from "../assets/room1.png";
import location from "../assets/location.png";
import done from "../assets/done.png";
import "../styles/Reservation.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const initialReservation = [
    {id: 9, time: "09:00 ~ 10:00", reserved: true},
    {id: 10, time: "10:00 ~ 11:00", reserved: true},
    {id: 11, time: "11:00 ~ 12:00", reserved: true},
    {id: 12, time: "12:00 ~ 13:00", reserved: true},
    {id: 13, time: "13:00 ~ 14:00", reserved: true},
    {id: 14, time: "14:00 ~ 15:00", reserved: true},
    {id: 15, time: "15:00 ~ 16:00", reserved: true},
    {id: 16, time: "17:00 ~ 18:00", reserved: true},
];


const Reservation = ({roomId}) => {
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
                const response = await axios.get(`http://localhost:3003/timetables/${roomId}`); // 적절한 API 호출로 변경하세요
                console.log(response);

                const reservedTimes = response.data.reservedTime;
                const roomImageUrl = response.data.roomImageUrl;
                const roomNo = response.data.roomNo;
                const building = response.data.buildingLocation;
                const buildingName = response.data.buildingName;



                console.log(reservedTimes, roomImageUrl);


                const splitTimes = reservedTimes.split(',').map(Number);

                console.log(splitTimes);

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