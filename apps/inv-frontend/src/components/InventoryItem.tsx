/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface InventoryItemProps{
    itemName: string;
    itemAmount: number;
    itemImage: any;
}

interface InventoryDataProps{
    items: InventoryItemProps[];
}

const InventoryItem: React.FC<InventoryDataProps> = ({ items = [] }: InventoryDataProps) => {
    return (
        <>
            {items.map((item) => (
                <div key={item.itemName} className="w-[159px] h-[157px] flex justify-center items-center rounded-[20px] shadow-md" style={{ backgroundImage: `url(${item.itemImage})`, backgroundSize: "cover" }}>
                    <div className="w-full relative bg-white bottom-[-54px] rounded-b-[20px] h-[49px] flex flex-col items-center py-2">
                        <p className="text-black font-[500] text-[14px]">{item.itemName}</p>
                        <p className="text-[#939393] font-[500] text-[10px]">{item.itemAmount} kg</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default InventoryItem;
