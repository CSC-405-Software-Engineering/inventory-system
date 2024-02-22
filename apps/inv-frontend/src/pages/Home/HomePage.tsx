import AddNew from "@/components/AddNew";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    navigate("/student-dashboard", { replace: true });
  }, [])
  return (
    <>
      <AddNew />
    </>
  );
};

export default HomePage;
