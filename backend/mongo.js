const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@ifete.clnpomb.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (personName != null) {
  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then(result => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
} else {

  Person.find({}).then(result => {
    console.log("phonebook")
    result.forEach(Person => {
      console.log(Person.name, " ", Person.number)
    })
    mongoose.connection.close()
  })

}
