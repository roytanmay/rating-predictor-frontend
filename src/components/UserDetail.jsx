import { useEffect, useState } from "react";
import "./userDetail.css";
import axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";

export default function UserDetails({ id, onDelete }) {
  const [userDetails, setUserDetails] = useState({
    totalSolved: "",
    totalEasy: "",
    totalMedium: "",
    totalHard: "",
    easySolved: "",
    mediumSolved: "",
    hardSolved: "",
    acceptanceRate: "",
    latestSubmissionCount: "",
    latestSubmissionTime: "",
  });

  const convertUnixTimestampToDate = (unixTimestamp) => {
    const dateTime = new Date(unixTimestamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = dateTime.getFullYear();
    const month = months[dateTime.getMonth()];
    const date = dateTime.getDate();
    const requiredDate = date + "/" + month + "/" + year;
    return requiredDate;
  };

  useEffect(() => {
    axios
        .get(`${process.env.REACT_APP_LEETCODE_API_URL}/${id}`)
      // .get(`https://leetcode-stats-api.herokuapp.com/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          const submissions = response.data.submissionCalendar;
          const latestSubmissionCount =
            submissions[
              Object.keys(submissions)[Object.keys(submissions).length - 1]
            ];
          const latestSubmissionTime = convertUnixTimestampToDate(
            Object.keys(submissions)[Object.keys(submissions).length - 1]
          );

          // console.log(response.data);
          setUserDetails({
            ...UserDetails,
            totalSolved: response.data.totalSolved,
            easySolved: response.data.easySolved,
            totalEasy: response.data.totalEasy,
            mediumSolved: response.data.mediumSolved,
            totalMedium: response.data.totalMedium,
            hardSolved: response.data.hardSolved,
            totalHard: response.data.totalHard,
            acceptanceRate: response.data.acceptanceRate,
            latestSubmissionCount: latestSubmissionCount,
            latestSubmissionTime: latestSubmissionTime,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>  
      <div className="userDetailsBox">
        <FaRegWindowClose
          className="closeIcon"
          size={22}
          onClick={() => {
            onDelete(id);
          }}
        />
        <div className="userIdDiv">
          <a
            className="userId"
            href={`https://leetcode.com/${id}`}
            target="_blank"
          >
            {id}
          </a>
        </div>
        <div className="easySolved">
          Easy Solved: &emsp;
          {userDetails.easySolved && (
            <span>
              {userDetails.easySolved}/{userDetails.totalEasy}
            </span>
          )}
        </div>
        <div className="mediumSolved">
          Medium Solved: &emsp;{" "}
          {userDetails.mediumSolved && (
            <span>
              {userDetails.mediumSolved}/{userDetails.totalMedium}
            </span>
          )}
        </div>
        <div className="hardSolved">
          Hard Solved: &emsp;{" "}
          {userDetails.hardSolved && (
            <span>
              {userDetails.hardSolved}/{userDetails.totalHard}
            </span>
          )}
        </div>
        <div className="acceptanceRate">
          Acceptance Rate: &emsp;{" "}
          {userDetails.acceptanceRate && (
            <span>{userDetails.acceptanceRate}%</span>
          )}
        </div>
        <div className="todaySubmissionCount">
          Latest Submission: &emsp;
          <span className="submissionCount">
            {userDetails.latestSubmissionCount}
          </span>{" "}
          {userDetails.latestSubmissionTime && (
            <span className="submissionTime">
              ({userDetails.latestSubmissionTime})
            </span>
          )}
        </div>
      </div>
    </>
  );
}