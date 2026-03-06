import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles.css";

import { Home } from "./pages/home";
import { Room } from "./pages/room";
import { CreateRoom } from "./pages/createRoom";
import { WebrtcProvider } from "./context/webrtcContext";
import { JoinRoom } from "./pages/joinRoom";

function App() {
  return (
    <WebrtcProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/" element={<Room />} />
          <Route path="/join-room/" element={<JoinRoom />} />
          <Route path="/create-room/" element={<CreateRoom />} />
        </Routes>
      </BrowserRouter>
    </WebrtcProvider>
  );
}

export default App;
