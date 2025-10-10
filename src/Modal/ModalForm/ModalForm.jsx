import CustomInput from "../../components/CustomInput/CustomInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendTransaction } from "../../store/transactionsSlice";
import { closeModal } from "../../store/modalSlice";

export default ({ type }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transactions);

  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    type: type,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(sendTransaction(formData)).unwrap(); // отправляем на бек
      dispatch(closeModal());
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      alert("Ошибка при отправке данных!");
    }
  };

  return (
    <form
      className="ModalForm w-full mt-4 flex flex-wrap justify-center content-start gap-4"
      onSubmit={handleSubmit}
    >
      <CustomInput
        htmlFor="amount"
        title="Amount (UAH)"
        type="number"
        id="amount"
        name="amount"
        placeholder="0.00 (UAH)"
        value={formData.amount}
        onChange={handleChange}
      />
      <CustomInput
        htmlFor="date"
        title="Date"
        type="date"
        id="date"
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
      />
      <CustomInput
        htmlFor="description"
        title="Description"
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading ? "Sending..." : "Add transaction"}
      </button>

      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </form>
  );
};
