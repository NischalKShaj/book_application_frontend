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

// creating the interface for the user store
export interface UserStore {
  isAuthorized: boolean;
  user: {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
  } | null;
  isLoggedIn: (user: {
    _id: string;
    email: string;
    username: string;
    phoneNumber: string;
  }) => void;
  isLoggedOut: () => void;
}
