import CityCard from "./CityCard";

const Result = ({
  searchData,
  showError,
  detailedForecast,
  getDetailedForecast,
  showDetails,
}) => {
  return (
    <>
      {!showError ? (
        searchData.map((data, index) => {
          return (
            <CityCard
              data={data}
              detailedForecast={detailedForecast}
              getDetailedForecast={getDetailedForecast}
              showDetails={showDetails}
              key={index}
            />
          );
        })
      ) : (
        <h2 className="error">No city found, try another query!</h2>
      )}
    </>
  );
};

export default Result;
