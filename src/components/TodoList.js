import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import {
  asyncAction_FetchTodos,
  asyncAction_ToggleTodo,
  asyncAction_DeleteTodo,
  getVisibleTodos
} from "../reducers/todo";

const TodoList = props => {
  const { fetchTodos, todos } = props;
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <div className="todoList">
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={props.toggleTodo}
            deleteTodo={props.deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(
  (state, ownProps) => ({
    todos: getVisibleTodos(state.todo.todos, ownProps.filter)
  }),
  {
    fetchTodos: asyncAction_FetchTodos,
    toggleTodo: asyncAction_ToggleTodo,
    deleteTodo: asyncAction_DeleteTodo
  }
)(TodoList);
