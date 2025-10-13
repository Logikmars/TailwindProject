import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionLocal, setTransactions } from '../store/transactionsSlice';
import api from '../api/axiosInstance';
import { updateBalance } from '../store/userSlice';

export default function useTransactionsSocket() {
  const dispatch = useDispatch();
  const { token: accessToken } = useSelector((state) => state.user);
  useEffect(() => {
    if (!accessToken) return;
    api.get('/transaction/all')
      .then(res => dispatch(setTransactions(res.data)))
      .catch(err => console.error('Ошибка загрузки транзакций:', err));

    const ws = new WebSocket(`ws://localhost:5000?token=${accessToken}`);

    ws.onopen = () => console.log('✅ WebSocket connected');
     console.log('accessToken в useTransactionsSocket:', accessToken);
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'NEW_TRANSACTION') {
        const { transaction, balance } = msg.payload;
        dispatch(addTransactionLocal(transaction));
        dispatch(updateBalance(balance));
      }
    };

    ws.onclose = () => console.log('🔴 WebSocket closed');

    return () => ws.close();
  }, [accessToken]);
}
