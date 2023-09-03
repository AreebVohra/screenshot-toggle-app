import { NativeModules } from 'react-native';

const { ScreenshotModule } = NativeModules;

export const preventScreenshots = (): void => ScreenshotModule.preventScreenshots();

export const allowScreenshots = (): void => ScreenshotModule.allowScreenshots();
