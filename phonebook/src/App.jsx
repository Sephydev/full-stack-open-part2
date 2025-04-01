import { useState } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'May Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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