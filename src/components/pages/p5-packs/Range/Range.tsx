import Slider from '@mui/material/Slider';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import {setMaxMinValueAC} from '../../../../bll/reducers/r5-packs/packs-reducer';
import './GlobalCssSlider.css'


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
        <div>
            <Slider
                className={'slider'}
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