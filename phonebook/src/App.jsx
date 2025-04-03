import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
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
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.findIndex((person) => person.name.toLowerCase() === newPerson.name.toLowerCase()) !== -1) {
      alert(`${newPerson.name} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
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
      <Numbers search={search} persons={persons} />
    </div>
  )
}

export default App