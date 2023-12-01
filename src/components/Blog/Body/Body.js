import { Box, Paper, Autocomplete, Divider, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import Article from "./Article/Article"
import SearchResults from "./SearchResults/SearchResults"
import "./body.css"

export default function Body() {
    const [display, setDisplay] = useState("Article");
    return (
        <Box id="blog-body">
            {display==="Article" ? <Article/> : <SearchResults/>}
        </Box>
)
}