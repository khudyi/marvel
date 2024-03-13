// Import librarys
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import components
import App from './components/app/App';
import { MarvelService } from './services/MarvelService';

// Import styles
import './style/style.scss';

const marvel = new MarvelService();

marvel.getCharacter(1011097).then((res) => console.log(res));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);