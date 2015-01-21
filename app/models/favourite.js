exports.definition = {
	config: {
		columns: {
		    //"id": "string"
		    "min_to_race": "TEXT",
			"pla_odd": "TEXT", 
			"race_date": "TEXT",
			"race_no": "TEXT",
			"runner": "TEXT", 
			"time": "TEXT",
			"venue": "TEXT",
			"win_odd": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "favourite"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};