import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import GetLocation from 'react-native-get-location';
import axios, { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { allowScreenshots, preventScreenshots } from './src/ScreenshotModule';
import SpringPressable from './src/SpringPressable';
import { os, deviceName, macAddress, ipAddress, showToast, delay, imei, checkAndroidLocationPermission, checkIOSLocationPermission } from './src/utils';
import { baseURL } from './src/constants';

function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [location, setLocation] = useState('');
  const [screenshotId, setScreenshotId] = useState('');

  const accessLocation = (): void => {
    GetLocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 60000, })
      .then(loc => {
        setLocation(`latitude: ${loc.latitude}, longitude: ${loc.longitude}`);
      }).catch(error => {
        const { code, message } = error;
        const msg = `Location - ${code}, ${message}`;
        showToast(msg);
      });
  }

  useEffect(() => {
    accessLocation();
    async function getData() {
      try {
        const id = await AsyncStorage.getItem('id');
        const status = await AsyncStorage.getItem('status');
        if (id !== null && status !== null) {
          setScreenshotId(id);
          status === 'true'
            ? (preventScreenshots(), setIsActivate(true))
            : (allowScreenshots(), setIsActivate(false))
        }
      } catch (e) {
        showToast('async storege error reading data');
      }
    }

    getData();
  }, [])

  const create = () => {
    setLoading(true);
    const url = `${baseURL}/screenshots`;
    const params = {
      "os": os, "device_name": deviceName,
      "mac_address": macAddress, "imei": imei(),
      "location": location, "public_ip_address": ipAddress, "status": true
    }

    axios.post(url, params)
      .then(async (response: AxiosResponse) => {
        await delay(1500);
        await AsyncStorage.setItem('id', response.data?.data?._id);
        await AsyncStorage.setItem('status', response.data?.data?.status.toString());
        !isActivate ? preventScreenshots() : allowScreenshots();
        setIsActivate(!isActivate);
        setLoading(false);
      }).catch(async (error: AxiosError | any) => {
        await delay(1500);
        setLoading(false);
        if (error.response) {
          error.response.status === 400
            ? showToast("invalid or missing parameters")
            : showToast(error.response.data?.message);
        }
        else {
          showToast(error.message);
        }
      });
  };

  const update = (status: boolean) => {
    setLoading(true);
    const url = `${baseURL}/screenshots/${screenshotId}`;
    const params = { "status": status }

    axios.put(url, params)
      .then(async (response: AxiosResponse) => {
        await delay(1500);
        await AsyncStorage.setItem('status', response.data?.data?.status.toString());
        !isActivate ? preventScreenshots() : allowScreenshots();
        setIsActivate(!isActivate);
        setLoading(false);
      }).catch(async (error: AxiosError | any) => {
        await delay(1500);
        setLoading(false);
        if (error.response) {
          error.response.status === 400
            ? showToast("invalid or missing parameters")
            : showToast(error.response.data?.message);
        }
      });
  }

  const toggleBtn = () => {
    os === 'ios' ? checkIOSLocationPermission() : checkAndroidLocationPermission();
    screenshotId === ''
      ? create()
      : isActivate ? update(false) : update(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex1} />
      <View style={styles.imageContainer}>
        <Image style={styles.imageStyle} source={require('./src/assets/logo.png')} />
      </View>
      <View style={styles.buttonSection}>
        <SpringPressable
          loading={loading}
          isActivate={isActivate}
          onPress={toggleBtn}
        />
      </View>
      <View style={styles.flex1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  buttonSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
