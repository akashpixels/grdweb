/* eslint-disable max-len */
import React from "react";

const WelcomeMessage = () => {
  return (
    <div className="mx-auto rounded-lg">
      <h1 className="text-2xl font-bold mb-4 bg-custom-secondary p-3 text-center mt-4 rounded-md shadow-md">
        Welcome to The GradStory!
      </h1>
      <p className="mb-4">
        We&apos;re thrilled to have you on board. As a valued member of our community, you already
        have access to some great features. But there&apos;s so much more to explore!
      </p>
      <h2 className="text-xl font-semibold mb-2">Unlock Exclusive Benefits!</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Premium Content:</strong> Access exclusive articles, tutorials, and resources.
        </li>
        <li>
          <strong>Personalized Guidance:</strong> Get tailored advice and support to help you
          achieve your goals.
        </li>
        <li>
          <strong>Community Engagement:</strong> Connect with experts and peers through special
          events and forums.
        </li>
        <li>
          <strong>Advanced Tools:</strong> Utilize advanced tools and features to maximize your
          productivity.
        </li>
      </ul>
      <p className="mb-4">Choose a plan today and start enjoying more!</p>
      <p>If you have any questions or need assistance, our support team is here to help.</p>
      <p className="mt-6 text-lg font-semibold">Welcome aboard, and happy learning!</p>
    </div>
  );
};

export default WelcomeMessage;
