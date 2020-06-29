import { Controller } from 'egg'
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('../../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')
const template = require('fs').readFileSync(path.join(__dirname, '../public/index.template.html'), 'utf-8')

export default class HomeController extends Controller {
  public async index () {
    const { ctx } = this
    ctx.body = await ctx.service.test.sayHi('egg')
  }

  public async index2 () {
    const renderer = createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template,
      clientManifest
    })
    const context = {
      url: this.ctx.request.url
    }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          this.ctx.body = '404'
        } else {
          this.ctx.body = process.env.NODE_ENV
        }
      } else {
        this.ctx.body = html
      }
    })
  }
}
