import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./Pages/RegisterForm";
import LoginForm from "./Pages/LoginForm";
import "./components/sidebar.css";

import HomePage from "./Pages/HomePage";
import Explore from "./Pages/Explore";
import Trending from "./Pages/Trending";
import Clubs from "./Pages/Clubs";
import Popular from "./Pages/Popular";
import Events from "./Pages/Events";
import Profile from "./Pages/Profile";
import TextEffect from "./components/TextEffect";
import Chats from "./Pages/Chats";
import ProfileComponent from "./components/ProfileComponent";
import ProfileTwo from "./Pages/ProfileTwo";
import OSArchitectureDiagram from "./components/OSArchitectureDiagram";
const url = "http://localhost:5000/api/users/login";

function App() {
  return (
    <>
      {/* <TextEffect text={"matrix"} /> */}
      {/* <OSArchitectureDiagram /> */}

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={["/users", "/users/:id"]} element={<ProfileTwo />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
