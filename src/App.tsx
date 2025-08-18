import { ThemeProvider } from "./components/theme-provider";
import { AppProvider } from "./context/AppContext";
import { Layout } from "./components/layout/layout";
import Stepper from "./components/ui/stepper";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <Layout>
          <Stepper />
        </Layout>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
