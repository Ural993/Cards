import {useSelector, useDispatch} from 'react-redux';
import {AppStateType} from '../../../../bll/store';
import FormControl from '@mui/material/FormControl/FormControl';
import NativeSelect from '@mui/material/NativeSelect/NativeSelect';
import Box from '@mui/material/Box/Box';
import { setCardsPageCountAC } from '../../../../bll/reducers/r6-cards/cards-reducer';


export function CardsSelect() {
    const dispatch = useDispatch()
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCardsPageCountAC(Number(event.target.value)))
    };

    return (
        <Box sx={{minWidth: 50}}>
            <FormControl>
                <NativeSelect
                    onChange={handleChange} defaultValue={pageCount}>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={15}>15</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}

