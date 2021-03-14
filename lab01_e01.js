"use strict" ;
const dayjs = require('dayjs');

const epoch = '1970-01-01';
function myDateCompare(a,b){
    return ( a.isSame(epoch) ? 1 : ( b.isSame(epoch) ? -1 : a-b ) );
}

function Task(id, description, isUrgent, isPrivate, deadline=dayjs(epoch)){
    this.id=id;
    this.description = description;
    // additional checks on isUrgent and isPrivate being boolean values
    this.isUrgent = (isUrgent === true ? true : false);
    this.isPrivate = (isPrivate === false ? false : true);
    this.deadline = deadline;
    this.toString = ()=>{ return 'Id: '+ this.id
                                +', Description: '+ this.description
                                +', Urgent: '+ this.isUrgent
                                +', Private: '+ this.isPrivate
                                +', Deadline: '+ (this.deadline.isSame(epoch) ? '<not defined>' : this.deadline.format()) + '\n'
    }
}

function TaskList(){
    this.tasks = [];
    this.add = (t)=>{this.tasks.push(t)};
    this.sortAndPrint = ()=>{console.log('** Tasks sorted by deadline (most recent first): **\n', this.tasks.sort((a,b)=>{return myDateCompare(a.deadline, b.deadline)}).join(''))};
    this.filterAndPrint = ()=>{console.log('** Tasks filtered, only (urgent == true): **\n', this.tasks.filter((t)=>{return t.isUrgent===true}).join(''))}
}

const tasks = new TaskList;
tasks.add(new Task(1, 'laundry', false, true));
tasks.add(new Task(2, 'monday lab', false, false, dayjs('2021-03-16')));
tasks.add(new Task(3, 'phone call', true, false, dayjs('2021-03-08')));
tasks.add(new Task(4, 'hair cut', true, false, dayjs('2021-03-13')));
tasks.add(new Task(5, 'domino\'s pizza'));

tasks.sortAndPrint();
tasks.filterAndPrint();