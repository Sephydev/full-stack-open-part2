const Notification = ({ successMessage }) => {
  const successStyle = {
    borderStyle: "solid",
    borderColor: "green",
    borderRadius: 5,
    backgroundColor: "lightgreen",
    fontSize: 20,
    padding: 10,
    marginBottom: 20
  }
  if (successMessage === null) {
    return null
  }

  return (
    <div style={successStyle}>
      {successMessage}
    </div>
  )
}

export default Notification