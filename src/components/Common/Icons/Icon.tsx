/* eslint-disable max-len */
import React from "react";

interface IconProps {
  viewBox?: string;
  ariaLabel?: string;
  height?: string;
  width?: string;
  color?: string;
  isFilled?: boolean;
  customClassName?: string | undefined;
  dataTestSelector?: string;
  datatestselector?: string; // This is just handle warnings for searchBox
  strokeWidth?: string;
}

export function ClockIcon(props: IconProps) {
  return (
    <svg
      width="49"
      height="40"
      viewBox="0 0 49 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30.2453 24C31.0362 22.8661 31.5 21.4872 31.5 20C31.5 19.4851 31.4444 18.9832 31.3389 18.5M18.7547 24C17.9638 22.8662 17.5 21.4872 17.5 20C17.5 16.134 20.634 13 24.5 13C24.9221 13 25.3355 13.0374 25.7371 13.109M28.9999 15.5L24.4999 20M34.5 20C34.5 25.5228 30.0228 30 24.5 30C18.9772 30 14.5 25.5228 14.5 20C14.5 14.4772 18.9772 10 24.5 10C30.0228 10 34.5 14.4772 34.5 20ZM25.5 20C25.5 20.5523 25.0523 21 24.5 21C23.9477 21 23.5 20.5523 23.5 20C23.5 19.4477 23.9477 19 24.5 19C25.0523 19 25.5 19.4477 25.5 20Z"
        stroke="#121926"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5 1.26953V5.40007C11.5 5.96012 11.5 6.24015 11.609 6.45406C11.7049 6.64222 11.8578 6.7952 12.046 6.89108C12.2599 7.00007 12.5399 7.00007 13.1 7.00007H17.2305M13.5 12H5.5M13.5 16H5.5M7.5 8H5.5M11.5 1H6.3C4.61984 1 3.77976 1 3.13803 1.32698C2.57354 1.6146 2.1146 2.07354 1.82698 2.63803C1.5 3.27976 1.5 4.11984 1.5 5.8V16.2C1.5 17.8802 1.5 18.7202 1.82698 19.362C2.1146 19.9265 2.57354 20.3854 3.13803 20.673C3.77976 21 4.61984 21 6.3 21H12.7C14.3802 21 15.2202 21 15.862 20.673C16.4265 20.3854 16.8854 19.9265 17.173 19.362C17.5 18.7202 17.5 17.8802 17.5 16.2V7L11.5 1Z"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BriefCase(props: IconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.5 21V7C8.5 6.07003 8.5 5.60504 8.60222 5.22354C8.87962 4.18827 9.68827 3.37962 10.7235 3.10222C11.105 3 11.57 3 12.5 3C13.43 3 13.895 3 14.2765 3.10222C15.3117 3.37962 16.1204 4.18827 16.3978 5.22354C16.5 5.60504 16.5 6.07003 16.5 7V21M5.7 21H19.3C20.4201 21 20.9802 21 21.408 20.782C21.7843 20.5903 22.0903 20.2843 22.282 19.908C22.5 19.4802 22.5 18.9201 22.5 17.8V10.2C22.5 9.07989 22.5 8.51984 22.282 8.09202C22.0903 7.71569 21.7843 7.40973 21.408 7.21799C20.9802 7 20.4201 7 19.3 7H5.7C4.57989 7 4.01984 7 3.59202 7.21799C3.21569 7.40973 2.90973 7.71569 2.71799 8.09202C2.5 8.51984 2.5 9.07989 2.5 10.2V17.8C2.5 18.9201 2.5 19.4802 2.71799 19.908C2.90973 20.2843 3.21569 20.5903 3.59202 20.782C4.01984 21 4.5799 21 5.7 21Z"
        stroke="#121926"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Message(props: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 10H6.01M10.5 10H10.51M15 10H15.01M10.5 19C15.4706 19 19.5 14.9706 19.5 10C19.5 5.02944 15.4706 1 10.5 1C5.52944 1 1.5 5.02944 1.5 10C1.5 11.1971 1.73374 12.3397 2.15806 13.3845C2.23927 13.5845 2.27988 13.6845 2.298 13.7653C2.31572 13.8443 2.3222 13.9028 2.32221 13.9839C2.32222 14.0667 2.30718 14.1569 2.27711 14.3374L1.68413 17.8952C1.62203 18.2678 1.59098 18.4541 1.64876 18.5888C1.69933 18.7067 1.79328 18.8007 1.91118 18.8512C2.04589 18.909 2.23218 18.878 2.60476 18.8159L6.16265 18.2229C6.34309 18.1928 6.4333 18.1778 6.51613 18.1778C6.59715 18.1778 6.65566 18.1843 6.73472 18.202C6.81554 18.2201 6.91552 18.2607 7.11549 18.3419C8.1603 18.7663 9.30286 19 10.5 19ZM6.5 10C6.5 10.2761 6.27614 10.5 6 10.5C5.72386 10.5 5.5 10.2761 5.5 10C5.5 9.72386 5.72386 9.5 6 9.5C6.27614 9.5 6.5 9.72386 6.5 10ZM11 10C11 10.2761 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.2761 10 10C10 9.72386 10.2239 9.5 10.5 9.5C10.7761 9.5 11 9.72386 11 10ZM15.5 10C15.5 10.2761 15.2761 10.5 15 10.5C14.7239 10.5 14.5 10.2761 14.5 10C14.5 9.72386 14.7239 9.5 15 9.5C15.2761 9.5 15.5 9.72386 15.5 10Z"
        stroke="#121926"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FirstAid(props: IconProps) {
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.5 7H1.5M14.5 1V4M6.5 1V4M10.5 17V11M7.5 14H13.5M6.3 21H14.7C16.3802 21 17.2202 21 17.862 20.673C18.4265 20.3854 18.8854 19.9265 19.173 19.362C19.5 18.7202 19.5 17.8802 19.5 16.2V7.8C19.5 6.11984 19.5 5.27976 19.173 4.63803C18.8854 4.07354 18.4265 3.6146 17.862 3.32698C17.2202 3 16.3802 3 14.7 3H6.3C4.61984 3 3.77976 3 3.13803 3.32698C2.57354 3.6146 2.1146 4.07354 1.82698 4.63803C1.5 5.27976 1.5 6.11984 1.5 7.8V16.2C1.5 17.8802 1.5 18.7202 1.82698 19.362C2.1146 19.9265 2.57354 20.3854 3.13803 20.673C3.77976 21 4.61984 21 6.3 21Z"
        stroke="#121926"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LeftArrow(props: IconProps) {
  return (
    <svg
      fill={props.color || "#000000"}
      height={props.height || "25px"}
      width={props.width || "25px"}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={props.viewBox || "0 0 50 50"}
      {...props}
    >
      <path
        id="XMLID_92_"
        d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
	l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
	C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
      />
    </svg>
  );
}

export function RobotIcon(props: IconProps) {
  return (
    <svg
      fill={props.color || "#000000"}
      height={props.height || "25px"}
      width={props.width || "25px"}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={props.viewBox || "0 0 64 64"}
      {...props}
    >
      <path d="M32 0C21.609 0 13 8.609 13 19H8c-4.418 0-8 3.582-8 8v12c0 4.418 3.582 8 8 8h2v9c0 3.86 3.14 7 7 7h30c3.86 0 7-3.14 7-7v-9h2c4.418 0 8-3.582 8-8V27c0-4.418-3.582-8-8-8h-5c0-10.391-8.609-19-19-19zm0 6c7.168 0 13 5.832 13 13H19c0-7.168 5.832-13 13-13zm-6 34c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm12 0c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z" />
    </svg>
  );
}
