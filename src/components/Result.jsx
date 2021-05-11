import CityCard from "./CityCard";

const Result = ({
  loading,
  searchData,
  showError,
  detailedForecast,
  getDetailedForecast,
  showDetails,
}) => {
  return (
    <main>
      {showError ? <h2>No city found</h2> : ""}
      {
        loading && !showError
          ? searchData.map((data) => {
              return (
                <CityCard
                  data={data}
                  detailedForecast={detailedForecast}
                  getDetailedForecast={getDetailedForecast}
                  key={data.id}
                  showDetails={showDetails}
                />
              );
            })
          : ""
        // <p>Search for a city</p>
      }
    </main>
  );
};

export default Result;
