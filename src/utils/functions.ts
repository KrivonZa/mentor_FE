import { toast } from "react-toastify";

//Toast for handle asynchronous
export const toastLoadingSuccessAction = (toastId: any, message: string) => {
    toast.update(toastId, { render: message, type: "success", isLoading: false, autoClose: 3000 });
}

export const toastLoadingFailAction = (toastId: any, message: string) => {
    toast.update(toastId, { render: message, type: "error", isLoading: false, autoClose: 3000 });
}