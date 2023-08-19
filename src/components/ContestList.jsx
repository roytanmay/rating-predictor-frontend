import "./contestlist.css";
import { Link } from "react-router-dom";

const DataTable = ({ data }) => {
  const serverOffset = new Date().getTimezoneOffset();

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

    return formattedDateTime;
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
              <th>Contest Name</th>
              <th>Start Time</th>
              <th>Official Result</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/contest/${item.titleSlug}`}
                    style={{ textDecoration: "none", color: "#facc15" }}
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{convertTimeformat(item.startTime)}</td>
                <td>{officialResults(item.titleSlug)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
