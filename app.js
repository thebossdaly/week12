$(document).ready(function () {
    // Get tasks from the API
    function getTasks() {
      $.get("http://localhost:3000/tasks", function (data) {
        displayTasks(data);
      });
    }
  
    // Display tasks in the list
    function displayTasks(tasks) {
      const taskList = $("#task-list");
      taskList.empty();
  
      tasks.forEach(function (task) {
        const listItem = $("<li>")
          .addClass("list-group-item")
          .text(task.title)
          .append(
            $("<button>")
              .addClass("btn btn-danger float-right delete-task")
              .text("Delete")
          )
          .append(
            $("<button>")
              .addClass("btn btn-warning float-right edit-task")
              .text("Edit")
          )
          .data("id", task.id);
  
        taskList.append(listItem);
      });
    }
  
    // Add a new task
    $("#task-form").submit(function (e) {
      e.preventDefault();
      const newTask = $("#task").val();
      $.post("http://localhost:3000/tasks", { title: newTask }, function () {
        getTasks();
        $("#task").val("");
      });
    });
  
    // Delete a task
    $("#task-list").on("click", ".delete-task", function () {
      const taskId = $(this).parent().data("id");
      $.ajax({
        url: "http://localhost:3000/tasks/" + taskId,
        type: "DELETE",
        success: getTasks,
      });
    });
  
    // Edit a task
    $("#task-list").on("click", ".edit-task", function () {
      const taskId = $(this).parent().data("id");
      const newTaskTitle = prompt("Edit the task:", $(this).parent().text());
  
      if (newTaskTitle) {
        $.ajax({
          url: "http://localhost:3000/tasks/" + taskId,
          type: "PATCH",
          data: { title: newTaskTitle },
          success: getTasks,
        });
      }
    });
  
    // Get tasks when the page loads
    getTasks();
  });
  