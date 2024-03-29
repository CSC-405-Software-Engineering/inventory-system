import { useState, useEffect } from "react";
import AddNew from "./AddNew";
import InventoryItem from "./InventoryItem";
import AddListsModal from "./AddListsModal";

export interface InventoryItemProps {
  itemId: string;
  itemName: string;
  itemAmount: number;
  itemImage: string;
}

interface InventoryCategoryProps {
  catName: string;
  inventoryItems: InventoryItemProps[];
}

const InventoryCategory: React.FC<InventoryCategoryProps> = ({
  catName,
  inventoryItems,
}) => {
  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      // Adjust the number of items per page based on the screen width
      const screenWidth = window.innerWidth;
      let itemsPerPage = 1; // Default value
      if (screenWidth >= 768) {
        itemsPerPage = 4;
      } else if (screenWidth >= 480) {
        itemsPerPage = 2;
      }
      setItemsPerPage(itemsPerPage);
    };

    calculateItemsPerPage(); // Calculate initial items per page

    // Update items per page when the window is resized
    window.addEventListener("resize", calculateItemsPerPage);
    return () => {
      window.removeEventListener("resize", calculateItemsPerPage);
    };
  }, []);

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + itemsPerPage);
  };

  const handlePrev = () => {
    setStartIndex(startIndex - itemsPerPage);
  };

  const handleAddItem = () => {
    setOpenAddItemModal(true);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row gap-[28px] mb-6">
        <p className="text-black text-[14px] font-[600]">{catName}</p>
        <div className="flex flex-row items-center gap-2">
          <button onClick={handlePrev} disabled={startIndex === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill={startIndex === 0 ? '#808080' : "black" }
            >
              <g clipPath="url(#clip0_148_694)">
                <mask id="path-1-inside-1_148_694" fill="white">
                  <path d="M6.58621 9.28876L2.29749 5.00004L6.58619 0.711342C6.74909 0.548434 6.74909 0.285097 6.58619 0.122189C6.42328 -0.0407194 6.15994 -0.0407194 5.99703 0.122189L1.41375 4.70548C1.25084 4.86838 1.25084 5.13172 1.41375 5.29463L5.99703 9.87792C6.07828 9.95916 6.18494 10 6.29162 10C6.39828 10 6.50496 9.95916 6.58621 9.87792C6.74911 9.71501 6.74911 9.45167 6.58621 9.28876Z" />
                </mask>
                <path
                  d="M6.58621 9.28876L2.29749 5.00004L6.58619 0.711342C6.74909 0.548434 6.74909 0.285097 6.58619 0.122189C6.42328 -0.0407194 6.15994 -0.0407194 5.99703 0.122189L1.41375 4.70548C1.25084 4.86838 1.25084 5.13172 1.41375 5.29463L5.99703 9.87792C6.07828 9.95916 6.18494 10 6.29162 10C6.39828 10 6.50496 9.95916 6.58621 9.87792C6.74911 9.71501 6.74911 9.45167 6.58621 9.28876Z"
                  fill={startIndex === 0 ? '#808080' : "black" }
                />
                <path
                  d="M6.58621 9.28876L8.00042 7.87455L6.58621 9.28876ZM2.29749 5.00004L0.883272 3.58583L-0.530941 5.00004L0.883272 6.41426L2.29749 5.00004ZM6.58619 0.711342L5.17197 -0.702871V-0.702871L6.58619 0.711342ZM5.99703 0.122189L4.58282 -1.29202L5.99703 0.122189ZM1.41375 4.70548L2.82796 6.11969H2.82796L1.41375 4.70548ZM1.41375 5.29463L-0.00046742 6.70884L1.41375 5.29463ZM5.99703 9.87792L7.41125 8.4637L5.99703 9.87792ZM8.00042 7.87455L3.7117 3.58583L0.883272 6.41426L5.17199 10.703L8.00042 7.87455ZM3.7117 6.41426L8.0004 2.12556L5.17197 -0.702871L0.883272 3.58583L3.7117 6.41426ZM8.0004 2.12556C8.94436 1.1816 8.94436 -0.348068 8.0004 -1.29202L5.17197 1.5364C4.55383 0.918262 4.55383 -0.0847311 5.17197 -0.702871L8.0004 2.12556ZM8.0004 -1.29202C7.05644 -2.23598 5.52678 -2.23598 4.58282 -1.29202L7.41125 1.5364C6.79311 2.15454 5.79011 2.15454 5.17197 1.5364L8.0004 -1.29202ZM4.58282 -1.29202L-0.00046742 3.29126L2.82796 6.11969L7.41125 1.5364L4.58282 -1.29202ZM-0.00046742 3.29126C-0.944424 4.23522 -0.944424 5.76489 -0.00046742 6.70884L2.82796 3.88042C3.4461 4.49856 3.4461 5.50155 2.82796 6.11969L-0.00046742 3.29126ZM-0.00046742 6.70884L4.58282 11.2921L7.41125 8.4637L2.82796 3.88042L-0.00046742 6.70884ZM4.58282 11.2921C5.05328 11.7626 5.67484 12 6.29162 12V8C6.69504 8 7.10329 8.15574 7.41125 8.4637L4.58282 11.2921ZM6.29162 12C6.90833 12 7.52993 11.7626 8.00042 11.2921L5.17199 8.4637C5.47999 8.15571 5.88823 8 6.29162 8V12ZM8.00042 11.2921C8.94438 10.3482 8.94438 8.81851 8.00042 7.87455L5.17199 10.703C4.55385 10.0848 4.55385 9.08184 5.17199 8.4637L8.00042 11.2921Z"
                  fill={startIndex === 0 ? '#808080' : "black" }
                  mask="url(#path-1-inside-1_148_694)"
                />
              </g>
              <defs>
                <clipPath id="clip0_148_694">
                  <rect width="10" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= inventoryItems.length}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill={startIndex + itemsPerPage >= inventoryItems.length ? '#808080' : "black" }
            >
              <mask id="path-1-inside-1_146_575" fill="white">
                <path d="M0.122169 0.711246L4.41089 4.99997L0.122188 9.28867C-0.04072 9.45157 -0.04072 9.71491 0.122188 9.87782C0.285097 10.0407 0.548433 10.0407 0.711341 9.87782L5.29463 5.29453C5.45754 5.13162 5.45754 4.86829 5.29463 4.70538L0.711341 0.122092C0.630093 0.040843 0.523434 4.76837e-06 0.416755 4.76837e-06C0.310096 4.76837e-06 0.203418 0.040843 0.122169 0.122092C-0.0407395 0.285001 -0.0407395 0.548338 0.122169 0.711246Z" />
              </mask>
              <path
                d="M0.122169 0.711246L4.41089 4.99997L0.122188 9.28867C-0.04072 9.45157 -0.04072 9.71491 0.122188 9.87782C0.285097 10.0407 0.548433 10.0407 0.711341 9.87782L5.29463 5.29453C5.45754 5.13162 5.45754 4.86829 5.29463 4.70538L0.711341 0.122092C0.630093 0.040843 0.523434 4.76837e-06 0.416755 4.76837e-06C0.310096 4.76837e-06 0.203418 0.040843 0.122169 0.122092C-0.0407395 0.285001 -0.0407395 0.548338 0.122169 0.711246Z"
                fill={startIndex + itemsPerPage >= inventoryItems.length ? '#808080' : "black" }
              />
              <path
                d="M0.122169 0.711246L-1.29205 2.12546L0.122169 0.711246ZM4.41089 4.99997L5.8251 6.41418L7.23932 4.99997L5.8251 3.58575L4.41089 4.99997ZM0.122188 9.28867L1.5364 10.7029V10.7029L0.122188 9.28867ZM0.711341 9.87782L2.12556 11.292L0.711341 9.87782ZM5.29463 5.29453L3.88041 3.88032H3.88041L5.29463 5.29453ZM5.29463 4.70538L6.70884 3.29116L5.29463 4.70538ZM0.711341 0.122092L-0.702872 1.53631L0.711341 0.122092ZM-1.29205 2.12546L2.99667 6.41418L5.8251 3.58575L1.53638 -0.702968L-1.29205 2.12546ZM2.99667 3.58575L-1.29203 7.87445L1.5364 10.7029L5.8251 6.41418L2.99667 3.58575ZM-1.29203 7.87445C-2.23598 8.81841 -2.23598 10.3481 -1.29203 11.292L1.5364 8.46361C2.15454 9.08175 2.15454 10.0847 1.5364 10.7029L-1.29203 7.87445ZM-1.29203 11.292C-0.348068 12.236 1.1816 12.236 2.12556 11.292L-0.702872 8.46361C-0.0847316 7.84546 0.918262 7.84546 1.5364 8.46361L-1.29203 11.292ZM2.12556 11.292L6.70884 6.70875L3.88041 3.88032L-0.702872 8.46361L2.12556 11.292ZM6.70884 6.70875C7.6528 5.76479 7.6528 4.23512 6.70884 3.29116L3.88041 6.11959C3.26227 5.50145 3.26227 4.49846 3.88041 3.88032L6.70884 6.70875ZM6.70884 3.29116L2.12556 -1.29212L-0.702872 1.53631L3.88041 6.11959L6.70884 3.29116ZM2.12556 -1.29212C1.6551 -1.76258 1.03353 -2 0.416755 -2L0.416755 2C0.0133324 2 -0.394912 1.84427 -0.702872 1.53631L2.12556 -1.29212ZM0.416755 -2C-0.199954 -2 -0.821552 -1.76261 -1.29205 -1.29212L1.53638 1.53631C1.22839 1.8443 0.820146 2 0.416755 2L0.416755 -2ZM-1.29205 -1.29212C-2.236 -0.348165 -2.236 1.1815 -1.29205 2.12546L1.53638 -0.702968C2.15452 -0.0848274 2.15452 0.918165 1.53638 1.53631L-1.29205 -1.29212Z"
                fill={startIndex + itemsPerPage >= inventoryItems.length ? '#808080' : "black" }
                mask="url(#path-1-inside-1_146_575)"
              />
            </svg>
          </button>
        </div>
      </div>
     
      <div className="flex flex-row w-full gap-4">
        <AddNew inventoryName={catName} onClick={handleAddItem} />
        <div
          className="flex justify-start flex-row gap-4"
        >
          {inventoryItems
            ?.slice(startIndex, startIndex + itemsPerPage)
            .map((item, index) => (
              <InventoryItem
                key={index} // Using the index as a key, consider using a more stable ID if available
                items={[
                  {
                    itemName: item.itemName,
                    itemAmount: item.itemAmount,
                    itemImage: item.itemImage,
                    itemId: item.itemId,
                  },
                ]}
                inventoryName={catName}
              />
            ))}
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      </div>
      <AddListsModal
        openModal={openAddItemModal}
        setOpenModal={setOpenAddItemModal}
      />
    </div>
  );
};

export default InventoryCategory;
