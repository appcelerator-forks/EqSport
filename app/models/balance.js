exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "amount": "TEXT",
		    "date": "TEXT",
		    "time": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "balance"
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
			getBalance: function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + "ORDER BY id LIMIT 1";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var result = []; 
                
                if (res.isValidRow()){
					result = {
					    id: res.fieldByName('id'),
					    amount: res.fieldByName('amount'),
					    date: res.fieldByName('date'),
					    time: res.fieldByName('time')
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return result;
			},
		});

		return Collection;
	}
};