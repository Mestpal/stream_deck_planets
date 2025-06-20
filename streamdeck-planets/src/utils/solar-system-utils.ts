import streamDeck, { KeyAction } from "@elgato/streamdeck";

async function getSolarSystemObject(name: String, action: KeyAction, settings: SolarObjectSettings) {
  try {
    if (typeof settings.count !== "number") {
      settings.count = 0;
    }

    if (!settings.data?.englishName) {
      const response = await fetch(`https://api.le-systeme-solaire.net/rest.php/bodies/${name}`);
      settings.data = await response.json();
      await action.setSettings(settings);
    }

    console.log('Settings', settings);
    
    switch (settings.count) {
      case 1:
        action.setTitle(`Gravity: ${settings.data.gravity} m/s²`);
        break;
      case 2:
        action.setTitle(`Escape speed: ${settings.data.escape} m/s`);
        break;
      case 3:
        action.setTitle(`Type: ${settings.data.bodyType}`);
        break;
      default:
        action.setTitle(settings.data.englishName || settings.name);
    }
    
    settings.count = pressButtonCountManagement(settings.count)
    await action.setSettings(settings);
  } catch (e) {
    streamDeck.logger.error('Failed to fetch Solar System object info', e);
  }
}

function pressButtonCountManagement(counter: number){
  if (counter < 3) {
    return counter + 1;
  } else {
    return 0;
  }
}

type SolarObjectSettings = {
  count?: number;
  data?: any;
  name?: string
}

export {
  getSolarSystemObject,
  pressButtonCountManagement
}