const CustomModal = ({ children, id, disableClose = false }) => {
  return (
    <dialog id={id} className="modal modal-bottom flex justify-center">
      <div
        className="modal-box absolute bg-primary-background"
        style={{ width: "100%", maxWidth: 500 }}
      >
        <div className="divider divider-custom justify-center"></div>

        {children}
      </div>

      {disableClose ? (
        false
      ) : (
        <form
          method="dialog"
          className="modal-backdrop absolute bottom-0 top-0 right-0 left-0"
        >
          <button>close</button>
        </form>
      )}
    </dialog>
  );
};

export default CustomModal;
