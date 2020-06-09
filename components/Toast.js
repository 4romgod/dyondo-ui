import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Toast(type, message) {
    function createNotification(type, message) {
        switch (type) {
            case 'info':
                toast.info(message);
                break;
            case 'success':
                toast.success(message, 'Title here');
                break;
            case 'warning':
                toast.warning(message, 'Close after 3000ms', 3000);
                break;
            case 'error':
                toast.error(message, 'Click me!', 5000, () => {
                    alert('callback');
                });
                break;
        }

    }

    return (
        <React.Fragment>
            <ToastContainer />
            {createNotification(type, message)}
        </React.Fragment>
    )

}

export default Toast;