import { useEffect, useState } from "react";
import { notification } from "antd";
import "./friendsPage.css";
import UserDetails from "../components/UserDetail";

const FriendsPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const friends = JSON.parse(localStorage.getItem("lc_users")) || [];
    console.log(friends);
    setUsers(friends);
  }, []);

  // useEffect(() => {
  //   setUsers(users);
  // }, [users]);

  const handleDelete = (id) => {
    if (users.length > 0) {
      const index = users.indexOf(id);

      console.log(index);
      if (index > -1) {
        users.splice(index, 1);
      }

      localStorage.setItem("lc_users", JSON.stringify(users));
      notification["success"]({
        message: `Friend removed successfully`,
        duration: 3,
      });
      setUsers(users);
    }
  };

  return (
    <div className="friends-container">
      {users.map((user, key) => {
        return (
          <UserDetails
            key={key}
            id={user}
            onDelete={(id) => handleDelete(id)}
          />
        );
      })}
    </div>
  );
};

export default FriendsPage;
