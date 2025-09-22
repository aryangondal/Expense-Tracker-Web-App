import React, { useState } from 'react'

export default function Navbar({ totals, setFilters, filters, addCategory, categories }) {
  const [newCat, setNewCat] = useState('')

  return (
    <header className="card" style={{ borderRadius: 0 }}>
      <div className="container grid grid-3">
        <div>
          <h1 style={{ margin: 0 }}>💸 Expense Tracker</h1>
          <div style={{ color: 'var(--muted)' }}>Total in view: £{totals}</div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
          <input type="date" value={filters.from} onChange={e => setFilters(f => ({ ...f, from: e.target.value }))} />
          <input type="date" value={filters.to} onChange={e => setFilters(f => ({ ...f, to: e.target.value }))} />
          <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
          </select>
          <input placeholder="Search note/category" value={filters.q} onChange={e => setFilters(f => ({ ...f, q: e.target.value }))} />
        </div>
        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
          <input placeholder="New category" value={newCat} onChange={e => setNewCat(e.target.value)} />
          <button onClick={() => { if (newCat.trim()) { addCategory(newCat.trim()); setNewCat('') } }}>Add</button>
        </div>
      </div>
    </header>
  )
}
