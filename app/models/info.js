exports.definition = {
	config: {
		columns: {
		    //"id": "string",
		    "username": "TEXT",
		    "sex": "TEXT",
		    "dob": "TEXT",
		    "occupation": "TEXT",
		    "race": "TEXT",
		    "nation": "TEXT",
		    "oldic": "TEXT",
		    "newic": "INTEGER",
		    "address": "TEXT",
		    "msisdn": "INTEGER",
		    "email": "TEXT",
		},
		adapter: {
			type: "sql",
			collection_name: "info"
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
			getInfo: function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    //id: res.fieldByName('id'),
					    username: res.fieldByName('username'),
					    sex: res.fieldByName('sex'),
					    dob: res.fieldByName('dob'),
					    occupation: res.fieldByName('occupation'),
					    race: res.fieldByName('race'),
					    nation: res.fieldByName('nation'),
					    oldic: res.fieldByName('oldic'),
					    newic: res.fieldByName('newic'),
					    address: res.fieldByName('address'),
					    msisdn: res.fieldByName('msisdn'),
					    email: res.fieldByName('email')
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