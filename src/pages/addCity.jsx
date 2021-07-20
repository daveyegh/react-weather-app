import { Button } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./addCity.css";

function AddCity() {
  const [search, setSearch] = useState("");
  const [cityList, setCityList] = useState([]);
  const [favoriteList, setfavoriteList] = useState([]);

  useEffect(() => {
    let localStorageItems = JSON.parse(localStorage.getItem("cities"));
    setCityList(localStorageItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cityList));
  }, [cityList]);

  const handleAdd = async (cityName) => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=9b20e657f53843becfe85af78be4c821`
    );
    const weatherData = await result.data;
    setCityList([...cityList, weatherData]);
    console.log(cityList);
  };

  const handleDelete = (item) => {
    setCityList(cityList.filter((city) => city.id !== item.id));
  };

  const dateFormat = (date) => {
    let dateToFormat = new Date(date * 1000);
    let normalDate =
      dateToFormat.getHours() +
      ":" +
      dateToFormat.getMinutes() +
      ":" +
      dateToFormat.getSeconds();
    return normalDate;
  };

  const addFavorite = (item) => {
    setfavoriteList([...favoriteList, item]);
    favoriteList.some((city, index) => {
      return city.id != item.id;
    });
  };

  return (
    <div className="addcity">
      <div className="addcity-top">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="City name"
          className="addcity-input form-control"
        />
        <Button onClick={() => handleAdd(search)}>Add City</Button>
      </div>
      <div className="addcity-clear">
        <Button
          onClick={() => {
            localStorage.clear();
            setCityList([]);
          }}
        >
          Clear All Cities
        </Button>
      </div>
      <div className="addcity-favorite">
        <h3 className="addcity-favorite-title">Favorite Countries</h3>
        <div className="addcity-fav-list">
          {favoriteList.map((item, index) => {
            return (
              <div className="addcity-fav-item" key={item.id}>
                <div className="addcity-top">
                  <h3 className="addcity-title">{item.name}</h3>
                  <Button
                    color="danger"
                    className="addcity-delete"
                    onClick={() => {
                      handleDelete(cityList[index]);
                    }}
                  >
                    delete
                  </Button>
                  <Button
                    onClick={() => {
                      addFavorite(item);
                    }}
                    className="addcity-favorite"
                    color="info"
                  >
                    &#9829;
                  </Button>
                </div>
                <div className="addcity-content">
                  <p>Temperature: {item.main.temp}</p>
                  <p>Max temperature: {item?.main?.temp_max}</p>
                  <p>Min temperature: {item?.main?.temp_min}</p>
                  <p>Sunrise: {dateFormat(item?.sys?.sunrise)}</p>
                  <p>Sunset: {dateFormat(item?.sys?.sunset)}</p>
                </div>
                <Button>
                  <Link className="addcity-button" to={`/cities/${item.name}`}>
                    More Info
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="addcity-cities">
        {!cityList?.length ? (
          <h1 className="addcity-nothing">Add cities to your list.</h1>
        ) : (
          cityList.map((item, index) => {
            return (
              <div className="addcity-item" key={item.id}>
                <div className="addcity-top">
                  <h3 className="addcity-title">{item.name}</h3>
                  <Button
                    color="danger"
                    className="addcity-delete"
                    onClick={() => {
                      handleDelete(cityList[index]);
                    }}
                  >
                    delete
                  </Button>
                  <Button
                    onClick={() => {
                      addFavorite(item);
                    }}
                    className="addcity-favorite"
                    color="info"
                  >
                    &#9829;
                  </Button>
                </div>
                <div className="addcity-content">
                  <p>Temperature: {item.main.temp}</p>
                  <p>Max temperature: {item?.main?.temp_max}</p>
                  <p>Min temperature: {item?.main?.temp_min}</p>
                  <p>Sunrise: {dateFormat(item?.sys?.sunrise)}</p>
                  <p>Sunset: {dateFormat(item?.sys?.sunset)}</p>
                </div>
                <Button>
                  <Link className="addcity-button" to={`/cities/${item.name}`}>
                    More Info
                  </Link>
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AddCity;
