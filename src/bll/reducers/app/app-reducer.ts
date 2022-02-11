

const initState = {
    isFetching: false
}

type AppInitStateType = typeof initState

type AppActionType = SetIsFetchingAT

export const appReducer = (state: AppInitStateType = initState, action: AppActionType) => {
    switch (action.type){
        case "APP/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export type SetIsFetchingAT = ReturnType<typeof setIsFetchingAC>
export const setIsFetchingAC = (isFetching: boolean) => {
    return{
        type: "APP/SET-IS-FETCHING",
        isFetching
    } as const
}