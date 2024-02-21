interface IconProps{
  isActive?: boolean
}


const PantryIcon = ({ isActive }: IconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={isActive ? "#FFFFFF" : "#1C1B1F"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V13H18V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM13.5 11V0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V11H13.5ZM0 11V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H4.5V11H0ZM6.5 11V0H11.5V11H6.5Z"
        fill={isActive ? "#FFFFFF" : "#1C1B1F"}
      />
    </svg>
  );
};

export default PantryIcon;
