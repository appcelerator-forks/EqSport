exports.definition = {
	config: {
		columns: {
		    //"id": "string",
		    "pool": "TEXT", 
			"race": "TEXT",
			"position": "TEXT",
			"runner": "TEXT",
			"date": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "transactionResult"
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
			getTransResInfo: function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;

                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android") {
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    pool: res.fieldByName('pool'),
						race: res.fieldByName('race'),
						position: res.fieldByName('position'),
						runner: res.fieldByName('runner'),
						date: res.fieldByName('date')
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			}, 
			getTransResInfoByDate : function(date){
				var collection = this; 
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE date LIKE'" + date + "%'";

                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android") {
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    pool: res.fieldByName('pool'),
						race: res.fieldByName('race'),
						position: res.fieldByName('position'),
						runner: res.fieldByName('runner'),
						date: res.fieldByName('date')
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
                if(Ti.Platform.osname != "android") {
                	db.file.setRemoteBackup(false);
                }
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			},
		});

		return Collection;
	}
};