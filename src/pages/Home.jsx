import '../styles/Home.css';

const Home = () => {
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
            <div className="key">
                <p className='key1'>key</p>
            </div>
        </div>
    );
}

export default Home;
