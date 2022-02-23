import { useSelector, useDispatch} from 'react-redux';
import { AppStateType } from '../../../../bll/store';
import {setPageCountAC} from "../../../../bll/reducers/packs/packs-reducer";
import FormControl from '@mui/material/FormControl/FormControl';
import NativeSelect from '@mui/material/NativeSelect/NativeSelect';
import Box from '@mui/material/Box/Box';

export function PacksSelect() {
    const dispatch = useDispatch()
    const pageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountAC(Number(event.target.value)))
    };

    return (
        <Box sx={{minWidth: 50}}>
            <FormControl >
                <NativeSelect
                    onChange={handleChange}>
                    defaultValue={pageCount}
                    <option value={4}>4</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}

