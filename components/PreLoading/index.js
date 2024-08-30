const PreLoading = ({ width, height, className }) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{ width: width, height: height }}
    >
      <span className="loading loading-spinner loading-lg text-neutral"></span>
    </div>
  );
};

export default PreLoading;
