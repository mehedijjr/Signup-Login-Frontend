const Profile = () => {
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  return (
    <section className="w-full max-w-md min-h-screen flex justify-center items-center mx-auto p-4">
      <div className="w-full bg-white shadow-2xl p-6 rounded-md">
        <h2 className="text-3xl text-center font-medium mb-6">Profile</h2>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-xl font-medium">{userName}</p>
          </div>

          <div>
            <p className="text-gray-500">User ID</p>
            <p className="text-sm break-all">{userId}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
