/*Database connection encapsulation*/

var config

if (process.env.NODE_ENV == 'production') {
    config = require("../config/test/pro-mysql");
    console.log("use production");
} else {
    config = require("../config/test/test-mysql");
    console.log("use dev");
}
const mysql = require("mysql");

// SELECT ALL
exports.selectAll = function selectAll(sqlAll) {

    return new Promise(function (resolve, reject) {
        const conn = mysql.createConnection(config);
        conn.connect();
        conn.query(sqlAll, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err)
                return;
            }
            conn.end();
            resolve(result)
        });
    })


}

// SELECT
exports.select = function select(selSql, selSqlParams) {
    const conn = mysql.createConnection(config);
    conn.connect();

    return new Promise(function (resolve, reject) {
        conn.query(selSql, selSqlParams, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }

            // console.log('--------------------------SELECT('+selSql+' --- '+selSqlParams+')----------------------------');
            if(result){
            let dataString = JSON.stringify(result);
            let data = JSON.parse(dataString);

            // console.log("data:"+dataString);
            // console.log(result);
            // console.log('------------------------------------------------------------\n\n');

            resolve(data);
}        });
        conn.end();
    });
}

// INSERT
exports.insert = function insert(addSql, addSqlParams) {
    const conn = mysql.createConnection(config);
    conn.connect();

    conn.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });

    conn.end();
}

// UPDATE
exports.update = function update(updSql, updSqlParams) {
    const conn = mysql.createConnection(config);
    conn.connect();

    return new Promise(function (resolve, reject) {

        conn.query(updSql, updSqlParams, function (err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                return;
            }
            resolve();
        });
        conn.end();
    });
}

// DELET
exports.deleteData = function deleteData(delSql, delSqlParams) {
    const conn = mysql.createConnection(config);
    conn.connect();

    conn.query(delSql, delSqlParams, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }
        // console.log('--------------------------DELETE----------------------------');
        // console.log('DELETE affectedRows',result.affectedRows);
        // console.log('-----------------------------------------------------------------\n\n');
    });

    conn.end();
}
