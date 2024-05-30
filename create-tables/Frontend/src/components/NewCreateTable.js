import { useState } from "react"

import CustomTextField from "../CustomComponents/CustomTextField"
import CustomModal from "../CustomComponents/CustomModal"

const NewCreateTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <CustomModal open={modalOpen}>
            <CustomTextField />
        </CustomModal>
    )
}

export default NewCreateTable
