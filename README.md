Install Instructions
====================

1. When building, if you get an error that says `This error is caused by a @providesModule declaration with the same name across two different files.`
Go to the node_modules/react-native-router-flux/node_modules and delete the react-native folder therein.
2. If you get an issue called `unable to resolve module ReactComponentTreeHook` you need to go into package.json and remove the `^` infront of react and react-native. (and then yarn install)