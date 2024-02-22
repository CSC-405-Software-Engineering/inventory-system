/* eslint-disable @typescript-eslint/no-explicit-any */
interface InventoryItemProps{
    itemName: string;
    itemAmount: number;
    itemImage: any;
}

const InventoryItem:React.FC<InventoryItemProps> = (
    {
        itemName,
        itemAmount,
        itemImage
    }: InventoryItemProps
) => {
    return (
        <div className="w-[159px] h-[157px] flex justify-center items-center rounded-[20px] shadow-md" style={{ backgroundImage: `url(${itemImage})`, backgroundSize: "cover" }}>
            <div className="w-full relative bg-white bottom-[-54px] rounded-b-[20px] h-[49px] flex flex-col items-center py-2">
                <p className="text-black font-[500] text-[14px]">{itemName}</p>
                <p className="text-[#939393] font-[500] text-[10px]">{itemAmount} kg</p>
            </div>
        </div>
    )
}

export default InventoryItem