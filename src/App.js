import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Comment from './Components/Comment';
import CommentsStorage from './Components/CommentsStorage';
import { addComment, saveComments, loadComments } from './redux/actions/commentActions';

const storage = new CommentsStorage();

const filterHtml = (text) => {
    return text.replace(/(<([^>]+)>)/gm, '');
}

function App(props) {
    const {comments, user} = props;
    // console.log(state);
    // const [comments, setComments] = React.useState(state.comments.comments);
    const [myComment, setMyComment] = React.useState('');
    const [myName, setMyName] = React.useState('');

    useEffect(() => {
        props.loadComments();
        window.addEventListener('beforeunload', props.save());
        return () => {
            window.removeEventListener('beforeunload', props.save());
        }
    }, []);

    // console.log(state);
    // props.comments.subscribe(() => {
    //     const state = props.comments.getState();

    //     setComments(state.comments);
    // })

    const sendComment = () => {
        props.addComment(myName, filterHtml(myComment));
        // addComment(myName, filterHtml(myComment));

        // let allComments = storage.addNewComment(myName, filterHtml(myComment));
        // setComments(allComments);
        // setMyComment('');
    }

    const deleteComment = (commentId) => {
        // let comment = comments.find(comment => comment.id === commentId);
        // if (comment.name !== myName) return false;
        // let allComments = storage.deleteComment(commentId);
        // setComments(allComments);
    }

    const addReaction = (commentId, reaction) => {
        // let allComments = storage.addReaction(commentId, reaction, myName);
        // setComments(allComments);
    };

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

const mapStateToProps = state => {
    console.log(state)
    return {
        comments: state.comment,
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    console.log(dispatch)
    return {
        addComment: (name, comment) => dispatch(addComment(name, comment)),
        loadComments: () => dispatch(loadComments()),
        save: () => dispatch(saveComments()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);