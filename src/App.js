import './App.css';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home'
import Todos from './components/Todos'
import AllTasks from './components/AllTasks'
import High from './components/High'
import Medium from './components/Medium'
import Low from './components/Low'
import Personal from './components/Personal'
function App() {

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        path:'/Home',
        element:<Home/>
      },
      {
        path:'/',
        element:<Todos/>
      },
      {
        path:'/AllTasks',
        element:<AllTasks/>
      },
      {
        path:'/High',
        element:<High/>
      },
      {
        path:'/Medium',
        element:<Medium/>
      },
      {
        path:'/Low',
        element:<Low/>
      },
      {
        path:'/Personal',
        element:<Personal/>
      },
    ]

  }
]);

  return (
    <div  className='appStyles'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
