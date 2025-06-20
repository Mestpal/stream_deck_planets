import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import getSolarSystemObject from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.mercury" })
export class MercuryInfo extends SingletonAction<EarthSettings> {

  override onWillAppear(ev: WillAppearEvent<EarthSettings>): Promise<void> {
    return ev.action.setTitle('Mercury');
  }

  override async onKeyDown(ev: KeyDownEvent<EarthSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Mercury'

    if (typeof settings.count !== "number") {
      settings.count = 0;
    }

    getSolarSystemObject(settings.name, ev.action, settings);

    if (settings.count < 3) {
      settings.count += 1;
    } else {
      settings.count = 0;
    }

    await ev.action.setSettings(settings);
  }
}

type EarthSettings = {
  count?: number;
  data?: any;
  name?: string
}