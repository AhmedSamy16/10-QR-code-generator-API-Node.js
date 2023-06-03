import dotenv from "dotenv"
dotenv.config()

import express from "express"
import qrcode from "qrcode"

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.post("/code", async (req, res) => {
    const input = req.body.input.toString()
    try {
        if (!input.trim()) {
            throw new Error('Please provide an input to generate a code for it.')
        }
        const src = await qrcode.toDataURL(input)
        res.status(200).json({
            status: 'success',
            src
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})

app.use('*', (req, res) => {
    res.status(404).json({
        status: "failed",
        message: `Could't find ${req.originalUrl} on server!`
    })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))