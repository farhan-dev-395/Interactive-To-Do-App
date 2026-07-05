;    let tasks = [];

  // ===== ADD TASK =====
  function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (!text) {
      alert("Enter a task");
      return;
    }

    let task = {
      id: Date.now(),
      text: text,
      completed: false
    };

    tasks.push(task);
    input.value = "";

    renderTasks(tasks);
  }

  // ===== RENDER =====
  function renderTasks(arr) {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    arr.forEach(task => {
      let li = document.createElement("li");
      li.draggable = true;
      li.dataset.id = task.id;

      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
        <span onclick="toggleComplete(${task.id})">${task.text}</span>
        <div class="actions">
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;

      // DRAG EVENTS
      li.addEventListener("dragstart", dragStart);
      li.addEventListener("dragover", dragOver);
      li.addEventListener("drop", drop);

      list.appendChild(li);
    });
  }

  // ===== DELETE =====
  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks(tasks);
  }

  // ===== EDIT =====
  function editTask(id) {
    let newText = prompt("Edit task:");
    if (!newText) return;

    tasks = tasks.map(t => {
      if (t.id === id) {
        return { ...t, text: newText };
      }
      return t;
    });

    renderTasks(tasks);
  }

  // ===== TOGGLE COMPLETE =====
  function toggleComplete(id) {
    tasks = tasks.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    renderTasks(tasks);
  }

  // ===== FILTER =====
  function filterTasks(type) {
    if (type === "completed") {
      renderTasks(tasks.filter(t => t.completed));
    } else if (type === "pending") {
      renderTasks(tasks.filter(t => !t.completed));
    } else {
      renderTasks(tasks);
    }
  }

  // ===== DRAG & DROP =====
  let draggedId = null;

  function dragStart(e) {
    draggedId = this.dataset.id;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    let targetId = this.dataset.id;

    let draggedIndex = tasks.findIndex(t => t.id == draggedId);
    let targetIndex = tasks.findIndex(t => t.id == targetId);

    let temp = tasks[draggedIndex];
    tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, temp);

    renderTasks(tasks);
  }

  // INITIAL RENDER
  renderTasks(tasks);