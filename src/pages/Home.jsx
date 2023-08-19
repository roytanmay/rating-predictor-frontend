import React, { useEffect, useState } from "react";
import ContestList from "../components/ContestList";
import ContestSearch from "../components/ContestSearch";
import Spinner from "../components/Spinner";

const Home = () => {
  const [data, setData] = useState(null);

  const getContests = async () => {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getContests().catch((err) => {
      setData(null);
      console.log(err);
    });
  }, []);

  console.log(data);

  const contestList = data ? (
    <div>
      <ContestList data={data} />
    </div>
  ) : (
    <Spinner />
  );

  return (
    <div>
      <ContestSearch data={data} />
      {contestList}
    </div>
  );
};

export default Home;
