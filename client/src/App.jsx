// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlowBuilder from "./components/FlowBuilder/FlowBuilder.jsx";

const App = () => {
  return (
    <div className="bg-[#090440]">
      <Router>
        <Routes>
          <Route path="/" element={<FlowBuilder />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
