import { assignBhw, hideAssignBhw } from "@/features/forms/assignBhwFormSlice";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleOfficePicker, OfficePicker } from "./forms/CustomPickers";
import { getSitios } from "@/api/sitioApi";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { getBhwDesignationsByUserId, getMidwifeDesignationsByUserId, storeBhwDesgination, storeMidwifeDesignation } from "@/api/bhwDesignationApi";
import { hideAssignMidwife } from "@/features/forms/assignMidwifeSlice";
import { hideAssignCaptain } from "@/features/forms/assignCaptainFormSlice";
import { getCaptainDesignationByUserId, storeCaptainDesignation } from "@/api/captainDesignationApi";

interface AssignCaptainFormProps {

}

const AssignCaptainForm = (props : AssignCaptainFormProps) => {

    const assignCaptainFormStore = useSelector((state : any) => state.assignCaptainForm);
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
        dispatch(hideAssignCaptain());
    }
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        console.log(form);
        const success = await storeCaptainDesignation(dispatch, { ...form });
        if(success){
            onHide();
        }
        setLoading({...loading, form : false});
    }
    useEffect(() => {
        if(assignCaptainFormStore.user?.id) {
            (async () => {
                setForm({
                    ...form,
                    user_id : assignCaptainFormStore.user?.id
                });
                const _designation = await getCaptainDesignationByUserId(dispatch, { user_id : assignCaptainFormStore.user?.id, paginate : false });
                console.log(_designation);
                setForm({
                    user_id : assignCaptainFormStore.user?.id,
                    office: _designation?.office_id,
                });
            })();
        }
    }, [assignCaptainFormStore.user?.id])
    return (
        <>
            <Sidebar
                position="right"
                visible={assignCaptainFormStore.visible}
                onHide={onHide}
                title="Assign Captain Designation"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Assign Captain Designation</h4>
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
                        <OfficePicker className="w-full" office={form.office} onChange={(e) => setForm({ ...form, office : e })} office_type="barangay"  />
                    </div>

                    <div className="flex justify-content-end">
                        <Button label="Assign" size="small" className="ml-2" onClick={handleSubmit} loading={loading.form} />
                    </div>
            </Sidebar>
        </>
    )
}
export default AssignCaptainForm;