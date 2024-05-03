const LoadingOverlay = ({ loading }) => {
  return loading ? (
    <div
      className={
        "absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center overflow-hidden"
      }
      style={{ backgroundColor: "rgba(256,256,256,0.5)", zIndex: 9999 }}
    >
      <span className="loading loading-dots loading-lg text-neutral"></span>
    </div>
  ) : (
    false
  );
};

export default LoadingOverlay;
