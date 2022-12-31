import React, {
  useCallback,
  useReducer,
  createContext,
  useContext,
} from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

function useTodosManager(initialTodo: Todo[]) {
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

export const TodoProvider = ({
  children,
  initialState,
}: {
  initialState: Todo[];
  children: React.ReactNode;
}) => {
  return (
    <TodoContext.Provider value={useTodosManager(initialState)}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = () => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = () => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
