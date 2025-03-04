import { useNavigate } from 'react-router-dom';


const Mainpage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button 
                onClick={() => navigate('/login')} 
                className="bg-blue-500 text-white px-6 py-3 m-4 rounded"
            >
                User Login
            </button>
            <button 
                onClick={() => navigate('/admin-login')} 
                className="bg-red-500 text-white px-6 py-3 m-4 rounded"
            >
                Admin Login
            </button>
        </div>
    );
};

export default Mainpage;
