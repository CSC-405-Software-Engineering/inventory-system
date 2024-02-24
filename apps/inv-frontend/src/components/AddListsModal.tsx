import { AddProductSchema } from "@/utils/Yup";
import { Modal, Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { AddProductProps } from "@/store/interfaces/user.interface";
import {
  useAddStockMutation,
  useGetInventoryQuery,
} from "@/store/slices/appSlice";
import ButtonSpinner from "./ButtonSpinner";
import AddItemSuccessModal from "./AddItemSuccessModal";
import AddItemErrorModal from "./AddItemErrorModal";

interface AddListsModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const AddListsModal = ({ openModal, setOpenModal }: AddListsModalProps) => {
  const [isAddStockLoading, setIsAddStockLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatussModal, setOpenStatussModal] = useState(false);

  const { data: inventoryItems }: any = useGetInventoryQuery();

  const [addStock, { error: addStockError, isError: addStockIsError }]: any =
    useAddStockMutation();

  const scrollToTarget = () => {
    const targetElement = document.getElementById("error-alert");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddProduct = useCallback(
    async (props: AddProductProps) => {
      setIsAddStockLoading(true);

      try {
        const { unit, ...updatedProps } = props;

        const response = await addStock(updatedProps);

        if (response?.data) {
          setOpenStatusModal(true);
        }

        if (response?.error) {
          scrollToTarget();
          setOpenStatussModal(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsAddStockLoading(false);
      }
    },
    [
      addStock,
      setIsAddStockLoading,
      setOpenModal,
      setOpenStatusModal,
      setOpenStatussModal,
    ]
  );

  return (
    <>
      <Modal
        dismissible
        size={"2xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="text-[#1C274C] text-[1.7rem] font-semibold flex justify-center items-center w-full">
          Add Items{" "}
        </Modal.Header>

        <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
          {/* <div className="flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] p-8"> */}
          <Formik
            initialValues={{
              name: "",
              imageURL: "",
              inventoryId: "",
              location: "",
              minStock: 0,
              maxStock: 0,
              unit: "",
              quantity: 0,
              expirationDate: "",
              unitPrice: 0,
            }}
            validationSchema={AddProductSchema}
            onSubmit={handleAddProduct}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="flex w-full flex-col gap-7 overflow-auto">
                {addStockIsError && (
                  <Alert color="failure" className="py-3">
                    <span className="font-medium" id="error-alert">
                      {addStockError && addStockError?.data?.message}
                    </span>
                  </Alert>
                )}

                <div className=" flex-col justify-start items-start gap-6 flex">
                  <div className="w-full flex-col gap-3 md:gap-0 md:flex-row  flex">
                    <div className="w-40 text-slate-700 text-sm font-medium leading-tight">
                      Item name*
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        id="item_name"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                        placeholder="e.g Cabbage"
                        onChange={(e) => setFieldValue("name", e.target.value)}
                        required
                      />
                      {errors && errors.name && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Image Input Box */}
                  <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                    <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                      Image of item*
                    </div>
                    <div className="gap-5 flex items-center w-full flex-row">
                      <img
                        src={values?.imageURL || ""}
                        className="w-18 h-14 border  bg-gray-100 rounded-full justify-center items-center flex"
                      />
                      <div className="w-full">
                        <input
                          type="text"
                          id="item_image"
                          className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                          placeholder="e.g. https://imagestock.com/banana.png"
                          onChange={(e) =>
                            setFieldValue("imageURL", e.target.value)
                          }
                          required
                        />
                        {errors && errors.imageURL && (
                          <p className="text-[12px] mt-1 text-custom-danger">
                            {errors.imageURL}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div className=" w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                    <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                      Category*
                    </div>
                    <div className="flex flex-col w-full">
                      <select
                        // defaultValue={selectedLocationOption}
                        className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                        onChange={(e) =>
                          setFieldValue("inventoryId", e.target.value)
                        }
                      >
                        {inventoryItems?.data
                          ?.slice() // Create a shallow copy of the array
                          .sort((a: any, b: any) =>
                            a.name.localeCompare(b.name)
                          ) // Sort alphabetically
                          .map((inventoryItem: any) => (
                            <option
                              key={inventoryItem.id}
                              value={inventoryItem.id}
                            >
                              {inventoryItem.name}
                            </option>
                          ))}
                      </select>
                      {errors && errors.inventoryId && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.inventoryId}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location Dropdown */}
                  <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                    <div className="w-40 text-slate-700 text-sm font-medium leading-tight">
                      Location*
                    </div>
                    <div className="flex flex-col w-full">
                      <select
                        className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                        onChange={(e) =>
                          setFieldValue("location", e.target.value)
                        }
                      >
                        {/* Extract unique locations from inventory items */}
                        {inventoryItems?.data
                          ?.flatMap((item: any) => item.stocks || [])
                          .reduce((locations: any, stock: any) => {
                            if (!locations.includes(stock.location)) {
                              locations.push(stock.location);
                            }
                            return locations;
                          }, [])
                          ?.slice() // Create a shallow copy of the array
                          .sort((a: any, b: any) => a.localeCompare(b))
                          .map((location: any) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                      </select>
                      {errors && errors.location && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="justify-between w-full flex-col gap-3 md:gap-0 md:flex-row items-start flex">
                    {/* Quantity Input Box */}
                    {/* <div className="justify-start items-start gap-1.5 flex"> */}
                    <div className="flex flex-col w-full justify-between items-start gap-1.5">
                      <label
                        htmlFor="quantity"
                        className="text-slate-700 text-sm font-medium leading-tight"
                      >
                        Quantity*
                      </label>
                      <div className="relative flex items-center">
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              "quantity",
                              Math.max(0, values.quantity - 1)
                            )
                          }
                          className=" focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          className="flex text-gray-900 border-0 max-w-20  text-sm font-normal focus:outline-none focus:ring-0  w-full text-center justify-center items-center"
                          placeholder=""
                          value={values.quantity}
                          required
                          disabled
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue("quantity", values.quantity + 1)
                          }
                          className="  focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      {errors && errors.quantity && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.quantity}
                        </p>
                      )}
                    </div>

                    {/* </div> */}

                    {/* Best Before Date Input Box */}
                    <div className=" flex-col justify-start w-full items-start gap-1.5 inline-flex">
                      <div className="text-slate-700 text-sm font-medium  leading-tight">
                        Use before*
                      </div>

                      <div className="relative w-full md:max-w-sm">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <input
                          onChange={(e) =>
                            setFieldValue("expirationDate", e.target.value)
                          }
                          datepicker-orientation="top"
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block w-full ps-10 p-2.5  "
                          placeholder="Select date"
                        />
                      </div>
                      {errors && errors.expirationDate && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.expirationDate}
                        </p>
                      )}
                    </div>

                    {/* unitPrice Input Box */}
                    <div className="w-full flex-col  md:items-end gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium   leading-tight">
                        Cost of item*
                      </div>
                      <input
                        type="number"
                        id="item_cost"
                        className="bg-gray-50 border w-full md:max-w-32 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                        placeholder="₦ 000"
                        required
                        onChange={(e) =>
                          setFieldValue(
                            "unitPrice",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      {errors && errors.unitPrice && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.unitPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="justify-between w-full flex-col gap-3 md:gap-0 md:flex-row items-start flex">
                    <div className="w-full flex-col  gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium   leading-tight">
                        Min Quantity*
                      </div>
                      <input
                        type="number"
                        id="item_min"
                        className="bg-gray-50 border w-full md:max-w-32 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                        placeholder="0"
                        required
                        onChange={(e) =>
                          setFieldValue(
                            "minStock",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      {errors && errors.minStock && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.minStock}
                        </p>
                      )}
                    </div>
                    <div className="w-full flex-col  gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium  leading-tight">
                        Max Quantity*
                      </div>
                      <input
                        type="number"
                        id="item_max"
                        className="bg-gray-50 border w-full md:max-w-32 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                        placeholder="0"
                        required
                        onChange={(e) =>
                          setFieldValue(
                            "maxStock",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      {errors && errors.maxStock && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.maxStock}
                        </p>
                      )}
                    </div>

                    {/* unitPrice Input Box */}
                    <div className="w-full flex-col  md:items-end gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium   leading-tight">
                        Unit*
                      </div>

                      <select
                        className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full md:max-w-32 items-center"
                        onChange={(e) => setFieldValue("unit", e.target.value)}
                      >
                        <option key={"unit"} value={"unit"}>
                          {"unit"}
                        </option>
                        <option key={"kg"} value={"kg"}>
                          {"kg"}
                        </option>
                      </select>

                      {errors && errors.unit && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.unit}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" flex border-0 justify-between w-full ">
                  <button
                    className={` font-semibold rounded-[0.5125rem] text-custom-primary-1 w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-white hover:border border-3 hover:border-custom-primary-1 hover:text-custom-primary-1`}
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${
                      isAddStockLoading ? "bg-white" : "bg-custom-primary-1"
                    }  ${
                      isAddStockLoading
                        ? "border-custom-primary-1"
                        : "border-white"
                    }  font-semibold rounded-[0.5125rem]  text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-[#bd565a] hover:border border-3 hover:border-white hover:text-white`}
                    // onClick={() => handleAddProduct(values)}
                    disabled={isAddStockLoading}
                    type="submit"
                  >
                    {isAddStockLoading ? <ButtonSpinner /> : "Add"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* </div> */}
        </Modal.Body>
        <AddItemSuccessModal
          openModal={openStatusModal}
          setOpenModal={setOpenStatusModal}
          setOpenParentModal={setOpenModal}
          message={"You have successfully added this stock to the inventory."}
        />
        <AddItemErrorModal
          openModal={openStatussModal}
          setOpenModal={setOpenStatussModal}
          message={"An error was encountered while adding this item."}
        />
      </Modal>
    </>
  );
};

export default AddListsModal;
