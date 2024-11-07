import Link from "next/link";
import React from "react";

const ProfileUser = () => {
  return (
    <div>
      <Link href="/profile/edit">
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default ProfileUser;
