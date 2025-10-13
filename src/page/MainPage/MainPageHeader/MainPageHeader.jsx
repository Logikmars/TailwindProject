import { useSelector, useDispatch  } from 'react-redux';
import { logout } from '../../../store/userSlice';
import { logoutUser } from '../../../store/userThunks';
import './MainPageHeader.scss';
import { Navigate } from 'react-router-dom';
import { openModal } from '../../../store/modalSlice';
export default () => {

    const dispatch = useDispatch();
    const balance = useSelector((state) => state.user.balance);
    const email = useSelector((state) => state.user.email);

    const handleLogout = async () => {
        try {
        await dispatch(logoutUser()).unwrap();
        } catch (err) {
        console.error('Ошибка при логауте:', err);
        } finally {
        dispatch(logout());
        navigate('/login');
        }
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
        // {
        //     title: 'Transfer',
        //     symbol: '~'
        // }
    ]

    const setModal = (title) => {
        // console.log('Open modal: ' + title);
        dispatch(openModal(title));
    }

    return (
        <header className='MainPageHeader w-screen flex items-center justify-between p-10 max-w-[1900px]'>
            <div className='flex flex-col'>
                <p>User: {email}</p>
                <p>Balance: {balance}₴</p>
            </div>
            <nav className='MainPageHeader_nav flex gap-4'>           
                {
                    btns.map((el, index) => (
                        <button onClick={() => setModal(el.title)} className='p-10 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50' key={`Btn_MainPageHeader_key_${index}`}>{el.title}{" "}{el.symbol}</button>
                    ))
                }
            </nav>
            <button onClick={handleLogout} className='p-10 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50'>Logout</button>
        </header>
    )
}