const {
  addTask,
  listTask,
  completeTask,
  deleteTask,
  help
} = require('./commands');

module.exports = function handleCommands([command, input]) {
  switch (command) {
    case 'add':
      addTask(input);
      break;
    case 'list':
      listTask();
      break;
    case 'complete':
      completeTask(input);
      break;
    case 'delete':
      deleteTask(input);
      break;
    default:
      help();
      break;
  }
};
