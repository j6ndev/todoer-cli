const { generateID } = require('./util');

function create(task) {
  return {
    id: generateID(),
    task,
    done: false
  };
}

function getAll(tasks) {
  return tasks.filter(task => !task.done);
}

function complete(task) {
  return { ...task, done: !task.done };
}

function del(id, tasks) {
  return tasks.filter(task => task.id !== id);
}

module.exports = { create, getAll, complete, del };
