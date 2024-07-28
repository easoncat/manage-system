import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse
        },
        setName(state, action) {
            state.age = 18
        }
    }
})

export const { collapseMenu } =tabSlice.actions
export default tabSlice.reducer