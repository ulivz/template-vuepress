const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const defaultPkg = require('./template/package.json')

const pkg = resolvePkg()
const isNewProject = !pkg
const { name, description } = pkg || {}

if (pkg) {
  tip('Detected existing project!')
} else {
  tip('You are creating a new project!')
}

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'Project\'s name?',
        default: isNewProject
          ? this.outFolder
          : name
      },

      {
        name: 'description',
        message: 'Project\'s description?',
        default: description
      },

      {
        name: 'username',
        message: 'Your name?',
        default: this.gitUser.name,
      },

      {
        name: 'email',
        message: 'What is your GitHub email',
        default: process.env.NODE_ENV === 'test'
          ? 'a@b.com'
          : this.gitUser.email,
        store: true,
        validate: v => /.+@.+/.test(v)
      },

      {
        name: 'title',
        message: 'Project\'s title?',
        default({ name }) {
          return name
        }
      },

      {
        name: 'base',
        message: 'Project\'s base url?',
        default({ name }) {
          return `/`
        },
      },

      {
        name: 'pm',
        message: 'Choose a package manager',
        choices: ['npm', 'yarn'],
        type: 'list',
        default: 'yarn'
      }
    ]
  },

  actions() {
    return [
      {
        type: 'add',
        files: '**',
        filters: {
          'package.json': isNewProject,
          "gitignore": isNewProject
        }
      },
      {
        type: 'move',
        patterns: {
          'gitignore': '.gitignore'
        }
      },
    ]
  },

  completed() {
    console.log(`Success`)
    // console.log(arguments)
    // const { pm, installScript } = stream.meta.merged
    // console.log(`
    //   Develop your docs: ${coloredCommand(localizeScript(pm, 'docs:dev'))}\n
    //   Build dir as static site: ${coloredCommand(localizeScript(pm, 'docs:build'))}\n
    //   Release you docs: ${coloredCommand(localizeScript(pm, 'docs:release'))}\n`
    // )
  }
}

/**
 * Resolve package.json
 * @returns {Object}
 */

function resolvePkg() {
  if (process.env.NODE_ENV === 'test') {
    return
  }
  const target = path.resolve(process.cwd(), 'package.json')
  if (fs.existsSync(target)) {
    return require(target)
  }
}

/**
 * Simple tip logger
 * @param {string} msg
 */

function tip(msg) {
  console.log(`\n${chalk.bgGreen(chalk.black(' TIP '))} ${msg}\n`)
}

/**
 *
 * @param {string} pm package manager
 * @param {string} command
 * @returns {string}
 */

function localizeScript(pm, command) {
  if (pm === 'npm') {
    return `npm run ${command}`
  }
  return `yarn ${command}`
}

/**
 * Colored command string
 * @param {string} cmd
 * @returns {string}
 */

function coloredCommand(cmd) {
  return chalk.blueBright(cmd)
}
