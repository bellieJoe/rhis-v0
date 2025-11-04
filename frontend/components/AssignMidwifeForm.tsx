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

interface AssignMidwifeFormProps {

}

const AssignMidwifeForm = (props : AssignMidwifeFormProps) => {

    const assignMidwifeFormStore = useSelector((state : any) => state.assignMidwifeForm);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        form : false
    });
    const initialState = {
        user_id : null,
        office: [],
        sitios : []
    };
    const [form, setForm] = useState<any>(initialState);
    const onHide = () => {
        setForm(initialState);
        dispatch(hideAssignMidwife());
    }
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        console.log(form);
        const success = await storeMidwifeDesignation(dispatch, { ...form });
        if(success){
            onHide();
        }
        setLoading({...loading, form : false});
    }
    useEffect(() => {
        if(assignMidwifeFormStore.user?.id) {
            (async () => {
                setForm({
                    ...form,
                    user_id : assignMidwifeFormStore.user?.id
                });
                const _designations = await getMidwifeDesignationsByUserId(dispatch, { user_id : assignMidwifeFormStore.user?.id, paginate : false });
                console.log(_designations.map((d : any) => d.office?.id));
                if(_designations.length > 0) {
                    setForm({
                        user_id : assignMidwifeFormStore.user?.id,
                        office: _designations.map((d : any) => d.office?.id),
                        sitios: _designations.map((d : any) => d.sitio_id)
                    });
                }
            })();
        }
    }, [assignMidwifeFormStore.user?.id])
    return (
        <>
            <Sidebar
                position="right"
                visible={assignMidwifeFormStore.visible}
                onHide={onHide}
                title="Assign Midwife"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Assign Midwife</h4>
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
                        <MultipleOfficePicker className="w-full" office={form.office} onChange={(e) => setForm({ ...form, office : e })} office_type="barangay" multiple />
                    </div>

                    <div className="flex justify-content-end">
                        <Button label="Assign" size="small" className="ml-2" onClick={handleSubmit} loading={loading.form} />
                    </div>
            </Sidebar>
        </>
    )
}
export default AssignMidwifeForm;