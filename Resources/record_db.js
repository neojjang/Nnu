//record_db.js

//DB操作のメソッドをここに書く
var RecordDB = function() {
	this.dbName = 'records';
	
	this.open = function () {
		this.db = Titanium.Database.open(this.dbName);
	};
	this.close = function () {
		this.db.close();
	};
	this.setRows = function (rows) {
		var res = [];
		if ( rows.getRowCount() > 0 ) {
			Ti.API.debug('Found: ' + rows.getRowCount() );
			for (i =0; rows.isValidRow(); i++) {
				var record = {};
				record.id = rows.fieldByName('id');
				record.meat_val = rows.fieldByName('meat_val');
				record.vegetable_val = rows.fieldByName('vegetable_val');
				record.carb_val = rows.fieldByName('carb_val');
				var time = rows.fieldByName('at', Titanium.Database.FIELD_TYPE_DOUBLE);
				record.at = new Date();
				record.at.setTime(time);
				res.push(record);
				rows.next();
			}
		}
		return res;
	};
	this.deleteOne = function(record) {
		this.open();
		var res = this.db.execute(
		'DELETE FROM records WHERE id=?',
		record.id
		);
		Ti.API.debug('Delete from DB');
		this.close();
		return true;
	};
	this.update = function(record) {
		this.open();
		Ti.API.debug('update at.getTime():' + record.at.getTime());
		var res = this.db.execute(
		'UPDATE records SET meat_val=?, vegetable_val=?, carb_val=?, at=? WHERE id=?',
		record.meat_val,
		record.vegetable_val,
		record.carb_val,
		record.at.getTime(),
		record.id
		);
		Ti.API.debug('Update DB');
		this.close();
		return true;
	};
	this.insert = function(record) {
		this.open();
		Ti.API.debug('insert at.getTime():' + record.at.getTime());
		var res = this.db.execute(
		'INSERT INTO records (meat_val, vegetable_val, carb_val, at) VALUES(?,?,?,?)',
		record.meat_val,
		record.vegetable_val,
		record.carb_val,
		record.at.getTime()
		);
		Ti.API.debug('Insert into DB');
		this.close();
	};
	this.findAll = function() {
		this.open();
		var rows = this.db.execute( 'SELECT * FROM records ORDER BY at DESC' );
		var res = this.setRows(rows);
		rows.close();
		this.close();
		return res;
	};
	this.findOne = function(id) {
		this.open();
		var row = this.db.execute( 'SELECT * FROM records WHERE id=?',
			id
		 );
		var res = this.setRows(row)[0];
		row.close();
		this.close();
		return res;
	};
	// テーブル作成
	this.open();
	this.db.execute('DROP TABLE records');
	this.db.execute('CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY, meat_val INTEGER, vegetable_val INTEGER, carb_val INTEGER, at real)');
	this.close();
};