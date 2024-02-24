/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type AddNewProps= {
    // onClick:() => void;
    inventoryName: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const AddNew:React.FC<AddNewProps> = (
    {onClick, inventoryName},
) => {
    return (
        <div style={{cursor: "pointer"}} onClick={onClick} className="w-[159px] h-[157px] flex flex-col bg-[#FF6B000A] border-[2px] border-dashed border-[#B11722] rounded-[20px] justify-end items-center pt-[31px] pb-[24px] px-[18px] gap-[20px]">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                    <g clipPath="url(#clip0_363_110)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.5 42.1875C11.6269 42.1875 2.8125 33.3703 2.8125 22.5C2.8125 11.6297 11.6269 2.8125 22.5 2.8125C33.3731 2.8125 42.1875 11.6297 42.1875 22.5C42.1875 33.3703 33.3731 42.1875 22.5 42.1875ZM22.5 0C10.073 0 0 10.0687 0 22.5C0 34.9313 10.073 45 22.5 45C34.927 45 45 34.9313 45 22.5C45 10.0687 34.927 0 22.5 0ZM30.9375 21.0938H23.9062V14.0625C23.9062 13.2891 23.2777 12.6562 22.5 12.6562C21.7223 12.6562 21.0938 13.2891 21.0938 14.0625V21.0938H14.0625C13.2848 21.0938 12.6562 21.7266 12.6562 22.5C12.6562 23.2734 13.2848 23.9062 14.0625 23.9062H21.0938V30.9375C21.0938 31.7109 21.7223 32.3438 22.5 32.3438C23.2777 32.3438 23.9062 31.7109 23.9062 30.9375V23.9062H30.9375C31.7152 23.9062 32.3438 23.2734 32.3438 22.5C32.3438 21.7266 31.7152 21.0938 30.9375 21.0938Z" fill="#B11722" />
                    </g>
                    <defs>
                        <clipPath id="clip0_363_110">
                            <rect width="45" height="45" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <p className="text-center text-[12px] font-poppins font-[600] text-black">
                Add new item to {inventoryName}
            </p>
        </div>
    )
}

export default AddNew;

