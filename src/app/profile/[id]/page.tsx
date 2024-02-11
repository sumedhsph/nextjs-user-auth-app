import React from "react";

function UserProfile({ params }: any) {
  return (
    <div>
      <p className="text-4xl">Profile id: {params.id}</p>
    </div>
  );
}

export default UserProfile;
