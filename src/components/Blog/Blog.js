import { Box } from '@mui/material'
import Sidebar from "./Sidebar/Sidebar"
import Body from "./Body/Body"
import "./blog.css"
export default function Blog() {

    return (
        <Box id="blog">
            <Sidebar/>
            <Body/>
        </Box>
    )
}