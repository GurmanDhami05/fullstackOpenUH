import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Find countries:
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
};

const ShowDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} height="200px" />

      <div>
        <WeatherDetails country={country} lat={country.lat} lon={country.lon} />
      </div>
    </div>
  );
};

const ShowList = ({ countries }) => {
  const [showDetail, setShowDetail] = useState(null);
  const handleShow = (country) => {
    setShowDetail(country);
  };

  if (showDetail) {
    return <ShowDetails country={showDetail} />;
  }

  return countries.map((c) => (
    <li key={c.id}>
      {c.name} <button onClick={() => handleShow(c)}>Show</button>
    </li>
  ));
};

const WeatherDetails = ({ country, lat, lon }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    if (lat == null || lon == null) return;

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat,
          lon,
          units: "metric",
          lang: "en",
          appid: apiKey,
        },
      })
      .then((res) => {
        setWeather(res.data);
      });
  }, [lat, lon]);

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temprature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    const request = axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/all`,
    );
    request.then((res) => {
      const countries = res.data.map((n) => ({
        name: n.name.common,
        id: n.name.official,
        area: n.area,
        capital: n.capital,
        languages: n.languages,
        flags: n.flags,
        lat: n.capitalInfo.latlng?.[0],
        lon: n.capitalInfo.latlng?.[1],
      }));
      setCountryNames(countries);
    });
  }, []);

  const filteredCountires = countryNames.filter((c) => {
    return c.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Filter onChange={setSearch} value={search} />
      <div>
        {filteredCountires.length === 1 ? (
          <ShowDetails country={filteredCountires[0]} />
        ) : filteredCountires.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <ShowList countries={filteredCountires} />
        )}
      </div>
    </div>
  );
};

export default App;
