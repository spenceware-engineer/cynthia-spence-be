const express = require('express')
const nm = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 4000

app.use(cors())

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
      from: 'cynthia.spence.dev@gmail.com',
      to: process.env.GMAIL_SEND_TO,
      subject: `${name} ${company ? `from ${company} ` : ''} is contacting you from your portfolio site.`,
      text: `${message}\nemail: ${email}`
    },
    (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    }
  )

  res.end()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})