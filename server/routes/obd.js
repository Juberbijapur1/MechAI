const express = require('express')
const router = express.Router()
const errorCodes = require('../data/errorCodes.json')

// Simulated live OBD data
const getLiveData = () => ({
  RPM: Math.floor(Math.random() * 1000) + 2000,
  engineTemp: Math.floor(Math.random() * 20) + 85,
  fuelPressure: Math.floor(Math.random() * 10) + 40,
  batteryVoltage: 12.6,
  speed: Math.floor(Math.random() * 60),
  timestamp: new Date().toISOString()
})

// Get live sensor data
router.get('/live', (req, res) => {
  res.json(getLiveData())
})

// Get error codes with details
router.get('/errors', (req, res) => {
  const codes = ["P0301", "P0420", "P0171"]
  const result = codes.map(code => ({
    code,
    ...errorCodes[code]
  }))
  res.json({ errors: result })
})

// Get single error code detail
router.get('/errors/:code', (req, res) => {
  const { code } = req.params
  if (errorCodes[code]) {
    res.json({ code, ...errorCodes[code] })
  } else {
    res.status(404).json({ message: 'Error code not found' })
  }
})

module.exports = router