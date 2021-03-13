"use strict" ;

function strcmp(a,b){ return (a<b? -1 : (a>b? 1 : 0)) }

function Task(id, description, isUrgent, isPrivate, deadline='<not defined>'){
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
                                +', Deadline: '+ this.deadline + '\n'
    }
}

function TaskList(){
    this.tasks = [];
    this.add = (t)=>{this.tasks.push(t)};
    this.sortAndPrint = ()=>{console.log('** Tasks sorted by deadline (most recent first): **\n', this.tasks.sort((a,b)=>{return strcmp(a.deadline, b.deadline)}).join(''))};
    this.filterAndPrint = ()=>{console.log('** Tasks filtered, only (urgent == true): **\n', this.tasks.filter((t)=>{return t.isUrgent===true}).join(''))}
}

const tasks = new TaskList;
tasks.add(new Task(1, 'laundry', false, true));
tasks.add(new Task(2, 'monday lab', false, false, '2021-03-16'));
tasks.add(new Task(3, 'phone call', true, false,'2021-03-08'));
tasks.add(new Task(4, 'hair cut', true, false,'2021-03-13'));
tasks.add(new Task(5, 'domino\'s pizza'));

tasks.sortAndPrint();
tasks.filterAndPrint();