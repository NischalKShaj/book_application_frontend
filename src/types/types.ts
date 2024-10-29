// <===================== file to create the types for the application ================>

// creating the interface for the Login
export interface FormLogin {
  email: string;
  password: string;
}

// creating the interface for the signup
export interface FormSignup {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// creating the interface for the random styles
export interface RandomStyle {
  left: string;
  top: string;
  transform: string;
  opacity: number;
}
