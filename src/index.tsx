import { createRoot } from 'react-dom/client';
// import { ReactDOM } from 'react-dom';
import App from './components/App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Could not find root element');
}

createRoot(root).render(<App />);
// ReactDOM.render(<App />, root);
