//<================================ creating store for the user =================================>
import { create } from "zustand";
import { UserStore } from "@/types/types";

// creating the store

export const userStore = create<UserStore>((set, get) => {
  let initialState = {
    isAuthorized: false,
    user: null,
  };

  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("userState");
    if (savedState) {
      try {
        initialState = JSON.parse(savedState);
      } catch (error) {
        console.error("error parsing the saved state", error);
      }
    }
  }

  //   const clearCookie = (name: string) => {
  //     document.cookie = `${name}=; Max-Age=0; path=/;`;
  //   };

  return {
    ...initialState,
    isLoggedIn: (user) => {
      set({ isAuthorized: true, user });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userState",
          JSON.stringify({ ...get(), isAuthorized: true, user })
        );
      }
    },
    isLoggedOut: () => {
      set({ isAuthorized: false, user: null });
      if (typeof window !== "undefined") {
        localStorage.removeItem("userState");
        // clearCookie("access_token");
      }
    },
  };
});
