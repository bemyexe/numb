import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';

import {Provider} from '@/components/ui/provider';

import {App} from './app';
import {FactPage, InputPage} from './pages';
import {ROUTES} from './shared';

import './style.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider>
      <Routes>
        <Route path={ROUTES.app} element={<App />}>
          <Route index element={<InputPage />} />
          <Route path={ROUTES.fact} element={<FactPage />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
