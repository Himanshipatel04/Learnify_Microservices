import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatWidget } from "./components/chat/ChatWidget";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>gi</p>} />
        </Routes>
      </BrowserRouter>
      <ChatWidget />
    </>
  );
}

export default App;
