import { AddProductSchema } from "@/utils/Yup";
import { generateRandomPassword } from "@/utils/constant";
import {
  Button,
  Dropdown,
  DropdownItem,
  Modal,
  Datepicker,
  Alert,
} from "flowbite-react";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Form } from "react-router-dom";
import { loadUser } from "@/store/slices/authSlice";
import ButtonSpinner from "./ButtonSpinner";
import { AddProductProps, LoginProps } from "@/store/interfaces/user.interface";
import { useAddStockMutation } from "@/store/slices/appSlice";
import { useDispatch } from "react-redux";

interface AddListsModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const AddListsModal = ({ openModal, setOpenModal }: AddListsModalProps) => {
  const [, setOpenStatusModal] = useState(false);
  const [isAddStockLoading, setIsAddStockLoading] = useState(false);
  const dispatch = useDispatch<any>();

  const handleAddLists = () => {
    setOpenModal(false);
    setOpenStatusModal(true);
  };

  // const [selectedCategoryOption, setSelectedOption] = useState("Select a Category");
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState("Select a Category");
  const [selectedLocationOption, setSelectedLocationOption] =
    useState("Select a Location");

  const [addStock, { error: addStockError, isError: addStockIsError }]: any =
    useAddStockMutation();

  const handleAddProduct = useCallback(
    async (props: AddProductProps) => {
      try {
        setIsAddStockLoading(true);
        const response = await addStock(props);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setIsAddStockLoading(false);
    },
    [dispatch, addStock]
  );

  const decrementButton = document.getElementById("decrement-button");
  const incrementButton = document.getElementById("increment-button");

  // Get the input element
  // const counterInput = document.getElementById('counter-input');

  // // Add click event listeners to the buttons
  // if (decrementButton) {
  //   decrementButton.addEventListener("click", () => {
  //     // Get the input element
  //     const counterInput = document.getElementById(
  //       "counter-input"
  //     ) as HTMLInputElement;
  //     if (counterInput) {
  //       // Parse the current value of the input element as an integer
  //       let currentValue = parseInt(counterInput.value);
  //       // Decrement the value if it's greater than 0
  //       if (currentValue > 0) {
  //         counterInput.value = (currentValue - 1).toString();
  //       }
  //     }
  //   });
  // }

  // if (incrementButton) {
  //   incrementButton.addEventListener("click", () => {
  //     // Get the input element
  //     const counterInput = document.getElementById(
  //       "counter-input"
  //     ) as HTMLInputElement;
  //     if (counterInput) {
  //       // Parse the current value of the input element as an integer
  //       let currentValue = parseInt(counterInput.value);
  //       // Increment the value
  //       counterInput.value = (currentValue + 1).toString();
  //     }
  //   });
  // }

  return (
    <Modal
      dismissible
      size={"2xl"}
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header className="text-[#1C274C] text-[1.7rem] font-semibold flex justify-center items-center w-full">
        Add Items{" "}
      </Modal.Header>
      {/* <Modal.Body className="py-0 overflow-y-visible">
          <div className="  flex-col justify-start items-start gap-[25px] flex p-4">
            <div className="justify-center items-start gap-8 flex">
              <div className="w-40 text-slate-700 text-sm font-medium leading-tight">
                Item name*
              </div>
              <div>
                <input
                  type="text"
                  id="item_name"
                  className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g Cabbage"
                  required
                />
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-8 inline-flex">
              <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                Image of item*
              </div>
              <div className="grow shrink basis-0 h-[74px] justify-start gap-5 flex items-center flex-row">
                <div className="w-16 h-16 p-9 bg-gray-100 rounded-[200px] justify-center items-center flex"></div>
                <input
                  type="text"
                  id="item_name"
                  className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g. https://imagestock.com/banana.png"
                  required
                />
                          
              </div>
            </div>
            <div className="self-stretch h-11 justify-start items-start gap-8 inline-flex">
              <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                Category*
              </div>
              <Dropdown color="gray" label={selectedCategoryOption}>
                <DropdownItem
                  onClick={() => setSelectedCategoryOption("Vegetables")}
                >
                  Vegetables
                </DropdownItem>
                <DropdownItem
                  onClick={() => setSelectedCategoryOption("Meat & Poultry")}
                >
                  Meat & Poultry
                </DropdownItem>
                <DropdownItem
                  onClick={() => setSelectedCategoryOption("Dairy")}
                >
                  Dairy
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedCategoryOption("Fish")}>
                  Fish
                </DropdownItem>
                <DropdownItem
                  onClick={() => setSelectedCategoryOption("Fruit")}
                >
                  Fruit
                </DropdownItem>
                <DropdownItem
                  onClick={() => setSelectedCategoryOption("Grain")}
                >
                  Grain
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedCategoryOption("Eggs")}>
                  Eggs
                </DropdownItem>
                <DropdownItem
                  onClick={() => setSelectedCategoryOption("Legumes")}
                >
                  Legumes
                </DropdownItem>
              </Dropdown>
            </div>
            <div className="self-stretch h-11 justify-start items-start gap-8 inline-flex">
              <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                Location*
              </div>
              <Dropdown color="gray" label={selectedLocationOption}>
                <DropdownItem
                  onClick={() => setSelectedLocationOption("Refrigerator")}
                >
                  Refrigerator
                </DropdownItem>
                <DropdownItem
                  onClick={() => setSelectedLocationOption("Freezer")}
                >
                  Freezer
                </DropdownItem>
                <DropdownItem
                  onClick={() => setSelectedLocationOption("Dry Pantry")}
                >
                  Dry Pantry
                </DropdownItem>
              </Dropdown>
            </div>
            <div className="justify-between w-full items-start inline-flex">
              <div className="justify-start items-start gap-1.5 flex">
                <div className="w-[107px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                    Quantity*
                  </div>
                  <div className="px-3 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-[23px] inline-flex">
                    <div className="w-3 h-[15px] relative"></div>
                    <div className="justify-start items-center gap-2 flex">
                      <div className="text-center text-gray-900 text-sm font-medium font-['Inter'] leading-normal">
                        0
                      </div>
                    </div>
                    <div className="w-[15px] h-[15px] relative"></div>
                  </div>
                </div>
              </div>
              <div className="h-[70px] justify-start items-start gap-1.5 flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                    Use before*
                  </div>

                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      datepicker-orientation="top"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                </div>
              </div>
              <div className="h-[70px] justify-start items-start gap-1.5 flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                    Cost of item*
                  </div>
                  <div>
                    <input
                      type="text"
                      id="item_name"
                      className="bg-gray-50 border w-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="000"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body> */}
      <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
        {/* <div className="flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] p-8"> */}
        <Formik
          initialValues={{
            name: "",
            image: "",
            category: "",
            location: "",
            quantity: 0,
            bestbefore: "",
            price: 0,
          }}
          validationSchema={AddProductSchema}
          onSubmit={(values) => {
            handleAddProduct(values);
          }}
        >
          {({ errors, setFieldValue }) => (
            <form className="">
              {addStockIsError && (
                <Alert color="failure" className="py-3">
                  <span className="font-medium">
                    {addStockError && addStockError?.data?.error?.message}
                  </span>
                </Alert>
              )}

              <div className="  flex-col justify-start items-start gap-[25px] flex">
                <div className="justify-center items-center gap-8 flex">
                  <div className="w-40 text-slate-700 text-sm font-medium leading-tight">
                    Item name*
                  </div>
                  <div>
                    <input
                      type="text"
                      id="item_name"
                      className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="self-stretch justify-start items-center gap-8 inline-flex">
                  <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                    Image of item*
                  </div>
                  <div className="grow shrink basis-0 h-[74px] justify-start gap-5 flex items-center flex-row">
                    <div className="w-16 h-16 p-9 bg-gray-100 rounded-[200px] justify-center items-center flex"></div>
                    <div>
                      <input
                        type="text"
                        id="item_name"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. https://imagestock.com/banana.png"
                        onChange={(e) => setFieldValue("image", e.target.value)}
                        required
                      />
                      {errors && errors.image && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.image}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Dropdown */}
                <div className="self-stretch h-11 justify-start items-center gap-8 inline-flex">
                  <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                    Category*
                  </div>
                  <div>
                    <select
                      // defaultValue={selectedLocationOption}
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] self-stretch gap-2 items-center"
                      onChange={(e) =>
                        setFieldValue("category", e.target.value)
                      }
                    >
                      <option value="Vegetables">Vegetables</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Meat & Poultry">Meat & Poultry</option>
                      <option value="Fish">Fish</option>
                      <option value="Fruit">Fruit</option>
                      <option value="Grain">Grain</option>
                      <option value="Legumes">Legumes</option>
                    </select>
                    {errors && errors.category && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location Dropdown */}
                <div className="self-stretch h-11 justify-start items-center gap-8 inline-flex ">
                  <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                    Location*
                  </div>
                  <div>
                    <select
                      // defaultValue={selectedLocationOption}
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] self-stretch gap-2 items-center"
                      onChange={(e) =>
                        setFieldValue("location", e.target.value)
                      }
                    >
                      <option value="admin">Refrigerator</option>
                      <option value="user">Freezer</option>
                      <option value="user">Dry Pantry</option>
                    </select>
                    {errors && errors.location && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="justify-between w-full items-start flex">
                  {/* Quantity Input Box */}
                  {/* <div className="justify-start items-start gap-1.5 flex"> */}
                  <div className=" flex-col justify-between items-start gap-1.5 inline-flex">
                    <div className="text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                      Quantity*
                    </div>

                    <form className="max-w-xs mx-auto">
                      <div className="relative flex items-center">
                        <button
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="counter-input"
                          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input"
                          data-input-counter
                          className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                          placeholder=""
                          value="0"
                          required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="counter-input"
                          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                  {errors && errors.quantity && (
                    <p className="text-[12px] mt-1 text-custom-danger">
                      {errors.quantity}
                    </p>
                  )}
                  {/* </div> */}

                  {/* Best Before Date Input Box */}
                  <div className=" flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                      Use before*
                    </div>

                    <div className="relative max-w-sm">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                          setFieldValue("bestbefore", e.target.value)
                        }
                        datepicker-orientation="top"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                    {errors && errors.bestbefore && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.bestbefore}
                      </p>
                    )}
                  </div>

                  {/* Price Input Box */}
                  <div className="h-[70px] justify-start items-start gap-1.5 flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                        Cost of item*
                      </div>
                      <div>
                        <input
                          type="text"
                          id="item_name"
                          className="bg-gray-50 border w-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="₦ 000"
                          required
                        />
                      </div>
                      {errors && errors.price && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex border-0 justify-between w-full pt-7">
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
                  type="submit"
                  disabled={isAddStockLoading}
                >
                  Add
                </button>
              </div>
            </form>
          )}
        </Formik>
        {/* </div> */}
      </Modal.Body>
    </Modal>
  );
};

export default AddListsModal;
