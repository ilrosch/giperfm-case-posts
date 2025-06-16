import React from 'react';
import Card from '../Card/Card';
import { useLoadTasks } from '../../hooks';

const App = () => {
  useLoadTasks()

  return (
    <>
      <h1 className='title'>Todos</h1>
      <Card />
    </>
  );
}

export default App;
