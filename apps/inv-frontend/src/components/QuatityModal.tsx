import { Button, Modal } from "flowbite-react";
import Picture from "@/assets/Picture1.png";

interface QuatityModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const QuatityModal = ({
  openModal,
  setOpenModal,
}: QuatityModalProps) => {
  

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Spinach</Modal.Header>
        <Modal.Body>
          <div className="flex flex-row space-x-20 gap-2">
          <div className="space-y-6">
          <img width={"159px"} height={"157px"} src={Picture} alt="my Image" /> 
          </div>
          <div > Quantity
          <div className="max-w-xs mx-auto">
      <div className="relative flex items-center">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
          </svg>
        </button>
        <input
          type="text"
          id="counter-input"
          data-input-counter
          className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
          placeholder=""
          value="12"
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
          </svg>
        </button>
      </div>
    </div>
          <div className="mt-5">
          <Button color="red" onClick={() => setOpenModal(false)}>Update</Button>
          </div> 
          </div>
          </div>
        </Modal.Body>
       
      </Modal>
      
    </>
  );
};

export default QuatityModal;
