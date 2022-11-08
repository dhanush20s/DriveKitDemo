import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@react-native-drivekit/core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const CoreModule = isTurboModuleEnabled
  ? require('./NativeCore').default
  : NativeModules.RNDriveKitCore;

const Core = CoreModule
  ? CoreModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function setApiKey(key: string): void {
  return Core.setApiKey(key);
}

export function setUserId(userId: string): void {
  return Core.setUserId(userId);
}

export function updateUserId(userId: string): void {
  return Core.updateUserId(userId);
}

export function deleteAccount(instantDeletion?: boolean) {
  return Core.deleteAccount(instantDeletion ?? false);
}
