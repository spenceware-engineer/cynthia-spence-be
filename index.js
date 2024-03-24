const express = require('express')
const nm = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Credentials', true)
//   res.set('Access-Control-Allow-Origin', req.headers.origin)
//   res.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.set(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end()
//   }
//   next()
// })

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
        return res.send(err)
      } else {
        console.log(info)
      }
    }
  )

  return res.status(200).json({ message: 'Success!' })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app
