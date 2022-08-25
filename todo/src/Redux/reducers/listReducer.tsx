import { v4 as uuidv4 } from "uuid";
import {
  SUBMIT_TODO,
  COMPLETE_TASK,
  EDIT_TODO,
  ALL_DONE,
  DELETE_TODO,
  SHOW_TODO,
  COMPLETE_TODO,
  ACTIVE_TODO,
  CLEAR_TODO,
} from "../actions/index";

import { GlobalState, ActionState } from "./type";

const initialState: GlobalState = {
  todo: [],
  display: "all",
};

const listReducer = (state = initialState, action: ActionState) => {
  switch (action.type) {
    case SUBMIT_TODO:
      let newId = uuidv4();
      return {
        ...state,
        todo: [
          ...state.todo,
          { text: action.payload.data, id: newId, done: false },
        ],
      };

    case DELETE_TODO:
      return {
        ...state,
        todo: [
          ...state.todo.map((ele) => {
            if (ele.id === action.payload.id) {
              if (ele.done === false) return { ...ele, done: true };
              else return { ...ele, done: false };
            } else {
              return ele;
            }
          }),
        ],
      };

    case EDIT_TODO:
      return {
        ...state,
        todo: [
          ...state.todo.map((ele) => {
            if (ele.id === action.payload.id) {
              return { ...ele, text: action.payload.data };
            } else {
              return ele;
            }
          }),
        ],
      };

    case COMPLETE_TASK:
      return {
        ...state,
        todo: [
          ...state.todo.map((ele) => {
            if (ele.id === action.payload.id) {
              if (ele.done === false) return { ...ele, done: true };
              else return { ...ele, done: false };
            } else return ele;
          }),
        ],
      };

    case ALL_DONE:
      return {
        ...state,
        todo: [
          ...state.todo.map((ele) => {
            if (action.payload.check === false) return { ...ele, done: true };
            else if (action.payload.check === true)
              return { ...ele, done: false };
            else return ele;
          }),
        ],
      };

    case SHOW_TODO:
      return {
        ...state,
        display: "all",
      };

    case ACTIVE_TODO:
      return {
        ...state,
        display: "active",
      };

    case COMPLETE_TODO:
      return {
        ...state,
        display: "complete",
      };

    case CLEAR_TODO:
      return {
        ...state,
        todo: [...state.todo.filter((ele) => ele.done === false)],
      };

    default:
      return state;
  }
};
export default listReducer;
