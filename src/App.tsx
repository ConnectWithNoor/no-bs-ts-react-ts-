import React, { useCallback, useRef } from 'react';

import { Provider, useSelector, useDispatch } from 'react-redux';

import { addTodo, store, removeTodo, selectTodos } from './store';

import './App.css';
const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

const Box = ({ children }: { children: React.ReactNode }) => {
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
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current?.value) {
      dispatch(addTodo(newTodoRef.current?.value));

      newTodoRef.current.value = '';
    }
  }, [dispatch]);

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
          <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
        </div>
      ))}

      <div>
        <input type='text' ref={newTodoRef} />
        <Button onClick={onAddTodo} title='Add Todo'></Button>
      </div>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <App />
        <App />
      </div>
    </Provider>
  );
};

export default AppWrapper;
