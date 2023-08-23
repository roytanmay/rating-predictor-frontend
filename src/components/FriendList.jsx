import { useEffect, useState } from "react";
import { notification } from "antd";
import "./contestlist.css";
import Spinner from "./Spinner";

const FriendList = ({ trigger, contestName }) => {
  // const users = JSON.parse(localStorage.getItem("lc_users")) || [];
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const initialShowDeleteState = Array.from(
    { length: users.length },
    () => false
  );
  const [showDeleteArray, setShowDeleteArray] = useState(
    initialShowDeleteState
  );

  const handleMouseEnter = (index) => {
    const newArray = [...showDeleteArray];
    newArray[index] = true;
    setShowDeleteArray(newArray);
  };

  // useEffect(() => {

  // }, [handleMouseEnter]);

  const handleMouseLeave = (index) => {
    const newArray = [...showDeleteArray];
    setTimeout(() => {
      newArray[index] = false;
      setShowDeleteArray(newArray);
    }, 2000);
  };

  const handleDelete = (index) => {
    // Implement your delete logic here
    // const lcUsers = JSON.parse(localStorage.getItem("lc_users")) || [];
    // if(lcUsers.length>0){
    //   const index = lcUsers.indexOf(index);

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
    // }
  };

  const getUserDetail = async (users) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/getUsers`; // Corrected endpoint URL

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contest: contestName, // Assuming contestName is defined somewhere
          username: users, // Assuming users is defined somewhere
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // if (data.length === 0) {
          //   setData([]);
          // } else {
          //   setData(data);
          // }
          setData(data);
          console.log(data);
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
        });
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("lc_users")) || []);
    // getUserDetail(users);
    console.log(users);
  }, [trigger]);

  useEffect(() => {
    getUserDetail(users);
  }, [users]);

  const handleSort = (columnName) => {
    // Toggle sort direction if clicking the same column
    const newSortDirection =
      sortBy === columnName && sortDirection === "asc" ? "desc" : "asc";

    const sortedData = [...data].sort((a, b) => {
      // const aValue = a[columnName];
      // const bValue = b[columnName];
      // console.log(columnName);
      if (a === null || b === null) {
        return b === null;
      }

      const aValue = a[columnName];
      const bValue = b[columnName];

      if (columnName === "username") {
        if (aValue.toLowerCase() < bValue.toLowerCase())
          return newSortDirection === "asc" ? -1 : 1;
        if (aValue.toLowerCase() > bValue.toLowerCase())
          return newSortDirection === "asc" ? 1 : -1;
        return 0;
      }

      if (aValue < bValue) return newSortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return newSortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortBy(columnName);
    setSortDirection(newSortDirection);

    // console.log(data);
  };

  const FormattedRankPage = (rank) => {
    rank = (rank + 24) / 25;
    return rank.toFixed(0);
  };

  const RankingRedirect = (rank) => {
    const pageNo = FormattedRankPage(rank);
    return `https://leetcode.com/contest/${contestName}/ranking/${pageNo}/`;
  };

  const getFontColor = (deltaRating) => {
    const normalizedValue = Math.min((40 - Math.abs(deltaRating)) / 100, 1);
    const intensity = 255 - Math.round(normalizedValue * 255);
    if (deltaRating === 0) {
      return `rgb(255,255,255)`;
    } else if (deltaRating > 0) {
      return `rgb(0, ${intensity}, 0)`;
    }
    return `rgb(${intensity}, 0, 0)`;
  };

  const convertTimeformat = (time) => {
    const serverOffset = new Date().getTimezoneOffset();
    const incomingDate = new Date(time);
    const localDate = new Date(
      incomingDate.getTime() + Math.abs(serverOffset * 60 * 1000)
    );

    // Extract time components
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");
    const seconds = String(localDate.getSeconds()).padStart(2, "0");

    // Formatted date and time strings
    const formattedDateTime = `${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  };

  return (
    <div className="contest-table">
      <div className="table-container">
        {users.length === 0 ? (
          <h3 style={{ color: "white", textAlign: "center" }}>
            You have no friends added
          </h3>
        ) : data.length === 0 ? (
          <>
            <Spinner />
            <h3 style={{ color: "white", textAlign: "center" }}>
              Please wait! It may take few seconds.
            </h3>
          </>
        ) : !data[0] ? (
          <h3 style={{ color: "white", textAlign: "center" }}>
            No friend participated in this contest
          </h3>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th onClick={() => handleSort("rank")}>Rank</th>
                <th onClick={() => handleSort("username")}>Username</th>
                <th onClick={() => handleSort("score")}>Score</th>
                <th onClick={() => handleSort("finish_time")}>Finish Time</th>
                <th onClick={() => handleSort("old_rating")}>Old Rating</th>
                <th onClick={() => handleSort("delta_rating")}>Delta</th>
                <th onClick={() => handleSort("new_rating")}>New Rating</th>
                <th>Rank Page</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                (item, index) =>
                  item && (
                    <tr key={index}>
                      <td>{(item && item.rank) || ""}</td>
                      <td>
                        <a
                          style={{
                            textDecoration: "none",
                            color: "#f87171",
                          }}
                          href={`https://leetcode.com/${
                            (item && item.username) || ""
                          }`}
                          target="_blank"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={() => handleMouseLeave(index)}
                        >
                          {(item && item.username) || ""}
                        </a>
                        {showDeleteArray[index] && (
                          <span
                            style={{
                              marginLeft: "8px",
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() => handleDelete(index)}
                          >
                            ❌
                          </span>
                        )}
                      </td>
                      <td>{(item && item.score) || ""}</td>
                      <td>
                        {(item && convertTimeformat(item.finish_time)) || ""}
                      </td>
                      <td>
                        {item && item.old_rating
                          ? item.old_rating.toFixed(2)
                          : ""}
                      </td>
                      <td
                        style={{
                          color: getFontColor((item && item.delta_rating) || 0),
                        }}
                      >
                        {item && item.delta_rating
                          ? item.delta_rating.toFixed(2)
                          : ""}
                      </td>
                      <td>
                        {item && item.new_rating
                          ? item.new_rating.toFixed(2)
                          : ""}
                      </td>
                      <td>
                        <a
                          href={item ? RankingRedirect(item && item.rank) : "#"}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "#34d399",
                          }}
                        >
                          {item && item.rank
                            ? `Page - ${FormattedRankPage(item.rank)}`
                            : ""}
                        </a>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FriendList;
