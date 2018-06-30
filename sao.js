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
    username: {
      message: 'What is your GitHub username?',
      default: ':gitUser:',
      store: true
    },
    email: {
      message: 'What is your GitHub email',
      default: ':gitEmail:',
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
      default({ name }) {
        return name
      },
    },
    base: {
      message: 'Project\'s base url?',
      default({ name }) {
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
  data({ pm }) {
    return {
      isNewProject: !pkg,
      installScript: pm === 'npm'
        ? 'npm install vuepress -D'
        : 'yarn add vuepress -D'
    }
  },
  filters: {
    'package.json': "isNewProject",
    "gitignore": "isNewProject"
  },
  move: {
    'gitignore': '.gitignore'
  },
  showTip: true,
  post(ctx, stream) {
    const { pm, installScript } = stream.meta.merged
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
      console.log(`    Please install vuepres：${stylingCommand(installScript)}`)
    }

    console.log(`
    Develop your docs: ${stylingCommand(localizeScript(pm, 'docs:dev'))}\n
    Build dir as static site: ${stylingCommand(localizeScript(pm, 'docs:build'))}\n
    Release you docs: ${stylingCommand(localizeScript(pm, 'docs:release'))}\n`)
  }
}

function resolvePkg () {
  const target = path.resolve(process.cwd(), 'package.json')
  if (fs.existsSync(target)) {
    return require(target)
  }
}

function tip (msg) {
  console.log(`\n${chalk.bgGreen(chalk.black(' TIP '))} ${msg}\n`)
}

function localizeScript (pm, command) {
  if (pm === 'npm') {
    return `npm run ${command}`
  }
  return `yarn ${command}`
}

function stylingCommand (cmd) {
  return chalk.blueBright(cmd)
}
