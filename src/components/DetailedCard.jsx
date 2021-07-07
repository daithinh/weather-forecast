import React from "react";
import key from "weak-key";

const DetailedCard = ({ details }) => {
  return (
    <div className="details-cards-cont">
      {details
        ? details.daily.map((days, dayOfWeek) => {
            const {
              temp: { day, eve, min, max },
              weather,
              humidity,
              wind_speed,
              dew_point,
            } = days;
            const newDay = new Date();
            const today = newDay.getDate();
            newDay.setDate(today + dayOfWeek);
            return (
              <article className="details-cards__card" key={key(days.temp)}>
                <header>
                  <p>
                    {newDay.toLocaleString("en-us", { weekday: "long" })}{" "}
                    <span>({newDay.toLocaleDateString()})</span>
                  </p>
                </header>
                <div className="details-cards__card--temps">
                  <p>
                    <span>Min:</span> {min}&#8451; / <span>Max:</span> {max}
                    &#8451;
                  </p>
                  <p>
                    <span>Day:</span> {day}&#8451;
                  </p>
                  <p>
                    <span>Evening:</span> {eve}&#8451;
                  </p>
                </div>

                <div className="details-cards__card--wind">
                  <p>
                    <span>Wind speed:</span> {wind_speed}
                  </p>
                  <p>
                    <span>Humidity:</span> {humidity}
                  </p>
                  <p>
                    <span>Dew point:</span> {dew_point}
                  </p>
                </div>

                {weather.map(({ description, icon }) => {
                  return (
                    <div
                      className="details-cards__card--description"
                      key={key(weather)}
                    >
                      <img
                        src={`http://openweathermap.org/img/wn/${icon}.png`}
                        alt="Current weather"
                      />
                      <p>{description}</p>
                    </div>
                  );
                })}
              </article>
            );
          })
        : null}
    </div>
  );
};

export default DetailedCard;
