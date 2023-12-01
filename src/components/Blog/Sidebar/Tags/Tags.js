import { Box, Paper, Autocomplete, Divider, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import TagScroll from './TagScroll/TagScroll'
import SelectedTags from './SelectedTags/SelectedTags'
import "./tags.css"

export default function Tags() {
    
    return (
        <Paper
            id="blog-sidebar-tags"
        >
            <SelectedTags/>
            <TagScroll/>
        </Paper>
)
}