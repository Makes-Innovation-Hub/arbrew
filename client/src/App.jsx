import {
  Intro,
  LangSelection,
  Interests,
  Occupation,
  ConversationPage,
  BirthPage,
  Chat,
  Nationality,
  BioPage,
  Location,
  GenderSelection,
} from "./pages/exports.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HeaderLayout from "./components/HeaderLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    errorElement: <>Error...</>,
    children: [
      { path: "/lang", element: <LangSelection /> },
      { path: "/interests", element: <Interests /> },
      { path: "/nationality", element: <Nationality /> },
      { path: "/location", element: <Location /> },
      { path: "/gender", element: <GenderSelection /> },
    ],
  },
  { path: "/occupation", element: <Occupation /> },
  { path: "/agePage", element: <BirthPage />, errorElement: <>Error...</> },
  { path: "/bioPage", element: <BioPage />, errorElement: <>Error...</> },
  { path: "/intro", element: <Intro />, errorElement: <>Error...</> },
  { path: "/chatPage", element: <Chat />, errorElement: <>Error...</> },
  { path: "/conversation", element: <ConversationPage /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
