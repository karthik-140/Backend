import React, { useEffect, useState } from 'react'
import { Button, InputAdornment, List, TextField, Typography, Select, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove';
import CustomModal from '../CustomComponents/CustomModal'
import axios from 'axios'
import { tableActions } from '../store/tableSlice'
import { useDispatch } from 'react-redux'

const fieldOptions = [
  { label: 'STRING', value: 'VARCHAR(255)' },
  { label: 'INTEGER', value: 'INT' },
  { label: 'BOOLEAN', value: 'BOOLEAN' },
  { label: 'DOUBLE', value: 'DOUBLE' }
]

const CreateTable = ({ open, setOpen }) => {
  const [columns, setColumns] = useState([{ columnName: '', fieldType: '' }])
  const dispatch = useDispatch();

  const removeColumn = (idx) => {
    const updatedColumns = [...columns]
    updatedColumns.splice(idx, 1)
    setColumns(updatedColumns)
  }

  const onChangeHandler = (idx, value) => {
    const updatedColumns = [...columns]
    updatedColumns[idx].columnName = value
    setColumns(updatedColumns)
  }

  const selectHandler = (idx, value) => {
    const updatedColumns = [...columns]
    updatedColumns[idx].fieldType = value
    setColumns(updatedColumns)
  }

  const inputFields = columns.map((col, idx) => {
    return (
      <List key={`row-${idx}`} className='flex justify-between gap-2'>
        <TextField
          className='flex-1'
          key={`column-${idx}`}
          id={`column-${idx}`}
          value={col.columnName}
          label={`Column-${idx + 1} Name`}
          onChange={(e) => onChangeHandler(idx, e.target.value)}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       {columns.length > 1 && <ClearIcon className='cursor-pointer hover:text-red-500 hover:transform hover:scale-110 hover:text-3xl' onClick={() => removeColumn(idx)} />}
        //     </InputAdornment>
        //   ),
        // }}
        />
        <Select
          className='flex-1'
          displayEmpty
          value={col.fieldType}
          onChange={(e) => selectHandler(idx, e.target.value)}
          renderValue={
            col.fieldType !== '' ? undefined : () => <span style={{ color: 'gray' }}>{`Select Column-${idx + 1} FieldType`}</span>
          }
        >
          <MenuItem disabled>Field Type</MenuItem>
          {fieldOptions.map((option, idx) => {
            return (
              <MenuItem
                key={`${option.value}-${idx}`}
                value={option.value}
                defaultValue={option.value}
              >
                {option.label}
              </MenuItem>
            )
          })}
        </Select>
        <RemoveIcon
          className='cursor-pointer hover:text-red-500 hover:transform hover:scale-110 hover:text-3xl self-center'
          onClick={() => removeColumn(idx)}
        />
      </List>
    )
  })

  const addColumnHandler = () => {
    setColumns((columns) => [...columns, { columnName: '', fieldType: '' }])
  }

  let tableName;

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(tableActions.setTableNames(tableName.value))
    const obj = {
      tableName: tableName.value,
      columns: columns
    }
    try {
      const response = await axios.post("http://localhost:3001/create-table", obj)
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setOpen(false)
  }

  const modalCloseHandler = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchTables = async () => {
      const response = await axios.get('http://localhost:3001/tables')
      console.log(response)
      dispatch(tableActions.fetchTables(response.data))
    }
    fetchTables()
  }, [dispatch])

  return (
    <CustomModal open={open}>
      <CloseIcon onClick={modalCloseHandler} className='flex self-end cursor-pointer' />
      <Typography className='text-center text-blue-800' variant='h5'>Create Table</Typography>
      <form onSubmit={submitHandler} className='flex flex-col gap-3'>
        <TextField inputRef={node => { tableName = node }} variant='outlined' id='tableName' label='Table Name' />
        {inputFields}
        <Typography className='text-blue-800 cursor-pointer' onClick={addColumnHandler}>Add another column</Typography>
        <Button variant='contained' type='submit' className='self-center' >Submit</Button>
      </form>
    </CustomModal>
  )
}

export default CreateTable