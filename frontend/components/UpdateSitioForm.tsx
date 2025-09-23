import { addSitio, hideAddSitio } from "@/features/forms/addSitioFormSlice";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarangayPicker, MunicipalityPicker } from "./forms/CustomPickers";
import Required from "./forms/RequiredIndicator";
import ValidationError from "./forms/ValidationError";
import { setErrors } from "@/features/errorSlice";
import { getSitios, storeSitio, updateSitio } from "@/api/sitioApi";
import { InputText } from "primereact/inputtext";
import { reloadSitios } from "@/features/sitioSlice";
import { hideUpdateSitio } from "@/features/forms/updateSitioFormSlice";


const UpdateSitioForm = () => {
    const dispatch = useDispatch();
    const updateSitioFormStore = useSelector((state: any) => state.updateSitioForm);
    const inititialState = {
        id : null,
        municipality: null,
        barangay: null,
        name : ""
    }
    const [form, setForm] = useState(inititialState);
    const onHide = () => {
        setForm(inititialState);
        dispatch(setErrors({}));
        dispatch(hideUpdateSitio());
    }
    const [loading, setLoading] = useState({
        form : false
    });
   
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        const success = await updateSitio(dispatch, { ...form });
        if(success) {
            dispatch(reloadSitios());
            onHide();
        }
        setLoading({...loading, form : false});
    }
    useEffect(() => {
        if(updateSitioFormStore.sitio.id) {
            setForm({
                id : updateSitioFormStore.sitio.id,
                municipality: updateSitioFormStore.sitio.barangay.municipality_id,
                barangay: updateSitioFormStore.sitio.barangay_id,
                name : updateSitioFormStore.sitio.sitio_name
            });
        }
    }, [updateSitioFormStore.sitio.id]);
    

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
            <Sidebar
                position="right"
                visible={updateSitioFormStore.visible}
                onHide={onHide}
                title="Update Sitio"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Update Sitio</h4>
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

export default UpdateSitioForm;