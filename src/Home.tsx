import React, { useState, useEffect } from 'react';
import './App.css';
import { HospitalProps } from "./components/Interfaces";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";

export const Home: React.FC = () => {
  const [radius, setRadius] = useState<string>("1");
  const [hospitals, setHospitals] = useState<Array<HospitalProps>>([]);
  const [cord, setCord] = useState<string>("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      console.log("geolocation is available");
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setCord(`${latitude}, ${longitude}`);
      });
    } else {
      console.log("geolocation is not available");
    }
  };


  const searchHospital = (event: any) => {
    const key = process.env.REACT_APP_API_KEY;
    let obj = {
      type: "CIRCLE",
      position: cord,
      radius,
    };
    let json_obj = JSON.stringify(obj);

    fetch(
      "https://api.tomtom.com/search/2/categorySearch/hospital.json?key=" +
        key +
        "&geometryList=[" +
        json_obj +
        "]"
    )
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data.results);
      })
      .catch((e) => console.log(e));
  };

  return (
      <section className="main">
            <div className="header">
                <p className="title">Hospitals search</p>
                <p className="title-bottom">Know the hospitals around you in case of emergency</p></div>
            <section className="page-body">
      <Search
        searchHospital={searchHospital}
        onChange={(e) => setRadius(e.target.value)}
        radius={radius}
      />
      <HospitalList hospitals={hospitals} />
      </section>
      </section>
  );
};

export default Home;