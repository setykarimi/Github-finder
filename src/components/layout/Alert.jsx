import { useAlert } from "../context/alert/AlertContext";

const Alert = () => {
    const { alert } = useAlert()

    return alert !== null && (
        <p className={`flex items-start mb-4 space-x-2 ${alert.type === 'error' ? 'error' : 'success'}`}>
            {alert.msg}
        </p>
    );
}
 
export default Alert;