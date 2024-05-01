import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CreateNewIngatlanForm from './CreateNewIngatlanForm';
import GetAllIngatlans from './GetIngatlan';
import IngatlanDetails from './IngatlanDetails';
import UpdateIngatlanForm from './UpdateIngatlanForm';
import './style.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchInterval: 3000,
    },
  },
});

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav>
          <Link to="/ingatlan">Ingatlanok Listaja</Link>
          <Link to="/post">Uj Ingatlan</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/ingatlan" element={<GetAllIngatlans />} />
            <Route path="/post" element={<CreateNewIngatlanForm />} />
            <Route path="/ingatlan/:id" element={<IngatlanDetails />} />
            <Route path="/put/:id" element={<UpdateIngatlanForm />} />
          </Routes>
        </main>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
