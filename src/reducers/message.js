import { ADD_TODO, LOAD_TODOS, TOGGLE_TODO, DELETE_TODO } from "./todo";

const MESSAGE_SHOW = "MESSAGE_SHOW";

export const showMessage = msg => ({
  type: MESSAGE_SHOW,
  payload: msg
});

const messageReducer = (state = "", action) => {
  switch (action.type) {
    case MESSAGE_SHOW:
      return action.payload;
    case LOAD_TODOS:
    case ADD_TODO:
    case TOGGLE_TODO:
    case DELETE_TODO:
      return "";
    default:
      return state;
  }
};

export default messageReducer;
