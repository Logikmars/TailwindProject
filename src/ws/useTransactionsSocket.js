import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionLocal, setTransactions } from '../store/transactionsSlice';
import api from '../api/axiosInstance';

export default function useTransactionsSocket() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    if (!accessToken) return;

    // 1️⃣ Сначала получаем все прошлые транзакции через REST
    api.get('/transaction/all')
      .then(res => dispatch(setTransactions(res.data)))
      .catch(err => console.error('Ошибка загрузки транзакций:', err));

    // 2️⃣ Потом подключаемся к WebSocket для новых транзакций
    const ws = new WebSocket(`ws://localhost:5000?token=${accessToken}`);

    ws.onopen = () => console.log('✅ WebSocket connected');

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'NEW_TRANSACTION') {
        dispatch(addTransactionLocal(msg.payload));
      }
    };

    ws.onclose = () => console.log('🔴 WebSocket closed');

    return () => ws.close();
  }, [accessToken]);
}
