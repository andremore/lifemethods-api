// Import the express app from index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (() => {
	const route = express.Router()
	route.use(express.json())

	route.route('/expenses')
		.get(async (req, res) => {
			try {
				const expensesData = await prisma.expense.findMany()
				const categoriesData = await prisma.category.findMany()

				let expenses = expensesData.map(expense => {
					const category = categoriesData.find(category => category.id === expense.categoryId)
					return {
						...expense,
						category
					}
				})
				res.json(expenses)
			} catch (e) {
				console.error(e)
				res.status(500).json({ error: e })
			}
		})
		.post(async (req, res) => {
			let { authorId, note, amount, categoryId } = req.body

			authorId = parseInt(authorId)
			categoryId = parseInt(categoryId)
			amount = parseFloat(amount)

			const newExpense = await prisma.expense.create({
				data: {
					authorId,
					categoryId,
					note,
					amount
				}
			})
			res.json(newExpense)
		})
		.put(async (req, res) => {
			let expense = req.body

			expense.id = parseInt(expense.id)

			if (expense.authorId) expense.authorId = parseInt(expense.authorId)
			if (expense.categoryId) expense.categoryId = parseInt(expense.categoryId)
			if (expense.amount) expense.amount = parseFloat(expense.amount)

			const updatedExpense = await prisma.expense.update({
				where: {id: expense.id},
				data: expense
			})

			res.json(updatedExpense)
		})
		.delete(async (req, res) => {
			const { id } = req.body
			const deletedExpense = await prisma.expense.delete({ where: { id: parseInt(id) } })

			res.json(deletedExpense)
		})


	route.route('/categories')
		.get(async (req, res) => {
			try {
				const categories = await prisma.category.findMany()
				res.json(categories)
			} catch (e) {
				console.error(e)
				res.status(500).json({ error: e })
			}
		})

	return route
})()

