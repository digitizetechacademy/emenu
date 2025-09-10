import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const SubscriptionDialog = ({ open, freeTrialExpireToday, subscriptionExpireToday }) => {
  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {freeTrialExpireToday &&
        <DialogTitle variant="h5" sx={{ m: 0, p: 2, fontWeight: "500"}} id="customized-dialog-title">
          Free Trial End Today!
        </DialogTitle>
      }
      {subscriptionExpireToday &&
        <DialogTitle variant="h5" sx={{ m: 0, p: 2, fontWeight: "500" }}>
          Subscription Expired!
        </DialogTitle>
      }
      <DialogContent dividers>
        {
          freeTrialExpireToday &&
          <Typography gutterBottom>
            Your free trial has ended. Please subscribe to continue using the service.
          </Typography>
        }
        {
          subscriptionExpireToday &&
          <Typography gutterBottom>
            Please subscribe to continue using the service.
          </Typography>
        }
        <Typography gutterBottom variant='p' sx={{ fontWeight: "600", fontSize: "16px" }}>
          --- Reach out to your vendor. ---
        </Typography>
      </DialogContent>
    </BootstrapDialog >
  );
}


export default SubscriptionDialog;
