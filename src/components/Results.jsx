import { useContext } from "react/cjs/react.development";
import MainDataContext from "../contexts/MainDataContext";
import CityCard from "./CityCard";

const Results = () => {
  const { searchData, showError } = useContext(MainDataContext);

  return (
    <>
      {!showError && searchData ? (
        searchData.map((data, index) => {
          return <CityCard data={data} key={index} />;
        })
      ) : (
        <h2 className="error">No city found, try another query!</h2>
      )}
    </>
  );
};

export default Results;
