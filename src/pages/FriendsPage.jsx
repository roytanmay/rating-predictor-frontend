import { useEffect, useState } from "react";
import { notification } from "antd";
import "./friendsPage.css";
import UserDetails from "../components/UserDetail";

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [friend,setFriend] = useState("");

  useEffect(() => {
    const friends = JSON.parse(localStorage.getItem("lc_users")) || [];
    console.log(friends);
    setUsers(friends);
  }, []);

  // useEffect(() => {
  //   setUsers(users);
  // }, [users]);
  const addFriend=async (event)=>{
    event.preventDefault();
    try {
      if (friend.trim().length === 0) {
        alert("Enter valid username");
        return;
      }

      const lcUsers = JSON.parse(localStorage.getItem("lc_users")) || [];
      if (lcUsers.includes(friend)) {
        
        notification["success"]({
          message: `Account is already added`,
          duration: 3,
        });
      } else {
        // console.log(userId);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${friend}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: friend,
          }),
        });
        
        const data = await response.json();

       // console.log(data);
        if (response.status === 404) {
           
          notification["error"]({
            message: "Enter valid username",
            duration: 3,
          });
        } else if (response.status === 500) {
          console.log(response.status);
          notification["error"]({ message: data.message, duration: 3 });
        } else if (response.status === 200) {
          lcUsers.push(friend);
          localStorage.setItem("lc_users", JSON.stringify(lcUsers));
          notification["success"]({ message: "Friend Added", duration: 3 });
          // setChanged(!changed);
        }
        else{
            // console.log(data.status)
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setFriend("");
  }

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
    <>
    
    <div className="search-friend-container">
    <form className="search-form" onSubmit={addFriend}>
      <input
        className="search-input"
        placeholder="username"
        type="text"
        value={friend}
        onChange={(e) => {
          setFriend(e.target.value);
        }}
      ></input>
      <button type="submit" className="search-button">
        Add Friend
      </button>
    </form>
  </div> 


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
    </>
  );
};

export default FriendsPage;
