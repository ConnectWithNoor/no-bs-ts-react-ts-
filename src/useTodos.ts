import { useCallback, useReducer } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

export function useTodos(initialTodo: Todo[]) {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialTodo);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: 'ADD',
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  }, []);

  return {
    todos,
    addTodo,
    removeTodo,
  };
}
