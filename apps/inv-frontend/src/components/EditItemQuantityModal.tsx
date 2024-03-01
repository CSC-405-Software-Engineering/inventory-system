import {  Modal } from "flowbite-react";

interface EditItemQuantityModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const EditItemQuantityModal = ({
  openModal,
  setOpenModal,
}: EditItemQuantityModalProps) => {


  return (
    <>
      <Modal
        dismissible
        size={"2xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}

      >
        <Modal.Header className=" text-[#1C274C] text-2xl font-semibold flex justify-center items-center w-full">
          Quantity Settings{" "}
        </Modal.Header>
        <Modal.Body className="py-0 overflow-y-visible">
        <form>
      <div className="px-6 w-full">

          <div className="mt-10 flex w-full flex-col gap-y-8">

            <div className="flex w-full">
              <label htmlFor="max-quantity" className="w-[10rem] text-sm font-medium leading-6 text-gray-900">
                Max. Quantity
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name="max-quantity"
                  id="max-quantity"
                  autoComplete="max-quantity"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex w-full">
              <label htmlFor="min-quantity" className="block text-sm w-[10rem] font-medium leading-6 text-gray-900">
                Min. Quantity
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name="min-quantity"
                  id="min-quantity"
                  autoComplete="min-quantity"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex w-full justify-between">
              <label htmlFor="unit" className="text-sm w-[10rem] font-medium leading-6 text-gray-900">
                Unit
              </label>
              <div className="w-full">
                <select
                  id="unit"
                  name="unit"
                  autoComplete="unit"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                >
                  <option>kg</option>
                  <option>g</option>
                  <option>Sachets</option>
                  <option>Bags</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-center">
          <div className="flex ">
            <button
              className="  bg-white text-red-500 hover:bg-slate-50 border border-solid border-black rounded-md hover:border-transparent hover:text-red px-20 mr-5 p-2"
            >
              Cancel
            </button>
            <button
              className=" bg-red-800 text-white hover:bg-red-600 border-style:solid rounded-md border-color:rgb(0 0 0) ml-5 hover:text-white px-20 "
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default EditItemQuantityModal;
