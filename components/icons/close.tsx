import React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export default function CloseIcon({ className, ...rest }: Props) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M6 6 L18 18" />
      <path d="M6 18 L18 6" />
    </svg>
  );
}
