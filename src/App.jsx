import CustomInput from "./components/CustomInput/CustomInput";
import { TextField, Button, Box } from '@mui/material';
function App() {
  return (
    <main className="bg-black w-full h-screen flex items-center justify-center">
      <form 
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Форма входа"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Вход в аккаунт
        </h1>
        
        <CustomInput htmlFor={'email'} title={'Email'} type={'email'} id={'email'} placeholder={'example@mail.com'} />
        <CustomInput htmlFor={'password'} title={'Password'} type={'password'} id={'password'} placeholder={'••••••••'} />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
        >
          Войти
        </button>

        <p className="text-sm text-center text-gray-600">
          Нет аккаунта?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </a>
        </p>
      </form>
    </main>

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

  );
}

export default App;
