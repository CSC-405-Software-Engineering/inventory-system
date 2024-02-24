import {  Modal } from "flowbite-react";

interface AddItemErrorModalProps {
  openModal: boolean;
  setOpenModal: any;
  message: string;
}

const AddItemErrorModal = ({
  openModal,
  setOpenModal,
  message
}: AddItemErrorModalProps) => {
  return (
    <>
    
      <Modal size={"sm"} dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header className="border-none pb-0"></Modal.Header>
        <Modal.Body  className="pt-0">
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/add-item-error-icon.svg"/>
            <div className="flex flex-col gap-4">
              <p className="font-bold text-sm text-custom-primary-1">Oops!</p>
              <p className="font-semibold text-xs text-black">{message}</p>
              
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemErrorModal;
