import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.mercury" })
export class MercuryInfo extends SingletonAction<MercurySettings> {

  override onWillAppear(ev: WillAppearEvent<MercurySettings>): Promise<void> {
    return ev.action.setTitle('Mercury');
  }

  override async onKeyDown(ev: KeyDownEvent<MercurySettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Mercury'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type MercurySettings = {
  count?: number;
  data?: any;
  name?: string
}