import React, { useState } from 'react'
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TableName from './TableName';
import CreateTable from './CreateTable';
import CustomButton from '../CustomComponents/CustomButton';

const DrawerList = () => {
  // const [tableName, setTableName] = useState(null)
  const [open, setOpen] = useState(false)

  const createTableHandler = () => {
    setOpen(true)
  }

  return (
    <Box className="w-60 h-svh flex flex-col justify-between text-center p-4 border border-r-gray-600">
      <TableName
      // tableName={tableName}
      />
      <CustomButton
        actionText="Create Table"
        onClick={createTableHandler}
        variant="contained">
        <AddIcon className='text-center' />
      </CustomButton>
      <CreateTable
        open={open}
        setOpen={setOpen}
      // setTableName={setTableName} 
      />
    </Box>
  )
}

export default DrawerList