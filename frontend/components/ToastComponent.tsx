import { setToast } from "@/features/toastSlice";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const ToastComponent = () => {
    const dispatch = useDispatch();
    const toast = useRef<Toast | null>(null);

    const toastState = useSelector((state: any) => state.toast) || {};
    const { severity, summary, detail, life } = toastState;

    useEffect(() => {
        console.log({ severity, summary, detail, life });
        if (!severity || !summary || !detail || !life) return;
        toast.current?.show({ severity, summary, detail, life });
    }, [severity, summary, detail, life]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(setToast({
                severity: "success",
                summary: "ad",
                detail: "asdasdasd",
                life: 3000
            }));
            console.log("Test");
        }, 3000);
    }, []);

    return <Toast ref={toast} />;
};

export default ToastComponent;
