import { useNavigate } from 'react-router-dom';

export const useError = (): { manageError(messages: string[]): void } => {

    const navigate = useNavigate();
    const manageError = (messages: string[]) => {
        if (messages.includes('')) {
            navigate("/auth")
        }
    }
    return { manageError }
}
