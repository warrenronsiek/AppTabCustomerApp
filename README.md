Install Instructions
====================

1. When building, if you get an error that says `This error is caused by a @providesModule declaration with the same name across two different files.`
Go to the node_modules/react-native-router-flux/node_modules and delete the react-native folder therein.
2. If you get an issue called `unable to resolve module ReactComponentTreeHook` you need to go into package.json and remove the `^` infront of react and react-native. (and then yarn install)

Release Procedure
------------------
* Make sure that the vars in vars.js are properly configured.
* Update info.plist from :
```
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <true/>
    <key>NSAllowsLocalNetworking</key>
    <true/>
    <key>NSExceptionDomains</key>
    <dict/>
</dict>
``` 
to
```
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict/>
</dict>
```

Possible Explosives
-------------------

1. If components get unmounted before some async request triggers a callback, there might be errors. See [react-timer-mixin](https://github.com/reactjs/react-timer-mixin). 
2. If you get an error that says `config.h file not found` you need to: 
* clean your project
* delete `node_modules` and `yarn install`

and/or
* navigate to `node_modules/react-native/third-party/glog-#.#.#`
* run `../../scripts/ios-configure-glog.sh`

Running on Android
------------------
1. run `react-native run-android`
2. run `adb reverse tcp:8081 tcp:8081`
3. run `adb logcat | grep ReactNativeJS` to get the logs

Sometimes builds will fail because android packages aren't updated and agreed to. Run `android sdk` to launch the 
sdk manager and update.

Building android release version:  `cd android && ./gradlew assembleRelease`. Testing android release: `react-native run-android --variant=release`

Building IOS icon sets
----------------------
run `yo rn-toolbox:assets --icon <path to your icon>`

Installing the debugger
-----------------------
`brew cask install react-native-debugger`

Running the debugger
--------------------
`open "rndebugger://set-debugger-loc?host=localhost&port=8081"`

set simulator/phone to 'remote debugging'

Generating icon/apptiles sets
-----------------------------
check out `https://www.npmjs.com/package/react-native-icon`