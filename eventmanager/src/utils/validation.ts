export const validateInputs = (username:string,email:string,password:string) => {
    if (!username.trim()) {
      return "Username cannot be empty.";
    }
    if (!email.includes("@") || email.trim() === "") {
      return "Please enter a valid email address.";
    }
    if (!password.trim() || password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };