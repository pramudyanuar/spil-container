import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/layout/layout";
import Stepper from "./components/ui/stepper";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Stepper />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
