import { createSlice } from "@reduxjs/toolkit"

const tableSlice = createSlice({
  name: 'table',
  initialState: { tableNames: [], tableName: null, table: [], flag: false },
  reducers: {
    fetchTables(state, action) {
      state.tableNames = action.payload
    },
    setTableNames(state, action) {
      state.tableNames = [ ...state.tableNames, action.payload]
    },
    setTableName(state, action) {
      state.tableName = action.payload
    },
    setTableData(state, action) {
      state.table = action.payload.table
    },
    fetchTable(state) {
      state.flag = !state.flag
    }
  }
})

export const tableActions = tableSlice.actions
export default tableSlice
