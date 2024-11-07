import EditProfileUser from "@/app/profile/EditProfileUser";
import SideBar from "@/components/SideBar";
import React from "react";

const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <EditProfileUser />
    </div>
  );
};

export default Page;
