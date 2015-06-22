/**
 * Created by Subbu on 6/6/15.
 */

var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'apple',
    database : 'aquafonics'
});

module.exports =
{
    getAllSensors : function(callback){
        console.log("dao.getAllSensors() entry");
        pool.getConnection(function(err, con) {
            if (err)
                return callback(err);
            con.query('SELECT * FROM sensors', function(err, rows, fields) {
                for (var i in rows) {
                    console.log('Sensors available', rows[i].SID);
                }
                con.release();
                if (err)
                    return callback(err);
                callback(null, rows);
            });
        });
        console.log("dao.getAllSensors() exit");
    },

    getSensorData : function(sensorID, callback){
        console.log("dao.getSensorData() entry");
        pool.getConnection(function(err, con) {
            if (err)
                return callback(err);
            con.query({
                sql: 'SELECT * FROM sensor_data where SID=?',
                timeout: 40000, // 40s
                values: [sensorID]
            },
            function(err, rows, fields) {
                console.log('Sensor data available', rows);
                con.release();
                if (err)
                    return callback(err);
                callback(null, rows);
            });
        });
        console.log("dao.getSensorData() exit");
    }

};