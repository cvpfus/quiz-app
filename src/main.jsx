import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { QuizContextProvider } from "@/contexts/QuizContext.jsx";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <QuizContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuizContextProvider>
  </QueryClientProvider>,
);
