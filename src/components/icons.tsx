interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fill?: string;
  height?: string | number;
  width?: string | number;
  gradientId?: string;
}

export const ArrorBackIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.fill || "#000"}
        d="M20 11H6.83l2.88-2.88A.996.996 0 1 0 8.3 6.71L3.71 11.3a.996.996 0 0 0 0 1.41L8.3 17.3a.996.996 0 1 0 1.41-1.41L6.83 13H20c.55 0 1-.45 1-1s-.45-1-1-1z"
      />
    </svg>
  );
};

export const CheckIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"
      />
    </svg>
  );
};

export const CloseIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
      />
    </svg>
  );
};

export const LoadingIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <linearGradient
          id="mingcuteLoadingFill0"
          x1="50%"
          x2="50%"
          y1="5.271%"
          y2="91.793%"
        >
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity=".55" />
        </linearGradient>
        <linearGradient
          id="mingcuteLoadingFill1"
          x1="50%"
          x2="50%"
          y1="15.24%"
          y2="87.15%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <g fill="none">
        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
        <path
          fill="url(#mingcuteLoadingFill0)"
          d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.502 7.502 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021Z"
          transform="translate(1.5 1.625)"
        />
        <path
          fill="url(#mingcuteLoadingFill1)"
          d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.475 10.475 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118Z"
          transform="translate(1.5 1.625)"
        />
      </g>
    </svg>
  );
};

export const PlusIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 22 22"
      {...props}
    >
      <path fill="currentColor" d="M12 17h-2v-5H5v-2h5V5h2v5h5v2h-5Z" />
    </svg>
  );
};

export const RefreshIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.188-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20Z"
      />
    </svg>
  );
};

export const UploadFileIcon = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11 14.825V18q0 .425.288.713T12 19q.425 0 .713-.288T13 18v-3.175l.9.9q.15.15.338.225t.375.063q.187-.013.362-.088t.325-.225q.275-.3.288-.7t-.288-.7l-2.6-2.6q-.15-.15-.325-.212T12 11.425q-.2 0-.375.063t-.325.212l-2.6 2.6q-.3.3-.287.7t.312.7q.3.275.7.288t.7-.288l.875-.875ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.588 1.413T18 22H6Zm7-14q0 .425.288.713T14 9h4l-5-5v4Z"
      />
    </svg>
  );
};
