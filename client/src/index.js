import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
export const Context = createContext(null)


root.render(
  <React.StrictMode>
      {/*<QueryClientProvider client={queryClient}>*/}
      <Context.Provider value={{
          user: new UserStore()
      }}>
          <App />
      </Context.Provider>
          {/*<ReactQueryDevtools/>*/}
      {/*</QueryClientProvider>*/}
  </React.StrictMode>
);

