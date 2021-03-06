/// <reference path="../../typings/tsd.d.ts" />

const electron = require('electron');
const BrowserWindow: typeof GitHubElectron.BrowserWindow = electron.BrowserWindow;

class BaseBrowserWindow {
	window: GitHubElectron.BrowserWindow;

	constructor(options: GitHubElectron.BrowserWindowOptions, url: string){
		this.window = new BrowserWindow(options);
		this.window.loadURL(url);

		this.window.on('closed', () => { this.onClosed(); });
		this.window.on('close', (event: Event) => { this.onClose(event); });
		this.window.on('page-title-updated', (event: Event) => { this.onPageTitleUpdated(event); });
		this.window.on('unresponsive', () => { this.onUnresponsive(); });
		this.window.on('responsive', () => { this.onResponsive(); });
		this.window.on('blur', () => { this.onBlur(); });
		this.window.on('focus', () => { this.onFocus(); });
		this.window.on('maximize', () => { this.onMaximize(); });
		this.window.on('unmaximize', () => { this.onUnmaximize(); });
		this.window.on('minimize', () => { this.onMinimize(); });
		this.window.on('restore', () => { this.onRestore(); });
		this.window.on('resize', () => { this.onResize(); });
		this.window.on('move', () => { this.onMove(); });
		this.window.on('enter-full-screen', () => { this.onEnterFullScreen(); });
		this.window.on('leave-full-screen', () => { this.onLeaveFullScreen(); });
		this.window.on('enter-html-full-screen', () => { this.onEnterHtmlFullScreen(); });
		this.window.on('leave-html-full-screen', () => { this.onLeaveHtmlFullScreen(); });
		this.window.on('app-command', (event: Event, cmd: string) => { this.onAppCommand(event, cmd); });

		// OS X only
		this.window.on('moved', () => { this.onMoved(); });
	}

	onClosed(){
		this.window = null;
	}

	onClose(event: Event){
	}

	onPageTitleUpdated(event: Event){
	}

	onUnresponsive(){
	}

	onResponsive(){
	}

	onBlur(){
	}

	onFocus(){
	}

	onMaximize(){
	}

	onUnmaximize(){
	}

	onMinimize(){
	}

	onRestore(){
	}

	onResize(){
	}

	onMove(){
	}

	onMoved(){
	}

	onEnterFullScreen(){
	}

	onLeaveFullScreen(){
	}

	onEnterHtmlFullScreen(){
	}

	onLeaveHtmlFullScreen(){
	}

	onAppCommand(event: Event, cmd: string){
	}
}
