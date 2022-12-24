const express = require('express')
const cors = require('cors')
const app = express()

const expensesRoutes = require('./src/routes/expenses')
const categoriesRoutes = require('./src/routes/categories')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('dotenv').config()

const port = process.env.API_PORT || 3000

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.use('/', [expensesRoutes, categoriesRoutes])

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})