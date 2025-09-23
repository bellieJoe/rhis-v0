import { addSitio, hideAddSitio } from "@/features/forms/addSitioFormSlice";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarangayPicker, MunicipalityPicker } from "./forms/CustomPickers";
import Required from "./forms/RequiredIndicator";
import ValidationError from "./forms/ValidationError";
import { setErrors } from "@/features/errorSlice";
import { getSitios, storeSitio } from "@/api/sitioApi";
import { InputText } from "primereact/inputtext";
import { reloadSitios } from "@/features/sitioSlice";


const AddSitioForm = () => {
    const dispatch = useDispatch();
    const addSitioFormStore = useSelector((state: any) => state.addSitioForm);
    const inititialState = {
        municipality: null,
        barangay: null,
        name : ""
    }
    const [sitios, setSitios] = useState([]);
    const [form, setForm] = useState(inititialState);
    const onHide = () => {
        setForm(inititialState);
        dispatch(setErrors({}));
        dispatch(hideAddSitio());
    }
    const [loading, setLoading] = useState({
        form : false
    });
    const showAddSitio = () => {
        dispatch(addSitio());
    }
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        const success = await storeSitio(dispatch, { ...form });
        if(success) {
            dispatch(reloadSitios());
            onHide();
        }
        setLoading({...loading, form : false});
    }
    

    // useEffect(() => {
    //     (async() => {
    //         if(form.barangay) {
    //             console.log(form.barangay);
    //             const _sitios = await getSitios(dispatch, { barangay : form.barangay, paginate : false });
    //             setSitios(_sitios);
    //             console.log(sitios);
    //         }
    //     })();
    // }, [form.barangay]);

    return (
        <>
            <Button size="small" label="Add Sitio" onClick={showAddSitio}  />
            <Sidebar
                position="right"
                visible={addSitioFormStore.visible}
                onHide={onHide}
                title="Add Sitio"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Add Sitio</h4>
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
                    <label htmlFor="municipality" className="mb-2">Municipality <Required /></label>
                    <MunicipalityPicker className="w-full"  onChange={(e: any) => setForm({...form, municipality : e})} municipality={form.municipality} />
                </div>
                <div className="mb-2">
                    <label htmlFor="barangay" className="mb-2">Barangay <Required /></label>
                    <BarangayPicker className="w-full"  onChange={(e: any) => setForm({...form, barangay : e})} municipality={form.municipality} barangay={form.barangay} />
                    <ValidationError name="barangay" />
                </div>
                <div className="mb-2">
                    <label htmlFor="barangay" className="mb-2">Sitio Name <Required /></label>
                    <InputText type="text" className="w-full" value={form.name} onChange={(e) => setForm({...form, name : e.target.value})} />
                    <ValidationError name="name" />
                </div>
                <div className="flex justify-content-end">
                    <Button label="Submit" severity="success" onClick={handleSubmit} loading={loading.form} />
                </div>
            </Sidebar>

        </>
    )
}

export default AddSitioForm;