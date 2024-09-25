/* eslint-disable max-len */
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "components/Common/Button/Button";

interface ChangePasswordModalProps {
  // eslint-disable-next-line no-unused-vars
  onChangePassword: (oldPassword: string, newPassword: string) => void;
  onCancel: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onChangePassword,
  onCancel,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!oldPassword) {
      newErrors.oldPassword = "Old password is required";
      valid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long";
      valid = false;
    } else if (oldPassword === newPassword) {
      newErrors.newPassword = "New password must be different from the old password";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      valid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "New password and confirm password must match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      onChangePassword(oldPassword, newPassword);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-lg mb-4">Change Password</h2>
      <div className="mb-4 relative">
        <input
          type={showOldPassword ? "text" : "password"}
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          {showOldPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.oldPassword && (
          <div className="text-red-500 mt-2 text-sm flex justify-start">{errors.oldPassword}</div>
        )}
      </div>
      <div className="mb-4 relative">
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.newPassword && (
          <div className="text-red-500 mt-2 text-sm flex justify-start">{errors.newPassword}</div>
        )}
      </div>
      <div className="mb-4 relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.confirmPassword && (
          <div className="text-red-500 mt-2 text-sm flex justify-start">
            {errors.confirmPassword}
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleSubmit}
          className="hover:text-custom-secondary hover:bg-transparent text-white bg-custom-secondary hover:border-custom-secondary"
        >
          Update
        </Button>

        <Button
          onClick={onCancel}
          className="hover:text-custom-secondary bg-transparent text-gray-500 hover:border-custom-secondary border-gray-500"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
