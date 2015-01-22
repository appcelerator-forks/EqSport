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
			getFavouriteInfo: function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    //id: res.fieldByName('id'),
					    min_to_race: res.fieldByName('min_to_race'),
					    pla_odd: res.fieldByName('pla_odd'),
					    race_date: res.fieldByName('race_date'),
					    race_no: res.fieldByName('race_no'),
					    runner: res.fieldByName('runner'),
					    time: res.fieldByName('time'),
					    venue: res.fieldByName('venue'),
					    win_odd: res.fieldByName('win_odd')
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			}, 
			getFavouriteInfoByRaceNo: function(race_no){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE race_no='" + race_no + "' ";
                console.log(sql);
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    //id: res.fieldByName('id'),
					    min_to_race: res.fieldByName('min_to_race'),
					    pla_odd: res.fieldByName('pla_odd'),
					    race_date: res.fieldByName('race_date'),
					    race_no: res.fieldByName('race_no'),
					    runner: res.fieldByName('runner'),
					    time: res.fieldByName('time'),
					    venue: res.fieldByName('venue'),
					    win_odd: res.fieldByName('win_odd')
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			}, 
			getFavouriteInfoByVenueAndRaceNo: function(venue,race_no){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE venue='" + venue + "' AND race_no='" + race_no + "' ";
                console.log(sql);
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    //id: res.fieldByName('id'),
					    min_to_race: res.fieldByName('min_to_race'),
					    pla_odd: res.fieldByName('pla_odd'),
					    race_date: res.fieldByName('race_date'),
					    race_no: res.fieldByName('race_no'),
					    runner: res.fieldByName('runner'),
					    time: res.fieldByName('time'),
					    venue: res.fieldByName('venue'),
					    win_odd: res.fieldByName('win_odd')
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			}, 
			resetInfo : function(){
 
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			},
		});

		return Collection;
	}
};