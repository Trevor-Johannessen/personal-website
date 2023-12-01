import { Box, Paper, Autocomplete, Divider, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import "./tag_scroll.css"

function generateTestTags(){
    let out = [];
    for(let i=0;i<100;i++)
        out.push(`test-${i+1}`)
    return out;
}

export default function TagScroll() {
    let tag_names = [""] // takes in array of tags
    let tag_cards = [];
    
    tag_names = generateTestTags();
    // Generate Tag Cards
    for(const key in tag_names){
        tag_cards.push((
            <Box className="blog-sidebar-tags-card">
                {tag_names[key]}
            </Box>
            ))
    }

    return (
        <Paper
            id="blog-sidebar-tags-scroll"
        >
            <Divider/>
            {tag_cards}
        </Paper>
)
}