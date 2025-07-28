// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlowBuilder from "./components/FlowBuilder/FlowBuilder.jsx";
import Connect from "./pages/Connect.jsx";

const App = () => {
  return (
    <div className="bg-black">
      <Router>
        <Routes>
          <Route path="/" element={<FlowBuilder />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
