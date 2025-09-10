import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const SubscriptionDialog = ({ open, freeTrialExpireToday, subscriptionExpireToday }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {freeTrialExpireToday && "Free Trial End Today!"}
            {subscriptionExpireToday && "Subscription Expired!"}
          </DialogTitle>
          <DialogDescription>
            {freeTrialExpireToday && "Your free trial has ended. Please subscribe to continue using the service."}
            {subscriptionExpireToday && "Please subscribe to continue using the service."}
            <p className="font-semibold text-sm pt-2">--- Reach out to your vendor. ---</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionDialog;
