import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import RoleStore from "./store/RoleStore";
import CompanyStore from "./store/CompanyStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)


root.render(
  <React.StrictMode>
      <Context.Provider value={{
          user: new UserStore(),
          company: new CompanyStore(),
          roles: new RoleStore()
      }}>
          <App />
      </Context.Provider>
   </React.StrictMode>
);

