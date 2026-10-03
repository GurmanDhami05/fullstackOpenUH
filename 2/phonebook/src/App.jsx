import { useState } from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with:
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
};

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameExists = persons.some((user) => user.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to the Phonebook`);
      return;
    }
    const personObj = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber,
    };
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "12px" }}>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "12px" }}>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Display = ({ filteredPerson }) => {
  return (
    <div>
      {filteredPerson.map((person) => (
        <p key={person.id}>
          {person.name}:{"     "}
          {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: "1", number: "1234567890" },
  ]);

  const [search, setSearch] = useState("");

  const filteredPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={setSearch} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Display filteredPerson={filteredPerson} />
    </div>
  );
};

export default App;
