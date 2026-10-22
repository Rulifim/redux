import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
export const selectTask = (state:RootState)=>state.tasks.items
export const selectDoneCount = (state:RootState) => state.tasks.items.filter(task=>task.done).length
export const selectDoneTasks = createSelector(
    [selectTask],
    items => items.filter(task => task.done)
)