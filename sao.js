const superb = require('superb')
const path = require('path')
const fs = require('fs')

const pkg = resolvePkg()
const { name, description } = pkg.name

module.exports = {
  prompts: {
    name: {
      message: 'Project\'s name?',
      default({ folderName }) {
        return name || folderName
      },
    },
    description: {
      message: 'Project\'s description?',
      default: description
    },
    base: {
      message: 'Project\'s base url?',
      default({ folderName }) {
        return `/${name || folderName}/`
      },
    },
    username: {
      message: 'What is your GitHub username?',
      default: ':gitUser:',
      store: true
    },
    email: {
      message: 'What is your GitHub email?',
      default: ':gitEmail:',
      store: true
    },
    website: {
      message: 'The URL of your website?',
      default({ username }) {
        return `github.com/${username}`
      },
      store: true
    }
  },
  move: {
    'gitignore': '.gitignore'
  },
  showTip: true
}

function resolvePkg () {
  const target = path.resolve(process.cwd(), 'package.json')
  if (fs.existsSync(target)) {
    return require(target)
  }
  return {}
}
