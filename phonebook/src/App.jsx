import { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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
      if (confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personAdded = persons.find((person) => person.name === newPerson.name)
        personServices
          .update(newPerson, personAdded.id)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.name === newPerson.name ? returnedPerson : person))
            setSuccessMessage(`Numbed of ${returnedPerson.name} modified`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(() => {
            alert(`${newPerson.name} is not registered in the server. Deletion of ${newPerson.name}`)
            setPersons(persons.filter(person => person.name !== newPerson.name))
          })
      }
    } else {
      personServices
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setSuccessMessage(`Added ${addedPerson.name}`)

          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personServices
        .del(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch(() => {
          alert(`${name} don't exist on the server. Deletion of ${name}`)
          setPersons(persons.filter((person) => person.name !== name))
        })
    }
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification successMessage={successMessage} />
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