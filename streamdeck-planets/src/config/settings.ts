/* eslint-disable jsdoc/require-jsdoc */
const settings = [
	{ label: "Name", default: true, value: "englishName" },
	{ label: "Gravity", default: true, value: "gravity", unit: "m/s²" },
	{ label: "Escape Speed", default: true, value: "escape", unit: "m/s" },
	{ label: "Body type", default: true, value: "bodyType" },
	{ label: "Perihelion", default: false, value: "perihelion", unit: "Km" },
	{ label: "Aphelion", default: false, value: "aphelion", unit: "Km" },
	{ label: "Eccentricity", default: false, value: "eccentricity" },
	{ label: "Inclination", default: false, value: "inclination", unit: "º" },
	{ label: "Density", default: false, value: "density", unit: "g/cm3" },
	{ label: "Main Radius", default: false, value: "meanRadius", unit: "Km" },
	{ label: "Equatorial Radius", default: false, value: "equaRadius", unit: "Km" },
	{ label: "Polar Radius", default: false, value: "polarRadius", unit: "Km" },
] as SettingsObject[];

const getDefaultSettings = (): SettingsObject[] => settings.filter((setting) => setting?.default);

const getIconSettings = (name: string): IconSettingsObject[] => {
	let iconOptions = [
		{label: "Drawn", value: "imgs/actions/counter/icon" }, 
		{label: "Planet", value: "imgs/actions/counter/key" }
	]

	if (name) {
		iconOptions = [
			{label: "Drawn", value: "imgs/actions/planets/Tierra1" }, 
			{label: "Planet", value: "imgs/actions/planets/Marte1" }
		]
	}

	return iconOptions
}

type SettingsObject =
	| {
			default: boolean;
			initial: boolean;
			label: string;
			unit?: undefined;
			value: string;
	  }
	| {
			initial: boolean;
			label: string;
			value: string;
			default?: undefined;
			unit?: undefined;
	  }
	| {
			initial: boolean;
			label: string;
			value: string;
			unit: string;
			default?: undefined;
	  };

type IconSettingsObject = {
	label: string,
	value: string
}


export default { settings, getDefaultSettings, getIconSettings };
export type { SettingsObject };
