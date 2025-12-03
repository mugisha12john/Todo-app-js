// theme-toggle.js
const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

const storedTheme = localStorage.getItem("theme"); // "dark" or "light" or null
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Resolve initial theme: stored > system > default light
const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");

if (initialTheme === "dark") {
  root.classList.add("dark");
  toggleBtn.setAttribute("aria-pressed", "true");
} else {
  root.classList.remove("dark");
  toggleBtn.setAttribute("aria-pressed", "false");
}

toggleBtn.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggleBtn.setAttribute("aria-pressed", String(isDark));
});
const listUl = document.getElementById("list");
listUl.innerHTML = "";
listUl.addEventListener("click", (e) => {
  e.preventDefault();
});
function activeListComponent(id, text) {
  const li = document.createElement("li");
  li.id = id;
  li.className =
    "w-full h-12 border-b cursor-pointer border-gray300 dark:border-navy850 flex items-center px-4 gap-4";

  li.innerHTML = `
    <div id='${id}' class="w-5 h-5 border-2 border-white dark:border-navy850 rounded-full cursor-pointer hover:border-blue500 dark:hover:border-blue500"></div>
    <p class="flex-1 text-gray400 font-josefin dark:text-purple300">${text}</p>
    <button>
      <img src="../images/icon-cross.svg" alt="Delete todo" />
    </button>
  `;

  return li;
}
function completedListComponent(id, text) {
  const li = document.createElement("li");
  li.id = id;
  li.className =
    "w-full h-12 border-b cursor-pointer border-gray300 dark:border-navy850 flex items-center px-4 gap-4";

  li.innerHTML = `
     <div id='${id}'
        class="w-5 h-5 border-2 border-white bg-checkGradient flex justify-center items-center dark:border-navy850 rounded-full cursor-pointer hover:border-blue500 dark:hover:border-blue500"
      >
       <img src="../images/icon-check.svg" alt="done task" />
    </div>
    <p class="flex-1 text-gray400 font-josefin dark:text-purple300">${text}</p>
    <button>
      <img src="../images/icon-cross.svg" alt="Delete todo" />
    </button>
  `;
  return li;
}
const dataList = [];
let count = 0;
const inputText = document.getElementById("input-text");
inputText.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && inputText.value.trim() !== "") {
    e.preventDefault();
    listUl.appendChild(activeListComponent(count, inputText.value));

    dataList.push({
      text: inputText.value,
      completed: false,
    });
    inputText.value = "";
    console.log(dataList);
    count++;
  }

  remainItem.innerText = `${remainListCount()} item left`;
});
// get last button to work with my todos
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const completedBtn = document.getElementById("completed-btn");
const clearAllCompleted = document.getElementById("clear-all-completed");
const remainItem = document.getElementById("remain");

function activeFilter(e) {
  e.preventDefault();
  listUl.innerHTML = "";
  const d = document.createDocumentFragment();
  const incompleteItems = dataList.filter((item) => item.completed === false);
  incompleteItems.forEach((item, id) => {
    d.appendChild(activeListComponent(id, item.text));
  });
  return listUl.appendChild(d);
}
function completedFilter(e) {
  e.preventDefault();
  listUl.innerHTML = "";
  const d = document.createDocumentFragment();
  const incompleteItems = dataList.filter((item) => item.completed === true);
  incompleteItems.forEach((item, id) => {
    d.appendChild(completedListComponent(id, item.text));
  });
  return listUl.appendChild(d);
}

function remainListCount() {
  return dataList.filter((item) => item.completed === false).length;
}
function allFilter(e) {
  e.preventDefault();
  listUl.innerHTML = "";
  const d = document.createDocumentFragment();
  dataList.forEach((item, id) => {
    if (item.completed === true) {
      d.appendChild(completedListComponent(id, item.text));
      return;
    } else {
      d.appendChild(activeListComponent(id, item.text));
      return;
    }
  });
  return listUl.appendChild(d);
}
function clearCompleted(e) {
  e.preventDefault();
  listUl.innerHTML = "";
  const d = document.createDocumentFragment();
  console.log(dataList.filter((item) => item.completed !== true));
  const incompleteItems = dataList.filter((item) => item.completed !== true);
  incompleteItems.forEach((item, id) => {
    d.appendChild(activeListComponent(id, item.text));
  });
  return listUl.appendChild(d);
}


activeBtn.addEventListener("click", activeFilter);
completedBtn.addEventListener("click", completedFilter);

clearAllCompleted.addEventListener("click", clearCompleted);

// console.log(dataList);
listUl.addEventListener("click", (e) => {
  e.preventDefault();
  const li = e.target.closest("li");
  if (!li) return;
  const id = parseInt(li.id, 10);
  const item = dataList[id];
  // Handle delete button
  if (e.target.closest("button")) {
    li.remove();
    dataList.splice(id, 1);

    return (remainItem.innerText = `${remainListCount()} item left`);
  }

  // Handle circle div toggle
  if (e.target.closest("div")) {
    if (!item.completed) {
      li.replaceWith(completedListComponent(id, item.text));
      item.completed = true;
      remainItem.innerText = `${remainListCount()} item left`;
    } else {
      li.replaceWith(activeListComponent(id, item.text));
      item.completed = false;
      remainItem.innerText = `${remainListCount()} item left`;
    }
    console.log(item);
  }
});
