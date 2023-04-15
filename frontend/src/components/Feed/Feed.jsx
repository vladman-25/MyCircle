import "./Feed.scss"
import Unauthorized from "../Unauthorized/Unauthorized";
import Auth from "../../modules/Auth"
import Minichat from "./Minichat/Minichat";

import {useNavigate} from "react-router-dom";



function Feed() {

    let navigate = useNavigate()

    return (
        Auth.isUserAuthenticated()?
            <div className="feed-container">
                <div className="chats">
                    <div className="chats-container">
                        <h1>Choose a chat!</h1>

                        <Minichat chatcount="10" chatname="Happy Mood" pageurl={'chat/happy'}/>
                        <Minichat chatcount="4" chatname="Energy Time" pageurl={'chat/energy'}/>
                        <Minichat chatcount="7" chatname="Sad hours" pageurl={'chat/sad'}/>



                    </div>
                </div>
                <div className="timeline">
                    <h1>bbb</h1>
                </div>
            </div>
            :
            <Unauthorized />
    );
}
export default Feed;