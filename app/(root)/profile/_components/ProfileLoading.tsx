import React from "react";

const ProfileLoading = () => {
  return (
    <div className="p-6 space-y-3 pt-3 animate-pulse animate-duration-1000">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[3rem_1fr] gap-3"
        >
          <div className="bg-primary/15 h-full w-full rounded-sm"></div>
          <div className="">
            <div className="w-1/2 h-4 mt-[2px] mb-2 bg-foreground/15 rounded-sm">
            </div>
            <div className="w-3/4 h-5 mb-[2px] mt-2 bg-foreground/15 rounded-sm"></div>
          </div>
        </div>
      ))}
      <div className="flex items-center p-6 pt-8">
        <div className="bg-primary/15 mx-auto w-[104px] h-9 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;