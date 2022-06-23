import {expect, test} from '@oclif/test'

describe('activities/put', () => {
  test
  .stdout()
  .command(['activities/put'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['activities/put', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
