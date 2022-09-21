import { configureStore, createSlice } from '@reduxjs/toolkit'


let temp = createSlice({
	name : 'temp',
  initialState : 'temp',

		reducers : {    // state 변경 함수
			changeName(state) {     //state는 기존 state
				return state + "2";
			}
  	}
})

export default configureStore({
	reducer: {
		temp : temp.reducer
	}
}) 