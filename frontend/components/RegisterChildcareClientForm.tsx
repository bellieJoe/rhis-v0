
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAssignMidwife } from "@/features/forms/assignMidwifeSlice";
import { hideRegisterMaternalForm, maternalClientRegistered } from "@/features/forms/registerMaternalClientSlice";
import { registerMaternalClient } from "@/api/maternalCareApi";
import { childcareClientRegistered, hideRegisterChildcareForm } from "@/features/forms/registerChildcareClientSlice";
import { registerChildcareClient } from "@/api/childCareApi";



const RegisterChildcareClientForm = (props : any) => {
    const registerChildcareClientStore = useSelector((state : any) => state.registerChildcareClient);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        form : false
    });
    const initialState = {
        // user_id : null,
        // office: [],
        // sitios : []
    };
    const [form, setForm] = useState<any>(initialState);
    const onHide = () => {
        setForm(initialState);
        dispatch(hideRegisterChildcareForm());
    }
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        const success = await registerChildcareClient(dispatch, {household_profile_id : registerChildcareClientStore.household_profile?.id});
        if(success) {
            dispatch(childcareClientRegistered());
            onHide();
        }
        setLoading({...loading, form : false});
    }
    return (
        <>
            <Sidebar
                position="right"
                visible={registerChildcareClientStore.visible}
                onHide={onHide}
                title="Register Childcare Client"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Register Childcare Client</h4>
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
                    <div className="card">
                        <div className="mb-2">
                            <p className="mb-0 font-bold">Name</p>
                            <p className="text-lg">{registerChildcareClientStore.household_profile?.fullname}</p>
                        </div>
                        <div className="mb-2">
                            <p className="mb-0 font-bold">Address</p>
                            <p className="text-lg">{`${registerChildcareClientStore.household_profile?.household?.barangay?.barangay_name} ${registerChildcareClientStore.household_profile?.household?.barangay?.municipality?.municipality_name} ${registerChildcareClientStore.household_profile?.household?.barangay?.municipality?.province?.province_name}`}</p>
                        </div>
                    </div>
                    <Button label="Register Client" loading={loading.form} onClick={handleSubmit} className="w-full" />
            </Sidebar>
        </>
    )
}
export default RegisterChildcareClientForm;