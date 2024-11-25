import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./Components/Layout/AppLayout";
import SignUp from "./Components/auth/Registration/SignUp";
import SignIn from "./Components/auth/LogIn/SignIn";
import PageNotFound from "./Components/page-not-found/pageNotFound";
import ProductDetails from "./Components/product-details/ProductDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <PageNotFound />
    },
    {path:"/product-details/:product-id", element: <ProductDetails />},
    { path: "/sign-up", element: <SignUp /> },
    { path: "/sign-in", element: <SignIn /> },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
