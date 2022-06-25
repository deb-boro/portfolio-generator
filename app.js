import inquirer from 'inquirer'
import { writeFile, copyFile } from './utils/generate-site.js'
import generatePage from './src/page-template.js'

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: (nameInput) => {
        if (nameInput) {
          return true
        } else {
          console.log('Please enter your name')
          return false
        }
      },
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your github username?',
      validate: (githubInput) => {
        if (githubInput) {
          return true
        } else {
          console.log('Please enter github username')
          return false
        }
      },
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message:
        'Would you like to enter some information about yourself for an "About" section',
      default: true,
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true
        } else {
          return false
        }
      },
    },
  ])
}

const promptProject = (portfolioData) => {
  console.log(
    `
    ===================
    Add a new project
    ===================
    `,
  )
  if (!portfolioData.projects) {
    portfolioData.projects = []
  }

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project(required)',
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with(check all that apply)',
        choices: [
          'JavaScript',
          'HTML',
          'CSS',
          'ES6',
          'jQuery',
          'Bootstrap',
          'Node',
        ],
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the gihub link for the project(Required)',
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to add another project',
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData)
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData)
      } else {
        return portfolioData
      }
    })
}

// promptUser()
//   .then(promptProject)
//   .then((portfolioData) => {
//     const pageHTML = generatePage(portfolioData)
//     fs.writeFile('./dist/index.html', pageHTML, (err) => {
//       if (err) {
//         console.log(err)
//         return
//       }
//       console.log(
//         'portfolio completed!! Check out index.html to see the output!',
//       )
//       fs.copyFile('./src/style.css', './dist/style.css', (err) => {
//         if (err) {
//           console.log(err)
//           return
//         }
//         console.log('Style sheet copied successfully')
//       })
//     })
//   })
promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    return generatePage(portfolioData)
  })
  .then((pageHTML) => {
    return writeFile(pageHTML)
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse)
    return copyFile()
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse)
  })
  .catch((err) => {
    console.log(err)
  })
