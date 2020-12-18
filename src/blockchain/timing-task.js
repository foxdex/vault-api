/*Timing task*/

// After the project starts, the scheduled task will be started in five seconds
exports.taskStart = function taskStart(){
    console.log(`Tasks start loading`);

    setTimeout(function () {
        setInterval(task1,1000*60*1);// task I,Get block transaction records,Do it every one minute
    }, 1000*10);

    task1();
}

// Synchronization contract event trigger record
async function task1() {

    const transactionin = require("./mysql-synchronous/transactionin");

    console.log("into task 1");
}
