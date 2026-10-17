import { useState, useEffect } from "react";
import personServices from "./services/persons";
import Notification from "./components/Notification";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with:
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
};

const PersonForm = ({
  persons,
  setPersons,
  setNotificationMessage,
  setNotificationType,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = persons.find((user) => user.name === newName);
    if (person) {
      if (
        confirm(
          `${newName} is already added to the Phonebook, replace the old number with the new one`,
        )
      ) {
        const newObj = { ...person, number: newNumber };
        personServices
          .update(person.id, newObj)
          .then((res) => {
            setPersons(persons.map((p) => (p.id === person.id ? res : p)));
            setNewNumber("");
            setNewName("");

            setNotificationType("success");
            setNotificationMessage(`Updated ${res.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 2000);
          })
          .catch((error) => {
            setNotificationType("error");
            setNotificationMessage(
              `information of '${newName}' was already removed from server`,
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber,
    };
    personServices.create(personObj).then((res) => {
      setPersons(persons.concat(res));
      setNewName("");
      setNewNumber("");
      setNotificationType("success");
      setNotificationMessage(`Added ${res.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
    });
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

const Display = ({ filteredPerson, handleDelete }) => {
  return (
    <div>
      {filteredPerson.map((person) => (
        <p key={person.id}>
          {person.name}:{"     "}
          {person.number}
          <button
            onClick={() => handleDelete(person)}
            style={{ marginLeft: "12px" }}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    personServices.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const filteredPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = (person) => {
    if (confirm(`delete ${person.name}`)) {
      personServices.deleteOne(person.id).then((res) => {
        setPersons(persons.filter((p) => p.id !== res.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={search} onChange={setSearch} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
        setNotificationType={setNotificationType}
      />
      <h2>Numbers</h2>
      <Display filteredPerson={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
