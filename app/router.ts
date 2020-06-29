import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app;

  (router as any).get('/', controller.home.index);
  (router as any).get('/a', controller.home.index2)
}
