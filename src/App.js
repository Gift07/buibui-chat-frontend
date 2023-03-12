import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import SignIn from "./Pages/Auth/signIn";
import SignUp from "./Pages/Auth/signUp";

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* authentication routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
