import React from "react";

const DetailedCard = ({ details }) => {
  return (
    <div className="details-cards__cont">
      {details.daily.map((days, dayOfWeek) => {
        const {
          temp: { day, eve },
          weather,
          humidity,
          wind_speed,
        } = days;
        const newDay = new Date();
        const today = newDay.getDate();
        newDay.setDate(today + dayOfWeek);
        return (
          <div className="details-cards__card">
            <header>
              <p>
                {newDay.toLocaleString("en-us", { weekday: "long" })}{" "}
                <span>({newDay.toLocaleDateString()})</span>
              </p>
            </header>
            <div className="details-cards__card-temps">
              <p>
                <span>Day temp:</span> {day}&#8451;
              </p>
              <p>
                <span>Evening temp:</span> {eve}&#8451;
              </p>
            </div>

            <div className="details-cards__card-wind-humidity">
              <p>
                <span>Wind speed:</span> {wind_speed}
              </p>
              <p>
                <span>Humidity:</span> {humidity}
              </p>
            </div>

            {weather.map(({ description, icon }) => {
              return (
                <div className="details-cards__card-description">
                  <p>{description}</p>
                  <img src={`http://openweathermap.org/img/wn/${icon}.png`} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DetailedCard;
