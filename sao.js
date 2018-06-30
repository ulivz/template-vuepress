const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const defaultPkg = require('./template/package.json')

const pkg = resolvePkg()
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
    name: {
      message: 'Project\'s name?',
      default: name
    },
    email: {
      message: 'What is your GitHub email',
      default: ':gitEmail:',
      store: true,
      validate: v => /.+@.+/.test(v)
    },
    description: {
      message: 'Project\'s description?',
      default: description
    },
    title: {
      message: 'Docs\'s title?',
      default({ name }) {
        return name
      },
    },
    base: {
      message: 'Project\'s base url?',
      default({ name }) {
        return `/${name}/`
      },
    }
  },
  data() {
    return {
      isNewProject: !pkg
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
  post() {
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
      console.log(`    Please install vuepres：${chalk.blueBright('yarn add vuepress -D')}`)
    }
    console.log(`
    Develop your docs: ${chalk.blueBright('yarn docs:dev')}\n
    Build dir as static site: ${chalk.blueBright('yarn docs:build')}\n
    Release you docs: ${chalk.blueBright('yarn docs:release')}\n`)
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
