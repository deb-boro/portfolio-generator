const fs = require('fs')
const generatePage = require('./src/page-template.js')
const profileDataArgs = process.argv.slice(2, process.argv.length)
const [userName, gitHubName] = profileDataArgs // assignment destruction

fs.writeFile('./index.html', generatePage(userName, gitHubName), (err) => {
  if (err) throw new Error(err)

  console.log('portfolio completed!! Check out index.html to see the output!')
})
