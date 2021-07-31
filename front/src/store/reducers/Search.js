import* as actionTypes from '../actions/actionTypes'

export const searchBusReducer = (state = { loading: false, searchResult: []}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_SEARCH_BUS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AFTER_SEARCH_BUS: {
            return {
                ...state,
                loading: false,
                searchResult: actions.data
            }
        }
        case actionTypes.SEARCH_BUS_ERROR: {
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.SEARCH_BUS_RESET: {
            return {
                ...state,
                searchResult: []
            }
        }
        default: return state
            
    }
}

export const getLocationReducer = (state = {loading: false, locations: []}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_ALL_LOCATIONS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AFTER_GET_ALL_LOCATIONS: {
            return {
                ...state,
                loading: false,
                locations: actions.data
            }
        }
        case actionTypes.GET_ALL_LOCATION_ERROR: {
            return {
                ...state,
                loading: false
            }
        }
      
        default:
            return state;
    }
}