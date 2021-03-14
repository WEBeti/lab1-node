"use strict" ;
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function Task(id, description, isUrgent, isPrivate, deadline=undefined){
    this.id=id;
    this.description = description;
    this.isUrgent = (isUrgent === true ? true : false);     // additional checks on isUrgent and isPrivate being boolean values
    this.isPrivate = (isPrivate === false ? false : true);
    this.deadline = deadline;
    this.toString = () => { return 'Id: '+ this.id
                                +', Description: '+ this.description
                                +', Urgent: '+ this.isUrgent
                                +', Private: '+ this.isPrivate
                                +', Deadline: '+ (typeof this.deadline == 'undefined' ? '<not defined>' : this.deadline.format()) + '\n'
    }
}

function myDateCompare(a,b){
    return (typeof a == 'undefined' ? 1 : (typeof b == 'undefined' ? -1 : a-b));
}

function TaskList(){
    this.tasks = [];
    this.add = (t) => {this.tasks.push(t)};
    this.sortAndPrint = () => {console.log('** Tasks sorted by deadline (most recent first): **\n', this.tasks.sort((a,b) => {return myDateCompare(a.deadline, b.deadline)}).join(''))};
    this.filterAndPrint = () => {console.log('** Tasks filtered, only (urgent == true): **\n', this.tasks.filter((t) => {return t.isUrgent === true}).join(''))}
}

const db = new sqlite.Database('tasks.db', (err) => {if(err)throw err});
const query1 = ' SELECT * FROM tasks ';
const query2 = ' SELECT * FROM tasks WHERE deadline>? OR deadline IS NULL';
const query3 = " SELECT * FROM tasks WHERE description LIKE ? ";

function runQueryToTaskList(query, queryParams){
    return new Promise((resolve, reject) => {
        const tlist = new TaskList;
        db.all(query, [queryParams],
        (err, rows) => {
            if(err) reject(err);
            else {
                for (let row of rows){
                    const t = new Task(Number(row.id), String(row.description), Boolean(row.urgent), Boolean(row.private), (row.deadline === null ? undefined : dayjs(row.deadline)));
                    tlist.add(t);
                }
                resolve(tlist);
            }
        });
    })
}

runQueryToTaskList(query1).then(tlist => tlist.sortAndPrint());
runQueryToTaskList(query2, ['2021-03-10']).then(tlist => tlist.sortAndPrint());
runQueryToTaskList(query3, ['%lab%']).then(tlist => tlist.sortAndPrint());

db.close();