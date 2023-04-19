import "./Unauthorized.scss"
import illu from '../../public/unauthorized.jpeg'


function Unauthorized() {

    return(
        <div className="unauthorized">
            <h1>Unauthorized Page</h1>
            <div className="img-div">
                <img src={illu}/>
            </div>
        </div>
    );
}

export default Unauthorized;