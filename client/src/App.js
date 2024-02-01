import "./App.css";
import Meals from "./Components/Meals/Meals";
import Detailspage from "./Components/Detailspage/Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

export const Appcontextt = createContext();

function App() {
  const [favor, setFavor]= useState('favorites')
  const client = new QueryClient();
  return (
    <>
      <div id="app">
        <Appcontextt.Provider value={{favor ,setFavor}}>
          <QueryClientProvider client={client}>
            <Router>
              <Routes>
                <Route path="/" element={<Meals />} />
                <Route path="/details/:id" element={<Detailspage />} />
              </Routes>
            </Router>
          </QueryClientProvider>
        </Appcontextt.Provider>
      </div>
    </>
  );
}

export default App;
