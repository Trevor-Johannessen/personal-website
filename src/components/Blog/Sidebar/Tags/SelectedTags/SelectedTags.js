import { Box, Paper, Autocomplete, Divider, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import "./selected_tags.css"

function generateTestSelectedTags(){
    let out = [];
    let found = {}
    for(let i=0;i<Math.floor(Math.random()*10);i++){
        while(true){
            let num = Math.floor(Math.random()*100);
            if(!found[num]){
                out.push(`test-${num}`)
                found[num]=true;
                break;
            }
        }
    }
    return out;
}

export default function SelectedTags() {
    let tag_selected = [""];
    let tag_selected_cards = [];
    
    tag_selected = generateTestSelectedTags();
    // Generate Selected Tags
    for(const key in tag_selected){
        tag_selected_cards.push((
            <Box className="blog-sidebar-tag-selected">
                {tag_selected[key]}
            </Box>
        ))
    }
    return (
        <Paper
            className="blog-sidebar-tags-selected-container"
        >
            {tag_selected_cards}
        </Paper>
    )
}