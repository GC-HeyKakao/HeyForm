import { configureStore, createSlice } from '@reduxjs/toolkit'

const userInitialState ={
	id: '',
	name: '홍길동',
	token: '',
	email: 'heykakao123@example.com'
}

let userSlice = createSlice({
	name : 'user',
  	initialState : userInitialState,

		reducers : {
			setId: (state, action) => {
				state.id = action.payload;
			},
			setName: (state, action) => {
				state.name = action.payload;
			},
			setEmail: (state, action) => {
				state.email = action.payload;
			},
			setToken: (state, action) => {
				state.token =  action.payload;
			},    
			refreshToken(state) {     //state는 기존 state
				state.token = '';
			}
  	}
})


export const { setId, setName, setEmail, setToken, refreshToken } = userSlice.actions;

export default configureStore({
	reducer: {
		user: userSlice.reducer,
	}
}) 