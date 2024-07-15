import React, {useState} from 'react';
import '../styles/BottomSheetContent.css';
import character1 from '../assets/character1.png';
import character2 from '../assets/character2.png';
import locationIcon from '../assets/location.png';
import ThrowKey from '../assets/ThrowKey.png';

const BottomSheetContent = ({closeSheet}) => {
    const [keyStatus, setKeyStatus] = useState(true);

    const onChangeKeyStatus = () => {
        setKeyStatus(!keyStatus);
    }
    return (
        <div className="bottom-sheet">
            <div className="arrow-container">
                <button onClick={closeSheet}>▼</button>
            </div>
            <div className="content-container">
                <div className="character">
                    <img className="keyImg" src={keyStatus ? null : ThrowKey}/>
                    <img className="characterImg" alt="character" onClick={onChangeKeyStatus}
                         src={keyStatus ? character1 : character2}/>
                    <p>*** 예약 현황</p>
                </div>
                <div className="reservation-info1">
                    <div className="location1">
                        <img src={locationIcon} alt="Location" className="location-icon"/> <p>N5 - 506</p>
                    </div>
                    <div className="reservation-time1">
                        <p>{new Date().getFullYear()}.{new Date().getMonth() + 1}.{new Date().getDate()}</p>
                        <p style={{color: '#466384'}}> 13:00 ~ 16:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomSheetContent;