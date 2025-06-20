import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { EarthInfo } from "./actions/earth-info";
import { MarsInfo } from "./actions/mars-info";
import { MercuryInfo } from "./actions/mercury-info";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);

// Register the increment action.
streamDeck.actions.registerAction(new EarthInfo());
streamDeck.actions.registerAction(new MarsInfo());
streamDeck.actions.registerAction(new MercuryInfo());

// Finally, connect to the Stream Deck.
streamDeck.connect();
