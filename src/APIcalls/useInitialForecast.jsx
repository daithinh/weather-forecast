import { useState, useEffect } from "react";

export const useInitialForecast = () => {
  const [initialForecast, setInitialForecast] = useState(Array);
  const [showInitial, setShowInitial] = useState(Boolean);
  const [coordsValue, setCoordsValue] = useState({
    latitude: "",
    longitude: "",
  });
  const apiKey = `2b1dfd97968067e68d497a960d2585ca`;
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
        const call = await fetch(api);
        const result = await call.json();
        setCoordsValue({
          latitude: result.coord.lat,
          longitude: result.coord.lon,
        });

        setInitialForecast([result]);
        setShowInitial(true);
        return [result];
      });
    }

    return;
  }, [apiKey]);

  return {
    initialForecast,
    coordsValue,
    setCoordsValue,
    setShowInitial,
    showInitial,
  };
};
