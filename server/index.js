const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Simulated OBD data
const simulatedOBD = {
  errorCodes: ["P0301", "P0420", "P0171"],
  RPM: 2500,
  engineTemp: 95,
  fuelPressure: 45,
  batteryVoltage: 12.6
}

// Route 1 — Get live OBD data
app.get('/api/obd/live', (req, res) => {
  res.json(simulatedOBD)
})

// Route 2 — Get error codes
app.get('/api/obd/errors', (req, res) => {
  res.json({ codes: simulatedOBD.errorCodes })
})

app.listen(3001, () => {
  console.log('MechAI server running on port 3001')
})