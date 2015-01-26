exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "venue": "TEXT",
		    "totalRunner": "TEXT",  
		},
		adapter: {
			type: "sql",
			collection_name: "raceCardInfo"
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
			
			getRaceCardInfo: function(){
				var collection = this;
                //var sql = "SELECT * FROM " + collection.config.adapter.collection_name + "ORDER BY id LIMIT 1";
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                
                var listArr = []; 
                var count = 0;
               
                while (res.isValidRow()){
                	if(res.fieldByName('id') !== null){
                		listArr[count] = {
						    id: res.fieldByName('id'),
						    venue: res.fieldByName('venue'),
						    totalRunner: res.fieldByName('totalRunner')
						};
						res.next();
						count++;
                	}
					
				} 
               
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			resetInfo: function(){
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