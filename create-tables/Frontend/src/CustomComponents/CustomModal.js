import { Modal, Box } from "@mui/material"

const CustomModal = ({ open, children, }) => {
	return (
		<Modal open={open}>
			<Box className='flex flex-col gap-3' sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 800,
				bgcolor: 'background.paper',
				border: '2px solid #000',
				boxShadow: 24,
				p: 4,
			}}>
				{children}
			</Box>
		</Modal>
	)
}

export default CustomModal