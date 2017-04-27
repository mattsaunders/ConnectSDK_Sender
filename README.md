# ConnectSDK_Sender

This is an ionic project that uses the Connect SDK plugin to launch a web app on a chromecast.

Only supports android as of now. Build using ionic build android and take the .apk
file from ConnectSDK_Sender\platforms\android\build\outputs\apk 

copy and past onto phone then click file to install.

Can find chromecast device and list device capabilities but I am unable to call
any device specific capabilities. When doing exactly what the online tutorial
says I get functions do not exist for example (device.getWebAppLauncher().launchWebApp(webAppId))

I think we have to hook into the device "Interfaces" such as the "webAppLauncher" seen on
line 2120 of plugins/cordova-plugin-connectsdk/www/ConnectSDK.js but I am unsure how to call
these or what parameters they need. I think you have to use the _sendComand() function from the
ConnectableDevice class seen on line 686. 