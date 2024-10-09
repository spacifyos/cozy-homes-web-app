const DesktopModal = ({
  id,
  children,
  disableClose,
  closeButtonPosition = false,
}) => {
  return (
    <dialog id={id} className="modal modal-center flex justify-center">
      <div
        className="modal-box primaryWhite-bg-color hide-scroll-bar w-5/6"
        style={{ padding: 0 }}
      >
        {children}
      </div>

      {/*{disableClose ? (*/}
      {/*  false*/}
      {/*) : (*/}
      {/*  <form*/}
      {/*    method="dialog"*/}
      {/*    className="modal-backdrop absolute bottom-0 top-0 right-0 left-0"*/}
      {/*  >*/}
      {/*    <button>close</button>*/}
      {/*  </form>*/}
      {/*)}*/}
    </dialog>
  );
};

export default DesktopModal;
