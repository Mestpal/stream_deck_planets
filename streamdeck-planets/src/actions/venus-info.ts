import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.venus" })
export class VenusInfo extends SingletonAction<VenusSettings> {

  override onWillAppear(ev: WillAppearEvent<VenusSettings>): Promise<void> {
    return ev.action.setTitle('Venus');
  }

  override async onKeyDown(ev: KeyDownEvent<VenusSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Venus'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type VenusSettings = {
  count?: number;
  data?: any;
  name?: string
}