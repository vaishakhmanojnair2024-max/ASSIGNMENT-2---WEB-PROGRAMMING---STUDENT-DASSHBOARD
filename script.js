let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let time = 1500;
let interval;

function updateClock() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    m = m < 10 ? "0" + m : m;
    let clock = document.getElementById("clock");
    if (clock) clock.innerText = h + ":" + m;

    let g = "Good Morning";
    if (h >= 12) g = "Good Afternoon";
    if (h >= 18) g = "Good Evening";
    let greet = document.getElementById("greeting");
    if (greet) greet.innerText = g;
}
setInterval(updateClock, 1000);

function renderTasks() {
    let list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    tasks.forEach((t, i) => {
        let li = document.createElement("li");

        let text = document.createElement("span");
        text.innerText = t.text;
        if (t.done) text.classList.add("completed");

        text.onclick = function () {
            tasks[i].done = !tasks[i].done;
            saveTasks();
        };

        let del = document.createElement("span");
        del.innerText = "❌";
        del.onclick = function () {
            tasks.splice(i, 1);
            saveTasks();
        };

        li.appendChild(text);
        li.appendChild(del);
        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (!input) return;

    let v = input.value.trim();
    if (v === "") return;

    tasks.push({ text: v, done: false });
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
    let m = Math.floor(time / 60);
    let s = time % 60;
    s = s < 10 ? "0" + s : s;
    let t = document.getElementById("timer");
    if (t) t.innerText = m + ":" + s;
}

function saveNotes() {
    let n = document.getElementById("notes");
    if (n) localStorage.setItem("notes", n.value);
}

function loadNotes() {
    let n = document.getElementById("notes");
    if (!n) return;
    let saved = localStorage.getItem("notes");
    if (saved) n.value = saved;
}

renderTasks();
updateTimer();
loadNotes();
updateClock();