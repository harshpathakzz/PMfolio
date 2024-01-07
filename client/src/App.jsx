import React from "react";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        App
        <Button variant="secondary" onCli>
          Submit
        </Button>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
};

export default App;
