import "./Minichat.scss";
import person from "../../../public/person.png";
import join from "../../../public/join.png";

function Minichat(props) {
  return (
    <div className="chat-mini">
      <div className="chat-users-count">
        <div>
          <h2>{props.chatcount}</h2>
        </div>
        <div className="p-img">
          <img src={person} />
        </div>
      </div>
      <div className="chat-name">
        <h2>{props.chatname}</h2>
      </div>
      <div className="chat-join">
        <img
          src={join}
          onClick={() => {
            window.location.href = props.pageurl;
          }}
        />
      </div>
    </div>
  );
}

export default Minichat;
