import React from 'react'
import { Button } from '@mui/material'

const CustomButton = ({actionText, onClick, variant, children}) => {
  return (
    <Button onClick={onClick} variant={variant}>
        {children}
        {actionText}
    </Button>
  )
}

export default CustomButton
