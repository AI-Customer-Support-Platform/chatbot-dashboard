import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import classNames from "classnames";

interface PortalModalCenterProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (show: boolean) => void;
  isBlur?: boolean;
  allowClickOutside?: boolean;
}

const PortalModalCenter: React.FC<PortalModalCenterProps> = ({
  children,
  isOpen,
  setIsOpen,
  isBlur = false,
  allowClickOutside,
}) => {
  const [visible, setVisible] = useState(false);
  const mouseDownElement = useRef<EventTarget | null>(null);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    mouseDownElement.current = event.target;
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (allowClickOutside) {
      return;
    }

    if (event.currentTarget === mouseDownElement.current) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setVisible(true);
      }, 50);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, 700);
    }
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className={classNames(
            "fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-700",
            {
              "opacity-0": !visible,
              "opacity-100": visible,
              "backdrop-blur-lg": isBlur,
            }
          )}
        >
          {children}
        </div>,
        document.body
      )
    : visible
    ? createPortal(
        <div
          className={classNames(
            "fixed inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-700",
            {
              hidden: !visible,
              "backdrop-blur-lg": isBlur,
            }
          )}
        >
          {children}
        </div>,
        document.body
      )
    : null;
};
export default PortalModalCenter;
