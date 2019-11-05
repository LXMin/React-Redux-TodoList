import React from "react";

export default ({ id, name, isComplete, toggleTodo, deleteTodo }) => (
  <li>
    <span className="delete-item">
      <button onClick={() => deleteTodo(id)}>X</button>
    </span>
    <input
      type="checkbox"
      defaultChecked={isComplete}
      onChange={() => toggleTodo(id)}
    />
    {name}
  </li>
);
