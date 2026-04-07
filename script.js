let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let time = 1500;
let interval;

function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("clock").innerText = hours + ":" + minutes;

    let greet = "Good Morning";
    if (hours >= 12) greet = "Good Afternoon";
    if (hours >= 18) greet = "Good Evening";
    document.getElementById("greeting").innerText = greet;
}
setInterval(updateClock, 1000);

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let text = document.createElement("span");
        text.innerText = task.text;
        if (task.done) text.classList.add("completed");

        text.onclick = function () {
            tasks[index].done = !tasks[index].done;
            saveTasks();
        };

        let del = document.createElement("span");
        del.innerText = "❌";
        del.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
        };

        li.appendChild(text);
        li.appendChild(del);
        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let value = input.value.trim();
    if (value === "") return;

    tasks.push({ text: value, done: false });
    input.value = "";
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function startTimer() {
    if (interval) return;
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    time = 1500;
    updateTimer();
}

function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").innerText = minutes + ":" + seconds;
}

function saveNotes() {
    let notes = document.getElementById("notes").value;
    localStorage.setItem("notes", notes);
}

function loadNotes() {
    let saved = localStorage.getItem("notes");
    if (saved) document.getElementById("notes").value = saved;
}

updateTimer();
renderTasks();
loadNotes();
updateClock();