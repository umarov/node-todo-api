// importing Actions
import * as TodoActions from '../actions/actions';
import { TodoList } from '../../todo-lists/todo-list';

export interface State {
    loading: boolean;
    todoLists: TodoList[];
    todoList: TodoList;
}


const initialState: State =  {
  loading: false,
  todoLists: [],
  todoList: {}
};

export function reducer(state = initialState, action: TodoActions.Actions): State {
  switch (action.type) {
    case TodoActions.ADD_TODO_LIST: {
      return {
        ...state,
        todoLists: [...state.todoLists, action.payload]
      };
    }

    case TodoActions.REMOVE_TODO_LIST: {
      return {
        ...state,
        todoLists: state.todoLists.filter(todoList => {
          return todoList._id !== action.payload;
        })
      };
    }

    case TodoActions.GET_TODO_LIST: {
      return {
        ...state,
        todoList: state.todoLists.find(todoList => todoList._id === action.payload)
      };
    }

    case TodoActions.GET_TODO_LISTS: {
      return {
        ...state,
        todoLists: state.todoLists
      };
    }

    default: {
      return state;
    }
  }
}
