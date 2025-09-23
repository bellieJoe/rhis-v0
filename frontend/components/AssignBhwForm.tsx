import { assignBhw, hideAssignBhw } from "@/features/forms/assignBhwFormSlice";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OfficePicker } from "./forms/CustomPickers";
import { getSitios } from "@/api/sitioApi";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { getBhwDesignationsByUserId, storeBhwDesgination } from "@/api/bhwDesignationApi";

interface AssignBhwFormProps {

}

const AssignBhwForm = (props : AssignBhwFormProps) => {

    const assignBhwFormStore = useSelector((state : any) => state.assignBhwForm);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        form : false
    });
    const initialState = {
        user_id : null,
        office: null,
        sitios : []
    };
    const [form, setForm] = useState<any>(initialState);
    const [sitios, setSitios] = useState([]);
    const onHide = () => {
        setForm(initialState);
        dispatch(hideAssignBhw());
    }
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        console.log(form);
        const success = await storeBhwDesgination(dispatch, { ...form });
        if(success){
            onHide();
        }
        setLoading({...loading, form : false});
    }
    useEffect(() => {
        if(form.office === null) return;
        (async() => {
            const _sitios = await getSitios(dispatch, { office: form.office, paginate: false });
            setSitios(_sitios);
        })();
    }, [form.office]);
    useEffect(() => {
        if(assignBhwFormStore.user?.id) {
            (async () => {
                setForm({
                    ...form,
                    user_id : assignBhwFormStore.user?.id
                });
                const _designations = await getBhwDesignationsByUserId(dispatch, { user_id : assignBhwFormStore.user?.id, paginate : false });
                if(_designations.length > 0) {
                    setForm({
                        user_id : assignBhwFormStore.user?.id,
                        office: _designations[0].office.id,
                        sitios: _designations.map((d : any) => d.sitio_id)
                    });
                    // console.log(_designations)
                    // console.log({
                    //     user_id : assignBhwFormStore.user?.id,
                    //     office: _designations[0].office.id,
                    //     sitios: _designations.map((d : any) => d.sitio_id)
                    // });
                }
            })();
        }
    }, [assignBhwFormStore.user?.id])
    return (
        <>
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
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-900 font-medium mb-2">Office</label>
                        <OfficePicker className="w-full" office={form.office} onChange={(e) => setForm({ ...form, office : e })} office_type="barangay" />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="name" className="block text-900 font-medium mb-2">Sitios</label>
                        <MultiSelect className="w-full" value={form.sitios} onChange={(e) => setForm({ ...form, sitios : e.value })} multiple options={sitios} optionLabel="sitio_name" optionValue="id" placeholder="Select Sitios" />
                    </div>

                    <div className="flex justify-content-end">
                        <Button label="Assign" size="small" className="ml-2" onClick={handleSubmit} loading={loading.form} />
                    </div>
            </Sidebar>
        </>
    )
}

export default AssignBhwForm;