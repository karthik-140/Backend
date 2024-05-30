import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'

import CustomTextField from '../CustomComponents/CustomTextField'
import CustomModal from '../CustomComponents/CustomModal'
import { useSelector, useDispatch } from 'react-redux'
import { tableActions } from '../store/tableSlice';

const UserForm = ({ modalOpen, setModalOpen, setFetch }) => {
  const { control, handleSubmit } = useForm()
  const { table, tableName } = useSelector((state) => state.table)
  const dispatch = useDispatch()

  const fields = table[1].map((field, idx) => {
    return (
      <CustomTextField key={idx} name={field.name} label={field.name} control={control} variant={'outlined'} placeholder={field.name} />
    )
  })

  const onSubmit = async (formData) => {
    console.log(tableName)
    console.log('formData', formData)
    // try {
    //   await axios.post("http://localhost:3001/add-users", formData)
    // } catch (err) {
    //   console.log(err);
    // }
    try {
      await axios.post(`http://localhost:3001/add/${tableName}`, formData)
    } catch (err) {
      console.log(err)
    }
    setModalOpen(false)
    setFetch(true)
    dispatch(tableActions.fetchTable())
  }

  const modalCloseHandler = () => {
    setModalOpen(false)
  }

  return (
    <CustomModal open={modalOpen}>
      <CloseIcon onClick={modalCloseHandler} className='flex self-end cursor-pointer' />
      <Box className='flex flex-col gap-3'>
        <Typography className='text-center text-blue-800' variant='h5'>Add Record</Typography>
        {fields.slice(1)}
        {/* <CustomTextField name={'name'} label={'Name'} control={control} variant={'outlined'} placeholder={'Name'} />
        <CustomTextField name={'email'} label={'Email'} control={control} variant={'outlined'} placeholder={'Email'} />
        <CustomTextField name={'phone'} label={'Phone Number'} control={control} variant={'outlined'} placeholder={'Phone Number'} /> */}
        <div className='flex justify-center'>
          <Button variant='contained' onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
      </Box>
    </CustomModal>
  )
}

export default UserForm
