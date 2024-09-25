import { useAppDispatch } from "hooks/reduxHooks";
import React, { useEffect } from "react";
import { doLogout } from "store/Slices/auth.slice";
const Logout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(doLogout());
    const win: Window = window;
    win.location = "/";
  }, [dispatch]);

  return <></>;
};

export default Logout;
