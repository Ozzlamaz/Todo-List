let tasksList = JSON.parse(localStorage.getItem('tasks'));
if (tasksList == null) {
  tasksList = [];
}


export default tasksList