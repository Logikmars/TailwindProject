import CustomInput from "../../components/CustomInput/CustomInput";
import { useState } from "react";

// import './ModalForm.scss';
export default ({type}) => {

    const handleSubmit = () => {
        console.log('Workaet');
    }

    const [formData, setformData] = useState({
        amount: '',
        account: '',
        date: '',
        description: '',
        accountFrom: '',
    });

    const handleChange = () => {
        console.log('Workaet');
    }

    return (
        <form className='ModalForm w-full mt-4 flex flex-wrap justify-center content-start gap-4' onSubmit={handleSubmit}>
            <CustomInput 
                htmlFor='amount'
                title='Amount'
                type='number'
                id='amount'
                placeholder='0.00'
                value={formData.amount}
                onChange={handleChange}
            />
            {
                type != 'Credit' && 
                <CustomInput
                    htmlFor='accountFrom'
                    title='Account From'
                    type='text'
                    id='accountFrom'
                    placeholder='Account from'
                    value={formData.accountFrom}
                    onChange={handleChange}
                />
            }
            <CustomInput 
                htmlFor='accountTo'
                title='Account to'
                type='text'
                id='accountTo'
                placeholder='Account to'
                value={formData.account}
                onChange={handleChange}
            />
        </form>
    )
}
