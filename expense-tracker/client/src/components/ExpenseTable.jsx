import React, { useMemo, useState } from 'react'

export default function ExpenseTable({ loading, expenses, categories, onUpdate, onDelete }) {
  const [editRow, setEditRow] = useState(null)
  const catNames = useMemo(() => new Set(categories.map(c => c.name)), [categories])

  if (loading) return <p>Loading…</p>
  if (!expenses.length) return <p>No expenses in this view.</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Note</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(e => (
          <tr key={e._id}>
            <td>{new Date(e.date).toLocaleDateString()}</td>
            <td>
              {editRow === e._id ? (
                <select defaultValue={e.category} onChange={ev => e.category = ev.target.value}>
                  {[...catNames].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              ) : e.category}
            </td>
            <td>
              {editRow === e._id
                ? <input defaultValue={e.note} onChange={ev => e.note = ev.target.value} />
                : e.note}
            </td>
            <td>
              {editRow === e._id
                ? <input type="number" step="0.01" defaultValue={e.amount} onChange={ev => e.amount = Number(ev.target.value)} />
                : `£${e.amount.toFixed(2)}`}
            </td>
            <td style={{ whiteSpace: 'nowrap' }}>
              {editRow === e._id ? (
                <>
                  <button onClick={() => { onUpdate(e._id, { amount: e.amount, note: e.note, category: e.category }); setEditRow(null) }}>Save</button>
                  <button className="ghost" onClick={() => setEditRow(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="ghost" onClick={() => setEditRow(e._id)}>Edit</button>
                  <button className="danger" onClick={() => onDelete(e._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
