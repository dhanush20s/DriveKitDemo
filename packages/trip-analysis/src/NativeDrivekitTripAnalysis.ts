import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  activateAutoStart(enable: boolean): void;
  startTrip(): void;
  stopTrip(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DrivekitTripAnalysis');
