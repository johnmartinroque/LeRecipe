import {configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { bookmarkListReducer, bookmarkReducer, foodOfTheMonthReducer, foodOfTheWeekReducer, ownRecipesReducer, randomRecipeReducer, recipeCreateReducer, recipeDetailedReducer, recipeListReducer } from './reducers/recipeReducers'
import { followingListReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers'






const reducer = ({
    recipeList: recipeListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    recipeDetailed: recipeDetailedReducer,
    recipeCreate: recipeCreateReducer,
    bookmarkList: bookmarkListReducer,
    ownRecipes: ownRecipesReducer,
    followingList: followingListReducer,
    bookmark: bookmarkReducer,
    foodOfTheWeek: foodOfTheWeekReducer,
    foodOfTheMonth: foodOfTheMonthReducer,
    randomRecipes: randomRecipeReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}


}

// const middleware = [thunk]

const store = configureStore({
    reducer, 
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});

export default store