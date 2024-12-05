import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { App as Antd } from "antd";
import "./index.css";
import ConfigPro from "./components/providers/ConfigPro.tsx";

createRoot(document.getElementById("root")!).render(
  <ConfigPro>
    <Antd
      style={{
        display: "flex",
        flex: 1,
        maxWidth: "100vw",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Antd>
  </ConfigPro>
);
