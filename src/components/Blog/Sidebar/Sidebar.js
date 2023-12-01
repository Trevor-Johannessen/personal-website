import { Box, Paper, Autocomplete, Divider, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import Tags from "./Tags/Tags"
import "./sidebar.css"

export default function Sidebar() {

    const [selected_tags, setSelectedTags] = useState([]);
    const [article_names, setArticleNames] = useState([]);

    return (
        <Paper id="blog-sidebar">
            <Autocomplete
                disablePortal
                id="blog-sidebar-searchbar"
                options={article_names}
                renderInput={(params) => <TextField {...params} label="Article" />}
            />
            <Divider
                id="blog-sidebar-divider"
                variant="middle"
            />
            <Tags/>
        </Paper>
)
}