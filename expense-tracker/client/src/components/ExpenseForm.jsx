import React, { useState } from 'react'

export default function ExpenseForm({ categories, onSubmit }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0]?.name || '')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { amount: Number(amount), category, note, date }
    await onSubmit(payload)
    setAmount(''); setNote('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid" style={{ gap: '.75rem' }}>
      <input type="number" step="0.01" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="" disabled>Select category</option>
        {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
      </select>
      <input placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Add Expense</button>
    </form>
  )
}
