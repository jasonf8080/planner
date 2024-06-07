import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/userSlice";
import goalSlice from "./Features/goalSlice";
import eventsSlice from "./Features/eventsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    goal: goalSlice,
    events: eventsSlice
  }
});

export default store