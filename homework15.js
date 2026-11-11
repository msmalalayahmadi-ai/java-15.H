
// Select the parent task list
const taskList = document.getElementById("task-list");

// Event delegation for Edit clicks
taskList.addEventListener("click", function (event) {

    // Check if the clicked element is an Edit button
    const editButton = event.target.closest(".edit-btn");

    if (!editButton || !taskList.contains(editButton)) {
        return;
    }

    // Find the task containing the Edit button
    const task = editButton.closest("li");

    // Prevent editing an already edited task
    if (task.dataset.editing === "true") {
        return;
    }

    // Get the current task text
    const taskText = task.querySelector("span");

    // Create a new input field
    const input = document.createElement("input");

    input.type = "text";
    input.value = taskText.textContent;
    input.dataset.role = "task-input";

    // Mark the task as being edited
    task.dataset.editing = "true";

    // Remove the old task text and Edit button
    taskText.remove();
    editButton.remove();

    // Add the input field to the task
    task.append(input);

    // Focus on the input field
    input.focus();

    // Place the cursor at the end of the text
    input.setSelectionRange(input.value.length, input.value.length);

});


// Event delegation for Enter key
taskList.addEventListener("keydown", function (event) {

    // Check if Enter was pressed inside a task input
    if (
        event.key === "Enter" &&
        event.target.matches('input[data-role="task-input"]')
    ) {

        event.preventDefault();

        // Get the input and its parent task
        const input = event.target;
        const task = input.closest("li");

        // Get the updated task text
        const newText = input.value.trim();

        // Prevent saving an empty task
        if (newText === "") {
            input.focus();
            return;
        }

        // Create a new span element
        const taskText = document.createElement("span");

        // Set the updated text
        taskText.textContent = newText;

        // Create a new Edit button
        const editButton = document.createElement("button");

        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");

        // Remove the input field
        input.remove();

        // Remove the editing status
        delete task.dataset.editing;

        // Add the updated text and Edit button
        task.append(taskText, editButton);

    }

});
