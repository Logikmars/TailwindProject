import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomInput from "../CustomInput/CustomInput";
import { loginUser, registerUser } from "../../store/userThunks";
import "./CustomForm.scss";

export default function CustomForm({ login }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login && formData.password !== formData.repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }

    const payload = { email: formData.email, password: formData.password };
    const action = login ? loginUser(payload) : registerUser(payload);

    dispatch(action);
  };

  return (
    <form
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6"
      onSubmit={handleSubmit}
      aria-label={login ? "Форма входа" : "Форма регистрации"}
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        {login ? "Вход в аккаунт" : "Регистрация аккаунта"}
      </h1>

      <CustomInput
        htmlFor="email"
        title="Email"
        type="email"
        id="email"
        placeholder="example@mail.com"
        value={formData.email}
        onChange={handleChange}
      />
      <CustomInput
        htmlFor="password"
        title="Password"
        type="password"
        id="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
      />
      {!login && (
        <CustomInput
          htmlFor="repeatPassword"
          title="Repeat password"
          type="password"
          id="repeatPassword"
          placeholder="••••••••"
          value={formData.repeatPassword}
          onChange={handleChange}
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading
          ? "Загрузка..."
          : login
          ? "Войти"
          : "Зарегистрироваться"}
      </button>

      {error && (
        <p className="text-sm text-center text-red-500 mt-2">{error}</p>
      )}

      <p className="text-sm text-center text-gray-600">
        {login ? "Нет аккаунта?" : "Вспомнил аккаунт?"}{" "}
        <Link
          to={login ? "/register" : "/login"}
          className="text-blue-600 hover:underline"
        >
          {login ? "Зарегистрироваться" : "Войти"}
        </Link>
      </p>
    </form>
  );
}
