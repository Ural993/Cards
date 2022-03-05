import Slider from '@mui/material/Slider/Slider';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import styles from './Range.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import { setMaxMinValueAC } from '../../../../bll/reducers/r5-packs/packs-reducer';


export function RangeSlider() {
    const dispatch = useDispatch()
    const min = useSelector<AppStateType, number>(state => (state.packs.minCardsCount))
    const max = useSelector<AppStateType, number>(state => (state.packs.maxCardsCount))

    const [value, setValue] = React.useState<number[]>([min, max]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const handleChangeAnd = (event: any, newValue: any | number[]) => {
        dispatch(setMaxMinValueAC(newValue))
    };

    return (
        <div className={styles.range}>
            <Slider
                value={value}
                onChangeCommitted={handleChangeAnd}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                max={200}
            />
        </div>
    );
}