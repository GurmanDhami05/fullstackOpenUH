import { useState, useEffect } from "react";
import axios from "axios";

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
          filteredCountires.map((c) => <li key={c.id}>{c.name}</li>)
        )}
      </div>
    </div>
  );
};

export default App;
