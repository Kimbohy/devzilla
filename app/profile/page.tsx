// import EditProfileUser from "@/components/EditProfileUser";
import ProfileUser from "@/components/ProfileUser";
import SideBar from "@/components/SideBar";
import React from "react";

const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <ProfileUser />
    </div>
  );
};

export default Page;
