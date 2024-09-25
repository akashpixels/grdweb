/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import Button from "components/Common/Button/Button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getNotificationProfileData, uploadNotificationProfileData } from "api/services/jobs.api";
import { showToast } from "utils/toastUtils";
import ToggleSwitch from "./Switch";
import { getUserIsSubscribe, setPremiumKeys } from "api/services/localServices.service";
import { refreshPage } from "utils";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { stripUrl } from "api/apis";
import { useNavigate } from "react-router-dom";
import Modal from "components/Common/Modal/NormalModel/Modal";
import ConfirmationModal from "components/Common/Modal/ConfirmModel/ConfirmModel";
import { BASIC_PLAN_ID } from "utils/constant";
import Cookies from "js-cookie";

interface CreateSubscriptionResponse {
  id: string;
}

interface FormData {
  notificationPreferenceID: number;
  userID: string;
  isJobAlertEmail: boolean;
  isJobAlertInApp: boolean;
  isEventReminderEmail: boolean;
  isEventReminderInApp: boolean;
  isManageNotificationEmail: boolean;
  isManageNotificationInApp: boolean;
  isCounselingSessionReminderEmail: boolean;
  isCounselingSessionReminderInApp: boolean;
  isSubscribed: boolean | null;
  currentPlan: string | null;
  expiry: string | null;
  isExpired: boolean;
  isTrailExpired: boolean;
}

const AccountSettings: React.FC = () => {
  const { userId, isSubscribe } = getUserIsSubscribe();
  const { handleSubmit } = useForm<FormData>();
  const token = Cookies.get("token") ?? "";
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    notificationPreferenceID: 0,
    userID: userId,
    isJobAlertEmail: false,
    isJobAlertInApp: false,
    isEventReminderEmail: false,
    isEventReminderInApp: false,
    isManageNotificationEmail: false,
    isManageNotificationInApp: false,
    isCounselingSessionReminderEmail: false,
    isCounselingSessionReminderInApp: false,
    isSubscribed: false,
    currentPlan: null,
    expiry: null,
    isExpired: false,
    isTrailExpired: false,
  });

  const navigate = useNavigate();
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCancelSubscription = async () => {
    try {
      const accountData = await uploadNotificationProfileData({
        notificationPreferenceID: formData?.notificationPreferenceID,
        userID: userId,
        isJobAlertEmail: formData?.isJobAlertEmail ?? false,
        isJobAlertInApp: formData?.isJobAlertInApp ?? false,
        isEventReminderEmail: formData?.isEventReminderEmail ?? false,
        isEventReminderInApp: formData?.isEventReminderInApp ?? false,
        isManageNotificationEmail: formData?.isManageNotificationEmail ?? false,
        isManageNotificationInApp: formData?.isManageNotificationInApp ?? false,
        isCounselingSessionReminderEmail: formData?.isCounselingSessionReminderEmail ?? false,
        isCounselingSessionReminderInApp: formData?.isCounselingSessionReminderInApp ?? false,
        isSubscribed: false,
        isExpired: true,
        isTrailExpired: true,
      });
      setPremiumKeys(
        accountData?.isExpired,
        accountData?.isSubscribed,
        accountData?.isTrailExpired
      );
      setFormData(accountData ?? formData);
      getAccountSetting();
      closeModal();
      showToast("success", "Subscription canceled successfully");
    } catch {
      showToast("error", "Error canceling subscription");
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const handleToggleChange = (field: keyof FormData) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const getAccountSetting = async () => {
    try {
      const accountData = await getNotificationProfileData(userId);
      setFormData(accountData ?? formData);
      if (accountData) {
        setPremiumKeys(
          accountData?.isExpired,
          accountData?.isSubscribed,
          accountData?.isTrailExpired
        );
      }
    } catch (error) {
      console.error("Error fetching account settings:", error);
    }
  };

  useEffect(() => {
    getAccountSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    try {
      const accountData = await uploadNotificationProfileData({
        notificationPreferenceID: formData?.notificationPreferenceID,
        userID: userId,
        isJobAlertEmail: formData?.isJobAlertEmail ?? false,
        isJobAlertInApp: formData?.isJobAlertInApp ?? false,
        isEventReminderEmail: formData?.isEventReminderEmail ?? false,
        isEventReminderInApp: formData?.isEventReminderInApp ?? false,
        isExpired: formData?.isExpired ?? false,
        isTrailExpired: true,
      });
      setPremiumKeys(
        accountData?.isExpired,
        accountData?.isSubscribed,
        accountData?.isTrailExpired
      );
      showToast("success", "Profile updated successfully");
    } catch (error) {
      showToast("error", "Error updating profile");
    }
  };

  // Stipe Payment method
  const makePayment = async () => {
    if (token) {
      try {
        const stripe = await loadStripe(
          "pk_live_51PZBtJIHmCNi5CROnXTZ36TYl8tTj5mqwk8OW0umfFDamaXt4IOd662NexdHwRtyrtyrtCF04pDmHyrVvlXcWIcgBFiHIHc00F0opatMt"
        );

        const body = {
          productid: BASIC_PLAN_ID,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const response = (await axios.post)<CreateSubscriptionResponse>(stripUrl, body, {
          headers: headers,
        });

        stripe?.redirectToCheckout({
          sessionId: (await response)?.data.id,
        });
      } catch {
        showToast("error", "Something went wrong !");
      }
    } else navigate("/sign-up");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <div className="flex justify-between border-b py-4 flex-col md:flex-row gap-6">
        <div></div>
        <div>
          <Button
            type="submit"
            className="bg-transparent hover:text-custom-secondary hover:bg-custom-primary text-custom-primary border-custom-primary mr-6"
          >
            Save
          </Button>
          <Button
            onClick={() => refreshPage()}
            className="text-custom-secondary hover:text-custom-primary hover:bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="py-6 grid grid-cols-12 border-b items-center gap-3">
        <div className=" col-span-12 lg:col-span-4 mb-4 lg:mb-0">
          <label
            className="col-span-12 lg:col-span-5 font-semibold"
            htmlFor="notification-preference"
          >
            Notification Preference
          </label>
        </div>
        <div className="col-span-12 lg:col-span-8 gap-3  justify-start flex-row grid grid-cols-2">
          <div className="flex justify-around flex-col">
            <div className="flex flex-col gap-3 mb-2 flex-1">
              <label className="font-semibold text-sm" htmlFor="job-alert">
                Job Alerts
              </label>
              <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isJobAlertEmail}
                  onChange={() => handleToggleChange("isJobAlertEmail")}
                />
                <p className="text-gray-500 text-sm align-center">Email</p>
              </div>
              {/* <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isJobAlertInApp}
                  onChange={() => handleToggleChange("isJobAlertInApp")}
                />
                <p className="text-gray-500 text-sm align-center">In App</p>
              </div> */}
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <label className="font-semibold text-sm" htmlFor="event-reminder">
                Event Reminders
              </label>
              <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isEventReminderEmail}
                  onChange={() => handleToggleChange("isEventReminderEmail")}
                />
                <p className="text-gray-500 text-sm align-center">Email</p>
              </div>
              {/* <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isEventReminderInApp}
                  onChange={() => handleToggleChange("isEventReminderInApp")}
                />
                <p className="text-gray-500 text-sm align-center">In App</p>
              </div> */}
            </div>
          </div>

          <div className="flex justify-around flex-col">
            {/* <div className="flex flex-col gap-3 mb-2"> */}
            {/* <label className="font-semibold text-sm" htmlFor="manage-notifications">
                Manage Notifications
              </label>
              <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isManageNotificationEmail}
                  onChange={() => handleToggleChange("isManageNotificationEmail")}
                />
                <p className="text-gray-500 text-sm align-center">Email</p>
              </div> */}
            {/* <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isManageNotificationInApp}
                  onChange={() => handleToggleChange("isManageNotificationInApp")}
                />
                <p className="text-gray-500 text-sm align-center">In App</p>
              </div> */}
            {/* </div> */}

            {/* <div className="flex flex-col gap-3">
              <label className="font-semibold text-sm" htmlFor="counseling-session-reminders">
                Counseling Session Reminders
              </label>
              <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isCounselingSessionReminderEmail}
                  onChange={() => handleToggleChange("isCounselingSessionReminderEmail")}
                />
                <p className="text-gray-500 text-sm align-center">Email</p>
              </div> */}
            {/* <div className="flex gap-2 items-center">
                <ToggleSwitch
                  checked={formData.isCounselingSessionReminderInApp}
                  onChange={() => handleToggleChange("isCounselingSessionReminderInApp")}
                />
                <p className="text-gray-500 text-sm align-center">In App</p>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="py-6 md:grid md:grid-cols-12 border-b items-center gap-8">
        <label htmlFor="subscription-info" className="col-span-12 lg:col-span-4 font-semibold">
          Subscription Information
        </label>
        <div className="col-span-12 lg:col-span-8">
          <div className=" flex gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <label className="font-semibold text-sm" htmlFor="current-plan">
                  Current plan :
                </label>
                <p className="text-gray-500 text-sm align-center my-3">
                  {formData?.currentPlan ?? "NA"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="font-semibold text-sm" htmlFor="next-billing-date">
                  Next Billing Date :
                </label>
                <p className="text-gray-500 text-sm align-center my-3">
                  {formData?.expiry ?? "NA"}
                </p>
              </div>
            </div>
          </div>

          {!isSubscribe ? (
            <div className="py-4">
              <p className="my-2">
                Access all our services for <b>Just £9.99/month</b>
              </p>
              <Button
                onClick={makePayment}
                className="border border-transparent text-custom-primary hover:bg-transparent hover:border-custom-primary"
                bgColor="bg-custom-secondary"
              >
                TheGradstory Subscription
              </Button>
            </div>
          ) : (
            <>
              <div className="py-4">
                <Button
                  onClick={() => navigate("/dashboard/cv-builder")}
                  className="hover:text-custom-primary hover:bg-transparent text-white"
                >
                  Enjoy the Premium feature
                </Button>
              </div>
              <div>
                <div className="underline text-red-600 cursor-pointer" onClick={openModal}>
                  Cancel subscription
                </div>
                <p className="text-xs mt-2">
                  If you cancel your subscription, you will lose access to all premium features.
                </p>
              </div>
            </>
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ConfirmationModal
            onConfirm={handleCancelSubscription}
            onCancel={closeModal}
            message="<b>Are you sure you want to cancel your subscription ?</b>"
          />
        </Modal>
      </div>
    </form>
  );
};

export default AccountSettings;
