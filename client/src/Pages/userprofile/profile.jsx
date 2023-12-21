import React from "react";

const Profile = () => {
  return (
    <div className="border-2 p-6 rounded-md  mx-auto">
      <div className="mb-4">
        <span className="text-xl font-bold">Hello, User!</span>
      </div>
      <div className="">
        <ProfileButton label="My Orders" />
        <ProfileButton label="Favorites" />
        <ProfileButton label="Buy Again" />
        <ProfileButton label="Help Center" />
      </div>
    </div>
  );
};

const ProfileButton = ({ label }) => {
  return (
    <button className=" text-black bg-slate-50  font-semibold py-2 px-4  border-2 m-2 rounded-3xl ">
      {label}
    </button>
  );
};

export default Profile;
