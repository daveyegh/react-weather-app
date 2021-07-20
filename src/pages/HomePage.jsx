import { Button } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";


import '../pages/HomePage.css'

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-text">
        <h1 className="homepage-title">This is Weather App</h1>
        <p className="homepage-subtitle">
          Here you can watch the weather in every city you want. Just go to
          Weather option in header and search for it. Or add city to your list and track them.
        </p>
        <Button><Link className="homepage-link" to="/addCity">Add City</Link></Button>
      </div>
    </div>
  );
}

export default HomePage;