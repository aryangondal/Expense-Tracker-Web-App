import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

export default function Charts({ filters }) {
  const [data, setData] = useState({ byCategory: [], byMonth: [] })

  useEffect(() => {
    const params = {}
    if (filters.from) params.from = filters.from
    if (filters.to) params.to = filters.to
    async function load() {
      const res = await api.get('/stats/summary', { params })
      setData(res.data.data)
    }
    load()
  }, [filters.from, filters.to])

  const pieData = {
    labels: data.byCategory.map(d => d._id),
    datasets: [{ data: data.byCategory.map(d => d.total) }]
  }

  const lineData = {
    labels: data.byMonth.map(d => d._id),
    datasets: [{ label: 'Monthly Spend', data: data.byMonth.map(d => d.total) }]
  }

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3>Spend by Category</h3>
        {data.byCategory.length ? <Pie data={pieData} /> : <p>No data.</p>}
      </div>
      <div className="card">
        <h3>Monthly Trend</h3>
        {data.byMonth.length ? <Line data={lineData} /> : <p>No data.</p>}
      </div>
    </div>
  )
}
