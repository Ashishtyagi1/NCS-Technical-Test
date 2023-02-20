import React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, Modal } from '@mui/material';
import ConfirmationModal from "./ConfirmationModal";

const ProfileCard = (props) => {

    const card = (
        <React.Fragment>
            <CardContent sx={{ padding: 0 }}>
                <Typography variant="h5" component="div" className="card-heading">
                    Name:  {' ' + props.carduser.firstname}  {props.carduser.lastname}
                </Typography>
                <Typography className="card-content">
                    Email:{' ' + props.carduser.email}
                </Typography>
                <Typography className="card-content">
                    Phone:{' ' + props.carduser.phone}
                </Typography>
                <Typography className="card-content">
                    Gender:{' ' + props.gender}
                </Typography>
                <Typography className="card-content">
                    Joining Date:{' ' + props.startDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.handleEdit(props._index)}>Edit</Button>
                <Button size="small" onClick={()=>props.handleDeletePopup(props._index)}>Delete</Button>
            </CardActions>
            <Modal
                open={props.deletePopup}
                onClose={props.handleDeletePopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ConfirmationModal removeUser={props.removeUser} handleDeletePopup={props.handleDeletePopup} />
            </Modal>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{ boxShadow: '5px 5px 10px #0099ff', margin: '10px 25px' }} className="card">{card}</Card>
        </Box>
    )
}
export default ProfileCard;