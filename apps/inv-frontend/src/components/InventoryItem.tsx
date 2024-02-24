import React, { useState } from "react";
import ItemDetailsModal from "./ItemDetailsModal";

interface InventoryItemProps {
  itemId: string;
  itemName: string;
  itemAmount: number;
  itemImage: any;
}

interface InventoryDataProps {
  items: InventoryItemProps[];
  inventoryName: string;
}

const InventoryItem: React.FC<InventoryDataProps> = ({
  items = [],
  inventoryName,
}: InventoryDataProps) => {
  const [openItemDetailsModal, setOpenItemDetailsModal] = useState(false);
  const [stockId, setStockId] = useState("");

  const handleItemDetails = (stockId: string) => {
    setStockId(stockId);
    setOpenItemDetailsModal(true);
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.itemName}
          onClick={() => handleItemDetails(item.itemId)}
          className="w-[159px] cursor-pointer h-[157px] flex justify-center items-center rounded-[20px] shadow-md"
          style={{
            backgroundImage: `url(${item.itemImage})`,
            backgroundSize: "cover",
          }}
        >
          <div className="w-full relative bg-white bottom-[-54px] rounded-b-[20px] h-[49px] flex flex-col items-center py-2">
            <p className="text-black font-[500] text-[14px]">{item.itemName}</p>
            <p className="text-[#939393] font-[500] text-[10px]">
              {item.itemAmount} Stocks
            </p>
          </div>
        </div>
      ))}
      <ItemDetailsModal
        openModal={openItemDetailsModal}
        setOpenModal={setOpenItemDetailsModal}
        stockId={stockId}
        inventoryName={inventoryName}
      />
    </>
  );
};

export default InventoryItem;
