import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Comment from './Components/Comment';
import CommentsStorage from './Components/CommentsStorage';

const storage = new CommentsStorage();

export default function App(props) {
    const [comments, setComments] = React.useState(storage.comments);
    const [myComment, setMyComment] = React.useState('');
    const [myName, setMyName] = React.useState('');

    const sendComment = () => {
        let allComments = storage.addNewComment(myName, myComment);
        setComments(allComments);
        setMyComment('');
    }

    const deleteComment = (commentId) => {
        let comment = comments.find(comment => comment.id === commentId);
        if (comment.name !== myName) return false;
        let allComments = storage.deleteComment(commentId);
        setComments(allComments);
    }

    const addReaction = (commentId, reaction) => {
        let allComments = storage.addReaction(commentId, reaction, myName);
        setComments(allComments);
    };

    // useEffect(() => {

    // }, []);

    return <React.Fragment>
        <Box my={3}>
            {comments.map((comment, key) => <Comment 
                comment={comment} 
                key={`comment_${key}`} 
                deleteComment={deleteComment} 
                addReaction={addReaction}
                myName={myName}
            />)}
        </Box>
        <Box my={3}>
            <TextField
                label="Ваше имя"
                variant="outlined"
                value={myName}
                onChange={e => setMyName(e.target.value)}
            />
        </Box>

        <Box my={3}>
            <TextField
                label="Ваш комментарий"
                multiline
                fullWidth
                variant="outlined"
                value={myComment}
                onChange={e => setMyComment(e.target.value)}
            />
        </Box>
        <Box display="flex" justifyContent="center" my={3}>
            <Button 
                variant={'outlined'}
                onClick={sendComment}
                disabled={!myName || !myComment}
            >
                Опубликовать
            </Button>
        </Box>

    </React.Fragment>
}
