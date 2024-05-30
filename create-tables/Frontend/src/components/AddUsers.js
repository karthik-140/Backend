import { useState } from 'react'

import CustomButton from '../CustomComponents/CustomButton'
import UserTable from './UserTable'
import { Box, Typography } from '@mui/material'
import UserForm from './UserForm'
import { useSelector } from 'react-redux'

const AddUsers = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [fetch, setFetch] = useState(false)
  const { table, tableName } = useSelector((state) => state.table)

  const addUserHandler = () => {
    setModalOpen(true)
  }

  return (
    <>
      <Box className='p-4 ml-auto mr-auto mt-4'>
        <Typography variant={'h6'} component={'h1'} color={'blue'}>DATABASE MANAGEMENT APPLICATION</Typography>
        <div className='absolute right-10 top-8'>
          {tableName && <CustomButton onClick={addUserHandler} actionText="Insert Record" variant="outlined" />}
        </div>
        <div className='mt-8'>
          <UserTable fetch={fetch} setFetch={setFetch} table={table} />
        </div>
      </Box>
      {modalOpen && <UserForm modalOpen={modalOpen} setModalOpen={setModalOpen} setFetch={setFetch} />}
    </>
  )
}

export default AddUsers
