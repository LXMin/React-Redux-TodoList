import React from "react";
import { connect } from "react-redux";
import { asyncAction_SaveTodo, action_UpdateTodo } from "../reducers/todo";

const TodoForm = props => {
  console.log("Render Form");
  const { currentTodo, updateTodo, saveTodo } = props;
  const currentTodoHandler = evt => {
    const val = evt.target.value;
    updateTodo(val);
  };
  const submitHandler = evt => {
    evt.preventDefault();
    saveTodo(currentTodo);
  };
  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={currentTodo} onChange={currentTodoHandler} />
    </form>
  );
};

export default connect(
  state => ({
    currentTodo: state.todo.currentTodo
  }),
  {
    updateTodo: action_UpdateTodo,
    saveTodo: asyncAction_SaveTodo
  }
)(TodoForm);
