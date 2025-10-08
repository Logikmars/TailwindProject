import { Link } from 'react-router-dom';
import CustomInput from '../CustomInput/CustomInput';
import './CustomForm.scss';
export default ({login}) => {
    return (
            <form 
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Форма входа"
            >
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                {login ? 'Вход в аккаунт' : 'Регистрация аккаунта'}
                </h1>
                
                {
                    login ? <>
                        <CustomInput htmlFor={'email'} title={'Email'} type={'email'} id={'email'} placeholder={'example@mail.com'} />
                        <CustomInput htmlFor={'password'} title={'Password'} type={'password'} id={'password'} placeholder={'••••••••'} />
                    </>
                    :
                    <>
                        <CustomInput htmlFor={'email'} title={'Email'} type={'email'} id={'email'} placeholder={'example@mail.com'} />
                        <CustomInput htmlFor={'password'} title={'Password'} type={'password'} id={'password'} placeholder={'••••••••'} />
                        <CustomInput htmlFor={'repeatPassword'} title={'Repeat password'} type={'password'} id={'repeatPassword'} placeholder={'••••••••'} />
                    </>
                }

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
                >
                {login ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <p className="text-sm text-center text-gray-600">
                    {login ? 'Нет аккаунта?' : 'Вспомнил аккаунт?'}{" "}
                    <Link to={`${login ? '/register' : '/login'}`} className="text-blue-600 hover:underline">
                        {login ? 'Зарегистрироваться' : 'Войти'}
                    </Link>
                </p>

            </form>
    )
}