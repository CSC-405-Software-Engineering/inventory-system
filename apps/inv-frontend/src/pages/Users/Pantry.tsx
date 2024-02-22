import DashboardLayout from "@/components/DashboardLayout";

import QuatityModal from "@/components/QuatityModal";
import { useState } from "react";

const Pantry = () => {
  const [openQuatityModal, setOpenQuatityModal] = useState(false);

  const handleQuatityModal = () => {
    setOpenQuatityModal(true);
  };

  return (
    <DashboardLayout>
      <>
      <div>Pantry</div>

      <button onClick={handleQuatityModal}>click me</button>
      <QuatityModal
        openModal={openQuatityModal}
        setOpenModal={setOpenQuatityModal}
      />

    </DashboardLayout>
  );
};

export default Pantry;
