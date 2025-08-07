import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import GroupChatPage from "./pages/GroupChatPage";
import GroupDetailPage from "./pages/GroupDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/group/:id" element={<GroupChatPage />} />
      <Route path="/group/:id/detail" element={<GroupDetailPage />} />
      <Route path="/contact/:id" element={<div>Contact Page</div>} />
    </Routes>
  )
}

export default App;
