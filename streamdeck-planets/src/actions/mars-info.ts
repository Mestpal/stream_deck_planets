import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject, pressButtonCountManagement} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.mars" })
export class MarsInfo extends SingletonAction<EarthSettings> {

  override onWillAppear(ev: WillAppearEvent<EarthSettings>): Promise<void> {
    return ev.action.setTitle('Mars');
  }

  override async onKeyDown(ev: KeyDownEvent<EarthSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Mars'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type EarthSettings = {
  count?: number;
  data?: any;
  name?: string
}