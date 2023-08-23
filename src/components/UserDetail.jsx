import { useEffect, useState } from "react";
import "./userDetail.css";
import axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";

export default function UserDetails({ id, onDelete }) {
  const [userDetails, setUserDetails] = useState({
    totalSolved: "",
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
      //   .get(`${process.env.NEXT_PUBLIC_LEETCODE_API_URL}/${id}`)
      .get(`https://leetcode-stats-api.herokuapp.com/${id}`)
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

          console.log(response.data);
          setUserDetails({
            ...UserDetails,
            totalSolved: response.data.totalSolved,
            easySolved: response.data.easySolved,
            mediumSolved: response.data.mediumSolved,
            hardSolved: response.data.hardSolved,
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
              {userDetails.easySolved}/{userDetails.totalSolved}
            </span>
          )}
        </div>
        <div className="mediumSolved">
          Medium Solved: &emsp;{" "}
          {userDetails.mediumSolved && (
            <span>
              {userDetails.mediumSolved}/{userDetails.totalSolved}
            </span>
          )}
        </div>
        <div className="hardSolved">
          Hard Solved: &emsp;{" "}
          {userDetails.hardSolved && (
            <span>
              {userDetails.hardSolved}/{userDetails.totalSolved}
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
