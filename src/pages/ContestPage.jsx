import React, { useState } from "react";
import "./contestPage.css";
import { useParams } from "react-router-dom";
import FriendList from "../components/FriendList";
import { notification } from "antd";

const ContestPage = () => {
  const params = useParams();
  const contestName=params.contestName;
  console.log(contestName);

  const words = params.contestName.split("-");

  const capitalizedContestName = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const formattedContestName = capitalizedContestName.join(" ");

  

  return (
    <div>
      <div className="main-container">
        
        <h1 className="contest-name" > <a href={`https://leetcode.com/contest/${contestName}`} target="_blank"> {formattedContestName} </a></h1>
        {/* <div className="search-container">
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
        </div> */}
      </div>
      <FriendList contestName={params.contestName} />
    </div>
  );
};

export default ContestPage;
