import React, { useCallback, useRef } from 'react';
import './App.css';
import { ReactFCWithChildren } from './react-app-env';
import { useTodos } from './useTodos';

const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

const Box = ({ children }: ReactFCWithChildren) => {
  return <div>{children}</div>;
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

function App() {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo, removeTodo } = useTodos([
    {
      done: false,
      id: 0,
      text: 'Hello there',
    },
  ]);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current?.value) {
      addTodo(newTodoRef.current?.value);

      newTodoRef.current.value = '';
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title='Introduction' />
      <Box>Hello There</Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      ></div>

      <Heading title='Todos' />
      {todos.map((todo, index) => (
        <div key={index}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
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
