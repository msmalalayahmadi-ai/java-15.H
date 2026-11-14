//Homework - Finall Apdated 
// Dynamic Task Editting Application 
const taskList = document.getElementById("task-list");

// Shared handler for click and keydown events
function handleTaskEvent(event) {

    // Handle Edit button clicks
    if (event.type === "click") {

        const editButton = event.target.closest(".edit-btn");

        if (!editButton || !taskList.contains(editButton)) {
            return;
        }

        const task = editButton.closest("li");

        if (task.dataset.editing === "true") {
            return;
        }

        const taskText = task.querySelector("span");
        const input = document.createElement("input");

        input.type = "text";
        input.value = taskText.textContent;
        input.dataset.role = "task-input";

        task.dataset.editing = "true";

        taskText.remove();
        editButton.remove();
        task.append(input);

        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    }

    // Handle Enter key
    if (
        event.type === "keydown" &&
        event.key === "Enter" &&
        event.target.matches('input[data-role="task-input"]')
    ) {

        event.preventDefault();

        const input = event.target;
        const task = input.closest("li");
        const newText = input.value.trim();

        if (newText === "") {
            input.focus();
            return;
        }

        const taskText = document.createElement("span");
        taskText.textContent = newText;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");

        input.remove();
        delete task.dataset.editing;

        task.append(taskText, editButton);
    }
}

// Register the shared handler
taskList.addEventListener("click", handleTaskEvent);
taskList.addEventListener("keydown", handleTaskEvent);
