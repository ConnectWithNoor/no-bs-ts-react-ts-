import { configureStore, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type TodoSliceState = {
  todo: Todo[];
};

const initialState: TodoSliceState = {
  todo: [],
};

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todo.push({
        id: state.todo.length,
        done: false,
        text: action.payload,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todo = state.todo.filter((item) => item.id !== action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export const { addTodo, removeTodo } = todosSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;

export const selectTodos = (state: RootState) => state.todos.todo;
