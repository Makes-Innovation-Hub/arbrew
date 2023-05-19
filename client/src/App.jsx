import Intro from "./pages/Intro";
import LangSelection from "./pages/LangSelection";
import Interest from "./pages/Interests";
import GenderSelection from "./pages/GenderSelection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeaderLayout from "./components/HeaderLayout";
import Location from "./pages/Location";

const router = createBrowserRouter([
  {path: "/",
   element: <HeaderLayout/>,
   errorElement: <>Error...</>,
   children: [
      { path: "/lang", element: <LangSelection/>},
      { path: "/interests", element: <Interest/>},
      { path: "/gender", element: <GenderSelection/>},
      { path: "/location", element: <Location/>}
     ]},
  {path: "/intro", element: <Intro/>, errorElement: <>Error...</>},
  

], <require to="/"/>);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
