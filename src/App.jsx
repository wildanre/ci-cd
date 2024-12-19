import { RouterProvider } from 'react-router-dom';
import router from './router/router'; // Mengimpor router dari direktori router
import './App.css'; // Mengimpor file CSS untuk gaya

function App() {
  return (
    <>
      {/* RouterProvider digunakan untuk mengelola routing aplikasi */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
