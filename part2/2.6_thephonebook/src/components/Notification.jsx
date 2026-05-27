const Notification = ({ message, error }) => {

  const style = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
}
  if (error === true) {
    style.color = 'red'
  }
  else{
    style.color = 'green'
  }

  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification