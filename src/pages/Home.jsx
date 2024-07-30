import '../styles/Home.css';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import useBottomSheet from '../hooks/useBottomSheet';
import keyImage from "../assets/key.png"
import {useNavigate} from "react-router-dom";
import BottomSheetContent from "../components/BottomSheetContent.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3003',
    headers: {
        'Content-Type': 'application/json',
    }
});

const Home = () => {
    const {isSheetOpen, openSheet, closeSheet} = useBottomSheet();
    const [otherBuildingList, setOtherBuildingList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const buildingsPerPage = 4;
    const [roomsList, setRoomList] = useState([]);
    const [reservationStatus, setReservationStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get('/boards');

                const otherBuildingList = res.data[0].otherBuildingList;
                const buildingAndRoomList = res.data[0].buildingAndRoomList;
                const buildingLocation = buildingAndRoomList[0].buildingLocation;
                const roomList = buildingAndRoomList[0].roomList;
                const reservationStatus = res.data[0].reservationInfo.reservationStatus;

                console.log(res);


                setOtherBuildingList(otherBuildingList);
                setRoomList(roomList);
                setReservationStatus(reservationStatus);

            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchData();
    }, []);


    const useHandleMove = () => {
        navigate("/reservation");
    }

    /* buildingLocation 4개씩 렌더링하기 */
    const renderBuildingList = () => {
        const start = currentPage * buildingsPerPage
        const end = start + buildingsPerPage;
        let currentBuildingList = otherBuildingList.slice(start, end);

        return currentBuildingList.map((building, index) => (
            <button key={index} className="menu-items">
                {building}
            </button>
        ));
    }

    /* 상단바 왼쪽 화살표 이벤트 */
    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0))
    }

    /* 상단바 오른쪽 화살표 이벤트 */
    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const nextPage = prevPage + 1;
            const totalPages = Math.ceil(otherBuildingList.length / buildingsPerPage);
            return nextPage >= totalPages ? 0 : nextPage;
        })
    }


    const renderRoomList = () => {
        return roomsList.map((room) => {
            let bgColor;
            if (0 < room.reservationRate && room.reservationRate <= 20) bgColor = "#C1C7F3FF";
            else if (room.reservationRate < 20) bgColor = '#FAD5D5';
            else if (room.reservationRate < 50) bgColor = '#FF6969';
            else if (room.reservationRate < 80) bgColor = '#FF3030';
            else bgColor = 'red';

            return (
                <p key={room.roomId} className="select-box-items" style={{backgroundColor: bgColor}}
                   onClick={useHandleMove}>
                    {room.roomNo}
                </p>
            );
        });
    };

    return (
        <div className="Home">
            <div className="s">
                <b>Please choose a place!!</b>
            </div>
            <div className="menu">
                <div className="arrow1"
                     onClick={handlePrevPage}>
                </div>
                <div id="buildingList" className="menu-items">
                    {renderBuildingList()}
                </div>
                <div className="arrow2" onClick={handleNextPage}>
                </div>
            </div>
            <div className="select-box">
                {renderRoomList()}
            </div>
            <div className="key" onClick={openSheet}>
                <p className='key1'></p>
                <img src={keyImage} alt="key" className='key_image'/>
            </div>
            {reservationStatus &&
                <BottomSheet open={isSheetOpen} onDismiss={closeSheet}>
                    <div style={{padding: '16px'}}>
                        <BottomSheetContent closeSheet={closeSheet}/>
                    </div>
                </BottomSheet>}
        </div>
    );
}

export default Home;
