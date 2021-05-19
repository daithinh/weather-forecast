import DetailedCard from "./DetailedCard";

const CityCard = ({
  data,
  detailedForecast,
  getDetailedForecast,
  showDetails,
}) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, temp_min, temp_max },
    weather,
    id,
  } = data;
  let defaultClass = `city-card`;
  return (
    <>
      <article
        className={temp >= 18 ? defaultClass : `${defaultClass} cold`}
        key={id}
      >
        <header className="city-card__header">
          <p>
            {name} ({country})
          </p>
        </header>
        <div className="city-card__temps-main">
          <p>{temp} &#8451;</p>
        </div>
        <div className="city-card__temps">
          <p>
            <span>Real feel:</span> {feels_like} &#8451;
          </p>
          <p>
            <span>Min:</span> {temp_min} &#8451; / <span>Max:</span> {temp_max}{" "}
            &#8451;
          </p>
        </div>
        <div className="city-card__description">
          {weather.map(({ icon, description }) => {
            return (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt="current weather"
                />
                <p>{description}</p>
              </>
            );
          })}
        </div>

        <button className="get-detailed-forecast" onClick={getDetailedForecast}>
          7 days forecast
        </button>
      </article>

      {detailedForecast && showDetails
        ? detailedForecast.map((details, index) => {
            return <DetailedCard details={details} key={index} />;
          })
        : ""}
    </>
  );
};

export default CityCard;
