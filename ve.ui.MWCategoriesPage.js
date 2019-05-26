/*!
 * VisualEditor user interface MWCategoriesPage class.
 *
 * @copyright 2011-2018 VisualEditor Team and others; see AUTHORS.txt
 * @license The MIT License (MIT); see LICENSE.txt
 */

/**
 * MediaWiki meta dialog categories page.
 *
 * @class
 * @extends OO.ui.PageLayout
 *
 * @constructor
 * @param {string} name Unique symbolic name of page
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Overlay to render dropdowns in
 */
ve.ui.MWCategoriesPage = function VeUiMWCategoriesPage( name, config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	ve.ui.MWCategoriesPage.super.apply( this, arguments );

	// Properties
	this.metaList = null;
	this.defaultSortKeyTouched = false;
	this.fallbackDefaultSortKey = mw.config.get( 'wgTitle' );
	this.categoriesFieldset = new OO.ui.FieldsetLayout( {
		label: ve.msg( 'visualeditor-dialog-meta-categories-data-label' ),
		icon: 'tag'
	} );

	this.categoryOptionsFieldset = new OO.ui.FieldsetLayout( {
		label: ve.msg( 'visualeditor-dialog-meta-categories-options' )//,
		// @TMS - CommentedOut icon: 'settings'
	} );

	this.categoryWidget = new ve.ui.MWCategoryWidget( {
		$overlay: config.$overlay
	} );

	this.addCategory = new OO.ui.FieldLayout(
		this.categoryWidget,
		{
			$overlay: config.$overlay,
			align: 'top',
			label: 'Add one or more categories from this list to this page - one at a time'
		}
	);

	// @TMS - Start

	this.dropDownWidget = new OO.ui.DropdownWidget( {
	    label: 'Select a Category',
	    menu: {
	        items: [
	            new OO.ui.MenuOptionWidget( {
	                data: 'Mars Planetary Science',  // level 1
	                label: 'Mars Planetary Science'
	            } ),
	            new OO.ui.MenuOptionWidget( {
	                data: 'Areography',
	                label: 'Areography',
	                classes: ['category-two']
	            } ),
	            new OO.ui.MenuOptionWidget( {
	                data: 'Atmospheric Sciences',
	                label: 'Atmospheric Sciences',
	                classes: ['category-three']
	            } ),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Gravimetry‎',
	            	label: 'Gravimetry‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Atlas',
	            	label: 'Mars Atlas',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Surface Spectroscopy',
	            	label: 'Surface Spectroscopy',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Topgraphy',
	            	label: 'Topgraphy',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Areology',
	            	label: 'Areology',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Geologic Processes',
	            	label: 'Geologic Processes',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Hydrology',
	            	label: 'Hydrology',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Meteorites',
	            	label: 'Mars Meteorites',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mineralogy',
	            	label: 'Mineralogy',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Astronomy',
	            	label: 'Astronomy',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars-Crossing Asteroids',
	            	label: 'Mars-Crossing Asteroids',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Moons (Natural Satellites)',
	            	label: 'Moons (Natural Satellites)',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Orbit',
	            	label: 'Orbit',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Time Measures',
	            	label: 'Time Measures',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Spacecraft/Robotic Missions‎ ',  // level 1
	            	label: 'Mars Spacecraft/Robotic Missions‎ '
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Exploration Missions',
	            	label: 'Exploration Missions',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Lander Missions',
	            	label: 'Lander Missions',
	            	classes: ['category-three']
	            }),
		    new OO.ui.MenuOptionWidget( {
			data: 'Orbital Missions',
			label: 'Orbital Missions',
			classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Robotic Exploration',
	            	label: 'Robotic Exploration',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mission Objectives',
	            	label: 'Mission Objectives',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Resource Mapping',
	            	label: 'Resource Mappping',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Search for Life',
	            	label: 'Search for Life',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Spaceflight Science',
	            	label: 'Spaceflight Science',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mission Planning',
	            	label: 'Mission Planning',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Communication',
	            	label: 'Communication',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Emerging Technologies',
	            	label: 'Emerging Technologies',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Exploration Concepts',
	            	label: 'Exploration Concepts',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Instruments',
	            	label: 'Instruments',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Orbital Mechanics',
	            	label: 'Orbital Mechanics',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Power Systems',
	            	label: 'Power Systems',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Propulsion',
	            	label: 'Propulsion',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Human Exploration',  // level 1
	            	label: 'Mars Human Exploration'
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Analog Stations',
	            	label: 'Analog Stations',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'FMARS',
	            	label: 'FMARS',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'HI_SEAS',
	            	label: 'HI_SEAS',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'MDRS',
	            	label: 'MDRS',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Exploration Transport System',
	            	label: 'Exploration Transport System',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Ascent Vehicles',
	            	label: 'Ascent Vehicles',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Descent Vehicles',
	            	label: 'Descent Vehicles',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Interplanetary Vehicles',
	            	label: 'Interplanetary Vehicles',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Funding',
	            	label: 'Funding',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Human Factors',
	            	label: 'Human Factors',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Human Mission Architecture',
	            	label: 'Human Mission Architecture',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'In-situ Resource Utilization',
	            	label: 'In-situ Resource Utilization',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Medicine',
	            	label: 'Medicine',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Moon Stations',
	            	label: 'Moon Stations',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Space Stations',
	            	label: 'Space Stations',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Surface Vehicular Activities',
	            	label: 'Surface Vehicular Activities',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'EVA Suits',
	            	label: 'EVA Suits',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Training',
	            	label: 'Training',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Human Settlement',  // level 1
	            	label: 'Mars Human Settlement'
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Agriculture‎',
	            	label: 'Agriculture‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Biospherics‎',
	            	label: 'Biospherics‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Food Crops‎',
	            	label: 'Food Crops‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Genetic Engineering‎',
	            	label: 'Genetic Engineering‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Growing Methods',
	            	label: 'Growing Methods',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Livestock & Aquaculture‎',
	            	label: 'Livestock & Aquaculture‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Non-Food Crops‎',
	            	label: 'Non-Food Crops‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Communications‎',
	            	label: 'Communications‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Energy‎',
	            	label: 'Energy‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Distribution‎',
	            	label: 'Distribution‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Fuels‎',
	            	label: 'Fuels‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Sources‎',
	            	label: 'Sources‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Storage‎',
	            	label: 'Storage‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Health and Safety‎',
	            	label: 'Health and Safety‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Diet and Nutrition',
	            	label: 'Diet and Nutrition',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Gravity and Fitness‎',
	            	label: 'Gravity and Fitness‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Psychology‎',
	            	label: 'Psychology‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Radiation Protection‎',
	            	label: 'Radiation Protection‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Life Support Systems‎',
	            	label: 'Life Support Systems‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Air‎',
	            	label: 'Air‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'HVAC‎',
	            	label: 'HVAC‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Water‎',
	            	label: 'Water‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mission Support‎',
	            	label: 'Mission Support‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Resources and Manufacture‎',
	            	label: 'Resources and Manufacture‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Fabrication and Repair‎',
	            	label: 'Fabrication and Repair‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Manufacture‎',
	            	label: 'Manufacture‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Materials‎',
	            	label: 'Materials‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mining and Refining',
	            	label: 'Mining and Refining',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Prospecting‎',
	            	label: 'Prospecting‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Synthesis‎',
	            	label: 'Synthesis‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Waste Management and Recycling',
	            	label: 'Waste Management and Recycling',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Settlement Plans‎',
	            	label: 'Settlement Plans‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Construction, Assembly, Maintenance‎',
	            	label: 'Construction, Assembly, Maintenance‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Housing and Infrastructure Concepts‎',
	            	label: 'Housing and Infrastructure Concepts‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Settlement Transport Systems‎',
	            	label: 'Settlement Transport Systems‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Ready for Mars‎',
	            	label: 'Ready for Mars‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'SpaceX Transport‎',
	            	label: 'SpaceX Transport‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Society‎',
	            	label: 'Society‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Commerce and Economics‎',
	            	label: 'Commerce and Economics‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Government‎',
	            	label: 'Government‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Law',
	            	label: 'Law',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Philosophy and Ethics‎',
	            	label: 'Philosophy and Ethics‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Surface Transportation‎',
	            	label: 'Surface Transportation ',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Surface Transportation Networks‎',
	            	label: 'Surface Transportation Networks‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Surface Vehicles‎',
	            	label: 'Surface Vehicles‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Terraforming‎',
	            	label: 'Terraforming‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Outreach‎',  // level 1
	            	label: 'Mars Outreach‎'
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Education‎',
	            	label: 'Education‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Online Courses‎',
	            	label: 'Online Courses‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'University Degree Programs‎',
	            	label: 'University Degree Programs‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Information Media Sources',
	            	label: 'Information Media Sources',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Society Videos',
	            	label: 'Mars Society Videos',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'MarsPapers‎',
	            	label: 'MarsPapers‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Wikipedia‎',
	            	label: 'Wikipedia‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Outreach Concepts‎',
	            	label: 'Outreach Concepts‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Competitions‎',
	            	label: 'Competitions‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Events‎',
	            	label: 'Events‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Political Action‎',
	            	label: 'Political Action‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'People and Organizations‎',
	            	label: 'People and Organizations‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Explore Mars‎',
	            	label: 'Explore Mars‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Foundation‎',
	            	label: 'Mars Foundation‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars One‎',
	            	label: 'Mars One‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Society‎',
	            	label: 'Mars Society‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Society Conventions‎ ',
	            	label: 'Mars Society Conventions‎ ',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'SpaceX‎',
	            	label: 'SpaceX‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Mars Arts and Literature‎',  // level 1
	            	label: 'Mars Arts and Literature‎'
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Art',
	            	label: 'Art',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Books',
	            	label: 'Books',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Non-Fiction Literature',
	            	label: 'Non-Fiction Literature',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Science Fiction Literature',
	            	label: 'Science Fiction Literature',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Essays‎',
	            	label: 'Essays‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Games‎',
	            	label: 'Games‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Board Games‎',
	            	label: 'Board Games‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Computer Games‎',
	            	label: 'Computer Games‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'History‎',
	            	label: 'History‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Movies‎',
	            	label: 'Movies‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Documentaries‎',
	            	label: 'Documentaries‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Science Fiction Movies‎',
	            	label: 'Science Fiction Movies‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'TV Series‎',
	            	label: 'TV Series‎',
	            	classes: ['category-three']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Music‎',
	            	label: 'Music‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Photography‎',
	            	label: 'Photography‎',
	            	classes: ['category-two']
	            }),
	            new OO.ui.MenuOptionWidget( {
	            	data: 'Plays‎',
	            	label: 'Plays‎',
	            	classes: ['category-two']
	            })
	        ]
	    }
	} );

	this.dropDownWidget.getMenu().connect(this, {
		choose: 'TMSonNewCategory'
	})
	// @TMS - End

	this.defaultSortInput = new OO.ui.TextInputWidget( {
		placeholder: this.fallbackDefaultSortKey
	} );

	this.defaultSortInput.$element.addClass( 've-ui-mwCategoriesPage-defaultsort' );

	this.defaultSort = new OO.ui.FieldLayout(
		this.defaultSortInput,
		{
			$overlay: config.$overlay,
			align: 'top',
			label: ve.msg( 'visualeditor-dialog-meta-categories-defaultsort-label' ),
			help: ve.msg( 'visualeditor-dialog-meta-categories-defaultsort-help' )
		}
	);

	// Events
	this.categoryWidget.connect( this, {
		newCategory: 'onNewCategory',
		updateSortkey: 'onUpdateSortKey'
	} );
	this.defaultSortInput.connect( this, {
		change: 'onDefaultSortChange'
	} );

	// Initialization
	this.categoriesFieldset.addItems( [ this.addCategory ] );
// @TMS - CommentedOut	this.categoryOptionsFieldset.addItems( [ this.defaultSort ] );
	this.$element.append( this.categoriesFieldset.$element); // @TMS - CommentedOut, this.categoryOptionsFieldset.$element );
	// @TMS - Start
	this.$element.append( this.dropDownWidget.$element);
	// @TMS - End
};

/* Inheritance */

OO.inheritClass( ve.ui.MWCategoriesPage, OO.ui.PageLayout );

/* Methods */

// @TMS - Start
// happens before "apply changes" button. a cat checkbox should do whatever this funciton does.
ve.ui.MWCategoriesPage.prototype.TMSonNewCategory = function ( item, beforeMetaItem ) {
	
    // make an array of a new data cat object for insertion
	var args = [ this.getCategoryItemForInsertion( item ) ];
	// attaching required attribtues for the new category
	item.name = "Category:" + item.data;
	item.value = item.data;
	item.attributes = {};
	item.attributes.category = "Category:" + item.data;

	args[0].attributes = {};
	args[0].attributes.category = "Category:" + item.data;

	// Insert new metaList item
	if ( beforeMetaItem ) {
		args.push( beforeMetaItem.getOffset() );
		if ( beforeMetaItem.getIndex ) {
			args.push( beforeMetaItem.getIndex() );
		}
	}

	this.metaList.insertMeta.apply( this.metaList, args );
};
// @TMS - End

/**
 * @inheritdoc
 */
ve.ui.MWCategoriesPage.prototype.setOutlineItem = function () {
	// Parent method
	ve.ui.MWCategoriesPage.super.prototype.setOutlineItem.apply( this, arguments );

	if ( this.outlineItem ) {
		this.outlineItem
			.setIcon( 'tag' )
			.setLabel( ve.msg( 'visualeditor-dialog-meta-categories-section' ) );
	}
};

/**
 * Handle category default sort change events.
 *
 * @param {string} value Default sort value
 */
ve.ui.MWCategoriesPage.prototype.onDefaultSortChange = function ( value ) {
	this.categoryWidget.setDefaultSortKey( value === '' ? this.fallbackDefaultSortKey : value );
	this.defaultSortKeyTouched = true;
};

/**
 * Inserts new category into meta list
 *
 * @param {Object} item
 * @param {ve.dm.MWCategoryMetaItem} [beforeMetaItem] Meta item to insert before,
 *  or undefined to go at the end
 */
ve.ui.MWCategoriesPage.prototype.onNewCategory = function ( item, beforeMetaItem ) {
	var args = [ this.getCategoryItemForInsertion( item ) ];

	// Insert new metaList item
	if ( beforeMetaItem ) {
		args.push( beforeMetaItem.getOffset() );
		if ( beforeMetaItem.getIndex ) {
			args.push( beforeMetaItem.getIndex() );
		}
	}

	this.metaList.insertMeta.apply( this.metaList, args );
};

/**
 * Removes and re-inserts updated category widget item
 *
 * @param {Object} item
 */
ve.ui.MWCategoriesPage.prototype.onUpdateSortKey = function ( item ) {
	// Replace meta item with updated one
	item.metaItem.replaceWith( this.getCategoryItemForInsertion( item, item.metaItem.getElement() ) );
};

/**
 * Bound to MetaList insert event for adding meta dialog components.
 *
 * @param {ve.dm.MetaItem} metaItem
 */
ve.ui.MWCategoriesPage.prototype.onMetaListInsert = function ( metaItem ) {
	var index;

	// Responsible for adding UI components
	if ( metaItem.element.type === 'mwCategory' ) {
		index = this.metaList.getItemsInGroup( 'mwCategory' ).indexOf( metaItem );
		this.categoryWidget.addItems(
			[ this.getCategoryItemFromMetaListItem( metaItem ) ],
			index
		);
	}
};

/**
 * Bound to MetaList insert event for removing meta dialog components.
 *
 * @param {ve.dm.MetaItem} metaItem
 */
ve.ui.MWCategoriesPage.prototype.onMetaListRemove = function ( metaItem ) {
	var item;

	if ( metaItem.element.type === 'mwCategory' ) {
		item = this.categoryWidget.categories[ this.getCategoryItemFromMetaListItem( metaItem ).value ];
		this.categoryWidget.removeItems( [ item ] );
	}
};

/**
 * Get default sort key item.
 *
 * @return {string} Default sort key item
 */
ve.ui.MWCategoriesPage.prototype.getDefaultSortKeyItem = function () {
	return this.metaList.getItemsInGroup( 'mwDefaultSort' )[ 0 ] || null;
};

/**
 * Get array of category items from meta list
 *
 * @return {Object[]} items
 */
ve.ui.MWCategoriesPage.prototype.getCategoryItems = function () {
	var i,
		items = [],
		categories = this.metaList.getItemsInGroup( 'mwCategory' );

	// Loop through MwCategories and build out items
	for ( i = 0; i < categories.length; i++ ) {
		items.push( this.getCategoryItemFromMetaListItem( categories[ i ] ) );
	}
	return items;
};

/**
 * Gets category item from meta list item
 *
 * @param {ve.dm.MWCategoryMetaItem} metaItem
 * @return {Object} item
 */
ve.ui.MWCategoriesPage.prototype.getCategoryItemFromMetaListItem = function ( metaItem ) {
	var title = mw.Title.newFromText( metaItem.element.attributes.category ),
		value = title ? title.getMainText() : '';
	return {
		name: metaItem.element.attributes.category,
		value: value,
		// TODO: sortkey is lcase, make consistent throughout CategoryWidget
		sortKey: metaItem.element.attributes.sortkey,
		metaItem: metaItem
	};
};

/**
 * Get metaList like object to insert from item
 *
 * @param {Object} item category widget item
 * @param {Object} [oldData] Metadata object that was previously associated with this item, if any
 * @return {Object} metaBase
 */
ve.ui.MWCategoriesPage.prototype.getCategoryItemForInsertion = function ( item, oldData ) {
	var newData = {
		attributes: { category: item.name, sortkey: item.sortKey || '' },
		type: 'mwCategory'
	};
	if ( oldData ) {
		return ve.extendObject( {}, oldData, newData );
	}
	return newData;
};

/**
 * Setup categories page.
 *
 * @param {ve.dm.MetaList} metaList Meta list
 * @param {Object} [data] Dialog setup data
 */
ve.ui.MWCategoriesPage.prototype.setup = function ( metaList ) {
	var defaultSortKeyItem,
		page = this;

	this.metaList = metaList;
	this.metaList.connect( this, {
		insert: 'onMetaListInsert',
		remove: 'onMetaListRemove'
	} );

	defaultSortKeyItem = this.getDefaultSortKeyItem();

	this.categoryWidget.addItems( this.getCategoryItems() );

	this.defaultSortInput.setValue(
		defaultSortKeyItem ? defaultSortKeyItem.getAttribute( 'content' ) : ''
	);
	this.defaultSortKeyTouched = false;

	// Update input position after transition
	setTimeout( function () {
		page.categoryWidget.fitInput();
	}, OO.ui.theme.getDialogTransitionDuration() );
};

/**
 * @inheritdoc
 */
ve.ui.MWCategoriesPage.prototype.focus = function () {
	this.categoryWidget.focus();
};

/**
 * Tear down the page. This is called when the MWMetaDialog is torn down.
 *
 * @param {Object} [data] Dialog tear down data
 */
ve.ui.MWCategoriesPage.prototype.teardown = function ( data ) {
	var currentDefaultSortKeyItem = this.getDefaultSortKeyItem(),
		newDefaultSortKey = this.defaultSortInput.getValue(),
		newDefaultSortKeyData = {
			type: 'mwDefaultSort',
			attributes: { content: newDefaultSortKey }
		};

	if ( data && data.action === 'apply' ) {
		// Alter the default sort key iff it's been touched & is actually different
		if ( this.defaultSortKeyTouched ) {
			if ( newDefaultSortKey === '' ) {
				if ( currentDefaultSortKeyItem ) {
					currentDefaultSortKeyItem.remove();
				}
			} else {
				if ( !currentDefaultSortKeyItem ) {
					this.metaList.insertMeta( newDefaultSortKeyData );
				} else if ( currentDefaultSortKeyItem.getAttribute( 'content' ) !== newDefaultSortKey ) {
					currentDefaultSortKeyItem.replaceWith(
						ve.extendObject( true, {},
							currentDefaultSortKeyItem.getElement(),
							newDefaultSortKeyData
						)
					);
				}
			}
		}
	}

	this.categoryWidget.clearItems();
	this.metaList.disconnect( this );
	this.metaList = null;
};
