import Header from "components/Common/Header/Header";
import { Loading } from "components/Common/Loader/Loading";
import Signup from "pages/Signup/Signup";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DreamerPlan,
  AchieverPlan,
  VisionaryPlan,
  Home,
  Contact,
  OurStory,
  Blog,
  BlogPost,
  SignIn,
  ForgotPassword,
  Logout,
  PrivacyPolicy,
  TermCondition,
  FAQ,
} from "./routes";
import Footer from "components/Main/Footer/Footer";
import PremiumPlan from "pages/Plan/PremiumPlan";
import SuccessPage from "components/Common/Success/Success";
import PaymentFailedPage from "components/Common/Cancel/PaymentFailed";
import LoginPage from "pages/Signin/Signin";
import ResetPassword from "pages/ResetPaasword/ResetPassword";

interface IAppSubRoutes {
  path: string;
  component: React.ReactNode;
  children: IAppSubRoutes[];
}

const AppSubRoutes = () => {
  const routes: IAppSubRoutes[] = [
    {
      path: "/",
      component: <Home />,
      children: [],
    },
    {
      path: "/home",
      component: <Home />,
      children: [],
    },
    {
      path: "/our-story",
      component: <OurStory />,
      children: [],
    },
    {
      path: "/contact",
      component: <Contact />,
      children: [],
    },
    {
      path: "/dreamer-plan",
      component: <DreamerPlan />,
      children: [],
    },
    {
      path: "/subscription",
      component: <PremiumPlan />,
      children: [],
    },
    {
      path: "/achiever-plan",
      component: <AchieverPlan />,
      children: [],
    },
    {
      path: "/visionary-plan",
      component: <VisionaryPlan />,
      children: [],
    },
    {
      path: "/blog",
      component: <Blog />,
      children: [],
    },
    {
      path: "/sign-in",
      component: <SignIn />,
      children: [],
    },
    {
      path: "/sign-up",
      component: <Signup />,
      children: [],
    },
    {
      path: "/forgot-password",
      component: <ForgotPassword />,
      children: [],
    },
    {
      path: "/reset-password",
      component: <ResetPassword />,
      children: [],
    },
    {
      path: "/blog/:postId",
      component: <BlogPost />,
      children: [],
    },
    {
      path: "/success",
      component: <SuccessPage />,
      children: [],
    },
    {
      path: "/cancel",
      component: <PaymentFailedPage />,
      children: [],
    },
    {
      path: "/login",
      component: <LoginPage />,
      children: [],
    },
    {
      path: "/logout",
      component: <Logout />,
      children: [],
    },
    {
      path: "/privacy-policy",
      component: <PrivacyPolicy />,
      children: [],
    },
    {
      path: "/terms-and-conditions",
      component: <TermCondition />,
      children: [],
    },
    {
      path: "/faq",
      component: <FAQ />,
      children: [],
    },
  ];

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component}>
              {route.children.map((childRoute) => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.component}
                ></Route>
              ))}
            </Route>
          ))}
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
};

export default AppSubRoutes;
