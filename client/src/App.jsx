// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import FlowBuilder from "./components/FlowBuilder/FlowBuilder";
import Login from "./pages/auth/Login.jsx";
import { useAuth, AuthProvider } from "./state/hooks/useAuth.jsx";
import RestTriggers from "./pages/Flow Builder/index.jsx";
import FlowBuilder from "./components/FlowBuilder/FlowBuilder.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    // <div className="bg-[#030116] min-h-screen">
          <div className="bg-[#010411] min-h-screen">

      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
               <ProtectedRoute> 
                  <RestTriggers />
                   <FlowBuilder /> 
                 </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
