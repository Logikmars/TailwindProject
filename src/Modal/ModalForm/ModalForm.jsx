import CustomInput from "../../components/CustomInput/CustomInput";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// import './ModalForm.scss';
export default ({type}) => {

    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log('Workaet');
    }

    const [formData, setformData] = useState({
        amount: '',
        date: '',
        description: '',
    });

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className='ModalForm w-full mt-4 flex flex-wrap justify-center content-start gap-4' onSubmit={handleSubmit}>
            <CustomInput 
                htmlFor='amount'
                title='Amount (UAH)'
                type='number'
                id='amount'
                placeholder='0.00 (UAH)'
                value={formData.amount}
                onChange={handleChange}
            />
            <CustomInput 
                htmlFor='date'
                title='Date'
                type='date'
                id='date'
                placeholder='Date'
                value={formData.date}
                onChange={handleChange}
            />
            <CustomInput 
                htmlFor='description'
                title='Description'
                type='description'
                id='description'
                placeholder='Description'
                value={formData.description}
                onChange={handleChange}
            />
            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50">
                Add transaction
            </button>
        </form>
    )
}
