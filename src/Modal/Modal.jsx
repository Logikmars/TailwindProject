import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import './Modal.scss';
import { AnimatePresence, motion } from "framer-motion";
import ModalForm from './ModalForm/ModalForm';

export default function Modal() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.type);

  if (!modalType) return null;

  return (
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className='fixed inset-0 flex justify-center items-center Modal'>
          <div className='bg-white rounded-lg p-6 w-96 flex flex-wrap'>
              <div aria-description='Modal header' className='w-full flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-left flex items-center'>
                    {modalType}
                </h2>
                <button
                    onClick={() => dispatch(closeModal())}
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer'
                    >
                    Close
                </button>
              </div>

            <ModalForm type={modalType}/>
      </div>
    </motion.div>
  );
}
