import { assignBhw, hideAssignBhw } from "@/features/forms/assignBhwFormSlice";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleOfficePicker, OfficePicker } from "./forms/CustomPickers";
import { getSitios } from "@/api/sitioApi";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { getBhwDesignationsByUserId, getMidwifeDesignationsByUserId, getRhuDesignationsByUserId, storeBhwDesgination, storeMidwifeDesignation, storeRhuDesignation } from "@/api/bhwDesignationApi";
import { hideAssignRhu } from "@/features/forms/assignRhuSlice";

interface AssignRhuFormProps {

}

const AssignRhuForm = (props : AssignRhuFormProps) => {

    const assignRhuFormStore = useSelector((state : any) => state.assignRhuForm);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        form : false
    });
    const initialState = {
        user_id : null,
        office: null
    };
    const [form, setForm] = useState<any>(initialState);
    const onHide = () => {
        setForm(initialState);
        dispatch(hideAssignRhu());
    }
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        console.log(form);
        const success = await storeRhuDesignation(dispatch, { ...form });
        if(success){
            onHide();
        }
        setLoading({...loading, form : false});
    }
    useEffect(() => {
        if(assignRhuFormStore.user?.id) {
            (async () => {
                setForm({
                    ...form,
                    user_id : assignRhuFormStore.user?.id
                });
                const _designation = await getRhuDesignationsByUserId(dispatch, { user_id : assignRhuFormStore.user?.id, paginate : false });
                if(_designation) {
                    setForm({
                        user_id : assignRhuFormStore.user?.id,
                        office: _designation.office_id ? _designation.office_id : null,
                    });
                }
            })();
        }
    }, [assignRhuFormStore.user?.id])
    return (
        <>
            <Sidebar
                position="right"
                visible={assignRhuFormStore.visible}
                onHide={onHide}
                title="Assign RHU Personnel"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Assign RHU Personnel</h4>
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
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-900 font-medium mb-2">Office</label>
                        <OfficePicker className="w-full" office={form.office} onChange={(e) => setForm({ ...form, office : e })} office_type="rhu" />
                    </div>

                    <div className="flex justify-content-end">
                        <Button label="Assign" size="small" className="ml-2" onClick={handleSubmit} loading={loading.form} />
                    </div>
            </Sidebar>
        </>
    )
}
export default AssignRhuForm;