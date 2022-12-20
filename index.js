const express = require('express')
const cors = require('cors')
const app = express()

const expensesRoutes = require('./src/routes/expenses')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('dotenv').config()

const port = process.env.API_PORT || 3000

app.use('/', [expensesRoutes])

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})