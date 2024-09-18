import { FC, memo } from 'react';
import styles from './Button.module.scss'
import cn from 'classnames';

interface Props {
    onClick: () => void;
    children?: React.ReactNode;
    type?: string;
}

const Button: FC<Props> = ({type='dark', onClick, children}:Props) => {
    return (
        <button className={cn(styles['button'], styles[type])} onClick={onClick}>
            {children}
        </button>
    )
}

export default memo(Button);