// component that shows the users
"use client";

// importing the required modules
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios/axiosInstance";
import { Users } from "@/types/types";

const UserComponent = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  // for loading the users in the initial loading of the application
  useEffect(() => {
    getUsers();
  }, [pageNumber]);

  // for getting all the users
  const getUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/get-all-users", {
        params: { page: pageNumber },
      });
      if (response.status === 200) {
        console.log("response", response.data);
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] ">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1a237e] mb-6">
          👥 User Management
        </h1>
        <div className="grid grid-cols-4 gap-6">
          {/* User Card */}
          {users ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-80 h-[300px]"
              >
                {/* Profile Picture */}
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <Image
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACUCAMAAACp1UvlAAAAMFBMVEXk5ueutLepsLPZ3N7n6erg4uPKztC3vL++w8W7wMPHy83V2NqzubzP0tTc3+DCxskfOlAIAAADRklEQVR4nO2bwXKEIAxAEQMqCP7/3xbdrV23XSXRBKfDu7SHzvRNDBBDVKpSqVQqlUqlUqlUKpVK5V8AsP4Cu38oCUD0duqHRO+sV7dQAxVd12wYg1GF1UCFQevmDa17X1IMlH9XWunaYmYQh1+heglab8qYgf0s9aDMw+x3gvUMmSsgNh5ZLc9S2irmaCWxQTZiJstKPGKmOzZaxeQiBnv7wy8xKyUGAaGV8EJeEWWVkAkY5C3FH2S2MexTnIkCXgYbLpk1SQlXow2/F94qMXEHDFpCuFIJyx0w6Enx0oHZi5D1C9zntyc9xhQwXi1wVC/e2hW916/wrkgghislGKeWimQv1p0CqGmfvDjPSLBkr6bl9HJkLc1ZHRJ3e36vie7FeRL9x3ixet017++6T9x0X73rOXTm3L5pncP8bktNfM3cBibX0cz1PaLztYH7jfuu72lA2ynY32uJK5K9D0DLfOa3xwf4zBfp/RI6J/zZtYh1SDGpjjS27zsKNcqxLUPOymsrNmHuFSRv+xD3MAJb1wu5u6v0FWRm31D6ni+Rs1sUubDNuEcWu0p7BcL+s9RjLDQQYHbnFFyhOYXZrP2wYeim1PTEU0z5P+dgpnLTJj9qdhibp5xOP8fBlx4begBg2rAMWvWTDa25xZzVAmwobTMze8ToQ7Buxobg26hK2qV/nB7f9PeCHHvroxGfnEv/r7V9t6T5p+1L67F3kkN9oEzIf7vtbJRYnSmb7NBg6lWtO+e5o2Y8rT8xOsZRSDBupPbl0sHEdQTEgei0Bo3hHIB4XG4dB224+B0EDP1CYcuV46MAFrUCd9HTVQXQxyKLSrhE7HhMFcsVE7dgsF2SLM7mP7QMUs3pFzjSUFWe2Jm5BfJ0SQ4dOclQbRs8I1GMWYsqxq5F67uy5tY3HV6LbSVuwLahuPatd9AdH/L9J1YMVV8I5PwKRuvz5zfX4xBiFxc2+2S3989MbxDosjNM0qrJLnquLwQPyC0tpPaIb3RehtFncKhkXZuC6GJ8kHN+Z3+ydCEZpxGEAl45H2Vd9WaNIacQK5BeOSuyRHo1+vgVnPb9xlmOL3Vl6tR3DuvWVHmV4PgTttgW4UirUqlUKpWKUl/lWSnkmIvaNgAAAABJRU5ErkJggg=="
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* User Details */}
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1a237e] mb-2">
                      {user.username}
                    </h2>
                    <p className="text-gray-600 mb-1">{user.email}</p>
                    <p className="text-[#d84315] font-bold mb-3">
                      {user.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No Users available
            </div>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={pageNumber === 1}
            className="bg-[#d84315] hover:bg-[#bf360c] text-white px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!users}
            className={`flex items-center gap-2 px-4 py-2 rounded-md 
    ${
      users
        ? "bg-[#d84315] hover:bg-[#bf360c] text-white"
        : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserComponent;
