import path from 'path'
import test from 'ava'
import sao from 'sao'

const template = {
  fromPath: path.join(__dirname, '..')
}

test('Using in creating a new project', async t => {
  const stream = await sao.mockPrompt(template, { isNewProject: true })
  t.snapshot(stream.fileList)
})


test('Using in a existing project', async t => {
  const stream = await sao.mockPrompt(template, { isNewProject: false })
  t.snapshot(stream.fileList)
})
