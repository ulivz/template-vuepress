<h1 align="center">sherry-vuepress</h1>

<p align="center">
  Scaffold out a VuePress project.
</p>

<p align="center">
<a href="https://npmjs.com/package/sherry-vuepress"><img src="https://img.shields.io/npm/v/sherry-vuepress.svg?style=flat" alt="NPM version"></a> <a href="https://npmjs.com/package/sherry-vuepress"><img src="https://img.shields.io/npm/dm/sherry-vuepress.svg?style=flat" alt="NPM downloads"></a> <a href="https://circleci.com/gh/ulivz/sherry-vuepress"><img src="https://img.shields.io/circleci/project/ulivz/sherry-vuepress/master.svg?style=flat" alt="Build Status"></a> <a href="https://github.com/ulivz/donate"><img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat" alt="donate"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ulivz/sherry-vuepress/master/.media/using_in_a_exisiting_project.png" alt="preview">
</p>

## Features

[![Greenkeeper badge](https://badges.greenkeeper.io/ulivz/template-vuepress.svg)](https://greenkeeper.io/)

- Support for use in new or exisitng projects
- Global [Sidebar](https://vuepress.vuejs.org/default-theme-config/#sidebar) config generation out of box
- NPM scripts injection for exisitng projects
- Friendly user guide
- [Github Pages](https://vuepress.vuejs.org/guide/deploy.html#github-pages) release integration

## Usage

Install Sherry first.

``` bash
yarn global add sherry
# or
npm i -g sherry
```

> It's recommended to execute following instructions at your project dir instead of project's father directory. since we will determine whether it's a new or exisitng project by checking files in current working directory.

### From npm

``` bash
sherry vuepress # using in a exisiting projects
sherry -u vuepress # fetch the latest version before the start.

# or
sherry vuepress my-project 
```

### From git

``` bash
sherry ulivz/sherry-vuepress # using in a exisiting projects
# or
sherry ulivz/sherry-vuepress my-project
```

## License

MIT &copy; [ULIVZ](https://github.com/ulivz)
