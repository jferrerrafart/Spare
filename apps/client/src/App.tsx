import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Dashboard from "./components/CDashboard/dashboard";
import CreateSurvey from "./components/CreateSurvey/createSurvey";
import Results from "./components/results/results";
import UserDashboard from "./components/UserDashboard/userdashboard";
import Sparelogohd from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/src/utils/Sparelogohd.jpg";
import SurveyComplete from "./components/SurveyComplete/surveycomplete";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import spareAPI from "@/api/spareAPI";
import WelcomeScreen from "./components/WelcomeScreen/welcomescreen";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

//const providerUrl =
//"https://base-sepolia.infura.io/v3/626b7233f4b0479cbfeba309abad79ab";
//const provider = new ethers.JsonRpcProvider(providerUrl);

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      console.log("Connected Wallet Address:", address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  /*useEffect(() => {
    if (walletAddress) {
      const checkWallet = async () => {
        try {
          /*let userResponse = await spareAPI.getFindWalletU(walletAddress);
          let companyResponse = await spareAPI.getFindWalletC(walletAddress);*/ /*
          const [userResponse, companyResponse] = await Promise.all([
            spareAPI.getFindWalletU(walletAddress),
            spareAPI.getFindWalletC(walletAddress),
          ]);

          if (userResponse) {
            setUserId(userResponse.id);
          } else {
            console.log("Registering new user...");
            await spareAPI.postRegisterWalletU(walletAddress);
            const userResponse = await spareAPI.getFindWalletU(walletAddress);
            setUserId(userResponse?.id || null);
          }

          if (companyResponse) {
            setCompanyId(companyResponse.id);
          } else {
            console.log("Registering new company...");
            await spareAPI.postRegisterWalletC(walletAddress);
            const companyResponse =
              await spareAPI.getFindWalletC(walletAddress);
            setCompanyId(companyResponse?.id || null);
          }
        } catch (error) {
          console.error("Error fetching or creating wallet info:", error);
        }
      };

      checkWallet();
    }
  }, [walletAddress]);*/
  useEffect(() => {
    if (walletAddress) {
      const checkWallet = async () => {
        try {
          // First, try to fetch the existing user and company information
          const [userResponse, companyResponse] = await Promise.all([
            spareAPI.getFindWalletU(walletAddress),
            spareAPI.getFindWalletC(walletAddress),
          ]);

          // If the user does not exist, register the user
          if (!userResponse) {
            console.log("Registering new user...");
            await spareAPI.postRegisterWalletU(walletAddress);
          }

          // If the company does not exist, register the company
          if (!companyResponse) {
            console.log("Registering new company...");
            await spareAPI.postRegisterWalletC(walletAddress);
          }

          // Fetch both user and company information again after registration
          const [updatedUserResponse, updatedCompanyResponse] =
            await Promise.all([
              spareAPI.getFindWalletU(walletAddress),
              spareAPI.getFindWalletC(walletAddress),
            ]);

          // Update state with the newly fetched information
          setUserId(updatedUserResponse?.id || null);
          setCompanyId(updatedCompanyResponse?.id || null);
        } catch (error) {
          console.error("Error fetching or creating wallet info:", error);
        }
      };

      checkWallet();
    }
  }, [walletAddress]);

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
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
          <img src={Sparelogohd} alt="Logo" className="h-13" />
        </h1>
        <div className="ml-auto">
          <Button className="bg-emerald-600" onClick={connectWallet}>
            {walletAddress
              ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
              : "Connect Wallet"}
          </Button>
        </div>
      </div>
      {walletAddress ? (
        <Routes>
          <Route path="/" element={<Dashboard companyId={companyId} />} />
          <Route
            path="/create-survey"
            element={<CreateSurvey companyId={companyId} />}
          />
          <Route path="/survey-results/:id" element={<Results />} />
          <Route
            path="/user-dashboard"
            element={<UserDashboard userId={userId} />}
          />
          <Route
            path="/survey-complete/:id"
            element={<SurveyComplete userId={userId} />}
          />
        </Routes>
      ) : (
        <WelcomeScreen />
      )}
    </Router>
  );
}

export default App;
