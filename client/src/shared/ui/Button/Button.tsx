import { memo } from 'react';
import styles from './Button.module.scss'
import cn from 'classnames';

interface PropsI {
    onClick: () => void;
    children?: React.ReactNode;
    type?: string;
}

const Button = ({type='dark', onClick, children}:PropsI) => {
    return (
        <button className={cn(styles['button'], styles[type])} onClick={onClick}>
            {children}
        </button>
    )
}

export default memo(Button);