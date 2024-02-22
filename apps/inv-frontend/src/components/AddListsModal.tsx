import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface AddListsModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const AddListsModal = ({ openModal, setOpenModal }: AddListsModalProps) => {
  const [, setOpenStatusModal] = useState(false);

  const handleAddLists = () => {
    setOpenModal(false);
    setOpenStatusModal(true);
  };
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
        <Modal.Body className="py-0 overflow-y-visible">
          <div className="relative h-[14rem] rounded-[0.3125rem] overflow-hidden">
            <div className="self-stretch h-[281px] flex-col justify-start items-start gap-[25px] flex p-4">
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
                <div className="grow shrink basis-0 h-[74px] justify-start items-start gap-5 flex">
                  <div className="w-16 h-16 p-4 bg-gray-100 rounded-[200px] justify-center items-center flex">
                    <div className="w-8 h-8 relative flex-col justify-start items-start flex"></div>
                  </div>
                    <div className="self-stretch h-[74px] px-6 py-4 bg-white rounded-xl border border-gray-200 flex-col justify-start items-center gap-1 flex">
                      <div className="self-stretch h-[42px] flex-col justify-start items-center gap-3 flex">
                        <div className="self-stretch h-[42px] flex-col justify-start items-center gap-1 flex">
                          <div className="self-stretch justify-center items-start gap-1 inline-flex">
                            <div className="justify-center items-center gap-2 flex">
                              <div className="text-red-500 text-sm font-semibold leading-tight">
                                Click to upload
                              </div>
                            </div>
                            <div className="text-slate-600 text-sm font-normalleading-tight">
                              or drag and drop
                            </div>
                          </div>
                          <div className="self-stretch text-center text-slate-600 text-xs font-normal font-['Inter'] leading-[18px]">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="self-stretch h-11 justify-start items-start gap-8 inline-flex">
                <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                  Category*
                </div>
                <div className="grow shrink basis-0 h-11 flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="text-gray-900 text-base font-medium font-['Inter'] leading-normal">
                        Vegetables
                      </div>
                    </div>
                    <div className="w-5 h-5 relative"></div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-11 justify-start items-start gap-8 inline-flex">
                <div className="w-40 text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                  Location*
                </div>
                <div className="grow shrink basis-0 h-11 flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="w-[15px] h-[15px] relative"></div>
                      <div className="text-gray-900 text-base font-medium font-['Inter'] leading-normal">
                        Refrigerated
                      </div>
                    </div>
                    <div className="w-5 h-5 relative"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-[121px] inline-flex">
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
                  <div className="w-[134px] py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="grow shrink basis-0 text-center">
                        <span className="text-gray-900 text-base font-normal font-['Inter'] leading-normal">
                          31{" "}
                        </span>
                        <span className="text-gray-300 text-base font-normal font-['Inter'] leading-normal">
                          /
                        </span>
                        <span className="text-gray-900 text-base font-normal font-['Inter'] leading-normal">
                          {" "}
                          12
                        </span>
                        <span className="text-gray-300 text-base font-normal font-['Inter'] leading-normal">
                          {" "}
                          /{" "}
                        </span>
                        <span className="text-gray-900 text-base font-normal font-['Inter'] leading-normal">
                          2024
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[70px] justify-start items-start gap-1.5 flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                    Cost of item*
                  </div>
                  <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="grow shrink basis-0 text-gray-900 text-base font-normal font-['Inter'] leading-normal">
                        0000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[100px] pt-8 border-black flex-col justify-start items-start flex">
              <div className="self-stretch px-6 pb-6 justify-start items-start gap-3 inline-flex">
                <div className="grow shrink basis-0 h-11 px-[18px] py-2.5 flex"></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex border-0 justify-center">
          <Button
            className=" bg-white text-slate-700 text-base font-semibold leading-normal w-60 border-gray-300"
            onClick={handleAddLists}
          >
            Cancel
          </Button>
          <Button
            className=" bg-red-800 text-white text-base font-semibold leading-normal w-60"
            onClick={handleAddLists}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddListsModal;
