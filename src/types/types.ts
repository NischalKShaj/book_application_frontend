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

// interface for admin Store
export interface AdminStore {
  isAuthorized: boolean;
  admin: {
    email: string;
  } | null;
  isLoggedIn: (admin: { email: string }) => void;
  isLoggedOut: () => void;
}

// interface for product
export interface ProductUpload {
  bookName: string;
  bookDescription: string;
  amount: number;
  stock: number;
}

export interface Product {
  _id: string;
  bookName: string;
  bookDescription: string;
  amount: number;
  stock: number;
  images: string[];
}

// interface for cart
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}
