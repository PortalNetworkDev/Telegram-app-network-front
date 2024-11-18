import {
  useMeQuery,
  useStaticQuery,
} from "../../../context/service/me.service";
import { useMiningQuery } from "../../../context/service/mining.service";

export const useModalStatic = () => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData } = useStaticQuery(lang, {
    keepUnusedDataFor: 600, // Данные хранятся 10 минут
  });
  const { data: mining = null } = useMiningQuery();

  return {
    powerInfoModal: [
      staticData?.PoePowerDisc1,
      staticData?.PoePowerDisc2,
      "",
      staticData?.PoePowerDiscButton,
    ],
    upPowerModal: [
      staticData?.PoePowerUp1,
      staticData?.PoePowerUp2,
      "",
      staticData?.PoePowerUpButton,
    ],
    batteryInfoModal: [
      `${staticData?.BatteryDisc1}`,
      `${staticData?.BatteryDisc2}`,
      "",
      staticData?.BatteryDiscButton,
    ],
    upBatteryModal: [
      staticData?.BatteryUp1,
      `${staticData?.BatteryUp2} ${mining?.battery_level + 1} ${
        staticData?.LevelStatic
      }`,
      `${mining?.price_rize_battery} ${staticData?.BatteryUp3} ${
        mining?.battery_level + 1
      } Lvl`,
      staticData?.BatteryUpButton,
    ],
    notEnoughtBalance: [
      staticData?.NotEnoughBalance1,
      staticData?.NotEnoughBalance2,
      "",
      staticData?.NotEnoughBalanceButton,
    ],
    generatorInfoModal: [
      `${staticData?.GeneratorDisc1}`,
      `${staticData?.GeneratorDisc2}`,
      "",
      staticData?.GeneratorDiscButton,
    ],
    lowGeneratorModal: [
      `${staticData?.LowGenerator1}`,
      `${staticData?.LowGenerator2}`,
      "",
      staticData?.LowGeneratorButton,
    ],
    fullBatteryModal: [
      `${staticData?.FullBattery1}`,
      `${staticData?.FullBattery2}`,
      "",
      staticData?.FullBatteryButton,
    ],
    upGeneratorModal: [
      staticData?.GeneratorUp1,
      `+${mining?.power_rize_generator} ${staticData?.GeneratorUp2} ${
        mining?.generator_level + 1
      } ${staticData?.LevelStatic}`,
      `${mining?.price_rize_generator} ${staticData?.GeneratorUp3} ${
        mining?.generator_level + 1
      } Lvl`,
      staticData?.GeneratorUpButton,
    ],
    upMultitabModal: [
      staticData?.MultitabUp1,
      `${staticData?.MultitabUp2} ${mining?.multitab + 1} ${
        staticData?.LevelStatic
      }`,
      `${mining?.price_rize_multitab} ${staticData?.MultitabUp3} ${
        mining?.multitab + 1
      } Lvl`,
      staticData?.MultitabUpButton,
    ],
  };
};
