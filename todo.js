/** @format */
const getLocalStorage = () => JSON.parse(localStorage.getItem("todo")) || [];
const localStorageTodoList = getLocalStorage();
const getSingleTodoDetail = (todoName) => {
	return localStorageTodoList.find((element) => element.todoName == todoName);
};
const saveNewTodo = (todo) => {
	const todoList = JSON.parse(localStorage.getItem("todo")) || [];
	todoList.push(todo);
	localStorage.setItem("todo", JSON.stringify(todoList));
};
document.querySelector("#addNewTodo").addEventListener("click", () => {
	document.querySelector("#addNewTodoModal").show();
});
document.querySelector(".modal-close-button").addEventListener("click", () => {
	document.querySelector("#addNewTodoModal").close();
});
const localMachineTime = new Date();
document.querySelector("#current-time").value =
	localMachineTime.toLocaleString();

document
	.querySelector("#addNewTodoForm")
	.addEventListener("submit", (event) => {
		event.preventDefault();
		const form = event.target;
		const todoTime = form["todo-time"].value;
		const todoName = form["todo-name"].value;
		const currentTime = localMachineTime.toLocaleString();
		const todoDescription = form["todo-description"].value;
		saveNewTodo({ todoName, todoTime, currentTime, todoDescription });
		window.location.reload();
	});
const todoDetailContainer = document.querySelector("#todoDetailContainer");
if (localStorageTodoList.length > 0) {
	const { todoName, currentTime, todoDescription, todoTime } =
		localStorageTodoList[0];
	const h3 = document.createElement("h3");
	const h4 = document.createElement("h4");
	const h42 = document.createElement("h4");
	const p = document.createElement("p");
	h3.innerText = todoName;
	h4.innerText = `Will Do time : ${todoTime}`;
	h42.innerText = `Written time : ${currentTime}`;
	p.innerText = `Description : ${todoDescription}`;
	todoDetailContainer.appendChild(h3);
	todoDetailContainer.appendChild(h4);
	todoDetailContainer.appendChild(h42);
	todoDetailContainer.appendChild(p);
} else {
	const h2 = document.createElement("h2");
	h2.innerText = "Empty todo list";
	todoDetailContainer.appendChild(h2);
}
const clickTodoItem = (event) => {
	todoDetailContainer.textContent = "";
	const todoName = event.target.innerText;
	const todoDetails = getSingleTodoDetail(todoName);
	const { currentTime, todoDescription, todoTime } = todoDetails;
	const h3 = document.createElement("h3");
	const h4 = document.createElement("h4");
	const h42 = document.createElement("h4");
	const p = document.createElement("p");
	h3.innerText = todoName;
	h4.innerText = `Will Do time : ${todoTime}`;
	h42.innerText = `Written time : ${currentTime}`;
	p.innerText = `Description : ${todoDescription}`;
	todoDetailContainer.appendChild(h3);
	todoDetailContainer.appendChild(h4);
	todoDetailContainer.appendChild(h42);
	todoDetailContainer.appendChild(p);
};

const todoList = getLocalStorage();
const todoListContainer = document.querySelector("#todoListContainer");
if (todoList.length > 0) {
	todoList.forEach((element) => {
		const li = document.createElement("li");
		li.setAttribute("onclick", `clickTodoItem(event)`);
		li.innerText = element.todoName;
		todoListContainer.appendChild(li);
	});
} else {
	const h2 = document.createElement("h2");
	h2.innerText = "Your todo list is Empty";
	todoListContainer.appendChild(h2);
}
