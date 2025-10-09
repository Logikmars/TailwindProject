import { useSelector, useDispatch  } from 'react-redux';
import { logout } from '../../../store/userSlice';
import './MainPageHeader.scss';
import { Navigate } from 'react-router-dom';
export default () => {

    const dispatch = useDispatch();
    const balance = useSelector((state) => state.user.balance);

    const handleLogout = () => {
        dispatch(logout());
        Navigate('/login');
    };

    const btns = [
        {
            title: 'Credit',
            symbol: '+'
        },
        {
            title: 'Debit',
            symbol: '-'
        },
        {
            title: 'Transfer',
            symbol: '~'
        }
    ]

    return (
        <header className='MainPageHeader w-screen flex items-center justify-between p-10 max-w-[1900px]'>
            <p>Balance: {balance}</p>
            {
                btns.map((el, index) => (
                    <button className='p-10 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50' key={`Btn_MainPageHeader_key_${index}`}>{el.title}{" "}{el.symbol}</button>
                ))
            }
            <button onClick={handleLogout} className='p-10 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50'>Logout</button>
        </header>
    )
}