exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "balance": "TEXT", 
			"date": "TEXT",
			"location": "TEXT",
			"poolType": "TEXT",
			"race": "TEXT",
			"raceTime": "TEXT",
			"runner": "TEXT",
			"status": "TEXT",
			"transactionID": "TEXT",
			"unitAmount": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "transactions"
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
			getTransactionInfo: function(){
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
					    balance: res.fieldByName('balance'),
						date: res.fieldByName('date'),
						location: res.fieldByName('location'),
						poolType: res.fieldByName('poolType'),
						race: res.fieldByName('race'),
						raceTime: res.fieldByName('raceTime'),
						runner: res.fieldByName('runner'),
						status: res.fieldByName('status'),
						transactionID: res.fieldByName('transactionID'),
						unitAmount: res.fieldByName('unitAmount')
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			}, 
			addTransaction : function(e){
				var collection = this; 
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android") {
                	db.file.setRemoteBackup(false);
                }
                sql_query = "INSERT INTO " + collection.config.adapter.collection_name + " (balance,date,location,poolType,race,raceTime,runner,status,transactionID,unitAmount) VALUES ('"+e.balance+"','"+e.date+"','"+e.location+"','"+e.poolType+"','"+e.race+"',   '"+e.raceTime+"','"+e.runner+"' ,'"+e.status+"','"+e.transactionID+"','"+e.unitAmount+"')" ;
           		console.log(sql_query);
	            db.execute(sql_query);
	            db.close();
	            collection.trigger('sync');
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