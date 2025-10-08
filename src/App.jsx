import CustomForm from "./components/CustomForm/CustomForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./page/MainPage/MainPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from './store/userThunks';


import CustomInput from "./components/CustomInput/CustomInput";
import { TextField, Button, Box } from '@mui/material';
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken()); // проверяем токен при загрузке
  }, [dispatch]);

  return (
    <Router>
      <main className="bg-black w-full h-screen flex items-center justify-center">
        <Routes>
          {/* Только для незалогиненных */}
          <Route 
            path="/login" 
            element={ 
              <PublicRoute>
                <CustomForm login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <CustomForm />
              </PublicRoute>
            } 
          />
          <Route
            path="/resetPassword"
            element={
              <PublicRoute>
                <CustomForm reset/>
              </PublicRoute>
            }
          />
          {/* Только для залогиненных */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;



// MATERIAL UI(MUI)
    //  <Box
    //   component="form"
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: 2,
    //     width: 300,
    //     mx: 'auto',
    //     mt: 10,
    //   }}
    // >
    //   <TextField label="Email" variant="outlined" required />
    //   <TextField label="Пароль" type="password" variant="outlined" required />
    //   <Button variant="contained" color="primary">
    //     Войти
    //   </Button>
    // </Box>