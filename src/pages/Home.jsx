import '../styles/Home.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import useBottomSheet from '../hooks/useBottomSheet';
import keyImage from "../assets/key.png"
import {useNavigate} from "react-router-dom";

const Home = () => {
    const { isSheetOpen, openSheet, closeSheet } = useBottomSheet();
    const navigate = useNavigate();

    const useHandleMove = () => {
        navigate("/reservation");
    }

    return(
        <div className="Home">
            <div className="s">
                <b>Please choose a place!!</b>
            </div>
            <div className="menu">
                <div className="arrow1"></div>
                <button className='menu-items'>N3</button>
                <button className='menu-items'>N4</button>
                <button className='menu-items'>N5</button>
                <button className='menu-items'>N6</button>
                <div className="arrow2"></div>
            </div>
            <div className="select-box" onClick={useHandleMove}>
            <p className="select-box-items">506</p>
                <p className="select-box-items">511</p>
                <p className="select-box-items">512</p>
                <p className="select-box-items">505</p>
                <p className="select-box-items">504</p>
                <p className="select-box-items">513</p>
            </div>
            <div className="key" onClick={openSheet}>
                <p className='key1'></p>
                 <img src={keyImage} alt="key" className='key_image' />
            </div>
            <BottomSheet open={isSheetOpen} onDismiss={closeSheet}>
                <div style={{ padding: '16px' }}>
                    <h2>Bottom Sheet Content</h2>
                    <p>This is a simple bottom sheet example.</p>
                    <button onClick={closeSheet}>Close</button>
                </div>
            </BottomSheet>
        </div>
    );
}

export default Home;
