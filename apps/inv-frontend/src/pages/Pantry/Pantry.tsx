import DryPantryIcon from "@/assets/icons/DryPantryTabIcon";
import FreezerTabIcon from "@/assets/icons/FreezerTagIcon";
import FrigdeTabIcon from "@/assets/icons/FridgeTabIcon";
import AddNew from "@/components/AddNew";
import AddNewItemBtn from "@/components/AddNewBtn";
import AuthNavBar from "@/components/AuthNavBar";
import DashboardLayout from "@/components/DashboardLayout";
import InventoryItem from "@/components/InventoryItem";
import SideMenu from "@/components/SideMenu";
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

const InventoryItems = [
  {
    id: 0,
    name: "Spinach",
    amount: 10,
    image:
      "https://images.pexels.com/photos/3298064/pexels-photo-3298064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 1,
    name: "Carrot",
    amount: 5,
    image:
      "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "Cabbage",
    amount: 10,
    image:
      "https://media.istockphoto.com/id/531009780/photo/green-cabbage.jpg?s=612x612&w=0&k=20&c=LLBTHOYDRlZSlWct-A_DJDuvVibQNr5ZvBV-c6J4b_s=",
  },
  {
    id: 3,
    name: "Pepper",
    amount: 13,
    image:
      "https://images.pexels.com/photos/870808/pexels-photo-870808.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    name: "Tomatoes",
    amount: 21,
    image:
      "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const PantryTab: React.FC<TabsWithIconsProps> = ({
  items,
  activeTab,
  setActiveTab,
}) => {
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex flex-row w-[80vw] justify-between mb-[35px]">
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
            <AddNewItemBtn />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-[28px] mb-10">
            <p className="text-black text-[14px] font-[600]">Vegetables</p>
            <div className="flex flex-row items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <g clip-path="url(#clip0_148_694)">
                  <mask id="path-1-inside-1_148_694" fill="white">
                    <path d="M6.58621 9.28876L2.29749 5.00004L6.58619 0.711342C6.74909 0.548434 6.74909 0.285097 6.58619 0.122189C6.42328 -0.0407194 6.15994 -0.0407194 5.99703 0.122189L1.41375 4.70548C1.25084 4.86838 1.25084 5.13172 1.41375 5.29463L5.99703 9.87792C6.07828 9.95916 6.18494 10 6.29162 10C6.39828 10 6.50496 9.95916 6.58621 9.87792C6.74911 9.71501 6.74911 9.45167 6.58621 9.28876Z" />
                  </mask>
                  <path
                    d="M6.58621 9.28876L2.29749 5.00004L6.58619 0.711342C6.74909 0.548434 6.74909 0.285097 6.58619 0.122189C6.42328 -0.0407194 6.15994 -0.0407194 5.99703 0.122189L1.41375 4.70548C1.25084 4.86838 1.25084 5.13172 1.41375 5.29463L5.99703 9.87792C6.07828 9.95916 6.18494 10 6.29162 10C6.39828 10 6.50496 9.95916 6.58621 9.87792C6.74911 9.71501 6.74911 9.45167 6.58621 9.28876Z"
                    fill="black"
                  />
                  <path
                    d="M6.58621 9.28876L8.00042 7.87455L6.58621 9.28876ZM2.29749 5.00004L0.883272 3.58583L-0.530941 5.00004L0.883272 6.41426L2.29749 5.00004ZM6.58619 0.711342L5.17197 -0.702871V-0.702871L6.58619 0.711342ZM5.99703 0.122189L4.58282 -1.29202L5.99703 0.122189ZM1.41375 4.70548L2.82796 6.11969H2.82796L1.41375 4.70548ZM1.41375 5.29463L-0.00046742 6.70884L1.41375 5.29463ZM5.99703 9.87792L7.41125 8.4637L5.99703 9.87792ZM8.00042 7.87455L3.7117 3.58583L0.883272 6.41426L5.17199 10.703L8.00042 7.87455ZM3.7117 6.41426L8.0004 2.12556L5.17197 -0.702871L0.883272 3.58583L3.7117 6.41426ZM8.0004 2.12556C8.94436 1.1816 8.94436 -0.348068 8.0004 -1.29202L5.17197 1.5364C4.55383 0.918262 4.55383 -0.0847311 5.17197 -0.702871L8.0004 2.12556ZM8.0004 -1.29202C7.05644 -2.23598 5.52678 -2.23598 4.58282 -1.29202L7.41125 1.5364C6.79311 2.15454 5.79011 2.15454 5.17197 1.5364L8.0004 -1.29202ZM4.58282 -1.29202L-0.00046742 3.29126L2.82796 6.11969L7.41125 1.5364L4.58282 -1.29202ZM-0.00046742 3.29126C-0.944424 4.23522 -0.944424 5.76489 -0.00046742 6.70884L2.82796 3.88042C3.4461 4.49856 3.4461 5.50155 2.82796 6.11969L-0.00046742 3.29126ZM-0.00046742 6.70884L4.58282 11.2921L7.41125 8.4637L2.82796 3.88042L-0.00046742 6.70884ZM4.58282 11.2921C5.05328 11.7626 5.67484 12 6.29162 12V8C6.69504 8 7.10329 8.15574 7.41125 8.4637L4.58282 11.2921ZM6.29162 12C6.90833 12 7.52993 11.7626 8.00042 11.2921L5.17199 8.4637C5.47999 8.15571 5.88823 8 6.29162 8V12ZM8.00042 11.2921C8.94438 10.3482 8.94438 8.81851 8.00042 7.87455L5.17199 10.703C4.55385 10.0848 4.55385 9.08184 5.17199 8.4637L8.00042 11.2921Z"
                    fill="black"
                    mask="url(#path-1-inside-1_148_694)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_148_694">
                    <rect width="10" height="10" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <mask id="path-1-inside-1_146_575" fill="white">
                  <path d="M0.122169 0.711246L4.41089 4.99997L0.122188 9.28867C-0.04072 9.45157 -0.04072 9.71491 0.122188 9.87782C0.285097 10.0407 0.548433 10.0407 0.711341 9.87782L5.29463 5.29453C5.45754 5.13162 5.45754 4.86829 5.29463 4.70538L0.711341 0.122092C0.630093 0.040843 0.523434 4.76837e-06 0.416755 4.76837e-06C0.310096 4.76837e-06 0.203418 0.040843 0.122169 0.122092C-0.0407395 0.285001 -0.0407395 0.548338 0.122169 0.711246Z" />
                </mask>
                <path
                  d="M0.122169 0.711246L4.41089 4.99997L0.122188 9.28867C-0.04072 9.45157 -0.04072 9.71491 0.122188 9.87782C0.285097 10.0407 0.548433 10.0407 0.711341 9.87782L5.29463 5.29453C5.45754 5.13162 5.45754 4.86829 5.29463 4.70538L0.711341 0.122092C0.630093 0.040843 0.523434 4.76837e-06 0.416755 4.76837e-06C0.310096 4.76837e-06 0.203418 0.040843 0.122169 0.122092C-0.0407395 0.285001 -0.0407395 0.548338 0.122169 0.711246Z"
                  fill="black"
                />
                <path
                  d="M0.122169 0.711246L-1.29205 2.12546L0.122169 0.711246ZM4.41089 4.99997L5.8251 6.41418L7.23932 4.99997L5.8251 3.58575L4.41089 4.99997ZM0.122188 9.28867L1.5364 10.7029V10.7029L0.122188 9.28867ZM0.711341 9.87782L2.12556 11.292L0.711341 9.87782ZM5.29463 5.29453L3.88041 3.88032H3.88041L5.29463 5.29453ZM5.29463 4.70538L6.70884 3.29116L5.29463 4.70538ZM0.711341 0.122092L-0.702872 1.53631L0.711341 0.122092ZM-1.29205 2.12546L2.99667 6.41418L5.8251 3.58575L1.53638 -0.702968L-1.29205 2.12546ZM2.99667 3.58575L-1.29203 7.87445L1.5364 10.7029L5.8251 6.41418L2.99667 3.58575ZM-1.29203 7.87445C-2.23598 8.81841 -2.23598 10.3481 -1.29203 11.292L1.5364 8.46361C2.15454 9.08175 2.15454 10.0847 1.5364 10.7029L-1.29203 7.87445ZM-1.29203 11.292C-0.348068 12.236 1.1816 12.236 2.12556 11.292L-0.702872 8.46361C-0.0847316 7.84546 0.918262 7.84546 1.5364 8.46361L-1.29203 11.292ZM2.12556 11.292L6.70884 6.70875L3.88041 3.88032L-0.702872 8.46361L2.12556 11.292ZM6.70884 6.70875C7.6528 5.76479 7.6528 4.23512 6.70884 3.29116L3.88041 6.11959C3.26227 5.50145 3.26227 4.49846 3.88041 3.88032L6.70884 6.70875ZM6.70884 3.29116L2.12556 -1.29212L-0.702872 1.53631L3.88041 6.11959L6.70884 3.29116ZM2.12556 -1.29212C1.6551 -1.76258 1.03353 -2 0.416755 -2L0.416755 2C0.0133324 2 -0.394912 1.84427 -0.702872 1.53631L2.12556 -1.29212ZM0.416755 -2C-0.199954 -2 -0.821552 -1.76261 -1.29205 -1.29212L1.53638 1.53631C1.22839 1.8443 0.820146 2 0.416755 2L0.416755 -2ZM-1.29205 -1.29212C-2.236 -0.348165 -2.236 1.1815 -1.29205 2.12546L1.53638 -0.702968C2.15452 -0.0848274 2.15452 0.918165 1.53638 1.53631L-1.29205 -1.29212Z"
                  fill="black"
                  mask="url(#path-1-inside-1_146_575)"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-row gap-[42px]">
            <AddNew />
            {InventoryItems.map((inventory) => (
              <InventoryItem
                itemAmount={inventory.amount}
                itemImage={inventory.image}
                itemName={inventory.name}
              />
            ))}
          </div>
        </div>
      </div>
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
