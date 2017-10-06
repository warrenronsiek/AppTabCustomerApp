package io.apptab.customerapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cardio.RNCardIOPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.geniem.rnble.RNBLEPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.solinor.bluetoothstatus.RNBluetoothManagerPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNCardIOPackage(),
                    new RNBLEPackage(),
                    new ReactNativePushNotificationPackage(),
                    new RNBluetoothManagerPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
