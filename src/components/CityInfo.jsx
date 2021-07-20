import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Collapse,
} from "reactstrap";

import "./CityInfo.css";
import "leaflet/dist/leaflet.css";

function CityInfo({ match }) {
  const [weather, setWeather] = useState({});
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    let cityName = match.params.name.toLowerCase();
    getForecastInfo(cityName);
  }, []);

  const getForecastInfo = async (name) => {
    //
    const result =
      await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=e3a7e29b01fb441f8bd181821211307&q=${name}&days=16&aqi=no&alerts=no
        `);
    const forecastInfo = await result.data;
    setWeather(forecastInfo);
    console.log(forecastInfo);
    console.log([forecastInfo?.location?.lat, forecastInfo?.location?.lon]);
  };

  const formatHours = (time) => {
    const hours = new Date(time);
    const formatedHours =
      hours.getHours() +
      ":" +
      (hours.getMinutes() < 10 ? "0" : "") +
      hours.getMinutes();
    return formatedHours;
  };

  const toggle = () => setOpen(!isOpen);

  return (
    <>
      <div className="cityinfo">
        <div className="cityinfo__container">
          <div className="cityinfo__top">
            <div className="cityinfo__name">
              <h4>{weather?.location?.name}</h4>
              <h5>Region: {weather?.location?.region}</h5>
              <p>Local Time: {weather?.location?.localtime}</p>
            </div>
            <div className="cityinfo__update">
              <p>Last Updated: {weather?.current?.last_updated}</p>
            </div>
          </div>
          <div className="cityinfo__middle">
            <div className="cityinfo__forecast">
              {weather?.forecast?.forecastday.map((item) => {
                return (
                  <>
                    <div className="cityinfo__forecast-item">
                      <Card>
                        <div className="cityinfo__forecast-title">
                          <img
                            className="cityinfo__forecast-img"
                            src={item.day.condition.icon}
                            alt="Card cap"
                          />
                          <CardTitle tag="h5">Date: {item.date}</CardTitle>
                        </div>
                        <CardBody>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">
                            {item.day.condition.text}
                          </CardSubtitle>
                          <CardText>
                            <p>Max temperature: {item.day.maxtemp_c}℃</p>
                            <p>Min temperature: {item.day.mintemp_c}℃</p>
                            <p>Sunrise: {item.astro.sunrise}</p>
                            <p>Sunset: {item.astro.sunset}</p>
                          </CardText>
                          <Button
                            onClick={() => {
                              toggle();
                            }}
                          >
                            More Info
                          </Button>
                          <Collapse isOpen={isOpen}>
                            <div className="cityinfo__forecast-hours">
                              {item?.hour.map((hour) => {
                                return <div className="cityinfo__forecast-hour">
                                  <img src={hour?.condition?.icon} className="cityinfo__forecast-img" alt="" />
                                  <h5 className="cityinfo__forecast-title">
                                    {formatHours(hour?.time)}
                                  </h5>
                                  <p>{hour?.temp_c}℃</p>

                                </div>;
                              })}
                            </div>
                          </Collapse>
                        </CardBody>
                      </Card>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {weather?.location && (
            <div className="cityinfo__map">
              <MapContainer
                className=""
                center={[weather?.location?.lat, weather?.location?.lon]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CityInfo;
