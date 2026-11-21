// Development-only browser fixture. Vite's production entry does not import this file.
import { createRoot } from 'react-dom/client';
import { authService } from '../src/services/authService';
import App from '../src/App';
import '../src/index.css';
authService.getCurrentUser = async () => ({ name: 'Acceptance User', email: 'test@example.invalid', company: 'Test', role: 'Admin' });
createRoot(document.getElementById('root')!).render(<App />);
