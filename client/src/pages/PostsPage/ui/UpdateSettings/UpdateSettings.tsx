import { observer } from 'mobx-react-lite';
import { FC, memo, useEffect, useState } from 'react';

import layoutStore from '@/app/model/layoutDataStore';
import Button from '../../../../shared/ui/Button';
import { LayoutI } from '@/shared/interfaces';

import styles from './UpdateSettings.module.scss';

interface Props {
    layoutSettings: LayoutI
}

interface SettingI {
    type: string,
    val: string | number
}

const UpdateSettings: FC<Props> = observer(({layoutSettings}) => {
    const {getLayoutAction} = layoutStore
    const [settings, setSettings] = useState<SettingI[]>([])

    useEffect(() => {
        getLayoutAction()
    }, [])

    const onClickHandler = (): void => {
        getLayoutAction()
    }

    useEffect(() => {
        setSettings(() => {
            return [
                {type: 'Layout', val: layoutSettings.layout.current},
                {type: 'Template', val: layoutSettings.template},
                {type: 'Navigation', val: layoutSettings.navigation},
                {type: 'Columns', val: layoutSettings.layout.params[layoutSettings.layout.current]?.columns},
                {type: 'Rows', val: layoutSettings.layout.params[layoutSettings.layout.current]?.rows},
            ]
        })
    }, [layoutSettings.layout])

    return (
        <div className={styles['container']}>
            {layoutSettings?.layout && (
                <div className={styles['settings']}>
                    {settings.map(item => (
                        <div key={item.type}><span>{item.type}:</span> {item.val}</div>
                    ))}
                </div>
            )}
            
            <Button onClick={onClickHandler}>
                Обновить настройки
            </Button>
        </div>
    )
})

export default memo(UpdateSettings);