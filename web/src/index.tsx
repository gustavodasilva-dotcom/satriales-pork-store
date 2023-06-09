import ReactDOM from 'react-dom/client';
import AppRouter from './routes';
import './index.css';
import 'normalize.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppRouter />
);