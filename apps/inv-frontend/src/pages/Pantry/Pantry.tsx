import AddListsModal from "@/components/AddListsModal";
// import AddNew from "@/components/AddNew";
import DashboardLayout from "@/components/DashboardLayout";
import InventoryCategory from "@/components/InventoryCategory";
import ConditionalRoute from "@/routes/ConditionalRoute";
import { Role, UserStateProps } from "@/store/interfaces/user.interface";
import { useGetInventoryQuery } from "@/store/slices/appSlice";
// import InventoryItem from "@/components/InventoryItem";
import { ReactElement, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MetaTags from "@/components/MetaTags";
import PageLoader from "@/components/PageLoader";
import React from "react";

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



const PantryTab: React.FC<TabsWithIconsProps> = ({
  items,
  activeTab,
  setActiveTab,
}) => {
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const { data: InventoryItems, isLoading: InventoryItemsIsLoading }: any =
    useGetInventoryQuery();

  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  const handleAddItem = () => {
    setOpenAddItemModal(true);
  };

  const groupedInventoryItems = InventoryItems?.data?.reduce(
    (acc: any, inventoryItem: any) => {
      // Check if the inventory item name already exists in the accumulator
      if (!acc[inventoryItem.name]) {
        // If not, initialize it with an empty array
        acc[inventoryItem.name] = [];
      }
      // Push the stocks of the current inventory item into the array associated with its name
      acc[inventoryItem.name] = acc[inventoryItem.name].concat(
        inventoryItem.stocks.map((stock: any) => ({
          itemId: stock.id,
          itemName: stock.name,
          itemAmount: stock.quantity,
          itemImage: stock.imageURL,
          itemLocation: stock.location,
        }))
      );
      return acc;
    },
    {}
  );
  const sortedItems = items
    .slice()
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

  return (
    <>
      {InventoryItemsIsLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-0 md:items-center">
              <p className="text-black font-semibold text-[28px] ">Pantry</p>
              <div className="relative">
                <input className="px-4 py-3 md:w-[22.5rem] w-full h-8 pl-10 flex shadow-none bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center focus:outline-none" />
                <div className="absolute inset-y-0 left-0 px-4 flex items-center">
                  <img src="/assets/icons/search-icon.svg" />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full justify-between">
              <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between">
                <div className="flex flex-row flex-wrap gap-4 w-fit whitespace-nowrap">
                  {items
                    .slice() // Create a shallow copy of the array
                    .sort((a: any, b: any) => a.label.localeCompare(b.label)) // Sort alphabetically by label
                    .map((item: any, index: any) => (
                      <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={index === activeTab ? "active" : ""}
                      >
                        <div className="flex flex-row items-center gap-1 py-1.5">
                          {item.icon && item.icon(index === activeTab)}
                          <p
                            style={{
                              color:
                                index === activeTab ? "#B11722" : "#9E9E9E",
                            }}
                            className="text-[12px] font-[600]"
                          >
                            {item.label}
                          </p>
                          <div
                            style={{
                              backgroundColor:
                                index === activeTab ? "#EED4D5" : "#A4A4A457",
                              color:
                                index === activeTab ? "#B11722" : "#939393",
                            }}
                            className="w-[25px] h-[16px] rounded-[9px] font-[600] text-[10px]"
                          >
                            {item.count}
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
                <button
                  className="bg-[#9D0208] flex w-52 text-white text-[16px] h-fit font-[700] py-2 px-4 rounded-[5px] justify-center"
                  onClick={handleAddItem}
                >
                  Add a new Item
                </button>
              </div>
            </div>
            {/* <InventoryCategory catName={item.category} inventoryItems={} /> */}

            {groupedInventoryItems &&
              Object.entries(groupedInventoryItems)
                .sort(([inventoryNameA], [inventoryNameB]) =>
                  inventoryNameA.localeCompare(inventoryNameB)
                ) // Sort inventory names alphabetically
                .map(
                  (
                    [inventoryName, stocks]: any,
                    index: number,
                    array: any[]
                  ) => {
                    const filteredStocks =
                      activeTab === 0
                        ? stocks
                        : stocks.filter(
                            (stock: any) =>
                              stock.itemLocation ===
                              sortedItems[activeTab].label
                          );

                    if (filteredStocks.length > 0) {
                      return (
                        <React.Fragment key={inventoryName}>
                          <InventoryCategory
                            catName={inventoryName}
                            inventoryItems={filteredStocks}
                          />
                          {index !== array.length - 1 && (
                            <hr className="my-1.5 border-gray-300" />
                          )}{" "}
                        </React.Fragment>
                      );
                    }
                    return null; 
                  }
                )}
          </div>
          <AddListsModal
            openModal={openAddItemModal}
            setOpenModal={setOpenAddItemModal}
          />
        </>
      )}
    </>
  );
};

const Pantry = () => {
  const [activeTab, setActiveTab] = useState(0);

  const authSlice = useSelector<RootState, UserStateProps>(
    (state) => state.auth.user
  );

  const { data: InventoryItems, isLoading: InventoryItemsIsLoading }: any =
    useGetInventoryQuery();

  const locations = Array.from(
    new Set(
      InventoryItems?.data?.flatMap(
        (item: any) => item.stocks?.map((stock: any) => stock.location) || []
      )
    )
  );

  // Function to count the number of stocks in a specific location
  const countStocksInLocation = (location: string) =>
    InventoryItems?.data
      ?.flatMap((item: any) => item.stocks || [])
      .filter((stock: any) => stock.location === location).length || 0;

  // Generate tab items based on locations
  const tabItems: TabItem[] = locations.map((location: any) => ({
    label: location,
    count: countStocksInLocation(location),
  }));

  // Add an additional tab for "All" locations
  tabItems.unshift({
    label: "All",
    count:
      InventoryItems?.data?.flatMap((item: any) => item.stocks || []).length ||
      0,
  });

  return (
    <ConditionalRoute redirectTo="/login" condition={authSlice ? true : false}>
      <ConditionalRoute
        redirectTo="/404"
        condition={authSlice?.auth?.role === Role.User ? true : false}
      >
        <>
          <MetaTags
            title={"Pantry | pantryHub"}
            pageUrl={window.location.href}
          />
          <DashboardLayout>
            <PantryTab
              items={tabItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </DashboardLayout>
        </>
      </ConditionalRoute>
    </ConditionalRoute>
  );
};

export default Pantry;
