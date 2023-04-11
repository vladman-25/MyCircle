import "./Feed.scss"
import Unauthorized from "../Unauthorized/Unauthorized";
import Auth from "../../modules/Auth"

function Feed() {
    return (
        Auth.isUserAuthenticated()?
            <div>
                <h1>Feed</h1>
            </div>
            :
            <Unauthorized />
    );
}
export default Feed;