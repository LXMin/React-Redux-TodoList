import {
  service_CreateTodo,
  service_GetTodos,
  service_ToggleTodo,
  service_DeleteTodo
} from "../lib/todoServices";
import { showMessage } from "../reducers/message";

const initState = {
  todos: [],
  currentTodo: "temp"
};

export const ADD_TODO = "ADD_TODO";
export const LOAD_TODOS = "LOAD_TODOS";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const action_UpdateTodo = val => ({
  type: UPDATE_TODO,
  payload: val
});

export const action_LoadTodos = todos => ({
  type: LOAD_TODOS,
  payload: todos
});

export const action_AddTodo = todo => ({
  type: ADD_TODO,
  payload: todo
});

export const action_ToggleTodo = todo => ({
  type: TOGGLE_TODO,
  payload: todo
});

export const action_DeleteTodo = id => ({
  type: DELETE_TODO,
  payload: id
});

export const asyncAction_FetchTodos = () => {
  return dispatch => {
    dispatch(showMessage("Loading Todos"));
    service_GetTodos().then(todos => dispatch(action_LoadTodos(todos)));
  };
};

export const asyncAction_SaveTodo = name => {
  return dispatch => {
    dispatch(showMessage("Adding Todos"));
    service_CreateTodo(name).then(todo => dispatch(action_AddTodo(todo)));
  };
};

export const asyncAction_ToggleTodo = id => {
  return (dispatch, getState) => {
    dispatch(showMessage("Replacing Todo"));
    const { todos } = getState().todo;
    const updateTodoItem = todos.find(t => t.id === id);
    service_ToggleTodo({
      ...updateTodoItem,
      isComplete: !updateTodoItem.isComplete
    }).then(todo => dispatch(action_ToggleTodo(todo)));
  };
};

export const asyncAction_DeleteTodo = id => {
  return dispatch => {
    dispatch(showMessage("Deleting Todo"));
    service_DeleteTodo(id).then(() => dispatch(action_DeleteTodo(id)));
  };
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.payload),
        currentTodo: ""
      };
    case LOAD_TODOS:
      return { ...state, todos: action.payload };
    case UPDATE_TODO:
      return { ...state, currentTodo: action.payload };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };
    default:
      return state;
  }
};

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "active":
      return todos.filter(t => !t.isComplete);
    case "complete":
      return todos.filter(t => t.isComplete);
    default:
      return todos;
  }
};

export default todoReducer;
