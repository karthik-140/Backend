import React, { useCallback, useEffect, useRef } from 'react'
import { List, ListItem } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { tableActions } from '../store/tableSlice';

const TableName = () => {
  // const [tableNames, setTableNames] = useState([]);
  const dispatch = useDispatch()
  const { tableNames, flag, tableName } = useSelector((state) => state.table)
  const tableNameRef = useRef()

  // useEffect(() => {
  //   if (tableNames) {
  //     setTableNames((tableNames) => [...tableNames, tableName])
  //   }
  // }, [tableName])
  console.log(tableName)

  const getTable = useCallback(async (name) => {
    tableNameRef.current = name
    if (name && name === tableName || tableName === tableNameRef.current) {
      return
    }
    console.log('name', name)
    console.log(tableName)
    try {
      const res = await axios.get(`http://localhost:3001/table/${name ? name : tableName}`)
      console.log(res)
      dispatch(tableActions.setTableData({ table: res.data.result }))
    } catch (err) {
      console.log(err)
    }
    if (name) {
      dispatch(tableActions.setTableName(name))
    }
  }, [dispatch, tableName])

  useEffect(() => {
    if (tableName !== null) {
      getTable()
    }
  }, [flag, getTable, tableName])

  const displayTableNames = tableNames.map((tableName, idx) => {
    return (
      <ListItem onClick={() => getTable(tableName)} className='text-center flex self-center cursor-pointer rounded mb-2 bg-blue-400 hover:bg-blue-500' key={`table-${idx}`}>
        {tableName}
      </ListItem>
    )
  })

  return (
    <List className='flex flex-col rounded'>
      {displayTableNames}
    </List>
  )
}

export default TableName