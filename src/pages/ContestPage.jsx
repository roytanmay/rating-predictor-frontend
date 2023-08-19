import React, { useState } from "react";
import "./contestPage.css";
import { useParams } from "react-router-dom";
import FriendList from "../components/FriendList";
import { notification } from "antd";

const ContestPage = () => {
  const params = useParams();

  const [userId, setUserId] = useState("");

  const words = params.contestName.split("-");
  const capitalizedContestName = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const formattedContestName = capitalizedContestName.join(" ");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (userId.trim().length === 0) {
        alert("Enter valid username");
        return;
      }

      const lcUsers = JSON.parse(localStorage.getItem("lc_users")) || [];
      if (lcUsers.includes(userId)) {
        
        notification["success"]({
          message: `Account is already added`,
          duration: 3,
        });
      } else {
        // console.log(userId);
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userId,
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
        
          notification["error"]({ message: data.message, duration: 3 });
        } else if (response.status === 200) {
          lcUsers.push(userId);
          localStorage.setItem("lc_users", JSON.stringify(lcUsers));

          notification["success"]({ message: "Friend Added", duration: 3 });
        }
        else{
            // console.log(data.status)
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setUserId("");
  };

  return (
    <div>
      <div className="main-container">
        <h1 className="contest-name">{formattedContestName}</h1>
        <div className="search-container">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              className="search-input"
              placeholder="username"
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            ></input>
            <button type="submit" className="search-button">
              Add Friend
            </button>
          </form>
        </div>
      </div>
      <FriendList contestName={params.contestName} />
    </div>
  );
};

export default ContestPage;
