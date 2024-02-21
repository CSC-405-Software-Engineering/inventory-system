import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    navigate("/student-dashboard", { replace: true });
  }, [])
  return (
    <>
    </>
  );
};

export default HomePage;
