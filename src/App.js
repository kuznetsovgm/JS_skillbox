import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Comment from './Components/Comment';
import { addComment, saveComments, init } from './redux/actions/commentActions';
import { loadUser, setUser } from './redux/actions/userActions';


const filterHtml = (text) => {
    return text.replace(/(<([^>]+)>)/gm, '');
}

function App(props) {
    const {comments, userName} = props;
    const [myComment, setMyComment] = React.useState('');

    useEffect(() => {
        props.initComments();
        props.loadUser();
    }, []);

    const sendComment = () => {
        props.addComment(userName, filterHtml(myComment));
        setMyComment('');
    }

    return <React.Fragment>
        <Box my={3}>
            {comments.map((comment, key) => <Comment 
                comment={comment} 
                key={`comment_${key}`} 
            />)}
        </Box>
        <Box my={3}>
            <TextField
                label="Ваше имя"
                variant="outlined"
                value={userName}
                onChange={e => props.setUserName(e.target.value)}
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
                disabled={!userName || !myComment}
            >
                Опубликовать
            </Button>
        </Box>

    </React.Fragment>
}

const mapStateToProps = state => {
    return {
        comments: state.comments,
        userName: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        initComments: () => dispatch(init()),
        addComment: (name, comment) => dispatch(addComment(name, comment)),
        save: () => dispatch(saveComments()),
        loadUser: () => dispatch(loadUser()),
        setUserName: (userName) => dispatch(setUser(userName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
