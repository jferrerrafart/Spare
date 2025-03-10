import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Dashboard from "./components/CDashboard/dashboard";
import CreateSurvey from "./components/CreateSurvey/createSurvey";
import Results from "./components/results/results";
import UserDashboard from "./components/UserDashboard/userdashboard";
import Sparelogo from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/src/utils/Sparelogo.jpg";
import SurveyComplete from "./components/SurveComplete/surveycomplete";

function App() {
  // tendré que crear un state para cuando pulser user view navegar a su dashboard
  return (
    <Router>
      {/* Header Section */}
      <div className="relative flex items-center w-full px-0 py-2 border-b">
        {/* Left Side: Toggle Group */}
        <div className="flex">
          <ToggleGroup
            type="single"
            defaultValue="company"
            className="space-x-0.5 border border-grey rounded-sm text-xs"
          >
            <Link to="/">
              <ToggleGroupItem
                value="company"
                aria-label="Company View"
                className="px-5 py-1 text-xs"
              >
                Company View
              </ToggleGroupItem>
            </Link>
            <Link to="/user-dashboard">
              <ToggleGroupItem
                value="user"
                aria-label="User View"
                className="px-2 py-1 text-xs"
              >
                User View
              </ToggleGroupItem>
            </Link>
          </ToggleGroup>
        </div>

        {/* Center: Logo (Always centered) */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
          <img src={Sparelogo} alt="Logo" className="h-13" />
        </h1>

        {/* Right Side: Connect Wallet Button */}
        <div className="ml-auto">
          <Button>Connect Wallet</Button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/survey-results/:id" element={<Results />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/survey-complete/:id" element={<SurveyComplete />} />
      </Routes>
    </Router>
  );
}

export default App;
