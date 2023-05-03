import "./Searchbar.scss"
import shape from "./shape.png"
import userpfp from "../../public/userpfp.jpg";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Searchbar() {
    const BASE_URL = "http://localhost:5000"
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([])
    const [resultsPg, setResultsPg] = useState([])

    let navigate = useNavigate()

    function handleSearch() {
        console.log(search)
        if (search === '') {
            return;
        }
        fetch(BASE_URL + '/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(
                {search: search.trim()})
        })
            .then(response => response.json())
            .then((data) => {
                // console.log(data);
                setResults(data.users)
                setResultsPg(data.pages)

                console.log(data.users)
                console.log(data.pages)
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="search-container">
            <div className="search-top">
                <div className="searchbar-text">
                    <input type="text" placeholder="Search something..." id={"search"} onChange={(e) => {
                        setSearch(e.target.value)
                    }}/>
                </div>
                <div className="search-img">
                    <img src={shape} onClick={handleSearch}/>
                </div>   
            </div>

            {
                results.map((user, key) => {
                    return(
                        <div className="result" onClick={() => navigate('/user/' + user._id)} key={key}>
                            <div className="result-img">
                                <img src={userpfp}/>
                            </div>
                            <div className="result-text">
                                <h1>{user.username + " " + user.lastname + " @" + user.username}</h1>
                            </div>
                        </div>
                    )})
            }
            {
                resultsPg.map((page, key) => {
                    return(
                        <div className="result" onClick={() => navigate('/page/' + page._id)} key={key}>
                            <div className="result-img">
                                <img src={"http://localhost:5000/pages/" + page.image}/>
                            </div>
                            <div className="result-text">
                                <h1>{page.name}</h1>
                            </div>
                        </div>
                    )})
            }
            <h1 onClick={() => {
                setSearch('')
                setResults([])
            }}>
                hide
            </h1>
        </div>

    )
}
export default Searchbar;