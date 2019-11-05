export const service_GetTodos = () => {
  return fetch("http://localhost:8080/todos").then(res => res.json());
};

export const service_CreateTodo = name => {
  return fetch("http://localhost:8080/todos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      isComplete: false
    })
  }).then(res => res.json());
};

export const service_ToggleTodo = todo => {
  return fetch(`http://localhost:8080/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());
};

export const service_DeleteTodo = id => {
  return fetch(`http://localhost:8080/todos/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};
