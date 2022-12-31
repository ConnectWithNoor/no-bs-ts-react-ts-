import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  useRef,
} from 'react';
import './App.css';
import { ReactFCWithChildren } from './react-app-env';

const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

const Box = ({ children }: ReactFCWithChildren) => {
  return <div>{children}</div>;
};

const List = <T extends string | number>({
  items,
  onClick,
}: {
  items: T[];
  onClick?: (item: T) => void;
}) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => onClick?.(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

function App() {
  const [payload, setPayload] = useState<null | Payload>(null);
  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((resp) => resp.json())
      .then((data) => setPayload(data));
  }, []);

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
  }, []);

  const onListClick = useCallback((item: string | number) => {
    alert(item);
  }, []);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({ type: 'ADD', text: newTodoRef.current?.value });

      newTodoRef.current.value = '';
    }
  }, []);

  return (
    <div>
      <Heading title='Introduction' />
      <Box>Hello There</Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <List items={['1', '2', '3']} />
        <List items={[1, 2, 3]} onClick={onListClick} />
      </div>
      <Box>{payload?.text}</Box>
      <Heading title='Todos' />
      {todos.map((todo, index) => (
        <div key={index}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}>
            Remove
          </button>
        </div>
      ))}

      <div>
        <input type='text' ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
