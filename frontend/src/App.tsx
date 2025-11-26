import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./components/Index";
import Sidebar from "./components/Sidebar";
import ConversationProvider from "./context/ConversationProvider";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import { ProtectedRoutes } from "./utils/Protected";

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", Component: LoginPage },
    { path: "/signup", Component: LoginPage },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoutes>
          <div className="w-full flex">
            <Sidebar className={"w-1/10"} />
            <div className="w-9/10">
              <Index />
            </div>
          </div>
        </ProtectedRoutes>
      ),
      children: [
        {
          path: ":id",
          element: (
            <ProtectedRoutes>
              <div className="w-full flex">
                <Sidebar className={"w-1/10"} />
                <div className="w-9/10">
                  <Index />
                </div>
              </div>
            </ProtectedRoutes>
          ),
        },
      ],
    },
    { path: "/*", Component: Landing },
  ]);

  return (
    <div className="dark flex flex-col h-screen bg-[#212121] text-gray-100 overflow-hidden">
      <ConversationProvider>
        <RouterProvider router={router} />
      </ConversationProvider>
    </div>
  );
};

export default App;
