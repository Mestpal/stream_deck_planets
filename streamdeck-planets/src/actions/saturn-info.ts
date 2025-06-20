import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.saturn" })
export class SaturnInfo extends SingletonAction<SaturnSettings> {

  override onWillAppear(ev: WillAppearEvent<SaturnSettings>): Promise<void> {
    return ev.action.setTitle('Saturn');
  }

  override async onKeyDown(ev: KeyDownEvent<SaturnSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Saturn'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type SaturnSettings = {
  count?: number;
  data?: any;
  name?: string
}