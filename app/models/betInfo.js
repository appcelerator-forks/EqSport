exports.definition = {
	config: {
		columns: {
		    //"id": "string",
		    "msisdn" : "TEXT",
		    "account" : "TEXT",
		    "pin" : "TEXT",
		    "date" : "TEXT",
		    "time" : "TEXT",
		    "venue" : "TEXT",
		    "raceNo" : "TEXT",
		    "pool" : "TEXT",
		    "bet" : "TEXT",
		    "runner" : "TEXT"	    
		},
		adapter: {
			type: "sql",
			collection_name: "betInfo"
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
			getBetInfo: function(){
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
					    //id: res.fieldByName('id'),
					    msisdn: res.fieldByName('msisdn'),
					    account: res.fieldByName('account'),
					    pin: res.fieldByName('pin'),
					    date: res.fieldByName('date'),
					    time: res.fieldByName('time'),
					    venue: res.fieldByName('venue'),
					    raceNo: res.fieldByName('raceNo'),
					    pool: res.fieldByName('pool'),
					    bet: res.fieldByName('bet'),
					    runner: res.fieldByName('runner')
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