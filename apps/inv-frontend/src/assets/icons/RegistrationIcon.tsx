interface IconProps{
    isActive?: boolean
  }
  

const RegistrationIcon = ({ isActive }: IconProps) => {
  return (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill={isActive ? "#FFFFFF" : "#1C1B1F"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6667 15.0833C19.5431 15.0833 21.875 17.4152 21.875 20.2916V21.3333C21.875 22.4839 20.9423 23.4166 19.7917 23.4166H5.20833C4.05774 23.4166 3.125 22.4839 3.125 21.3333V20.2916C3.125 17.4152 5.45685 15.0833 8.33333 15.0833H16.6667ZM20.8333 8.83331C21.4086 8.83331 21.875 9.29969 21.875 9.87498V10.9166H22.9167C23.492 10.9166 23.9583 11.383 23.9583 11.9583C23.9583 12.5336 23.492 13 22.9167 13H21.875V14.0416C21.875 14.617 21.4086 15.0833 20.8333 15.0833C20.258 15.0833 19.7917 14.617 19.7917 14.0416V13H18.75C18.1747 13 17.7083 12.5336 17.7083 11.9583C17.7083 11.383 18.1747 10.9166 18.75 10.9166H19.7917V9.87498C19.7917 9.29969 20.258 8.83331 20.8333 8.83331ZM12.5 2.58331C15.3765 2.58331 17.7083 4.91517 17.7083 7.79165C17.7083 10.6681 15.3765 13 12.5 13C9.62352 13 7.29167 10.6681 7.29167 7.79165C7.29167 4.91517 9.62352 2.58331 12.5 2.58331Z"
        fill={isActive ? "#FFFFFF" : "#1C1B1F"}
      />
    </svg>
  );
};

export default RegistrationIcon;