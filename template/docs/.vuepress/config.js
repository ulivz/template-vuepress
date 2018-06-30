const fs = require('fs')
const path = require('path')

const sidebars = [
  { title: 'JavaScript', dirname: 'javascript' },
  { title: 'CSS', dirname: 'css' },
]

module.exports = {
  base: "<%= base %>",
  title: "<%= title %>",
  description: "<%= description %>",
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  stylus: {
    import: [path.resolve(__dirname, './style/config.styl')]
  },
  serviceWorker: true,
  themeConfig: {
    repo: "<%= website %>",
    editLinks: true,
    docsDir: 'docs',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    sidebar: autoGetSiderbars()
  }
}

function autoGetSiderbars () {
  return sidebars.map(({ title, dirname }) => {
    const dirpath = path.resolve(__dirname, '../' + dirname)
    return {
      title,
      collapsable: false,
      children: fs
        .readdirSync(dirpath)
        .filter(item => item.endsWith('.md') && fs.statSync(path.join(dirpath, item)).isFile())
        .map(item => dirname + '/' + item.replace(/.md$/, ''))
    }
  })
}
