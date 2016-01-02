/// <reference path="typings/github-electron/github-electron.d.ts" />

interface CertificateObject {
	data: Buffer,
	issueName: string
}

interface RequestObject {
	method: string,
	url: string,
	referrer: string
}

interface AuthInfoObject {
	isProxy: boolean,
	scheme: string,
	host: string,
	port: number,
	realm: string
}

class BaseApplication {
    mainWindow: BaseBrowserWindow = null;

    windowOptions: GitHubElectron.BrowserWindowOptions = {
        width: 800,
        height: 400,
        minWidth: 500,
        minHeight: 200,
        acceptFirstMouse: true,
        titleBarStyle: 'hidden'
    };
    startUrl: string = 'file://' + __dirname + '/index.html';

    constructor(private app: GitHubElectron.App,
    		    windowOptions?: GitHubElectron.BrowserWindowOptions,
    		    url?: string)
    {
    	if(windowOptions !== undefined){
    		this.windowOptions = windowOptions;
    	}
    	if(url !== undefined){
    		this.startUrl = url;
    	}

    	this.app.on('will-finish-launching', () => { this.onWillFinishLaunching(); });
        this.app.on('ready', () => { this.onReady(); });
        this.app.on('window-all-closed', () => { this.onWindowAllClosed(); });
    	this.app.on('before-quit', (event: string) => { this.onBeforeQuit(event); });
    	this.app.on('will-quit', (event: string) => { this.onWillQuit(event);});
    	this.app.on('quit', (event: string, exitCode: number) => { this.onQuit(event, exitCode); });
    	this.app.on('browser-window-blur', (event: string, window: GitHubElectron.BrowserWindow) => {
    		this.onBrowserWindowBlur(event, window);
    	});
    	this.app.on('browser-window-focus', (event: string, window: GitHubElectron.BrowserWindow) => {
    		this.onBrowserWindowFocus(event, window);
    	});
    	this.app.on('browser-window-created', (event: string, window: GitHubElectron.BrowserWindow) => {
    		this.onBrowserWindowCreated(event, window);
    	});
    	this.app.on('certificate-error', (event: string,
    									  webContents: GitHubElectron.WebContents,
					    				  url: string,
					    				  error: string,
					    				  certificate: CertificateObject,
					    				  callback: (verifyCertificate: boolean) => void) => {
			this.onCertificateError(event, webContents, url, error, certificate, callback);
		});
    	this.app.on('select-client-certificate', (event: string,
					    	                      webContents: GitHubElectron.WebContents,
					    	                      url: string,
					    	                      certificateList: CertificateObject[],
					    	                      callback: (certificate: CertificateObject) => void) => {
			this.onSelectClientCertificate(event, webContents, url, certificateList, callback);
		});
    	this.app.on('login', (event: string,
    	 					  webContents: GitHubElectron.WebContents,
					    	  request: RequestObject,
					    	  authInfo: AuthInfoObject,
					    	  callback: (username: string, secret: string) => void) => {
    		this.onLogin(event, webContents, request, authInfo, callback);
    	});
    	this.app.on('gpu-process-crashed', () => { this.onGpuProcessCrashed(); });

    	// OS X only
   		this.app.on('open-file', (event: string, path: string) => { this.onOpenFile(event, path); });
   		this.app.on('open-url', (event: string, url: string) => { this.onOpenURL(event, url); });
   		this.app.on('activate', (event: string, hasVisibleWindows: boolean) => { this.onActivate(event, hasVisibleWindows); });
    }

    onWindowAllClosed(){
        if(process.platform != 'darwin'){
            this.app.quit();
        }
    }

    onReady(){
    	const mythis = this;
    	// 無名クラスを作りBaseBrowserWindowのonClosed関数をオーバーライドする。	
    	const myBrowserWindowClass = class extends BaseBrowserWindow {
    		onClosed() {
    			mythis.mainWindow = null;
    			super.onClosed();
    		}
    	};
    	this.mainWindow = new myBrowserWindowClass(this.windowOptions, this.startUrl);
    }

    onWillFinishLaunching(){
    }

    onBeforeQuit(event: string){
    }

    onWillQuit(event: string){
    }

    onQuit(event: string, exitCode: number){
    }

    onOpenFile(event: string, path: string){
    }

    onOpenURL(event: string, url: string){
    }

    onActivate(event: string, hasVisibleWindows: boolean){
    }

    onBrowserWindowBlur(event: string, window: GitHubElectron.BrowserWindow){
    }

    onBrowserWindowFocus(event: string, window: GitHubElectron.BrowserWindow){
    }

    onBrowserWindowCreated(event: string, window: GitHubElectron.BrowserWindow){
    }

    onCertificateError(event: string,
    				   webContents: GitHubElectron.WebContents,
    				   url: string,
    				   error: string,
    				   certificate: CertificateObject,
    				   callback: (verifyCertificate: boolean) => void)
    {
    }

    onSelectClientCertificate(event: string,
    	                      webContents: GitHubElectron.WebContents,
    	                      url: string,
    	                      certificateList: CertificateObject[],
    	                      callback: (certificate: CertificateObject) => void)
    {
    }

    onLogin(event: string,
    	    webContents: GitHubElectron.WebContents,
    	    request: RequestObject,
    	    authInfo: AuthInfoObject,
    	    callback: (username: string, secret: string) => void)
    {
    }

    onGpuProcessCrashed(){
    }
}
