import Person from './Person'

const Persons = ({searchResults, onDelete}) => {
  return(
    <>
      {searchResults.map(person => 
      <Person key={person.id} person={person} onDelete={onDelete}></Person>
      )}
    </>
  )
}
export default Persons