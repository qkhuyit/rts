import { computed, onMounted, reactive } from 'vue';

export type Battery = {
  charging: boolean; // Is the battery currently charging?
  chargingTime: number; // How many seconds will it take before charging is completed? If it is 0, charging is completed.
  dischargingTime: number; // Represents the number of seconds until the battery drains to empty and suspends
  /**  Represents the power amplification level, this value is between 0.0 and 1.0 */
  level: number;
  [key: string]: any;
};

export const useBattery = () => {
  const battery = reactive<Battery>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 100,
  });

  // Whether the current browser supports Battery API
  const isSupported = navigator && 'getBattery' in navigator;

  // Update battery usage status
  const updateBattery = (target) => {
    for (const key in battery) {
      battery[key] = target[key];
    }
    battery.level = battery.level * 100;
  };

  // Calculate remaining battery life
  const calcDischargingTime = computed(() => {
    const hour = battery.dischargingTime / 3600;
    const minute = (battery.dischargingTime / 60) % 60;
    return `${~~hour}h${~~minute}m`;
  });

  // battery status
  const batteryStatus = computed(() => {
    if (battery.charging && battery.level >= 100) {
      return 'be filled';
    } else if (battery.charging) {
      return 'Charging';
    } else {
      return 'Power has been disconnected';
    }
  });

  onMounted(async () => {
    const BatteryManager: Battery = (await (window.navigator as any).getBattery?.()) || {};
    updateBattery(BatteryManager);

    // Called when the battery charge status is updated
    BatteryManager.onchargingchange = ({ target }) => {
      updateBattery(target);
    };
    // Called when the battery charging time is updated
    BatteryManager.onchargingtimechange = ({ target }) => {
      updateBattery(target);
    };
    // Called when the battery is disconnected and the charging time is updated
    BatteryManager.ondischargingtimechange = ({ target }) => {
      updateBattery(target);
    };
    // Called when the battery level is updated
    BatteryManager.onlevelchange = ({ target }) => {
      updateBattery(target);
    };
  });

  return {
    battery,
    isSupported,
    batteryStatus,
    calcDischargingTime,
  } as const;
};
