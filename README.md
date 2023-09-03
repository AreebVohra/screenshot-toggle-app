# Screenshot toggle app

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

Using this application uses Native Modules to prevent the user from taking screenshot of the application and send the status to the server along with other device information.

## Device Information
* Operating System
* Device Name
* MAC Address
* IMEI
* Location (permission required, for IOS if permission is denied then you will have to reinstall the app)
* Public IP Address
* Screenshot Status

>**Note**: The IMEI number provided is fake because both IOS & Android platforms have restricted the IMEI to be accessed programmically.


## Strp 1: Make sure your API server is running

Check you API server is running and you will have to change your `baseURL`, goto `/src/constants/index.ts` and replace `localhost` with your system IP.

```bash
export const baseURL = 'http://localhost:3000';

# replace with you system IP e.g.
export const baseURL = 'http://192.168.100.127:3000';
```

## Step 2: Start your Application

Before starting your application run `npm install` in your root folder.

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

From you project folder goto your ios folder and run `pod install`. After pods are install move back to the project folder and run the following command.

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

