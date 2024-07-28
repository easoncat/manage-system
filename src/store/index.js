import { configureStore } from "@reduxjs/toolkit";
import TabReducer from './reducers/tab'

// 创建 store
export default configureStore({
    reducer: {
        tab: TabReducer
    }
})