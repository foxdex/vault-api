/*Database connection encapsulation*/

var config = require("./test/test-mysql");
const mysql = require("mysql");
<<<<<<< HEAD
=======
var config = {
  "host": "18.162.61.131",
  "port": "3306",
  "user": "hf",
  "password": "Hf_12345678",
  "database": "lend"
}
>>>>>>> 445b69023c7cb420bc09863806b81ce3374bcf07
var pool = mysql.createPool(config);
// SELECT ALL
exports.selectAll = function selectAll(sqlAll) {
  return query(sqlAll)

}

// SELECT
exports.select = function select(selSql, selSqlParams) {
  return query(selSql, selSqlParams)
}

// INSERT
exports.insert = function insert(addSql, addSqlParams) {
  return query(addSql, addSqlParams)
}

// UPDATE
exports.update = function update(updSql, updSqlParams) {
  return query(updSql, updSqlParams)
}

// DELET
exports.deleteData = function deleteData(delSql, delSqlParams) {
    return query(delSql, delSqlParams)
    // conn.query(delSql, delSqlParams, function (err, result) {
    //     if (err) {
    //         console.log('[DELETE ERROR] - ', err.message);
    //         return;
    //     }
    //     // console.log('--------------------------DELETE----------------------------');
    //     // console.log('DELETE affectedRows',result.affectedRows);
    //     // console.log('-----------------------------------------------------------------\n\n');
    // });

    // conn.end();
}
function dddss  () {
  return new Promise((resolve,reject)=>{
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log('mysql=error====='+ err);
          reject(err);
      } else {
          resolve(connection);
      }
    })
  })
}

function query(sql,data) {
  return new Promise((resolve, reject) => {
    dddss().then((connection)=>{
      connection.query(sql,data,function (err, results, fields) {
        if (err) {
          console.log('mysql=error====='+ err);
            reject(err);
        } else {
            resolve(results);
          connection.release();
        }
   
    })
  })
  })
}


