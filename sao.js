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
  prompts: {
    // This prompt was used for testing. the test will be
    // failed coz 'mockPrompt' cannot get the correct mock
    // prompt value.
    isNewProject: {
      default: isNewProject,
      when: false
    },

    username: {
      message: 'What is your GitHub username?',
      default: ':gitUser:',
      store: true
    },

    email: {
      message: 'What is your GitHub email',
      default: process.env.NODE_ENV === 'test'
        ? 'a@b.com'
        : ':gitEmail:',
      store: true,
      validate: v => /.+@.+/.test(v)
    },

    name: {
      message: 'Project\'s name?',
      default: isNewProject
        ? ':folderName:'
        : name
    },

    description: {
      message: 'Project\'s description?',
      default: description
    },

    title: {
      message: 'Project\'s title?',
      default ({ name }) {
        return name
      },
    },

    base: {
      message: 'Project\'s base url?',
      default ({ name }) {
        return `/${name}/`
      },
    },

    pm: {
      message: 'Choose a package manager',
      choices: ['npm', 'yarn'],
      type: 'list',
      default: 'yarn'
    },
  },

  data ({ pm }) {
    const data = {
      installScript: pm === 'npm'
        ? 'npm install vuepress -D'
        : 'yarn add vuepress -D'
    }
    if (process.env.NODE_ENV !== 'test') {
      // #2 A prompt option with 'when: false'
      // will not be added to the generating context.
      // but will be respected under mockPrompt.
      data.isNewProject = isNewProject
    }
    return data
  },

  filters: {
    'package.json': "isNewProject",
    "gitignore": "isNewProject"
  },

  move: {
    'gitignore': '.gitignore'
  },

  showTip: true,

  post (ctx, stream) {
    const { pm, installScript } = stream.meta.merged

    // inject npm scripts
    if (pkg) {
      if (!pkg.scripts) {
        pkg.scripts = {}
      }
      Object.keys(defaultPkg.scripts).forEach(scriptName => {
        if (!pkg.scripts[scriptName]) {
          pkg.scripts[scriptName] = defaultPkg.scripts[scriptName]
        }
      })
      fs.writeFileSync(
        path.resolve(process.cwd(), 'package.json'),
        JSON.stringify(pkg, null, 2),
        'utf-8'
      )
      tip(`${chalk.cyan('npm scripts')} injected successfully.`)
      console.log(`    Install vuepress：${coloredCommand(installScript)}`)
    }

    console.log(`
      Develop your docs: ${coloredCommand(localizeScript(pm, 'docs:dev'))}\n
      Build dir as static site: ${coloredCommand(localizeScript(pm, 'docs:build'))}\n
      Release you docs: ${coloredCommand(localizeScript(pm, 'docs:release'))}\n`
    )
  }
}

/**
 * Resolve package.json
 * @returns {Object}
 */

function resolvePkg () {
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

function tip (msg) {
  console.log(`\n${chalk.bgGreen(chalk.black(' TIP '))} ${msg}\n`)
}

/**
 *
 * @param {string} pm package manager
 * @param {string} command
 * @returns {string}
 */

function localizeScript (pm, command) {
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

function coloredCommand (cmd) {
  return chalk.blueBright(cmd)
}
