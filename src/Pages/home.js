import { Navigate } from "react-router-dom";

const Home = () => {
  const access = localStorage.getItem("access");

  if (access === null) return <Navigate to="/sign-in" />;
  return <div>Home</div>;
};

export default Home;
