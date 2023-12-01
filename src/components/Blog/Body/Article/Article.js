import { Box, Paper, Autocomplete, Divider, TextField, Grid } from '@mui/material'
import Markdown from 'react-markdown'
import { useState, useEffect } from 'react'
import "./article.css"

export default function Article() {
    const [article, setArticle] = useState({
        title:"Example Title",
        author:"Trevor-Johannessen",
        datePublished:"11-22-2001",
        dateModified:"12-1-2023",
        markdown:"# TESTING"
    });

    return (
        <Paper id="blog-body-article">
            <h1>{article.title}</h1>
            <Grid container>
                <Grid item xs={6}>By {article.author}</Grid>
                <Grid item xs={6}>Published: {article.datePublished}</Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>Modified: {article.dateModified}</Grid>
            </Grid>
            <Divider id="blog-body-article-divider"/>
            <Markdown>{article.markdown}</Markdown>
        </Paper>
    )
}