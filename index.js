const express = require('express')
const nm = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = 4000

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Controll-Allow-Methods", "*")
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/send-email', (req, res) => {
  const {
    name,
    company,
    email,
    message
  } = req.body

  const transporter = nm.createTransport(
    {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    }
  )

  transporter.sendMail(
    {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `${name} ${company ? `from ${company} ` : ''} is contacting you from your portfolio site.`,
      text: `${message}\nemail: ${email}`
    },
    (err, info) => {
      if (err) {
        console.log(err)
        res.send(err)
      } else {
        console.log(info)
      }
    }
  )

  res.status(200).send()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
