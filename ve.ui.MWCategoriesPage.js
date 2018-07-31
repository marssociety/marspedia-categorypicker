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
		label: ve.msg( 'visualeditor-dialog-meta-categories-options' ),
		icon: 'advanced'
	} );

	this.categoryWidget = new ve.ui.MWCategoryWidget( {
		$overlay: config.$overlay
	} );

	this.addCategory = new OO.ui.FieldLayout(
		this.categoryWidget,
		{
			$overlay: config.$overlay,
			align: 'top',
			label: ve.msg( 'visualeditor-dialog-meta-categories-addcategory-label' )
		}
	);

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
	//this.categoryOptionsFieldset.addItems( [ this.defaultSort ] );
	this.$element.append( this.categoriesFieldset.$element );


    /*****************************************************************************/
	/******************************* TMS Code Start ******************************/
	/*****************************************************************************/

	this.resetButton = new OO.ui.ButtonWidget( {
		framed: false,
		label: 'Reset',
		icon: 'eye',
		classes: ['rightSide']
	} );

	this.resetButton.connect(this, {click: "resetBoxes"});

	this.$element.append(this.resetButton.$element);

	this.fieldset = new OO.ui.FieldsetLayout( { 
	  label: 'Categories',
	  icon: 'tag'
	} ); 

    // nodes is an array of all the field sets and checkboxes into one.
	this.nodes;

	this.fields = this.createFields();
	this.fieldset.addItems( this.fields );


	this.cachedBoxes = [];

	this.$element.append(this.fieldset.$element);

    /*****************************************************************************/
	/******************************* TMS Code End ********************************/
	/*****************************************************************************/

};

/* Inheritance */

OO.inheritClass( ve.ui.MWCategoriesPage, OO.ui.PageLayout );

/* Methods */

/*****************************************************************************/
/******************************* TMS Code Start ******************************/
/*****************************************************************************/

ve.ui.MWCategoriesPage.prototype.onClick = function ( item, beforeMetaItem ) {
	if(item === true) {
	    var newItem = this.getNewChecked();
	    var args = [ this.getCategoryItemForInsertion( newItem ) ];
		// Insert new metaList item
		if ( beforeMetaItem ) {
			args.push( beforeMetaItem.getOffset() );
			if ( beforeMetaItem.getIndex ) {
				args.push( beforeMetaItem.getIndex() );
			}
		}
        console.log(args);
		this.metaList.insertMeta.apply( this.metaList, args );
	} else {
        var oldItem = this.getUnChecked();
        //TODO: remove item when it gets unchecked
	}
};

// When a checkbox is clicked, we need to search through all nodes to see which one is clicked.
// Once we find it, add it to the list of cached checkboxes.  
// Then return the value of the currently checked checkbox.
ve.ui.MWCategoriesPage.prototype.getNewChecked = function() {
	var i, j;
	for(i = 0; i < this.nodes.length; i++) {
		//console.log("i=", i, " isSelected()=", this.nodes[i].box.isSelected());
        if(this.nodes[i].box.isSelected() === true) {
        	if(this.cachedBoxes.length === 0) {
        		this.cachedBoxes.push(this.nodes[i]);
            	return this.nodes[i];
        	}

            for(j = 0; j < this.cachedBoxes.length; j++) {
            	if(this.nodes[i].value === this.cachedBoxes[j].value) {
            		// we know nodes[i] has already been selected, so we can skip it.
            	} else {
            		this.cachedBoxes.push(this.nodes[i]);
            		return this.nodes[i];
            	}
            }
        }
	}
}

ve.ui.MWCategoriesPage.prototype.getUnChecked = function() {
	var i, j;
	for(i = 0; i < this.nodes.length; i++) {
		if(this.nodes[i].box.isSelected() !== true) {
			for(j = 0; j < this.cachedBoxes.length; j++) {
				// if the node is not selected, but it is in our cached list, then we know
				// the current node is the node that has been unselected.
	            if(this.cachedBoxes[j].value === this.nodes[i].value) {
	            	this.cachedBoxes.splice(j,1);
	                return this.nodes[i].value;
	            }
			}
		}
	}
}


ve.ui.MWCategoriesPage.prototype.resetBoxes = function () {
	for(var i=0; i<this.nodes.length; i++) {
       	this.nodes[i].box.setSelected(false);
	}
}


ve.ui.MWCategoriesPage.prototype.createFields = function() {
    var i;
    var f = [];
	this.nodes = [
	  /************************** Cat 1 starts **********************/
	  {
        value: 'Mars Planetary Science',
        class: 'topCat',
        firstLabel: 1,
        secondLabel: 0
	  },
	  {
        value: 'Astronomy',
        class: 'midCat',
        firstLabel: 1,
        secondLabel: 1
	  },
	  {
        value: 'Orbit',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 1
	  },
	  {
        value: 'Moons - Natural Satellites',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 1
	  },
	  {
        value: 'Mars-Crossing Asteroids',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 1
	  },
	  {
        value: 'Time Measures',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 1
	  },
	  {
        value: 'Aerography',
        class: 'midCat',
        firstLabel: 1,
        secondLabel: 2
	  },
	  {
        value: 'Mars Atlas',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 2
	  },
	  {
        value: 'Topography',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 2
	  },
	  {
        value: 'Atmospheric Sciences',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 2
	  },
	  {
        value: 'Gravimetry',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 2
	  },
	  {
        value: 'Surface Spectroscopy',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 2
	  },
	  {
        value: 'Areology',
        class: 'midCat',
        firstLabel: 1,
        secondLabel: 3
	  },
	  {
        value: 'Geologic Processes',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 3
	  },
	  {
        value: 'Areomorphology',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 3
	  },
	  {
        value: 'Mineralogy',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 3
	  },
      {
        value: 'Hydrology',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 3
	  },
      {
        value: 'Mars Meteorites',
        class: 'botCat',
        firstLabel: 1,
        secondLabel: 3
	  },
	  {  
	  /**************************Cat 2 Start spot=[18] **************/
        value: 'Mars Spacecraft/Robotic Missions',
        class: 'topCat',
        firstLabel: 2,
        secondLabel: 0
	  },
      {
        value: 'Mission Objectives',
        class: 'midCat',
        firstLabel: 2,
        secondLabel: 1
	  },
      {
        value: 'Search for Life',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 1
	  },
      {
        value: 'Spaceflight Science',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 1
	  },
      {
        value: 'Resource Mapping',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 1
	  },
      {
        value: 'Mission Planning',
        class: 'midCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Exploration Concepts',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Orbital Mechanics',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Propulsion',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Power Systems',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Communication',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Instruments',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Emerging Technologies',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 2
	  },
      {
        value: 'Exploration Missions',
        class: 'midCat',
        firstLabel: 2,
        secondLabel: 3
	  },
      {
        value: 'Orbital Missions',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 3
	  },
      {
        value: 'Lander Missions',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 3
	  },
      {
        value: 'Robotic Exploration',
        class: 'botCat',
        firstLabel: 2,
        secondLabel: 3
	  },
	  /************************** Cat 3 Starts spot = [35] **************/
      {
        value: 'Mars Human Exploration',
        class: 'topCat',
        firstLabel: 3,
        secondLabel: 0 
	  },
	  {
        value: 'Human Mission Architecture',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 1 
	  },
	  {
        value: 'Funding',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 2 
	  },
	  {
        value: 'Training',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 3 
	  },
	  {
        value: 'Human Factors',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 4 
	  },
	  {
        value: 'Medicine',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 5 
	  },
	  {
        value: 'In-situ Resource Utilization',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 6 
	  },
	  {
        value: 'Space Stations',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 7 
	  },
	  {
        value: 'Moon Stations',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 8 
	  },
	  {
        value: 'Exploration Transport Systems',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 9 
	  },
	  {
        value: 'Interplanetary Vehicles',
        class: 'botCat',
        firstLabel: 3,
        secondLabel: 9 
	  },
	  {
        value: 'Descent Vehicles',
        class: 'botCat',
        firstLabel: 3,
        secondLabel: 9 
	  },
	  {
        value: 'Ascent Vehicles',
        class: 'botCat',
        firstLabel: 3,
        secondLabel: 9 
	  },
	  {
        value: 'Surface Vehicular Activities',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 10 
	  },
	  {
        value: 'EVA Suits',
        class: 'botCat',
        firstLabel: 3,
        secondLabel: 10 
	  },
	  {
        value: 'Analog Stations',
        class: 'midCat',
        firstLabel: 3,
        secondLabel: 11 
	  },
	  {
        value: 'MDRS',
        class: 'botCat',
        firstLabel: 3,
        secondLabel: 11 
	  },
	  {
        value: 'FMARS',
        class: 'botCat',
        firstLabel: 3,
        secondLabel: 11 
	  },
	  {
        value: 'HI-SEAS',
        class: 'botCat',
        firstLabel: 3,
        secondLabel: 11 
	  },
	  /************************** Cat 4 start spot=[54] *****************/
	  {
        value: 'Mars Human Settlement',
        class: 'topCat',
        firstLabel: 4,
        secondLabel: 0 
	  },
	  {
        value: 'Settlement Transport Systems',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 1 
	  },
	  {
        value: 'Ready for Mars',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 1 
	  },
	  {
        value: 'SpaceX Transport',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 1 
	  },
	  {
        value: 'Mission Support',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 2 
	  },
	  {
        value: 'Life Support Systems',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 3 
	  },
	  {
        value: 'Air',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 3 
	  },
	  {
        value: 'Water',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 3 
	  },
	  {
        value: 'HVAC',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 3 
	  },
	  {
        value: 'Settlement Plans',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 4 
	  },
	  {
        value: 'Housing and Infrastructure Concepts',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 4 
	  },
	  {
        value: 'Construction, Assembly, Maintenance',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 4 
	  },
	  {
        value: 'Surface Transportation',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 5 
	  },
	  {
        value: 'Surface Vehicles',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 5 
	  },
	  {
        value: 'Surface Transportation Networks',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 5 
	  },
	  {
        value: 'Health and Safety',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 6 
	  },
	  {
        value: 'Radiation Protection',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 6 
	  },
	  {
        value: 'Diet and Nutrition',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 6 
	  },
	  {
        value: 'Gravity and Fitness',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 6 
	  },
	  {
        value: 'Psychology',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 6 
	  },
	  {
        value: 'Communications',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 7 
	  },
	  {
        value: 'Energy',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 8 
	  },
	  {
        value: 'Sources',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 8 
	  },
	  {
        value: 'Distribution',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 8 
	  },
	  {
        value: 'Storage',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 8 
	  },
	  {
        value: 'Fuels',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 8 
	  },
	  {
        value: 'Agriculture',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Growing Methods',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Food Crops',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Non-Food Crops',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Biospherics',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Genetic Engineering',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Livestock and Aquaculture',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Resources and Manufacture',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Materials',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Prospecting',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Mining and Refining',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Synthesis',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Manufacture',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Fabrication and Repair',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Waste Management and Recycling',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 9 
	  },
	  {
        value: 'Society',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 10 
	  },
	  {
        value: 'Law',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 10 
	  },
	  {
        value: 'Philosophy and Ethics',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 10 
	  },
	  {
        value: 'Commerce and Economics',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 10 
	  },
	  {
        value: 'Government',
        class: 'botCat',
        firstLabel: 4,
        secondLabel: 10 
	  },
	  {
        value: 'Terraforming',
        class: 'midCat',
        firstLabel: 4,
        secondLabel: 11 
	  },
	  /************************** cat 5 starts spot =[101] *************/
	  {
        value: 'Mars Outreach',
        class: 'topCat',
        firstLabel: 5,
        secondLabel: 0 
	  },
	  {
        value: 'Outreach Concepts',
        class: 'midCat',
        firstLabel: 5,
        secondLabel: 1 
	  },
	  {
        value: 'Political Action',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 1 
	  },
	  {
        value: 'Events',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 1 
	  },
	  {
        value: 'Competitions',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 1 
	  },
	  {
        value: 'People and Organizations',
        class: 'midCat',
        firstLabel: 5,
        secondLabel: 2 
	  },
	  {
        value: 'Mars Society',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 2 
	  },
	  {
        value: 'Explore Mars',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 2 
	  },
	  {
        value: 'Mars One',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 2 
	  },
	  {
        value: 'SpaceX',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 2 
	  },
	  {
        value: 'Mars Foundation',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 2 
	  },
	  {
        value: 'Education',
        class: 'midCat',
        firstLabel: 5,
        secondLabel: 3 
	  },
	  {
        value: 'Online Courses',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 3 
	  },
	  {
        value: 'University Degree Programs',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 3 
	  },
	  {
        value: 'Information Media Sources',
        class: 'midCat',
        firstLabel: 5,
        secondLabel: 4 
	  },
	  {
        value: 'Marspedia',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 4 
	  },
	  {
        value: 'MarsPapers',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 4 
	  },
	  {
        value: 'Mars Society Videos',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 4 
	  },
	  {
        value: 'Wikipedia',
        class: 'botCat',
        firstLabel: 5,
        secondLabel: 4 
	  },
	  /************************ cat 6 starts spot=[120] ****************/
	  {
        value: 'Mars Arts and Literature',
        class: 'topCat',
        firstLabel: 6,
        secondLabel: 0 
	  },
	  {
        value: 'Books',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 1 
	  },
	  {
        value: 'Science Fiction Literature',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 1 
	  },
	  {
        value: 'Non-fiction Literature',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 1 
	  },
	  {
        value: 'Essays',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 2 
	  },
	  {
        value: 'History',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 3 
	  },
	  {
        value: 'Plays',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 4 
	  },
	  {
        value: 'Movies',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 5 
	  },
	  {
        value: 'Documentaries',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 5 
	  },
	  {
        value: 'TV Series',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 5 
	  },
	  {
        value: 'Science Fiction Movies',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 5 
	  },
	  {
        value: 'Music',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 6 
	  },
	  {
        value: 'Photography',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 7 
	  },
	  {
        value: 'Art',
        class: 'midCat',
        firstLabel: 6,
        secondLabel: 8 
	  },
	  {
        value: 'Games',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 8 
	  },
	  {
        value: 'Board Games',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 8 
	  },
	  {
        value: 'Computer Games',
        class: 'botCat',
        firstLabel: 6,
        secondLabel: 8 
	  }
	];

    // add common attributes to all category nodes.
	for(i = 0; i < this.nodes.length; i++) {
		this.nodes[i].name = 'Category:' + this.nodes[i].value;
  		this.nodes[i].box = new OO.ui.CheckboxInputWidget({ value: this.nodes[i].value});
		this.nodes[i].metaItem = {};
	}

    for(i=0; i<this.nodes.length; i++) {
    	f.push(new OO.ui.FieldLayout( this.nodes[i].box, { label: this.nodes[i].value, align: 'inline', classes: [this.nodes[i].class] } ));
    	this.nodes[i].box.connect(this, {change: "onClick"});
    }

    return f;
};


/*****************************************************************************/
/******************************* TMS Code End ********************************/
/*****************************************************************************/


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
	console.log("onNewCategory=", item);
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

/**********************
     KEEPING OLD CODE IN CASE I NEED IT AGAIN
                           *************************/



/*
'Mars Planetary Science'
  'Astronomy'
    'Orbit'
    'Moons - Natural Satellites'
    'Mars-Crossing Asteroids'
    'Time Measures'
  'Aerography'
    'Mars Atlas'
    'Topography'
    'Atmospheric Sciences'
    'Gravimetry'
    'Surface Spectroscopy'
  'Areology'
    'Geologic Processes'
    'Areomorphology'
    'Mineralogy'
    'Hydrology'
    'Mars Meteorites'

'Mars Spacecraft/Robotic Missions'
  'Mission Objectives'
    'Search for Life'
	'Spaceflight Science'
	'Resource Mapping'
  'Mission Planning'
    'Exploration Concepts'
	'Orbital Mechanics'
	'Propulsion'
	'Power Systems'
	'Communication'
	'Instruments'
	'Emerging Technologies'
  'Exploration Missions'
    'Orbital Missions'
    'Lander Missions'
    'Robotic Exploration'

'Mars Human Exploration'
  'Human Mission Architecture'
  'Funding'
  'Training'
  'Human Factors'
  'Medicine'
  'In-situ Resource Utilization'
  'Space Stations'
  'Moon Stations'
  'Exploration Transport Systems'
    'Interplanetary Vehicles'
    'Descent Vehicles'
    'Ascent Vehicles'
  'Surface Vehicular Activities'
    'EVA Suits'
  'Analog Stations'
    'MDRS'
    'FMARS'
    'HI-SEAS'

'Mars Human Settlement'
  'Settlement Transport Systems'
    'Ready for Mars'
    'SpaceX Transport'
  'Mission Support'
  'Life Support Systems'
    'Air'
    'Water'
    'HVAC'
  'Settlement Plans'
    'Housing and Infrastructure Concepts'
    'Construction, Assembly, Maintenance'
  'Surface Transportation'
    'Surface Vehicles'
    'Surface Transportation Networks'
  'Health and Safety'
    'Radiation Protection'
    'Diet and Nutrition'
    'Gravity and Fitness'
    'Psychology'
  'Communications'
  'Energy'
    'Sources'
    'Distribution'
    'Storage'
    'Fuels'
  'Agriculture'
    'Growing Methods'
    'Food Crops'
    'Non-Food Crops'
    'Biospherics'
    'Genetic Engineering'
    'Livestock and Aquaculture'
  'Resources and Manufacture'
    'Materials'
    'Prospecting'
    'Mining and Refining'
    'Synthesis'
    'Manufacture'
    'Fabrication and Repair'
    'Waste Management and Recycling'
  'Society'
    'Law'
    'Philosophy and Ethics'
    'Commerce and Economics'
    'Government'
  'Terraforming'

'Mars Outreach'
  'Outreach Concepts'
    'Political Action'
    'Events'
    'Competitions'
  'People and Organizations'
    'Mars Society'
    'Explore Mars'
    'Mars One'
    'SpaceX'
    'Mars Foundation'
  'Education'
    'Online Courses'
    'University Degree Programs'
  'Information Media Sources'
    'Marspedia'
    'MarsPapers'
    'Mars Society Videos'
    'Wikipedia'

'Mars Arts and Literature'
  'Books'
    'Science Fiction Literature'
    'Non-fiction Literature'
  'Essays'
  'History'
  'Plays'
  'Movies'
    'Documentaries'
    'TV Series'
    'Science Fiction Movies'
  'Music'
  'Photography'
  'Art'
  'Games'
    'Board Games'
    'Computer Games'








// in main 

  // caching a checkbox location for filering usage.
    this.cachedFirstLabel = {
    	firstLabel: -1,
		secondLabel: -1
	};


// connect each 1st or 2nd level category with the filtering function.
    // top level
    this.nodes[0].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[18].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[35].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[54].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[101].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[120].box.connect(this, {change: "onFirstGroupClick"});

    // second level 1.x
    this.nodes[1].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[6].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[12].box.connect(this, {change: "onFirstGroupClick"});

    // second level 2.x
    this.nodes[19].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[23].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[31].box.connect(this, {change: "onFirstGroupClick"});

    // second level 3.x
    this.nodes[36].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[37].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[38].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[39].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[40].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[41].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[42].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[43].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[44].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[48].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[50].box.connect(this, {change: "onFirstGroupClick"});

    // second level 4.x
    this.nodes[55].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[58].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[59].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[63].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[66].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[69].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[74].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[75].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[80].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[95].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[100].box.connect(this, {change: "onFirstGroupClick"});

    // second level 5.x
    this.nodes[102].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[106].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[112].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[115].box.connect(this, {change: "onFirstGroupClick"});

    // second level 6.x
    this.nodes[121].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[124].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[125].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[126].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[127].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[131].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[132].box.connect(this, {change: "onFirstGroupClick"});
    this.nodes[133].box.connect(this, {change: "onFirstGroupClick"});


ve.ui.MWCategoriesPage.prototype.getSelectedLabel = function () {
	var labelNumber = {
		firstLabel: '',
		secondLabel: ''
	};

    // first we check if any of the outer labels are selected.  
    // if so, we then check if one of the child labels are selected.
    if(this.nodes[0].box.isSelected()) {
    	labelNumber.firstLabel = this.nodes[0].firstLabel;
        labelNumber.secondLabel = this.nodes[0].secondLabel;  
    	for(var i=1; i<18; i++) {
			if(this.nodes[i].box.isSelected()) {
  				labelNumber.firstLabel = this.nodes[i].firstLabel;
    		    labelNumber.secondLabel = this.nodes[i].secondLabel;
			}
    	}
    } else if(this.nodes[18].box.isSelected()) {
		labelNumber.firstLabel = this.nodes[18].firstLabel;
        labelNumber.secondLabel = this.nodes[18].secondLabel;
        for(var i=19; i<35; i++) {
			if(this.nodes[i].box.isSelected()) {
  				labelNumber.firstLabel = this.nodes[i].firstLabel;
    		    labelNumber.secondLabel = this.nodes[i].secondLabel;
			}
    	}
    } else if(this.nodes[35].box.isSelected()) {
		labelNumber.firstLabel = this.nodes[35].firstLabel;
        labelNumber.secondLabel = this.nodes[35].secondLabel;
        for(var i=36; i<54; i++) {
			if(this.nodes[i].box.isSelected()) {
  				labelNumber.firstLabel = this.nodes[i].firstLabel;
    		    labelNumber.secondLabel = this.nodes[i].secondLabel;
			}
    	}
    } else if(this.nodes[54].box.isSelected()) {
		labelNumber.firstLabel = this.nodes[54].firstLabel;
        labelNumber.secondLabel = this.nodes[54].secondLabel;
        for(var i=55; i<101; i++) {
			if(this.nodes[i].box.isSelected()) {
  				labelNumber.firstLabel = this.nodes[i].firstLabel;
    		    labelNumber.secondLabel = this.nodes[i].secondLabel;
			}
    	}
    } else if(this.nodes[101].box.isSelected()) {
		labelNumber.firstLabel = this.nodes[101].firstLabel;
        labelNumber.secondLabel = this.nodes[101].secondLabel;
        for(var i=102; i<120; i++) {
			if(this.nodes[i].box.isSelected()) {
  				labelNumber.firstLabel = this.nodes[i].firstLabel;
    		    labelNumber.secondLabel = this.nodes[i].secondLabel;
			}
    	}
    } else if(this.nodes[120].box.isSelected()) {
		labelNumber.firstLabel = this.nodes[120].firstLabel;
        labelNumber.secondLabel = this.nodes[120].secondLabel;
        for(var i=121; i<137; i++) {
			if(this.nodes[i].box.isSelected()) {
  				labelNumber.firstLabel = this.nodes[i].firstLabel;
    		    labelNumber.secondLabel = this.nodes[i].secondLabel;
			}
    	}
    }

    this.cachedFirstLabel = labelNumber;

	return labelNumber;
}

ve.ui.MWCategoriesPage.prototype.getUnSelectedLabel = function() {
	var labelNumber = this.cachedFirstLabel;

	this.cachedFirstLabel = {
  		firstLabel: -1,
		secondLabel: -1
	};

    // if the unselected label is not at 0 level, then it is a 1st level.
    // so cache the label that is it's parent.
	if(labelNumber.secondLabel !== 0 ) {
		this.cachedFirstLabel = {
			firstLabel: labelNumber.firstLabel,
			secondLabel: 0
		}
	}

	return labelNumber;
}

ve.ui.MWCategoriesPage.prototype.onFirstGroupClick = function (value) {
    // if we have clicked a checkbox
	if(value) {
		var selected = this.getSelectedLabel();
		console.log("selected=", selected);

		for(var i=0; i<this.nodes.length; i++) {
			// remove all categories below the selected one.
			if(this.nodes[i].firstLabel < selected.firstLabel) {
	        	this.nodes[i].box.setDisabled(true);
	        	this.fields[i].toggle(false);
	        }

            // remove all categories above the selected row.
	        if(this.nodes[i].firstLabel > selected.firstLabel) {
	        	this.nodes[i].box.setDisabled(true);
	        	this.fields[i].toggle(false);
	        }

            // remove all second layer categories below the selected one.
	        if(this.nodes[i].firstLabel === selected.firstLabel &&
	        	selected.secondLabel !== 0 &&
	        	this.nodes[i].secondLabel !== 0 &&
	        	this.nodes[i].secondLabel < selected.secondLabel) {
	        	this.nodes[i].box.setDisabled(true);
	            this.fields[i].toggle(false);
	        }

            // remove all second layer categories above the selected one.
	        if(this.nodes[i].firstLabel === selected.firstLabel &&
	        	selected.secondLabel !== 0 &&
	        	this.nodes[i].secondLabel !== 0 &&
	        	this.nodes[i].secondLabel > selected.secondLabel) {
	        	this.nodes[i].box.setDisabled(true);
	        	this.fields[i].toggle(false);
	        }
		}
	} else {
		// if "value" is false, then we have unselected a check box.  
		// need to find out which one.
		var unselected = this.getUnSelectedLabel();
		console.log("unselected=", unselected);

		if(unselected.secondLabel === 0) {
			// if a first level category is selected, enable all checkboxes.
			for(var i=0; i<this.nodes.length; i++) {
    			this.nodes[i].box.setDisabled(false);
    			this.fields[i].toggle(true);
        	}
		} else {
			for(var i=0; i<this.nodes.length; i++) {
                if(this.nodes[i].firstLabel === unselected.firstLabel) {
                	this.nodes[i].box.setDisabled(false);
    				this.fields[i].toggle(true);
                }
			}
		}
		
	}
}





*/