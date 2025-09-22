import { assignBhw, hideAssignBhw } from "@/features/forms/assignBhwFormSlice";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AssignBhwFormProps {
    user : any
}

const AssignBhwForm = (props : AssignBhwFormProps) => {

    const assignBhwFormStore = useSelector((state : any) => state.assignBhwForm);
    const dispatch = useDispatch();
    const onHide = () => {
        dispatch(hideAssignBhw());
    }
    const showForm = () => {
        dispatch(assignBhw({ user : props.user }));
    }
    useEffect(() => {
        
    }, [props.user.id]);
    return (
        <>
            <Button label="Assign BHW" size="small" onClick={showForm} />
            <Sidebar
                position="right"
                visible={assignBhwFormStore.visible}
                onHide={onHide}
                title="Assign BHW"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Assign BHW</h4>
                    </div>
                }
                showCloseIcon={false}
                icons={() => (
                    <Button
                        icon="pi pi-times"
                        size="large"
                        severity="danger"
                        text
                        rounded
                        onClick={onHide}
                    />
                )}
                >
                    Assign BHW
            </Sidebar>
        </>
    )
}

export default AssignBhwForm;