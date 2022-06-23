import {expect, test} from '@oclif/test'

describe('search/activities', () => {
  test
  .stdout()
  .command(['search/activities'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['search/activities', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
