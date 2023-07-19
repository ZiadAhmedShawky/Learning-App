async function deleteTask(taskId) {
    try {
      const response = await fetch(`/task/${taskId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        // Task deleted successfully, perform any necessary UI updates
        // For example, remove the deleted task from the UI
        const taskElement = document.getElementById(taskId);
        if (taskElement) {
          taskElement.remove();
        }
      } else {
        // Handle error if deletion fails
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
}
const btns = document.querySelectorAll('#task-button');

btns.forEach(btn => {
  btn.addEventListener('click', function(event) {
    const taskEl = event.target.parentNode;
    const taskElId = taskEl.id;

    console.log(taskElId);
    if (event.target.matches('.delete-button')) {
      //console.log(event.target)
      deleteTask(taskElId);
    }
  });
});


const createTask=document.getElementById('task')
createTask.addEventListener('keydown',function(event){
    if(event.key==='Enter'){
        setTimeout(function() {
            location.reload();
          }, 1000);
    }
})