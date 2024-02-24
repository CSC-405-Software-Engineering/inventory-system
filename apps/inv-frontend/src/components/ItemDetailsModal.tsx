import { Modal, Alert } from "flowbite-react";
import { useCallback, useState } from "react";
import {
  useGetStockQuery,
  useRemoveStockMutation,
} from "@/store/slices/appSlice";
import ButtonSpinner from "./ButtonSpinner";
import EditListsModal from "./EditListsModal";
import AddItemErrorModal from "./AddItemErrorModal";
import AddItemSuccessModal from "./AddItemSuccessModal";
import PageLoader from "./PageLoader";

interface ItemDetailsModalProps {
  openModal: boolean;
  setOpenModal: any;
  stockId: string;
  inventoryName: string;
}

const ItemDetailsModal = ({
  openModal,
  setOpenModal,
  stockId,
  inventoryName,
}: ItemDetailsModalProps) => {
  const [isRemoveStockLoading, setIsRemoveStockLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatussModal, setOpenStatussModal] = useState(false);
  const [openEditItemModal, setOpenEditItemModal] = useState(false);

  const [
    removeStock,
    {
      error: removeStockError,
      isError: removeStockIsError,
    },
  ]: any = useRemoveStockMutation();

  const { data: stockItems }: any =
    useGetStockQuery();

    const desiredStock = stockItems?.data?.find((stock:any) => stock.id === stockId);


  const handleEditProduct = () => {
    setOpenEditItemModal(true);
  };

  const handleRemoveProduct = useCallback(async () => {
    setIsRemoveStockLoading(true);

    try {
      const response = await removeStock(desiredStock.id);

      if (response?.data) {
        setOpenStatusModal(true);
      }

      if (response?.error) {
        setOpenStatussModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRemoveStockLoading(false);
    }
  }, [
    removeStock,
    setIsRemoveStockLoading,
    setOpenModal,
    setOpenStatusModal,
    setOpenStatussModal,
  ]);

  return (
    <>
      <Modal
        dismissible
        size={"2xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="text-[#1C274C] text-[1.7rem] font-semibold flex justify-center items-center w-full">
          Item Details{" "}
        </Modal.Header>
        {!desiredStock ? (
            <PageLoader />
          ) : (
        <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
          
            <div className="flex w-full flex-col gap-7 overflow-auto">
              {removeStockIsError && (
                <Alert color="failure" className="py-3">
                  <span className="font-medium" id="error-alert">
                    {removeStockError && removeStockError?.data?.message}
                  </span>
                </Alert>
              )}

              <div className=" flex-col justify-start items-start gap-4 flex">
                <div className="flex w-full items-center flex-col gap-3">
                  <img
                    className="w-20 h-20 rounded-lg"
                    src={desiredStock.imageURL}
                  />
                  <p className="font-semibold text-xl">{desiredStock.name}</p>
                </div>

                {/* Category Dropdown */}
                <div className=" w-full flex ">
                  <div className="w-40 text-slate-700 text-base font-medium  leading-tight">
                    Category
                  </div>
                  <p className="text-base">{inventoryName}</p>
                </div>

                {/* Location Dropdown */}
                <div className="w-full flex">
                  <div className="w-40 text-slate-700 text-base font-medium leading-tight">
                    Location
                  </div>
                  <p className="text-base">{desiredStock.location}</p>
                </div>

                  {/* Quantity Input Box */}
                  {/* <div className="justify-start items-start gap-1.5 flex"> */}
                  <div className="flex w-full ">
                    <label
                      htmlFor="quantity"
                      className="w-40 text-slate-700 text-base font-medium leading-tight"
                    >
                      Quantity
                    </label>
                    <p className="text-base">{desiredStock.quantity}</p>
                  </div>

                  {/* </div> */}

                  {/* Best Before Date Input Box */}
                  <div className="w-full flex">
                    <div className="w-40 text-slate-700 text-base font-medium  leading-tight">
                      Use before
                    </div>

                    <p className="text-base">{new Date(desiredStock.expirationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>

                  {/* unitPrice Input Box */}
                  <div className="w-full flex">
                    <div className="w-40 text-slate-700 text-base font-medium   leading-tight">
                      Cost of item
                    </div>
                    <p className="text-base">{desiredStock.unitPrice}</p>
                  </div>

                  <div className="w-full flex">
                    <div className="w-40 text-slate-700 text-base font-medium   leading-tight">
                      Min Quantity
                    </div>
                    <p className="text-base">{desiredStock.minStock}</p>
                  </div>
                  <div className="w-full flex">
                    <div className="w-40 text-slate-700 text-base font-medium  leading-tight">
                      Max Quantity
                    </div>
                    <p className="text-base">{desiredStock.maxStock}</p>
                  </div>
              </div>

              <div className=" flex border-0 justify-between w-full ">
                <button
                  className={`${
                    isRemoveStockLoading ? "bg-custom-primary-1" : "bg-white"
                  }  ${
                    isRemoveStockLoading
                      ? "border-white"
                      : "border-custom-primary-1"
                  }  font-semibold rounded-[0.5125rem]  text-custom-primary-1 w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-white hover:border  border-3 hover:border-custom-primary-1 hover:text-custom-primary-1`}
                  disabled={isRemoveStockLoading}
                  onClick={handleRemoveProduct}
                >
                  {isRemoveStockLoading ? <ButtonSpinner /> : "Delete"}
                </button>
                <button
                  className={`bg-custom-primary-1 font-semibold rounded-[0.5125rem] text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-[#bd565a] border-custom-primary-1 hover:border border-3 hover:border-white hover:text-white`}
                  onClick={handleEditProduct}
                >
                  Edit
                </button>
              </div>
            </div>
        </Modal.Body>
          )}

        <EditListsModal
          openModal={openEditItemModal}
          setOpenModal={setOpenEditItemModal}
          setOpenParentModal={setOpenModal}
          stockId={stockId}
          inventoryName={inventoryName}
        />
        <AddItemSuccessModal
          openModal={openStatusModal}
          setOpenModal={setOpenStatusModal}
          setOpenParentModal={setOpenModal}
          message={"You have deleted this stock from the inventory."}
        />
        <AddItemErrorModal
          openModal={openStatussModal}
          setOpenModal={setOpenStatussModal}
          message={"An error was encountered while deleting this item."}
        />
      </Modal>
    </>
  );
};

export default ItemDetailsModal;
