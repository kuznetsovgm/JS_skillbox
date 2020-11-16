import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    actions: {
        display: "flex",
    },
    delete: {
        
    },
});

const formatDate = timestamp => new Date(timestamp).toLocaleString();

export default function Comment(props) {
    const classes = useStyles();
    const { comment } = props;

    return (
        <Card className={classes.root} variant={"outlined"}>
            <CardContent>
                <Typography variant="body2" component="p">
                    {comment.text}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" display={"inline"}>
                    {comment.name}
                </Typography>
                &nbsp;
                <Typography variant="caption" color="textSecondary" display={"inline"}>
                    {formatDate(comment.date)}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                {/* <IconButton aria-label="down">
                    <ThumbDownIcon />
                </IconButton>
                <IconButton aria-label="up">
                    <ThumbUpIcon />
                </IconButton> */}
                {!!props.canDelete && <IconButton aria-label="delete" className={classes.delete} onClick={() => props.deleteComment(comment.id)}>
                    <DeleteIcon />
                </IconButton>}
            </CardActions>
        </Card>
    )
}