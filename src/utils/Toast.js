import toast from "react-hot-toast";

const Toast = {
  success(message = "") {
    toast.success(message);
  },
  // info(message = "") {
  //   toast.info(message);
  // },
  error(message = "") {
    toast.error(message);
  },
  // warning(message = "") {
  //   toast.warn(message);
  // },
  loading(message = "") {
    toast.loading(message);
  },
};

export default Toast;
