import 'egg'

declare module 'egg' {
  interface Application {
    dashboard: any;
  }
}