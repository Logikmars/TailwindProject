import MainPageContent from '../../components/MainPageContent/MainPageContent';
import './MainPage.scss';
import MainPageHeader from './MainPageHeader/MainPageHeader';
export default () => {
    return (
        <div className='MainPage w-screen h-screen flex items-center flex-wrap content-between justify-center text-white'>
            <MainPageHeader />
            <MainPageContent />
        </div>
    )
}