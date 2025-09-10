import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ThreeDLayout from '../3d-layout/ThreeDLayout';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ThreeDDialog.css'

const ThreeDDialog = ({ open, onClose, mealCate }) => {
    return (
        <div style={{ backgroundColor: 'red' }}>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" style={{ backgroundColor: 'transparent !importent' }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        // color: theme.palette.grey[500],
                        color: 'white'
                    }
                    )}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent style={{ backgroundColor: 'transparent' }}>
                    <div style={{ margin: '1vh', padding: '1vh' }}>
                        <ThreeDLayout mealCate={mealCate} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ThreeDDialog;
