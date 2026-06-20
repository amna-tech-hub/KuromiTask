import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todos from "./pages/Todos";
import {MyTodo} from './pages/MyTodo'
import AddTodo from "./pages/AddTodo";
import User from "./pages/User";

import GetAllTODO from "./pages/GetAllTODO";
import LoginUser from "./pages/LoginUser";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Todos /> */}
      {/* <MyTodo/> */}
      <User/>
     <LoginUser/>
      <AddTodo/>
      <GetAllTODO/>
    </QueryClientProvider>
  );
};
export default App;
