import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Feed from './components/Feed/Feed';
import Navbar from "./components/Navbar/Navbar";
import Chat from "./components/Chat/Chat";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Page from "./components/Page/Page";
import User from "./components/User/User";
import Auth from "./modules/Auth"
import CreatePage from "./components/CreatePage/CreatePage";

function App() {
  return (
      <BrowserRouter className="main-container">
          <Navbar/>
          <Routes>
              <Route path="/" exact element={<Landing />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/feed" exact element={<Feed />} />
              <Route path="/chat/:chat" exact element={<Chat />} />
              <Route path="/unauthorized" exact element={<Unauthorized />} />
              <Route path="/page" exact element={<CreatePage />} />
              <Route path="/page/:page" exact element={<Page />} />
              <Route path="/user/:user" exact element={<User />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
