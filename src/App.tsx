import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store/StoreProvider";
import AppLayout from "./components/AppLayout";
import AppRoutes from "./AppRoutes";
import GlobalStyle from "./shared/GlobalStyle";

const App: FC = () => {
  return (
    <BrowserRouter basename={""}>
      <StoreProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </StoreProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
