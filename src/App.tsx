import React, { useCallback, useState } from 'react';
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

function App() {
  const onListClick = useCallback((item: string | number) => {
    alert(item);
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
    </div>
  );
}

export default App;
