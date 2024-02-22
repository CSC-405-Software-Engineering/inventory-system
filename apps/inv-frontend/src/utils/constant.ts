function generateRandomPassword(): string {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const password = [];
    
    // Ensure the password meets the criteria
    password.push(randomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ")); // At least one uppercase letter
    password.push(randomChar("abcdefghijklmnopqrstuvwxyz")); // At least one lowercase letter
    password.push(randomChar("0123456789")); // At least one number
    password.push(randomChar("!@#$%^&*")); // At least one special character
    
    // Fill the rest of the password length with random characters from the charset
    for (let i = password.length; i < length; i++) {
      password.push(randomChar(charset));
    }
    
    // Shuffle the array to ensure randomness, then join it to form a string
    return shuffleArray(password).join("");
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
  
  console.log(generateRandomPassword());

  
  //must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character from the set !@#$%^&*