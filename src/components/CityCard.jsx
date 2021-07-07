import DetailedCard from "./DetailedCard";
import key from "weak-key";
const CityCard = ({ data, detailedForecast }) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, temp_min, temp_max },
    weather,
  } = data;

  return (
    <>
      <article
        key={key(data)}
        className={temp >= 18 ? `city-card` : `city-card cold`}
      >
        <header className="city-card__header">
          <p>
            {name} ({country})
          </p>
        </header>
        <div className="city-card__main">
          <p>{temp} &#8451;</p>
        </div>
        <div className="city-card__additional">
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
              <div key={key(weather)}>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt="current weather"
                />
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      </article>

      {detailedForecast.map((details) => {
        return <DetailedCard details={details} key={key(details)} />;
      })}
    </>
  );
};

export default CityCard;
