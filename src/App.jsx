import CustomForm from "./components/CustomForm/CustomForm";
import MainPage from "./page/MainPage/MainPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from './store/userThunks';
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.1, ease: "easeIn" }}
        className="bg-black w-full h-screen flex items-center justify-center"
      >
        <Routes location={location}>
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
                <CustomForm reset />
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
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}




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