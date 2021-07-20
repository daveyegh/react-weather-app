import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardText, Col, Button } from "reactstrap";
import { Swiper } from "swiper";

import "./City.css";
import "swiper/swiper-bundle.css";

function City(props) {
  const {
    name,
    country,
    feelsLike,
    temperature,
    icon,
    sunrise,
    sunset,
    tempMax,
    tempMin,
    images,
  } = props;
  const slides = images;
  console.log(images);

//   for(let i = 0; i =< slides.length; i += 1) {
//     console.log('hello') 
//   }
  return (
    <div className="city">
      <Col style={{ margin: "0 auto" }} sm="7" lg="7">
        <Card body>
          <div className="cityinfo__text">
            <CardTitle tag="h5">
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
              <span>{name}</span>
            </CardTitle>
            <div className="city__country">
              <p>Country: {country}</p>
            </div>
            <div className="city__info">
              <div className="city__info-item">
                <p>
                  Sunrise:{" "}
                  {new Date(sunrise * 1000).getHours() +
                    ":" +
                    new Date(sunrise * 1000).getMinutes() +
                    ":" +
                    new Date(sunrise * 1000).getSeconds()}
                </p>
                <p>
                  Sunset:{" "}
                  {new Date(sunset * 1000).getHours() +
                    ":" +
                    new Date(sunset * 1000).getMinutes() +
                    ":" +
                    new Date(sunset * 1000).getSeconds()}
                </p>
              </div>
              <div className="city__info-item">
                <p>Temperature: {temperature}℃</p>
                <p>Feels Like: {feelsLike}℃</p>
                <p>Max temp: {tempMax}℃</p>
                <p>Min temp: {tempMin}℃</p>
              </div>
            </div>
          </div>
          <div className="city__map">
            
          </div>
          <Link to={`/cities/${name}`}>
            <Button>More Info</Button>
          </Link>
        </Card>
      </Col>
    </div>
  );
}

export default City;
