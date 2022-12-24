const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (() => {
	const route = express.Router()
	route.use(express.json())

	route.route(['/categories', ('/categories/:id')])
		.get(async (req, res) => {
			try {
				const categories = await prisma.category.findMany()
				res.status(200).json(categories)
			} catch (e) {
				console.error(e)
				res.status(500).json({ error: e })
			}
		})
		.post(async (req, res) => {
			let { name } = req.body

			const newCategory = await prisma.category.create({ data: { name } })

			res.status(201).json(newCategory)
		})

	return route
})()