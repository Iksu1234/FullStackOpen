const Filter = ({searchField, onChange}) => {
  return(
    <>
    <div>filter shown with 
      <input value={searchField} onChange={onChange}/>
    </div>
    </>
  )
}

export default Filter