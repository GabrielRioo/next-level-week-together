import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

// vai receber as propriedades de um botao de html nativo + o &
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

export function Button({isOutlined = false, ...props} : ButtonProps) {
    return (
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props} 

        />
    )
}

