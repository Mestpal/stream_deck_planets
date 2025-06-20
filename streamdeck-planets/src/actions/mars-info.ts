import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.mars" })
export class MarsInfo extends SingletonAction<MarsSettings> {

  override onWillAppear(ev: WillAppearEvent<MarsSettings>): Promise<void> {
    return ev.action.setTitle('Mars');
  }

  override async onKeyDown(ev: KeyDownEvent<MarsSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Mars'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type MarsSettings = {
  count?: number;
  data?: any;
  name?: string
}