import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.findIndex((person) => person.name.toLowerCase() === newPerson.name.toLowerCase()) !== -1) {
      alert(`${newPerson.name} is already added to the phonebook.`)
    } else {
      personServices
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    personServices
      .del(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Search search={search} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Numbers search={search} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App