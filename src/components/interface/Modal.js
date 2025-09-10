'use client';
import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-75" onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl bg-white p-4 rounded-lg shadow-lg z-30 animate-slide-down">
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const portalElement = document.getElementById('overlays');

  return (
    <Fragment>
      {portalElement && ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
      {portalElement && ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
