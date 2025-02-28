import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/dashboardRoutes";
import "./utils/i18n";

import { useAuth } from "./services/useAuth";
// import dashboardRouter from './routes/dashboardRoutes';

// toats
import "react-toastify/dist/ReactToastify.css";
// import './App.css';

// react-international-phone
import "react-international-phone/style.css";

function App() {
  const user = useAuth();

  return (
    <div className="w-full m-auto bg-[#fcfcfc] homeComponent">
      <RouterProvider router={router}></RouterProvider>

      {/* for toast */}
      <ToastContainer draggablePercent={60} style={{ fontSize: "12px" }} />
    </div>
  );
}

export default App;
