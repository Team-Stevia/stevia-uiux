import '../styles/Home.css';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import useBottomSheet from '../hooks/useBottomSheet';
import keyImage from "../assets/key.png"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {boardList} from "../feature/slice/boardSlice";


const Home = () => {
    const dispatch = useDispatch();
    const boardsData = useSelector((state) => state.boards.board);
    const status = useSelector((state) => state.boards.status);
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        dispatch(boardList(accessToken));
    }, [dispatch, accessToken]);

    const {isSheetOpen, openSheet, closeSheet} = useBottomSheet();

    return (
        <div className="Home">
            <div className="s">
                <b>Please choose a place!!</b>
            </div>
            <div className="menu">
                <div className="arrow1"></div>
                {status === 'succeeded' && boardsData.length > 0 && (
                    boardsData.map((board) => (
                        <div key={board.buildingAndRoomList.buildingLocation}>
                            <button className='menu-items'>
                                {board.buildingAndRoomList.buildingLocation}
                            </button>
                            {board.otherBuildingList.map((otherBuilding, subIndex) => (
                                //otherBuilding unique id가 없어 임의 생성
                                <button className='menu-items' key={`otherBuilding-${subIndex}`}>
                                    {otherBuilding}
                                </button>
                            ))}
                        </div>
                    ))
                )}
                <div className="arrow2"></div>
            </div>
            <div className="select-box">
                {status === 'succeeded' && boardsData.length > 0 && (
                    boardsData.map((board) => board.buildingAndRoomList.roomList.map((room) => (
                            <div key={room.roomId}>
                                <p className="select-box-items">{room.roomNo}</p>
                            </div>
                        ))
                    )
                )}
            </div>
            <div className="key" onClick={openSheet}>
                <p className='key1'></p>
                <img src={keyImage} alt="key" className='key_image'/>
            </div>
            <BottomSheet open={isSheetOpen} onDismiss={closeSheet}>
                <div style={{padding: '16px'}}>
                    <h2>Bottom Sheet Content</h2>
                    <p>This is a simple bottom sheet example.</p>
                    <button onClick={closeSheet}>Close</button>
                </div>
            </BottomSheet>
        </div>
    );
}

export default Home;