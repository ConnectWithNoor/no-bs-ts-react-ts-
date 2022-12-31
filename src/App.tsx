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

const Button = ({
  children,
  title,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { children?: React.ReactNode }) => {
  return (
    <button
      style={{
        background: 'red',
        outline: 'none',
        border: 'none',
        color: 'whitesmoke',
        padding: '1rem',
        borderRadius: '10px',
        margin: '1rem',
      }}
      {...rest}
    >
      {title || children}
    </button>
  );
};

const useNumber = <T extends number>(initialNumber: T) =>
  useState(initialNumber);
type UseNumberType = ReturnType<typeof useNumber>;

const Incremental = ({
  value,
  setValue,
}: {
  value: UseNumberType[0];
  setValue: UseNumberType[1];
}) => {
  return (
    <Button onClick={() => setValue(value + 1)} title={`Add - ${value}`} />
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
  const [value, setValue] = useState(0);

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
    if (newTodoRef.current?.value) {
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

      <Incremental value={value} setValue={setValue} />

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
        <Button onClick={onAddTodo} title='Add Todo'></Button>
      </div>
    </div>
  );
}

export default App;
