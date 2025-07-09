import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';

import {AppLayout} from './app';
import {FactPage, InputPage} from './pages';
import {Provider, ROUTES} from './shared';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider>
      <Routes>
        <Route path={ROUTES.app} element={<AppLayout />}>
          <Route index element={<InputPage />} />
          <Route path={ROUTES.fact} element={<FactPage />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
