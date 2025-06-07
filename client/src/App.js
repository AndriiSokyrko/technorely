import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./store/UserStore";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
         working!
        </QueryClientProvider>
    );
};

export default App;