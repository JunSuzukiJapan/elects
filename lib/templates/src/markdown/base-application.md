# class BaseApplication Reference

# 定義されているInterface

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


# ハンドラー関数

## onWindowAllClosed

onWindowAllClosed()

## onReady

onReady()

## onWillFinishLaunching

onWillFinishLaunching()

## onBeforeQuit

onBeforeQuit(event: string)

## onWillQuit

onWillQuit(event: string)

## onQuit

onQuit(event: string, exitCode: number)

## onOpenFile (OS X only)

onOpenFile(event: string, path: string)

## onOpenURL (OS X only)

onOpenURL(event: string, url: string)

## onActivate (OS X only)

onActivate(event: string, hasVisibleWindows: boolean)

## onBrowserWindowBlur

onBrowserWindowBlur(event: string, window: GitHubElectron.BrowserWindow)

## onBrowserWindowFocus

onBrowserWindowFocus(event: string, window: GitHubElectron.BrowserWindow)

## onBrowserWindowCreated

onBrowserWindowCreated(event: string, window: GitHubElectron.BrowserWindow)

## onCertificateError

 onCertificateError(event: string,
                    webContents: GitHubElectron.WebContents,
                    url: string,
                    error: string,
                    certificate: CertificateObject,
                    callback: (verifyCertificate: boolean) => void)

## onSelectClientCertificate

 onSelectClientCertificate(event: string,
                           webContents: GitHubElectron.WebContents,
                           url: string,
                           certificateList: CertificateObject[],
                           callback: (certificate: CertificateObject) => void)

## onLogin

 onLogin(event: string,
         webContents: GitHubElectron.WebContents,
         request: RequestObject,
         authInfo: AuthInfoObject,
         callback: (username: string, secret: string) => void)

##  onGpuProcessCrashed

  onGpuProcessCrashed()
