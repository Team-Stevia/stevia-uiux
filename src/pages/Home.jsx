import '../styles/Home.css';
import {useState} from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

const Home = () => {

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const openSheet = () => {
        setIsSheetOpen(true);
    };

    const closeSheet = () => {
        setIsSheetOpen(false);
    };

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
            <div className="select-box">
            <p className="select-box-items">506</p>
                <p className="select-box-items">511</p>
                <p className="select-box-items">512</p>
                <p className="select-box-items">505</p>
                <p className="select-box-items">504</p>
                <p className="select-box-items">513</p>
            </div>
            <div className="key" onClick={openSheet}>
                <p className='key1'>key</p>
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
