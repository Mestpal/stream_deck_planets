/* eslint-disable jsdoc/require-jsdoc */
const settings = [
	{ label: "Name", checked: true, value: "englishName", avoid: true},
	{ label: "Gravity", checked: true, value: "gravity", unit: "m/s²" },
	{ label: "Escape Speed", checked: false, value: "escape", unit: "m/s" },
	{ label: "Body type", checked: false, value: "bodyType" },
	{ label: "Perihelion", checked: false, value: "perihelion", unit: "Km" },
	{ label: "Aphelion", checked: false, value: "aphelion", unit: "Km" },
	{ label: "Eccentricity", checked: false, value: "eccentricity" },
	{ label: "Inclination", checked: false, value: "inclination", unit: "º" },
	{ label: "Density", checked: true, value: "density", unit: "g/cm³" },
	{ label: "Mean Radius", checked: true, value: "meanRadius", unit: "Km" },
	{ label: "Equatorial Radius", checked: false, value: "equaRadius", unit: "Km" },
	{ label: "Polar Radius", checked: false, value: "polarRadius", unit: "Km" },
] as SettingsObject[];

const personalizedObjects = ["Mercury", "Venus","Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const getDefaultSettings = (): SettingsObject[] => settings.filter((setting) => setting?.checked);

const getIconSettings = (name: string, bodyType: string | undefined = undefined): IconSettingsObject[] => {
	let iconOptions = [
		{ label: "Drawn", value: `imgs/actions/planets/default1` },
		{ label: "Planet", value: `imgs/actions/planets/defaultR` },
	];

	if (personalizedObjects.includes(name)) {
		iconOptions = [
			{ label: "Drawn", value: `imgs/actions/planets/${name}1` },
			{ label: "Planet", value: `imgs/actions/planets/${name}R` },
		];
	} else if (bodyType) {
		iconOptions = [
			{ label: "Drawn", value: `imgs/actions/types/${bodyType}1` },
			{ label: "Planet", value: `imgs/actions/types/Asteroid1` },
		]
	}

	console.log('ICONS', iconOptions);
	
	return iconOptions;
};

type SettingsObject =
	{
		avoid?: boolean;
		checked: boolean;
		initial: boolean;
		label: string;
		unit?: undefined;
		value: string;
	  } | {
		avoid?: boolean;
		initial: boolean;
		label: string;
		value: string;
		checked?: undefined;
		unit?: undefined;
	  } | {
		avoid?: boolean;
		initial: boolean;
		label: string;
		value: string;
		unit: string;
		checked?: undefined;
	  };

type IconSettingsObject = {
	label: string;
	value: string;
};

export default { settings, getDefaultSettings, getIconSettings };
export type { SettingsObject, IconSettingsObject };
