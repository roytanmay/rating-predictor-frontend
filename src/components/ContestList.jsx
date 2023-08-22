import "./contestlist.css";
import { Link } from "react-router-dom";

const DataTable = ({ data }) => {
  const serverOffset = new Date().getTimezoneOffset();

  const formatDateTime = (inputDateString) => {
    // Parse the input date string
    const inputDateParts = inputDateString.split(" ");
    const dateParts = inputDateParts[0].split("/");
    const timeParts = inputDateParts[1].split(":");
    const monthIndex = parseInt(dateParts[1]) - 1; // Adjust month index

    // Months array for converting month index to month name
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Determine AM or PM
    const ampm = parseInt(timeParts[0]) >= 12 ? "PM" : "AM";

    // Convert 24-hour time to 12-hour time
    let hour = parseInt(timeParts[0]) % 12;
    hour = hour === 0 ? 12 : hour;

    // Format the date in the desired format
    const formattedDate = `${months[monthIndex]} ${dateParts[0]}, ${dateParts[2]} ${hour}:${timeParts[1]} ${ampm}`;

    return formattedDate; // Output: August 20, 2023 8:00 AM
  };

  const convertTimeformat = (time) => {
    const incomingDate = new Date(time);
    const localDate = new Date(
      incomingDate.getTime() + Math.abs(serverOffset * 60 * 1000)
    );
    // Extract date components
    const day = String(localDate.getDate()).padStart(2, "0");
    const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = localDate.getFullYear();

    // Extract time components
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");
    const seconds = String(localDate.getSeconds()).padStart(2, "0");

    // Formatted date and time strings
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formatDateTime(formattedDateTime);
  };

  //official results
  const officialResults = (contestURL) => {
    const CN = "https://leetcode.cn/contest/";
    const US = "https://leetcode.com/contest/";
    const end = "/ranking/";
    const LCCN = `${CN}${contestURL}${end}`;
    const LCUS = `${US}${contestURL}${end}`;

    return (
      <div className="anchor-container">
        <a
          className="anchor"
          style={{ backgroundColor: "#3b82f6" }}
          href={LCUS}
          target="_blank"
        >
          LCUS
        </a>
        /
        <a
          className="anchor"
          style={{ backgroundColor: "#fb7185" }}
          href={LCCN}
          target="_blank"
        >
          LCCN
        </a>
      </div>
    );
  };

  return (
    <div className="contest-table">
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>Start Time</th>
              <th>Contest Name</th>
              <th>Official Results</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{convertTimeformat(item.startTime)}</td>
                <td>
                  <Link
                    to={`/contest/${item.titleSlug}`}
                    style={{ textDecoration: "none", color: "#facc15" }}
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{officialResults(item.titleSlug)}</td>
                <td>
                  <Link
                    to={`/contest/${item.titleSlug}`}
                    style={{ textDecoration: "none", color: "#facc15" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                    >
                      <path
                        d="M 27.707 16.708 L 18.707 25.708 C 18.317 26.098 17.683 26.098 17.293 25.708 C 16.902 25.317 16.902 24.683 17.293 24.293 L 24.586 17 L 5 17 C 4.448 17 4 16.552 4 16 C 4 15.448 4.448 15 5 15 L 24.586 15 L 17.293 7.708 C 16.902 7.317 16.902 6.683 17.293 6.293 C 17.683 5.902 18.317 5.902 18.707 6.293 L 27.707 15.293 C 27.895 15.48 28.001 15.735 28.001 16 C 28.001 16.265 27.895 16.52 27.707 16.708 Z"
                        fill="#E0E1DD"
                      ></path>
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
