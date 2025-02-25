import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import WelcomeMassage from "../pages/WelcomeMassage/WelcomeMassage";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeMassage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
