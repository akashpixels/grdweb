/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { addUserProfileDetails, getUserProfilesDetails } from "api/services/cvbuilder.apis";
import { uploadProfileUserData } from "api/services/jobs.api";
import Button from "components/Common/Button/Button";
import ImageUpload from "components/Common/ImageUpload/ImageUpload";
import InputField from "components/Common/InputField/InputField";
import SelectField from "components/Common/SelectField/SelectField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "utils/toastUtils";
import locationData from "./countryList.json";
import { useAppDispatch } from "hooks/reduxHooks";
import { getCVName } from "store/Slices/cvbuilder";
import { getUserIsSubscribe, setProfileImage } from "api/services/localServices.service";
import { refreshPage } from "utils";
import Modal from "components/Common/Modal/NormalModel/Modal";
import ConfirmationModal from "components/Common/Modal/ConfirmModel/ConfirmModel";
import ChangePasswordModal from "components/Common/Modal/ChangePassword/ChangePasswordModal";
import { deleteAccountUser, setChangePassword } from "api/services/user.apis";
import { useNavigate } from "react-router-dom";
import Skills from "./Skills";
interface FormData {
  email: string;
  bio: string;
  location: string;
  First_Name: string;
  Last_Name: string;
  mobileNo: string;
  skills?: string;
}

const ProfileOverview: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = getUserIsSubscribe();
  const [profilePic, setProfileData] = useState<any>();
  const [profilePicSrcSet, setProfileDataSrcSet] = useState("");
  const [location, setLocation] = useState<string>("Uk");
  const [skills, setSkills] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChangeModalOpen, setChangeModalOpen] = useState(false);

  // eslint-disable-next-line no-console
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const updateProfileDetails = async (data: any) => {
    const payload = {
      userProfileID: 0,
      userID: userId,
      fontID: 1,
      firstName: data?.First_Name || "",
      lastName: data?.Last_Name || "",
      emailID: data?.email || "",
      countryCode: "",
      mobileNo: data?.mobileNo || "",
      address: "",
      bio: data?.bio || "",
      location: location,
      skills: skills,
    };
    const addedDetails = await addUserProfileDetails(payload);
    addedDetails && showToast("success", "Profile details updated successfully.");
  };
  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    if (data && data?.First_Name && data?.Last_Name) {
      onProfileOverviewSubmit(data);
    } else {
      showToast("error", "Please enter all required details");
      return;
    }
  };

  const getAndSetUserProfilesDetails = async () => {
    const userData = await getUserProfilesDetails(userId);
    if (userData) {
      setProfileImage(userData?.profileImage);
      setValue("First_Name", userData?.firstName || "");
      setValue("Last_Name", userData?.lastName || "");
      setValue("email", userData?.emailID || "");
      setValue("bio", userData?.bio || " ");
      setValue("mobileNo", userData?.mobileNo || "");
      setValue("location", userData?.location || "Uk");
      setProfileDataSrcSet(userData?.profileImage || "");
      setSkills(userData?.skill || "");
      dispatch(getCVName(userData?.cv));
    }
  };

  useEffect(() => {
    getAndSetUserProfilesDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e: any) => {
    if (e) {
      setProfileData(e);
      sessionStorage.setItem("ProfileImage", String(e));
    }
  };

  const handleChange = (value: any) => {
    setLocation(value.target.value);
  };

  const onProfileOverviewSubmit = (data: any) => {
    if (profilePic) {
      const formData = new FormData();
      formData.append("ProfileImage", profilePic, profilePic.name);
      uploadProfileUserData(userId, formData);
    }
    updateProfileDetails(data);
  };

  const handleDeleteAccount = async () => {
    // Handle account deletion logic here
    await deleteAccountUser(userId)
      .then(() => {
        showToast("success", "Delete User Successful");
        navigate("/login");
      })
      .catch(() => {
        showToast("success", "Delete User Successful");
      });
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  /** Change Password model */
  const handleChangePassword = (oldPassword: string, newPassword: string) => {
    setChangePassword({
      userid: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: newPassword,
    })
      .then((res) => {
        if (res) {
          showToast("success", "Password changed successfully");
        }
      })
      .catch(() => {
        showToast("error", "Failed to change password");
      });

    setChangeModalOpen(false);
  };

  const openChangeModal = () => {
    setChangeModalOpen(true);
  };

  const closeChangeModal = () => {
    setChangeModalOpen(false);
  };

  const onSetSkills = (data: string[]) => {
    setSkills(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <div className="flex justify-between border-b py-4 flex-col md:flex-row gap-6">
        <div>
          <h2 className="text-xl font-semibold">Personal Info</h2>
          <p className="text-gray-500 text-sm">Update your photo and personal details here.</p>
        </div>
        <div>
          <Button
            type={"submit"}
            className=" bg-transparent hover:text-custom-secondary  hover:bg-custom-primary text-custom-primary border-custom-primary mr-6"
          >
            Save
          </Button>
          <Button
            onClick={() => refreshPage()}
            className=" text-custom-secondary hover:text-custom-primary  hover:bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="py-6 md:grid md:grid-cols-12 border-b items-center">
        <div className="col-span-12 lg:col-span-4">
          <label className="font-semibold" htmlFor="photo">
            Your photo
          </label>
          <p className="text-gray-500 text-sm">This will be displayed on your profile.</p>
        </div>

        <div className="flex gap-10 col-span-12 lg:col-span-5 flex-col md:flex-row">
          <div className="mb-6 flex justify-center items-center  gap-8 mt-3 md:mt-0">
            <ImageUpload onImageChange={handleImageChange} srcImage={profilePicSrcSet} />
          </div>
        </div>
      </div>

      <div className="py-6 md:grid md:grid-cols-12 border-b items-center gap-8">
        <label htmlFor="name" className="col-span-12 lg:col-span-4 font-semibold">
          Name
        </label>
        <div className="col-span-12 lg:col-span-5 md:flex gap-3">
          <div className="flex-1">
            <InputField
              label=""
              name="First_Name"
              register={register}
              placeholder="Enter your first name"
              options={{ required: true }}
            />
            {errors.First_Name && (
              <span className="text-red-500 text-sm">First Name is required</span>
            )}
          </div>
          <div className="flex-1">
            <InputField
              label=""
              name="Last_Name"
              register={register}
              placeholder="Enter your last name"
              options={{ required: true }}
            />
            {errors.Last_Name && (
              <span className="text-red-500 text-sm">Last Name is required</span>
            )}
          </div>
        </div>
      </div>
      <div className="py-6 grid grid-cols-12 border-b items-center gap-2 md:gap-8">
        <label htmlFor="name" className="col-span-12 lg:col-span-4 font-semibold">
          Email
        </label>
        <div className="col-span-12 lg:col-span-5">
          <div className="mb-4">
            <InputField
              disabled
              label=""
              name="email"
              type="email"
              register={register}
              options={{ required: true }}
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>
        </div>
      </div>
      <Skills setSkillData={onSetSkills} isFromProfile={true} skillsList={skills} />

      <div className="py-6 md:grid md:grid-cols-12 items-start mt-3 gap-2 lg:gap-8 border-b">
        <label htmlFor="name" className="col-span-12 lg:col-span-4 font-semibold pt-3">
          Location
        </label>
        <div className="col-span-12 lg:col-span-5">
          {locationData && (
            <SelectField
              label=""
              name="location"
              classes="w-full"
              options={locationData || [{ label: "", value: "" }]}
              register={register}
              onChange={handleChange}
            />
          )}
        </div>
      </div>

      <div className="py-6 grid grid-cols-12 border-b items-center gap-2 md:gap-8">
        <label htmlFor="name" className="col-span-12 lg:col-span-4 font-semibold mb-2 md:mb-0">
          Change Password
        </label>
        <div className="col-span-12 lg:col-span-5 flex gap-4">
          <div className="border rounded-md pb-1 px-6  pt-3 flex items-center text-2xl">
            **********
          </div>
          <Button
            onClick={openChangeModal}
            className="  hover:text-custom-secondary hover:bg-transparent text-white bg-custom-secondary hover:border-custom-secondary"
          >
            update
          </Button>
        </div>
      </div>
      <div className="py-6 grid grid-cols-12 items-center gap-2 md:gap-8">
        <div className="col-span-12 lg:col-span-4">
          <label className="font-semibold" htmlFor="photo">
            Account
          </label>
          <p className="text-gray-500 text-sm">
            This account will no longer be available, and all your saved data will be permanently
            deleted
          </p>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Button
            onClick={openModal}
            className="  hover:text-red-600 hover:bg-transparent text-white bg-red-600 hover:border-red-600"
          >
            Delete Account
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ConfirmationModal
          onConfirm={handleDeleteAccount}
          onCancel={closeModal}
          message="<b>Are you sure you want to delete your account?</b> <br/>Once deleted there is no option to recover it."
        />
      </Modal>

      <Modal isOpen={isChangeModalOpen} onClose={closeChangeModal}>
        <ChangePasswordModal onChangePassword={handleChangePassword} onCancel={closeChangeModal} />
      </Modal>
    </form>
  );
};

export default ProfileOverview;
