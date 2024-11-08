import React from "react";

import SideBar from "@/components/SideBar";
import EditProfileUser from "@/components/EditProfileUser";
const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <EditProfileUser />
    </div>
  );
};

export default Page;
