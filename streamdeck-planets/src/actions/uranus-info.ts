import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.uranus" })
export class UranusInfo extends SingletonAction<UranusSettings> {

  override onWillAppear(ev: WillAppearEvent<UranusSettings>): Promise<void> {
    return ev.action.setTitle('Uranus');
  }

  override async onKeyDown(ev: KeyDownEvent<UranusSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Uranus'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type UranusSettings = {
  count?: number;
  data?: any;
  name?: string
}