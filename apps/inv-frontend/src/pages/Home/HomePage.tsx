import MetaTags from "@/components/MetaTags";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, []);
  return (
    <>
      <MetaTags pageUrl={window.location.href} />
    </>
  );
};

export default HomePage;
