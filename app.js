import { truncate } from 'fs/promises'
import inquirer from 'inquirer'
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler'

const promptUser = () => {
  console.log(
    `
    ===================
    Add a new project
    ===================
    `,
  )
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

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    console.log(portfolioData)
  })

// const fs = require('fs')
// const generatePage = require('./src/page-template.js')
// const pageHTML = generatePage(name, github)

// fs.writeFile('./index.html', pageHTML, (err) => {
//   if (err) throw err

//   console.log('portfolio completed!! Check out index.html to see the output!')
// })

//
