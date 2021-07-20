import React, { useEffect, useState } from "react";
import axios from "axios";

import City from "./City";

import "./Weather.css";

function Weather() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);
  const [cityImages, setcityImages] = useState(null);

  const getData = async (city) => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9b20e657f53843becfe85af78be4c821`
    );
    const weatherData = await result.data;
    setCity(weatherData);
    console.log(weatherData);
  };

  const getImages = async (city) => {
    const result = await axios.get(
      `https://pixabay.com/api/?key=22379050-76afee7809a275b145aba340a&q=${city}&image_type=photo&pretty=true&per_page=10`
    );
    const images = await result.data;
    setcityImages(images);
  };

  const getMap = async () => {
  }

  const handleKey = (e) => {
    if (e.keyCode === 13) {
      getData(search);
      getImages(search.toLowerCase());
      console.log("xoski");
    }
  };

  return (
    <div className="weather">
      <h2 className="weather__title">
        One time weather search
      </h2>
      <div className="weather__search">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKey}
          type="text"
          className="form-control"
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            getData(search);
            getImages(search.toLowerCase());
          }}
        >
          Search
        </button>
      </div>
      <div className="weather__info">
        {city === null ? (
          <h3>Search for a city</h3>
        ) : (
          <City
            images={cityImages?.hits}
            country={city.sys.country}
            feelsLike={city.main.feels_like}
            temperature={city.main.temp}
            icon={city?.weather[0].icon}
            name={city.name}
            sunrise={city.sys.sunrise}
            sunset={city.sys.sunset}
            tempMax={city?.main?.temp_max}
            tempMin={city?.main?.temp_min}
          />
        )}
      </div>
    </div>
  );
}

export default Weather;
