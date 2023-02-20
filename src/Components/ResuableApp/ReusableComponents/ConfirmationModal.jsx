import { Button, Typography, Box } from '@material-ui/core';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: 10,
    padding: 20
  };

const ConfirmationModal = (props) => {
    const deleteUser = () => {
        props.removeUser();
        props.handleDeletePopup();
    }
    return(
        <Box style={style}>
            <Typography variant='h4'>
                Confirmation
            </Typography>
            <Typography>
                Are you sure that you want to remove this user from the list?
            </Typography>
            <Button variant="contained" style={{marginBottom:10}} onClick={deleteUser}>Confirm</Button>
            <Button variant="contained" onClick={props.handleDeletePopup}>Cancel</Button>
        </Box>
    )
}
export default ConfirmationModal;