import DryPantryIcon from "@/assets/icons/DryPantryTabIcon";
import FreezerTabIcon from "@/assets/icons/FreezerTagIcon";
import FrigdeTabIcon from "@/assets/icons/FridgeTabIcon";
import AddListsModal from "@/components/AddListsModal";
// import AddNew from "@/components/AddNew";
import DashboardLayout from "@/components/DashboardLayout";
import InventoryCategory from "@/components/InventoryCategory";
import { useGetInventoryQuery } from "@/store/slices/appSlice";
// import InventoryItem from "@/components/InventoryItem";
import { ReactElement, useState } from "react";

type TabItem = {
    label: string;
    icon?: (isActive: boolean) => ReactElement;
    count: number;
};

type TabsWithIconsProps = {
    items: TabItem[];
    activeTab: number;
    setActiveTab: (index: number) => void;
};



// const InventoryItems = [
//     {
//         id: 0,
//         name: "Spinach",
//         amount: 10,
//         image: "https://images.pexels.com/photos/3298064/pexels-photo-3298064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         category: "Fruit"
//     },
//     {
//         id: 1,
//         name: "Carrot",
//         amount: 5,
//         image: "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=400",
//         category: "Vegetable"
//     },
//     {
//         id: 2,
//         name: "Cabbage",
//         amount: 10,
//         image: "https://media.istockphoto.com/id/531009780/photo/green-cabbage.jpg?s=612x612&w=0&k=20&c=LLBTHOYDRlZSlWct-A_DJDuvVibQNr5ZvBV-c6J4b_s=",
//         category: "Vegetable"
//     },
//     {
//         id: 3,
//         name: "Pepper",
//         amount: 13,
//         image: "https://images.pexels.com/photos/870808/pexels-photo-870808.jpeg?auto=compress&cs=tinysrgb&w=400",
//         category: "Meat"

//     },
//     {
//         id: 4,
//         name: "Tomatoes",
//         amount: 21,
//         image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400",
//         category: "Meat"
//     },
//     {
//         id: 5,
//         name: "Tomatoes",
//         amount: 21,
//         image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400",
//         category: "Meat"
//     },
//     {
//         id: 6,
//         name: "Pepper",
//         amount: 13,
//         image: "https://images.pexels.com/photos/870808/pexels-photo-870808.jpeg?auto=compress&cs=tinysrgb&w=400",
//         category: "Meat"

//     },
//     {
//         id: 7,
//         name: "Tomatoes",
//         amount: 21,
//         image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400",
//         category: "Meat"
//     },
// ];


const PantryTab: React.FC<TabsWithIconsProps> = ({
    items,
    activeTab,
    setActiveTab,
}) => {
    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const { data:InventoryItems, error: InventoryItemsError, isError: InventoryItemsIsError }: any =
    useGetInventoryQuery();
    console.log(InventoryItems?.data);

    const [openAddItemModal, setOpenAddItemModal] = useState(false);

    const handleAddItem = () => {
        setOpenAddItemModal(true);
    };

    const groupedInventoryItems = InventoryItems?.data?.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = [];
        }
        acc[item.name].push(item);
        return acc;
    }, {} as { [name: string]: typeof InventoryItems.data });

    return (
        <DashboardLayout>
            <div className="flex flex-col">
                <div className="flex flex-row w-full justify-between mb-[35px]">
                    <div className="flex flex-col">
                        <p className="text-black font-[600] text-[28px] mb-[23px]">
                            Pantry
                        </p>
                        <div className="flex flex-row gap-[17px] w-fit">
                            {items.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTabClick(index)}
                                    className={index === activeTab ? "active" : ""}
                                >
                                    <div className="flex flex-row items-center gap-1 py-1.5">
                                        {item.icon && item.icon(index === activeTab)}
                                        <p
                                            style={{
                                                color: index === activeTab ? "#B11722" : "#9E9E9E",
                                            }}
                                            className="text-[12px] font-[600]"
                                        >
                                            {item.label}
                                        </p>
                                        <div
                                            style={{
                                                backgroundColor:
                                                    index === activeTab ? "#EED4D5" : "#A4A4A457",
                                                color: index === activeTab ? "#B11722" : "#939393",
                                            }}
                                            className="w-[25px] h-[16px] rounded-[9px] font-[600] text-[10px]"
                                        >
                                            {item.count}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[24px] items-end">
                        <div className="flex flex-row gap-[8px] w-[360px] h-[36px] py-[18px] px-[16px] items-center rounded-[8px] border-[1px] border-[#D9D9D9] bg-white focus:ring-red-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M12.5 12.0602C13.5229 11.1447 14.1667 9.81417 14.1667 8.33334C14.1667 5.57191 11.9281 3.33334 9.16666 3.33334C6.40523 3.33334 4.16666 5.57191 4.16666 8.33334C4.16666 11.0948 6.40523 13.3333 9.16666 13.3333C10.4472 13.3333 11.6154 12.8519 12.5 12.0602ZM12.5 12.0602L16.2732 15.8333"
                                    stroke="#52525C"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search an item"
                                className=" border-none py-0 focus:outline-none focus:bg-none focus:ring-0"
                            />
                            {/* <button className="bg-blue-500 text-white rounded-md px-3 py-2" title="Search">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 3a6 6 0 100 12A6 6 0 009 3zm5.707 11.293a1 1 0 01-1.414 1.414l-3.79-3.79a4.5 4.5 0 111.414-1.414l3.79 3.79z" clipRule="evenodd" />
                                    </svg>
                                </button> */}
                        </div>
                        <button className="bg-[#9D0208] flex w-52 text-white text-[16px] font-[700] py-2 px-4 rounded-[5px] justify-center" onClick={handleAddItem}>
                            Add a new Item
                        </button>
                    </div>
                </div>
                {/* <InventoryCategory catName={item.category} inventoryItems={} /> */}
                {groupedInventoryItems && Object.entries(groupedInventoryItems)?.map(([category, items]) => (
                    // Render InventoryCategory for each category
                    <InventoryCategory
                        key={category}
                        catName={category}
                        inventoryItems={items?.map((stock, index) => ({
                            itemName: stock.name,
                            itemAmount: stock.quantity,
                            itemImage: stock.imageURL,
                        }))}
                    />
                ))}
            </div>
            <AddListsModal openModal={openAddItemModal} setOpenModal={setOpenAddItemModal} />
        </DashboardLayout>
    );
};

const Pantry = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabItems: TabItem[] = [
        { label: "All", count: 10 },
        {
            label: "Fridge",
            icon: (isActive: boolean) => <FrigdeTabIcon isActive={isActive} />,
            count: 5,
        },
        {
            label: "Freezer",
            icon: (isActive: boolean) => <FreezerTabIcon isActive={isActive} />,
            count: 3,
        },
        {
            label: "Dry Pantry",
            icon: (isActive: boolean) => <DryPantryIcon isActive={isActive} />,
            count: 7,
        },
    ];
    return (
        <>
            <PantryTab
                items={tabItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </>
    );
};

export default Pantry;

