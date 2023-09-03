import React, { useEffect, useState } from "react";
import ContestList from "../components/ContestList";
import ContestSearch from "../components/ContestSearch";
import Spinner from "../components/Spinner";
import Tagline from "../components/Tagline";
import "./home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const getContests = async () => {
    // console.log(process.env.REACT_APP_BACKEND_URL);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getContests().catch((err) => {
      setData(null);
      console.log(err);
    });
  }, []);

  // console.log(data);

  const contestList = data ? (
    <div>
      <ContestList data={data} />
    </div>
  ) : (
    <Spinner />
  );

  return (
    <>
      <Tagline />
      <div className="button-container">
        <button
          className="search-button"
          onClick={() => setIsSearched(!isSearched)}
        >
          Search Contests
        </button>
      </div>
      {isSearched && <ContestSearch data={data} />}
      {contestList}
    </>
  );
};

export default Home;
