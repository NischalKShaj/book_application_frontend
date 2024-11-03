// <============================ creating a store for the admin =====================>

// importing the required modules
import { create } from "zustand";
import { AdminStore } from "@/types/types";

// creating the store
export const adminStore = create<AdminStore>((set, get) => {
  let initialState = {
    isAuthorized: false,
    admin: null,
  };

  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("adminState");
    if (savedState) {
      try {
        initialState = JSON.parse(savedState);
      } catch (error) {
        console.error("error parsing the saved state", error);
      }
    }
  }

  return {
    ...initialState,
    isLoggedIn: (admin) => {
      set({ isAuthorized: true, admin });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "adminState",
          JSON.stringify({ ...get(), isAuthorized: true, admin })
        );
      }
    },
    isLoggedOut: () => {
      set({ isAuthorized: false, admin: null });
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminState");
      }
    },
  };
});
