import streamDeck, { KeyAction } from "@elgato/streamdeck";

async function getSolarSystemObject(name: String, action: KeyAction, settings: EarthSettings) {
  try {      
    if (!settings.data?.englishName) {
      const response = await fetch(`https://api.le-systeme-solaire.net/rest.php/bodies/${name}`);
      settings.data = await response.json();
      await action.setSettings(settings);
    }

    switch (settings.count) {
      case 0:
        action.setTitle(`${settings.data.englishName || name}`);
      case 1:
        action.setTitle(`Gravity: ${settings.data.gravity} m/s²`);
        break;
      case 2:
        action.setTitle(`Escape speed: ${settings.data.escape} m/s`);
        break;
      case 3:
        action.setTitle(`Type: ${settings.data.bodyType}`);
        break;
    }
    
  } catch (e) {
    streamDeck.logger.error('Failed to fetch Earth info', e);
  }
}

type EarthSettings = {
  count?: number;
  data?: any
}

export default getSolarSystemObject