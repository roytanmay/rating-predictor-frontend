import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

import "./contestSearch.css";

const ContestSearch = ({ data }) => {
  const navigate = useNavigate();

  let weekly = [];
  let biweekly = [];

  //   console.log(data);
  let WeeklyLatest = 0;
  let BiWeeklyLatest = 0;
  for (const i in data) {
    const contest = data[i];
    let title = contest.title.split(" ");
    if (title[0] === "Weekly") {
      WeeklyLatest = Math.max(WeeklyLatest, title[2]);
    } else {
      BiWeeklyLatest = Math.max(BiWeeklyLatest, title[2]);
    }
  }
  while (WeeklyLatest > 0) {
    weekly.push(WeeklyLatest);
    WeeklyLatest--;
  }
  while (BiWeeklyLatest > 0) {
    biweekly.push(BiWeeklyLatest);
    BiWeeklyLatest--;
  }

  const [contestType, setContestType] = useState();
  const [contestNo, setContestNo] = useState();

  // console.log(weekly);
  // console.log(biweekly);

  const handleContestType = (event) => {
    setContestType(event.target.value);
    // console.log(contestType);
    // if (event.target.value === "weekly") {
    //   setContestNo(weekly[0]);
    // } else {
    //   setContestNo(biweekly[0]);
    // }
  };

  const handleContestNo = (event) => {
    setContestNo(event.target.value);
  };

  const contestNumberDropDown = () => {
    if (contestType === "weekly") {
      return weekly.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ));
    } else if (contestType === "biweekly") {
      return biweekly.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ));
    }
    return null;
  };

  const handleClick = () => {
    if (!contestType || !contestNo) {
      notification["error"]({
        message: "Enter valid contest type or contest no",
        duration: 3,
      });
      return;
    }

    const titleslug = `${contestType}-contest-${contestNo}`;
    // console.log(titleslug);

    navigate(`/contest/${titleslug}`);
  };

  return (
    // <div className="main-container">
    <div className="dropdown-container  dropdown-enter dropdown-enter-active fade-in">
      <div className="dropdown">
        <label htmlFor="contest-type">Contest Type:</label>
        <select
          id="contest-type"
          value={contestType}
          onChange={handleContestType}
        >
          <option value="">Contest Type</option>
          <option className="dropdown" value="weekly">
            Weekly Contest
          </option>
          <option className="dropdown" value="biweekly">
            Biweekly Contest
          </option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="contest-no">Contest No:</label>
        <select id="contest-no" value={contestNo} onChange={handleContestNo}>
          <option value="">Contest No</option>
          {contestNumberDropDown()}
        </select>
      </div>
      <div>
        <button className="submit-button" onClick={handleClick}>
          Search
        </button>
      </div>
    </div>
    // </div>
  );
};

export default ContestSearch;
