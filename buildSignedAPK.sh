#!/bin/bash

#./node_modules/cordova/bin/cordova build android --release -- --keystore="wayatech.jks" --storePassword="eauEtSoleil160" --alias="wayateckKey" --password="eauEtSoleil160"
#react-native bundle --dev false --platform android --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug
cd android && ./gradlew assembleRelease && cd ..