const Person = ({person, onDelete}) => {

  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete(person)
  }

  return(
    <>
    <p key={person.id}>{person.name} {person.number} <button onClick={handleDeleteClick}>delete</button></p> 
    </>
  )
}

export default Person