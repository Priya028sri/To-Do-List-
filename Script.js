let btn = document.querySelector("button");
let text = document.querySelector("#task");
let box1 = document.querySelector("#box");

let tasks = JSON.parse(localStorage.getItem("task")) || [];

display();

// Add task event
btn.addEventListener("click", function () {

    let val = text.value;

    if (val.trim() === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: val,
        completed: false
    });

    localStorage.setItem("task", JSON.stringify(tasks));
    display();
    text.value = "";
});

// Display function
function display() {

    box1.innerHTML = "";

    tasks.forEach(function (task, index) {

        let div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.padding = "10px";

        let span = document.createElement("span");
        span.textContent = task.text;

        // Show completed tasks
        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        // Mark/unmark as done
        span.addEventListener("dblclick", function () {

            task.completed = !task.completed;

            localStorage.setItem("task", JSON.stringify(tasks));

            display();
        });

        // Delete button
        let delBtn = document.createElement("button");
        delBtn.textContent = "×";
        delBtn.style.background = "transparent";
        delBtn.style.border = "none";
        delBtn.style.color = "#110f0f";
        delBtn.style.fontSize = "20px";
        delBtn.style.cursor = "pointer";

        delBtn.addEventListener("click", function () {

            tasks.splice(index, 1);

            localStorage.setItem("task", JSON.stringify(tasks));

            display();
        });

        div.appendChild(span);
        div.appendChild(delBtn);

        let hr = document.createElement("hr");

        box1.appendChild(div);
        box1.appendChild(hr);
    });
}