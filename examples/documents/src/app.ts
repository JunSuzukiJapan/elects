/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="ts/base_browser_window.ts" />
/// <reference path="ts/base_application.ts" />

class MyApplication extends BaseApplication {
}

const app: GitHubElectron.App = electron.app;
const myapp = new MyApplication(app, {width: 1200, height: 900, minWidth: 1024, minHeight: 600});