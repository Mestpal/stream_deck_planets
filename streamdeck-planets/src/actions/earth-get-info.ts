import streamDeck, { action, KeyAction, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";


@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.earth" })
export class GetEarthInfo extends SingletonAction<EarthSettings> {

  override async onKeyDown(ev: KeyDownEvent<EarthSettings>): Promise<void> {
    const { settings } = ev.payload;
    if (typeof settings.count !== "number") {
      settings.count = 0;
    }

    this.getEarthData(ev.action, settings);

    if (settings.count < 3) {
      settings.count += 1;
    } else {
      settings.count = 0;
    }

    await ev.action.setSettings(settings);
  }

  private async getEarthData(action: KeyAction, settings: EarthSettings) {
    try {      
      if (!settings.data?.englishName) {
        const response = await fetch('https://api.le-systeme-solaire.net/rest.php/bodies/earth');
        settings.data = await response.json();
        await action.setSettings(settings);
      }

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
          action.setTitle(`${settings.data.englishName}`);
      }
      
    } catch (e) {
      streamDeck.logger.error('Failed to fetch Earth info', e);
    }
  }
}

type EarthSettings = {
  count?: number;
  data?: any
}