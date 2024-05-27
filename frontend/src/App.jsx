//import { useState } from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Name from "./components/Name";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";
import ErrorNot from "./components/ErrorNot";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((response) => {
      //console.log('promise fulfilled')
      setPersons(response.data);
    });
  }, []);
  console.log(persons.length);

  const addData = (event) => {
    event.preventDefault();
    let existeNombre = false;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        existeNombre = true;
      }
    }
    if (existeNombre) {
      let conf = window.confirm(
        newName +
          " is already added to phonebook, replace the old number with a new one?"
      );
      if (conf) {
        const person = persons.find((n) => n.name === newName);
        let id = person.id
        console.log(id)
        const changedPersons = { ...person, number: newPhone };
        personService
        .update(id, changedPersons)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName("");
          setNewPhone("");
          setMessage(
            `Updated '${newName}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        }).catch((error) => {
          setErrorMessage(
            `Information of '${person.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
        
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };
      personService.create(personObject).then((response) => {
        console.log(response);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewPhone("");
        setMessage(
          `Added '${newName}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      });
    }
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    //console.log(event.target.value)
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
    if (event.target.value.trim().length) {
      for (let i = 0; i < persons.length; i++) {
        if (
          !persons[i].name
            .toUpperCase()
            .includes(event.target.value.toUpperCase())
        ) {
          persons.splice(i, 1);
        }
      }
    }
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    let name = person.name;
    let conf = window.confirm("Delete " + name);
    console.log(person.id);
    if (conf) {
      //console.log("Confirm:", person.id)
      personService
        .remove(id)
        .then((returnedPerson) => {
          let removedPers = persons.filter(
            (el) => el.name !== returnedPerson.name
          );
          setPersons(removedPers);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of '${person.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNot message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addData={addData}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>
      {persons.map((person) => (
        <Name
          key={person.id}
          name={person}
          removePerson={() => removePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
