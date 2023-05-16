import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box, Rating, TextField } from '@mui/material';
import { useState } from 'react';
import { blue, red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';






const theme = createTheme({
    palette: {
        primary: {
            main: red[800],
        },
        secondary: {
            main: blue[500],
        }
    },
});


const Comments = ({ comments, setUserMessage, setRating }) => {
    const maxIndex = comments.length;
    const currentIndex = 4;
    const [renderComments, setRenderComments] = useState(comments.length > 8 ? comments.slice(0, 8): comments.slice(0, comments.length - 1));
    const [isExpanded, setIsExpanded] = useState(false);


    useEffect(() => {
        if(comments.length > 8 ){
            if(isExpanded){
                setRenderComments(comments.slice(0, comments.length - 1));
            }
            else{
                setRenderComments(comments.slice(0, 8));
            }
        }
        else{
            setRenderComments(comments.slice(0, comments.length - 1));
        }
    }, comments)
    

    const handleRating = (event) => {
        // setMethod(event.target.value);
        setRating(event.target.value);
    }

    const toggleComments = () => {
        if(!isExpanded){
            setRenderComments(comments.slice(0, comments.length - 1));
            setIsExpanded(true);
        }
        else{
            if(comments.length > 8 ){
                setRenderComments(comments.slice(0, 8));
            }
            else{
                setRenderComments(comments.slice(0, comments.length - 1));
            }
            setIsExpanded(false);
        }
    }



    return (
        <>
            <ThemeProvider theme={theme}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    
                    {/* {renderComments.map((comment) => ( */}
                    {comments.map((comment) => (
                        <>
                            <ListItem alignItems="flex-start" style={{ flexDirection: "column" }}>
                                <ListItemText primary={
                                    <> <Typography variant='body1'> {comment.author.username}</Typography>
                                    </>} />
                                <Rating name="read-only" value={comment.rating} readOnly />
                                <ListItemText secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {comment.comment}
                                        </Typography>
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                    {comments.length > 8 && (<Link color='primary' style={{ textDecorationLine: 'none' }} onClick={toggleComments}>
                        <Typography color='primary' textAlign='center'>{isExpanded ? 'see less': 'see more'}</Typography>
                    </Link>)}
                </List>
                <Box component="form" noValidate sx={{ mt: 5, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ ml: 2 }} variant='h5' color='primary'>LEAVE A REVIEW</Typography>
                    <Rating
                        name="simple-controlled"
                        sx={{ mt: 2, ml: 2, flex: 1 }}
                        onChange={handleRating}
                    />
                    <TextField
                        sx={{ flex: 1, mt: 2, width: '80%' }}
                        id="outlined-multiline-static"
                        label="Feedback"
                        multiline
                        minRows={4}
                        defaultValue=""
                        placeholder='Your comment'
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Comments