// <============================= file to create the signup schema for the validation =============>

// importing the required modules
import * as Yup from "yup";

// Define the validation schema
const signupSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .optional(),
});

export default signupSchema;
