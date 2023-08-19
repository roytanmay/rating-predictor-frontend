import { useEffect, useState } from "react";
import "./contestlist.css";
import Spinner from "./Spinner";

const FriendList = ({ contestName }) => {
  const users = JSON.parse(localStorage.getItem("lc_users")) || [];
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const getUserDetail = async (users) => {
    try {
      const url = "http://localhost:5000/user/getUsers"; // Corrected endpoint URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contest: contestName, // Assuming contestName is defined somewhere
          username: users, // Assuming users is defined somewhere
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
        // Update your state or do something with the data
      } else {
        setData(data);
        console.error("Error fetching user details. Status:", response.status);
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    getUserDetail(users);
  }, []);

  const handleSort = (columnName) => {
    // Toggle sort direction if clicking the same column
    const newSortDirection =
      sortBy === columnName && sortDirection === "asc" ? "desc" : "asc";

    const sortedData = [...data].sort((a, b) => {
      // const aValue = a[columnName];
      // const bValue = b[columnName];
      // console.log(columnName);
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
        {data && data.length > 0 ? (
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
              {data && data.length > 0
                ? data.map(
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
                            >
                              {(item && item.username) || ""}
                            </a>
                          </td>
                          <td>{(item && item.score) || ""}</td>
                          <td>
                            {(item && convertTimeformat(item.finish_time)) ||
                              ""}
                          </td>
                          <td>
                            {item && item.old_rating
                              ? item.old_rating.toFixed(2)
                              : ""}
                          </td>
                          <td
                            style={{
                              color: getFontColor(
                                (item && item.delta_rating) || 0
                              ),
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
                              href={
                                item ? RankingRedirect(item && item.rank) : "#"
                              }
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
                  )
                : null}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default FriendList;