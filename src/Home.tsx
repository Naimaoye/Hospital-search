/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import './App.css';
import HospitalList from "./components/HospitalList";
import { firestore } from './firebase';
import History from "./components/History";

/* For autocomplete API */

export const Home: React.FC = () => {
  const {
    value,
    suggestions: {status, data},
    setValue
} = usePlacesAutocomplete();

/* Set app states */

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [distance, setDistance] = useState<string | number>("1000");
  const [hospitals, setHospitals] = useState([{
    "id": "",
    "name": "",
    "rating": "",
    "user_ratings_total": "",
    "vicinity": ""
}]);
 const [searchType, setSearchType] = useState<string>('hospital');
 const [history, setHistory] = useState<any>([]);
 const currentUser = localStorage.getItem('user');
 const userId = JSON.stringify(currentUser);


useEffect(() => {
const getHospitals = async () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${distance}&types=health&name=${searchType}&key=AIzaSyBEnXuoaWR0E7pKgnbgJqKJJZCV4er09n0`
  let response = await fetch(proxyurl + url);
  return await response.json();
};
getHospitals()
            .then(hospital => {
            setHospitals(hospital.results);
            });

            firestore
            .collection('medicals')
            .add({
              distance,
              searchType,
              location: value,
              lat,
              lng,
              user: currentUser
            });

              const query = `
              query {
                getHistory(id: ${userId}) {
                  searchType
                  location
                  user
                  distance
                    lat
                  lng
                  id
                }
              }
            `;
            const url = 'https://us-central1-enye2-f7389.cloudfunctions.net/api';
            const opts = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ query })
            };
            fetch(url, opts)
              .then(res => res.json())
              .then(res => setHistory(res.data.getHistory))
              .catch(console.error);
            
}, [distance, lat, lng, searchType]);

const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
setValue(e.target.value);
};

const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
setDistance(event.target.value as number);
};

const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  setSearchType(event.currentTarget.value as string);
  };
  
const handleSelect = (val: string): void => {
setValue(val, false);

/* Get users location */

getGeocode({address: val})
  .then(results => getLatLng(results[0]))
  .then(({lat, lng}) => {
      console.log({lat, lng, distance});
      setLat(lat);
      setLng(lng);
  }).catch(error => {
  console.log(error)
});
};

/* Get users search history */

const renderHistory = (id: string) => {
  history.map((el: any) => {
    console.log("el",el);
    if (el.id === id) {
      setValue(el.location);
      setDistance(el.distance);
      setSearchType(el.searchType);
      setLat(el.lat);
      setLng(el.lng);
     
      const getHospitals = async () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${distance}&types=health&name=${searchType}&key=AIzaSyBEnXuoaWR0E7pKgnbgJqKJJZCV4er09n0`
        let response = await fetch(proxyurl + url);
        return await response.json();
      };
      getHospitals()
                  .then(hospital => {
                  setHospitals(hospital.results);
                  });
    }
    return true;
  });
};

/* Rendering autocompleteAPI suggestions */

const renderSuggestions = (): JSX.Element => {
  const suggestions = data.map(({id, description}: any) => (
      <ComboboxOption key={id} value={description}/>
  ));

  return (
      <>
          {suggestions}
          <li className="logo">
              <img
                  src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
                  alt="Powered by Google"
              />
          </li>
      </>
  );
};
  
  return (
      <section className="main">
            <div className="header">
                <p className="title">Hospitals search</p>
                <p className="title-bottom">Know the hospitals around you in case of emergency</p></div>
            <section className="page-body">
              <div className="left-view">
              <div className="top">
                <Combobox onSelect={handleSelect} aria-labelledby="demo" className="search" >
                <ComboboxInput className="input"
                    value={value}
                    onChange={handleInput}
                    placeholder="Enter your search area e.g ikeja"
                />
                <ComboboxPopover className="popover">
                    <ComboboxList className="combolist">{status === "OK" && renderSuggestions()}</ComboboxList>
                </ComboboxPopover>
                </Combobox>
              <div className="custom-select">
                <select className="selected" value={searchType} onChange={handleSelectChange}>
                  <option className="select-items" value="hospital">Hospital</option>
                  <option className="select-items" value="pharmacy">Phamarcy</option>
                  <option className="select-items" value="medical office">Medical Offices</option>
                  <option className="select-items" value="clinic">Clinics</option>
                </select>
              </div>
              </div>
            <div className="form">
            <FormControl component="fieldset">
                <FormLabel component="legend">Distance</FormLabel>
                <RadioGroup row={true} aria-label="Range" name="range" value={distance} onChange={handleChange}>
                    <FormControlLabel value="1000" control={<Radio/>} label="1km"/>
                    <FormControlLabel value="2000" control={<Radio/>} label="2km"/>
                    <FormControlLabel value="5000" control={<Radio/>} label="5km"/>
                    <FormControlLabel value="10000" control={<Radio/>} label="10km"/>
                </RadioGroup>
            </FormControl>
            </div> 
          {/* <div className="search-result"> */}
            <History history={history} renderHistory={renderHistory} />
            </div>
            <div className="right-view">
            <HospitalList hospitals={hospitals} />
            </div>
          {/* </div> */}
      </section>
      </section>
  );
};

export default Home;