import React, { useEffect, useMemo, useState } from 'react'
import { api } from './api'
import Navbar from './components/Navbar'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import Charts from './components/Charts'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ from: '', to: '', category: '', q: '' })
  const [loading, setLoading] = useState(false)

  async function loadCategories() {
    const res = await api.get('/categories')
    setCategories(res.data.data)
  }

  async function loadExpenses() {
    setLoading(true)
    const params = {}
    Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v })
    const res = await api.get('/expenses', { params })
    setExpenses(res.data.data)
    setLoading(false)
  }

  useEffect(() => { loadCategories() }, [])
  useEffect(() => { loadExpenses() }, [filters])

  async function addCategory(name) {
    await api.post('/categories', { name })
    await loadCategories()
  }

  async function addExpense(payload) {
    await api.post('/expenses', payload)
    await loadExpenses()
  }

  async function updateExpense(id, payload) {
    await api.put(`/expenses/${id}`, payload)
    await loadExpenses()
  }

  async function deleteExpense(id) {
    await api.delete(`/expenses/${id}`)
    await loadExpenses()
  }

  const totals = useMemo(() => {
    return expenses.reduce((acc, e) => (acc + e.amount), 0).toFixed(2)
  }, [expenses])

  return (
    <div>
      <Navbar totals={totals} setFilters={setFilters} filters={filters} addCategory={addCategory} categories={categories} />
      <main className="container grid grid-2" style={{ marginTop: '1rem' }}>
        <div className="card">
          <h2>Add Expense</h2>
          <ExpenseForm categories={categories} onSubmit={addExpense} />
        </div>
        <div className="card">
          <h2>Insights</h2>
          <Charts filters={filters} />
        </div>
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2>Expenses</h2>
          <ExpenseTable loading={loading} expenses={expenses} categories={categories} onUpdate={updateExpense} onDelete={deleteExpense} />
        </div>
      </main>
    </div>
  )
}
