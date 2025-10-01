import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashbaord";
import Welcome from "./pages/Welcome";
import ZustandLearn from "./pages/ZustandLearn";
import Landing from "./pages/Landing";
import ScrollToTop from "./components/ScrollToTop";
import InteractiveFloor from "./components/InteractiveFloor";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/zustand" element={<ZustandLearn />} />
          <Route path="/responsive" element={<Landing />} />
          <Route path="/intercativefloor" element={<InteractiveFloor />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
