import DashboardLayout from "@/components/DashboardLayout";
import { useGetInventoryQuery } from "@/store/slices/appSlice";
import ApexCharts from "apexcharts";
import { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Role, UserStateProps } from "@/store/interfaces/user.interface";
import ConditionalRoute from "@/routes/ConditionalRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MetaTags from "@/components/MetaTags";
import PageLoader from "@/components/PageLoader";
import { addCommas } from "@/utils/constant";

const UserDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Today");

  const authSlice = useSelector<RootState, UserStateProps>(
    (state) => state.auth.user
  );

  const { data: inventoryData, isLoading: inventoryIsLoading } =
    useGetInventoryQuery();

  const totalQuantity =
    inventoryData?.data
      ?.flatMap((item: any) => item.stocks || [])
      .reduce((total: any, stock: any) => total + Number(stock.quantity), 0) ||
    0;

  // Calculate the difference in days between two dates
  const calculateDaysDifference = (expirationDate:any) => {
    const currentDate = new Date();
    const diffTime = expirationDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to generate the expiration message based on the number of days until expiration
  const generateExpirationMessage = (expirationDate:any) => {
    const daysDifference = calculateDaysDifference(expirationDate);
    if (daysDifference < 0) {
      return `Expired ${Math.abs(daysDifference)} days ago!`;
    } else if (daysDifference === 0) {
      return "Expiring today!";
    } else {
      return `Expiring in ${daysDifference} day${
        daysDifference > 1 ? "s" : ""
      }`;
    }
  };

  const currentDate = new Date();
  const threeMonthsFromNow = new Date(currentDate);
  threeMonthsFromNow.setMonth(currentDate.getMonth() + 3);

  const expiringItemsCount =
    inventoryData?.data
      ?.flatMap((item: any) => item.stocks || [])
      .filter(
        (stock: any) => new Date(stock.expirationDate) <= threeMonthsFromNow
      )
      .reduce(
        (total: number, stock: any) => total + (stock.quantity || 0),
        0
      ) || 0;

  const topLowStockItems = inventoryData?.data
    ?.reduce((acc: any[], inventoryItem: any) => {
      if (Array.isArray(inventoryItem.stocks)) {
        inventoryItem.stocks.forEach((stock: any) => {
          const quantity = Number(stock.quantity);
          const minStock = Number(stock.minStock);

          const remainingQuantity = quantity - minStock;

          if (
            !isNaN(quantity) &&
            !isNaN(minStock) &&
            remainingQuantity <= 5 &&
            remainingQuantity > 0
          ) {
            acc.push({
              ...stock,
              remainingQuantity,
              inventoryName: inventoryItem.name,
            });
          }
        });
      }
      return acc;
    }, [])
    .sort((a: any, b: any) => a.remainingQuantity - b.remainingQuantity)
    .slice(0, 2);

  // Filter items that would/have expired
  const expiredItems = inventoryData?.data
    ?.flatMap((item: any) => {
      // Extract item name and its associated stocks
      const inventoryName = item.name;
      const stocks = item.stocks || [];
      // Map each stock to include the item name
      return stocks.map((stock: any) => ({ ...stock, inventoryName }));
    })
    .filter(
      (stock: any) => new Date(stock.expirationDate) <= threeMonthsFromNow
    );

  // Sort expired items by expiration date in ascending order and get the top 2
  const topExpiredItems = expiredItems
    ?.sort(
      (a: any, b: any) =>
        new Date(a.expirationDate).getTime() -
        new Date(b.expirationDate).getTime()
    )
    .slice(0, 2);

  const totalSalesValue = inventoryData?.data?.reduce(
    (total: any, item: any) => {
      const itemValue = (item.stocks || []).reduce(
        (itemTotal: any, stock: any) => {
          const quantity = Number(stock.quantity);
          const unitPrice = Number(stock.unitPrice);

          if (!isNaN(quantity) && !isNaN(unitPrice)) {
            return itemTotal + unitPrice * quantity;
          } else {
            return itemTotal;
          }
        },
        0
      );

      return total + itemValue;
    },
    0
  );

  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#EED4D5", // Replace with your desired red color
        gradientToColors: ["#EED4D5"],
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 4,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "New users",
        data: [6500, 6418, 6456, 6526, 6501, 6456],
        color: "#9D0208",
      },
    ],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const options2 = {
    colors: ["#9D0208", "#EED4D5", "#BD565A"],
    series: [
      {
        name: "Ordered",
        color: "#9D0208",
        data: [
          { x: "Mon", y: 231 },
          { x: "Tue", y: 122 },
          { x: "Wed", y: 63 },
          { x: "Thu", y: 421 },
          { x: "Fri", y: 122 },
          { x: "Sat", y: 323 },
          { x: "Sun", y: 111 },
        ],
      },
      {
        name: "Used",
        color: "#EED4D5",
        data: [
          { x: "Mon", y: 50 },
          { x: "Tue", y: 97 },
          { x: "Wed", y: 400 },
          { x: "Thu", y: 150 },
          { x: "Fri", y: 679 },
          { x: "Sat", y: 20 },
          { x: "Sun", y: 352 },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: "200px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };

  const options3 = {
    colors: ["#9D0208", "#EED4D5", "#BD565A"],
    series: [
      {
        name: "Amount",
        color: "#9D0208",
        data: [
          { x: "Veggies", y: 231 },
          { x: "Fruits", y: 122 },
          { x: "Meat", y: 63 },
          { x: "Fish", y: 421 },
          { x: "Dairy", y: 647 },
          { x: "Bakery", y: 323 },
          { x: "Others", y: 111 },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: "200px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };

  const chartContainerRef = useRef(null);
  const columnChartRef = useRef(null);
  const column2ChartRef = useRef(null);

  useEffect(() => {
    if (
      chartContainerRef.current &&
      columnChartRef.current &&
      column2ChartRef.current &&
      typeof ApexCharts !== "undefined"
    ) {
      const chart = new ApexCharts(chartContainerRef.current, options);
      const columnChart = new ApexCharts(columnChartRef.current, options2);
      const columnChart2 = new ApexCharts(column2ChartRef.current, options3);

      chart.render();
      columnChart.render();
      columnChart2.render();

      return () => {
        chart.destroy();
        columnChart.destroy();
        columnChart2.destroy();
      };
    }
  }, [options, options2, options3]); // Adding options and options2 as dependencies

  return (
    <ConditionalRoute redirectTo="/login" condition={authSlice ? true : false}>
      <ConditionalRoute
        redirectTo="/404"
        condition={authSlice?.auth?.role === Role.User ? true : false}
      >
        <>
          <MetaTags
            title={"Dashboard | pantryHub"}
            pageUrl={window.location.href}
          />

          <DashboardLayout>
            {inventoryIsLoading ? (
              <PageLoader />
            ) : (
              <div className="flex flex-col gap-8">
                {/* Your existing elements */}
                <div className="w-full">
                  <div className="flex items-center w-full">
                    <div className="font-bold text-black text-[1.25rem] leading-normal ">
                      {`Hi, ${authSlice?.firstName || ""} ${
                        authSlice?.lastName?.toUpperCase() || ""
                      }`}
                    </div>
                    <img
                      className="w-[1.5rem] md:w-[1.875rem] h-[1.5rem] md:h-[1.875rem]"
                      src="/assets/icons/waving-hand-skin-4-svgrepo-com.svg"
                    />
                  </div>
                </div>

                <div className="flex md:flex-row flex-col w-full gap-6">
                  <div className="flex flex-col gap-4 w-full bg-[#FBFBFB] px-6 py-8  rounded-lg">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-black text-[0.875rem] font-semibold">
                        Low Stock
                      </p>
                      <p className="text-[0.75rem] font-semibold text-[#939393]">
                        See more
                      </p>
                    </div>
                    <div className="items-center justify-between flex md:flex-row flex-col w-full gap-4">
                      {topLowStockItems?.length > 0 ? (
                        topLowStockItems?.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="w-full flex p-4 bg-white rounded-[0.625rem] h-20 items-center shadow-md gap-3"
                          >
                            <img
                              src={item.imageURL}
                              alt={item.name}
                              className="w-[32px] h-[32px] rounded-[0.25rem]"
                            />
                            <div className="flex flex-col w-full gap-2">
                              <div className="flex items-center justify-between w-full">
                                <p className="text-[0.75rem] leading-none text-[#939393] font-bold">
                                  {item.name}
                                </p>
                                <p className="text-[0.625rem] font-semibold text-[#939393]">
                                  {item.inventoryName}
                                </p>
                              </div>
                              <p className="text-[#FFA519] text-[0.625rem]">
                                Only {item.quantity} left in stock
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="font-bold flex justify-center items-center w-full h-full">
                          No item is low in stock
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-full bg-[#FBFBFB] px-6 py-8 rounded-lg">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-black text-[0.875rem] font-semibold">
                        Expiring Soon
                      </p>
                      <p className="text-[0.75rem] font-semibold text-[#939393]">
                        See more
                      </p>
                    </div>
                    <div className="items-center justify-between flex md:flex-row flex-col w-full gap-4">
                      {topExpiredItems.length > 0 ? (
                        topExpiredItems.map((item: any, index: any) => (
                          <div
                            key={index}
                            className="w-full flex p-4 bg-white rounded-[0.625rem] h-20 items-center shadow-md gap-3"
                          >
                            <img
                              src={item.imageURL}
                              className="w-[32px] h-[32px] rounded-[0.25rem]"
                              alt={item.name}
                            />
                            <div className="flex flex-col w-full gap-2">
                              <div className="flex items-center justify-between w-full">
                                <p className="text-[0.75rem] leading-none text-[#939393] font-bold">
                                  {item.name}
                                </p>
                                <p className="text-[0.625rem] font-semibold text-[#939393]">
                                  {item.inventoryName}
                                </p>
                              </div>
                              <div className="flex items-center justify-between w-full">
                              <p className="text-custom-primary-1 text-[0.625rem]">
                              {generateExpirationMessage(new Date(item.expirationDate))}
                              </p>
                              <p className="text-[0.625rem] font-semibold text-[#939393]">
                                  {item.location}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="w-full flex p-4 bg-white rounded-[0.625rem] h-20 items-center shadow-md gap-3">
                          <p className="text-[#939393] text-[0.75rem]">
                            No items expiring soon
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-6 font-semibold">
                  <div className="bg-[#FBFBFB] p-4 shadow-md flex flex-col gap-4 rounded-lg overflow-hidden">
                    <p className="text-sm">Number of items</p>
                    <div className="flex justify-between relative">
                      <div className="flex flex-col">
                        <p className="text-[2rem]">{totalQuantity} items</p>
                        <p className="text-[0.75rem] text-[#939393]">
                          {inventoryData?.data?.flatMap(
                            (item: any) => item.stocks || []
                          ).length || 0}{" "}
                          stocks
                        </p>
                      </div>
                      <img
                        src="/assets/images/bread.png"
                        className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 -rotate-12 z-10"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  </div>

                  <div className="bg-[#FBFBFB] p-4 shadow-md flex flex-col gap-4 rounded-lg  overflow-hidden">
                    <p className="text-sm">Sales Performance</p>
                    <div className="flex justify-between relative">
                      <div className="flex flex-col">
                        <p className="text-[2rem] ">
                          ₦{addCommas(totalSalesValue * 1000)}
                        </p>
                        <p className="text-[0.75rem] text-[#939393]">
                          in the last month
                        </p>
                      </div>
                      <img
                        src="/assets/images/coin.png"
                        className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4  z-10"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  </div>
                  <div className="bg-[#FBFBFB] p-4 shadow-md flex flex-col gap-4 rounded-lg  overflow-hidden">
                    <p className="text-sm">Expiry Status</p>
                    <div className="flex justify-between relative">
                      <div className="flex flex-col">
                        <p className="text-[2rem] ">
                          {expiringItemsCount} items
                        </p>
                        <p className="text-[0.75rem] text-[#939393]">
                          within the next 3 months
                        </p>
                      </div>
                      <img
                        src="/assets/images/caution.png"
                        className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4  z-10"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  </div>
                  <div className="bg-[#FBFBFB] p-4 shadow-md flex flex-col gap-4 rounded-lg  overflow-hidden">
                    <p className="text-sm">Inventory Turnover Ratio</p>
                    <div className="flex justify-between relative">
                      <div className="flex flex-col">
                        <p className="text-[2rem] ">4.7</p>
                        <p className="text-[0.75rem] text-[#939393]">
                          Last Month: 4.2
                        </p>
                      </div>
                      <img
                        src="/assets/images/trend.png"
                        className="absolute bottom-0 right-0 transform translate-x-4 translate-y-6 rotate-12  z-10"
                        style={{ width: "90px", height: "70px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                  {/* AreA chart */}
                  <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 grid grid-cols-1">
                    {/* Header section */}
                    <div className="flex justify-between">
                      <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                          3-7 Days
                        </h5>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400 ">
                          Average Shelf Life
                        </p>
                      </div>
                      {/* Replace with your content or remove if not needed */}
                      <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                        12%
                        <svg
                          className="w-3 h-3 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13V1m0 0L1 5m4-4 4 4"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Chart container */}
                    <div
                      id="area-chart"
                      className="col-span-1"
                      ref={chartContainerRef}
                      // style={{ height: "300px" }}
                    />

                    {/* Your additional content below the chart (optional) */}
                    <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between pt-5">
                      <div className="flex justify-between items-center">
                        <Dropdown
                          color="red"
                          label={selectedOption}
                          placement="top"
                        >
                          <DropdownItem
                            onClick={() => setSelectedOption("Today")}
                          >
                            Today
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Yesterday")}
                          >
                            Yesterday
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 7 days")}
                          >
                            Last 7 days
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 30 days")}
                          >
                            Last 30 days
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 90 days")}
                          >
                            Last 90 days
                          </DropdownItem>
                        </Dropdown>
                      </div>
                    </div>
                  </div>

                  {/* Column chart */}
                  <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                    <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                      <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                          Leftover in Pantry
                        </dt>
                        <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                          351
                        </dd>
                      </dl>
                    </div>

                    <div className="grid grid-cols-2 py-3">
                      <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                          Ordered
                        </dt>
                        <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
                          753
                        </dd>
                      </dl>
                      <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                          Used
                        </dt>
                        <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
                          -402
                        </dd>
                      </dl>
                    </div>

                    <div
                      id="column-chart"
                      className="col-span-1"
                      ref={columnChartRef}
                    ></div>

                    {/* Your additional content below the chart (optional) */}
                    <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between pt-5">
                      <div className="flex justify-between items-center">
                        <Dropdown
                          color="red"
                          label={selectedOption}
                          placement="top"
                        >
                          <DropdownItem
                            onClick={() => setSelectedOption("Today")}
                          >
                            Today
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Yesterday")}
                          >
                            Yesterday
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 7 days")}
                          >
                            Last 7 days
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 30 days")}
                          >
                            Last 30 days
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 90 days")}
                          >
                            Last 90 days
                          </DropdownItem>
                        </Dropdown>
                      </div>
                    </div>
                  </div>

                  {/* Column chart */}
                  <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                    <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                      <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                          Most Used Category
                        </dt>
                        <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                          Dairy
                        </dd>
                      </dl>
                    </div>

                    <div className="grid grid-cols-2 py-3">
                      <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                          Amount Used
                        </dt>
                        <dd className="leading-none text-xl font-bold text-gray-500 dark:text-green-400">
                          1034
                        </dd>
                      </dl>
                    </div>

                    <div
                      id="column2-chart"
                      className="col-span-1"
                      ref={column2ChartRef}
                    ></div>

                    {/* Your additional content below the chart (optional) */}
                    <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between pt-5">
                      <div className="flex justify-between items-center">
                        <Dropdown
                          color="red"
                          label={selectedOption}
                          placement="top"
                        >
                          <DropdownItem
                            onClick={() => setSelectedOption("Today")}
                          >
                            Today
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Yesterday")}
                          >
                            Yesterday
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 7 days")}
                          >
                            Last 7 days
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 30 days")}
                          >
                            Last 30 days
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setSelectedOption("Last 90 days")}
                          >
                            Last 90 days
                          </DropdownItem>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DashboardLayout>
        </>
      </ConditionalRoute>
    </ConditionalRoute>
  );
};

export default UserDashboard;
