const Name = ({ name, removePerson  }) => {
    return (
      <>
      <p>{name.name} {name.number} </p>
      <button onClick={removePerson}>Remove</button>
      </>
    )
  }

  export default Name
