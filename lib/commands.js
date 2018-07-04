const Task = require('./task');
const { readFromStore, writeToStore } = require('./fileStorageSync');
const { table } = require('./util');

function addTask(task) {
  const tasks = readFromStore('tasks');
  const newTask = Task.create(task);
  if (writeToStore('tasks', [...tasks, newTask])) {
    console.log(`✔ Created task ${newTask.id}`);
  }
}

function listTask() {
  const allTasks = Task.getAll(readFromStore('tasks'));
  if (allTasks.length > 0) {
    allTasks.forEach(i => table.push([i.id, i.task, i.done]));
    console.log(table.toString());
    console.log('You have', allTasks.length, 'tasks.');
    process.exit(1);
  }
  console.log('\n You have 0 task.');
}

function completeTask(taskID) {
  const allTasks = readFromStore('tasks');
  const task = allTasks.filter(t => t.id === parseInt(taskID))[0];
  const updateTasks = allTasks.map(item => {
    return item.id === task.id ? Task.complete(item) : item;
  });
  if (writeToStore('tasks', updateTasks)) {
    console.log(`Completed task ${task.id}: '${task.task}'`);
  }
}

function deleteTask(taskID) {
  const tasks = readFromStore('tasks');
  const task = tasks.filter(t => t.id === parseInt(taskID))[0];
  const updateTasks = Task.del(task.id, tasks);
  if (writeToStore('tasks', updateTasks)) {
    console.log(`Deleted task ${task.id}: '${task.task}'`);
  }
}

function help() {
  console.log(`
  Usage:
    $ todoer <command>
  
  Commands:
    add <task>        Add new task.
    list              List all tasks.
    complete <id>     Mark task as complete.
    delete <id>       Delete task.
  
  Example:
    $ todoer add "New task"
    $ todoer complete 12345
    $ todoer list
  `);
}

module.exports = { addTask, listTask, completeTask, deleteTask, help };
