import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import { check, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export const os = Platform.OS;
export const deviceName = DeviceInfo.getDeviceNameSync();
export const macAddress = DeviceInfo.getMacAddressSync();
export const ipAddress = DeviceInfo.getIpAddressSync();

export const showToast = (message: string) => {
    Toast.show(message, Toast.LONG, {
        backgroundColor: 'grey',
    });
};

export const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

export const imei = () => {
    var minm = 100000000000000;
    var maxm = 999999999999999;
    const randomNumber = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return randomNumber.toString();
}

export const checkAndroidLocationPermission = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
            result === 'denied' && showToast('Location permission denied, goto app settings and allow location.');
        });
}

export const checkIOSLocationPermission = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then((result) => {
            switch (result) {
                case RESULTS.BLOCKED:
                    showToast('Location permission is denied and not requestable anymore');
                    break;
            }
        });
}
