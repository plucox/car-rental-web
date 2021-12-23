import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Paperbase from './components/Paperbase';

const App = () => {
  return(
    <div>
      <Paperbase />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

export default App;
