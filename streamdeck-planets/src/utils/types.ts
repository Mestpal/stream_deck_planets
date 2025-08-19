import { JsonValue } from "@elgato/streamdeck";

/**
 * Type for the Solar System object data returned from the API.
 */
type SolarSystemApiData = {
	/**
	 * The English name of the Solar System object.
	 */
	englishName: string;
	/**
	 * The gravity of the Solar System object.
	 */
	gravity: number;
	/**
	 * The escape velocity of the Solar System object.
	 */
	escape: number;
	/**
	 * The type of the Solar System object.
	 */
	bodyType: string;
};

/**
 * Settings specific to the Solar system.
 */
type SolarObjectSettings = {
	/**
	 * The count of Object-related items.
	 */
	count: number;
	/**
	 * The data associated with Object.
	 */
	data: SolarSystemApiData;
	/**
	 * The name of the Object
	 */
	name: string;
	/**
	 * Settings for checklist
	 */
	objectSettings?: JsonValue[];
	/**
	 * Settings for checklist
	 */
	iconSettings?: string;
	/**
	 * object name to find 
	 */
	search_object?: string;
    /**
     * options to show in the select of solar objects
     */
    options?: { 
        /**
         * Option Label
         */
        label: string; 
        /**
         * Option Value
         */
        value: string
     }[];
    /**
     *  data of the objects related to the options
     */
    search_results?: OptionSelectorType[];
	/**
	 * Solar object selected in t he selector
	 */
	selectedObject?: string
};

/**
 * Type representing the return value from getSolarSystemObject function.
 */
type getSolarSystemObjectType = {
	/**
	 * The label for the API data point.
	 */
	apiLabel: string,
	/**
	 * The value from the Solar System API data.
	 */
	apiValue: keyof SolarSystemApiData,
	/**
	 * The unit of measurement for the value.
	 */
	apiUnit: string
}

/**
 * All the data for the objects obtained in the search
 */
type BodiesType = {
	/**
	 * Array with all the possible options
	 */
	bodies:  Array<OptionSelectorType>
}

/**
 * Options in the search object selector
 */
type OptionSelectorType = {
	/**
	 * Name of the object
	 */
	englishName: string; 
	/**
	 * id of the object
	 */
	id: string
}

export {
	getSolarSystemObjectType,
	SolarObjectSettings,
	SolarSystemApiData,
	BodiesType,
	OptionSelectorType
}