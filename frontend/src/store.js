import {configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { recipeListReducer } from './reducers/recipeReducers'

const reducer = ({
    recipeList: recipeListReducer,

})

const initialState = {

}

const middleware = [thunk]

const store = configureStore({
    reducer, 
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),

})

export default store