export function generateRandomPassword(): string {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  // Initialize password with required characters
  let password = [
      randomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), // At least one uppercase letter
      randomChar("abcdefghijklmnopqrstuvwxyz"), // At least one lowercase letter
      randomChar("0123456789"), // At least one number
      randomChar("!@#$%^&*"), // At least one special character
  ];
  
  // Fill the rest of the password length with random characters from the charset
  for (let i = password.length; i < length; i++) {
      password.push(randomChar(charset));
  }
  
  // Shuffle the array to ensure randomness, then join it to form a string
  password = shuffleArray(password);
  return password.join("");
}

function randomChar(charset: string): string {
  const randomIndex = Math.floor(Math.random() * charset.length);
  return charset[randomIndex];
}

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export const formatPrice = (price: any) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
  }).replace('NGN', '₦');
};

export const addCommas = (num:any) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
