import DashboardLayout from "@/components/DashboardLayout";
import EnrollCourseModal from "@/components/EditItemQuantityModal";
import { useState } from "react";

const Pantry = () => {

  const [openModal, setOpenModal] = useState(false);

  const handleEditItemQuantity = () => {
    setOpenModal(true);
  };

  return (
    <DashboardLayout>
      <>
      <div>Pantry</div>
      <button onClick={handleEditItemQuantity}>click me</button>
      <EnrollCourseModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      </>
    </DashboardLayout>
  );
};

export default Pantry;
