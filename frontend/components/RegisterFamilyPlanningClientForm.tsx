
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAssignMidwife } from "@/features/forms/assignMidwifeSlice";
import { hideRegisterMaternalForm, maternalClientRegistered } from "@/features/forms/registerMaternalClientSlice";
import { registerMaternalClient } from "@/api/maternalCareApi";
import { childcareClientRegistered, hideRegisterChildcareForm } from "@/features/forms/registerChildcareClientSlice";
import { registerChildcareClient } from "@/api/childCareApi";
import { familyPlanningClientRegistered, hideRegisterFamilyPlanningForm } from "@/features/forms/registerFamilyPlanningClientSlice";
import { registerFamilyPlanningClient } from "@/api/familyPlanningTargetApi";



const RegisterFamilyPlanningClientForm = (props : any) => {
    const registerFamilyPlanningClientStore = useSelector((state : any) => state.registerFamilyPlanningClient);
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
        dispatch(hideRegisterFamilyPlanningForm());
    }
    const handleSubmit = async () => {
        setLoading({...loading, form : true});
        const success = await registerFamilyPlanningClient(dispatch, {household_profile_id : registerFamilyPlanningClientStore.household_profile?.id});
        if(success) {
            dispatch(familyPlanningClientRegistered());
            onHide();
        }
        setLoading({...loading, form : false});
    }
    return (
        <>
            <Sidebar
                position="right"
                visible={registerFamilyPlanningClientStore.visible}
                onHide={onHide}
                title="Register Family Planning Client"
                style={{ maxWidth: '30rem', width: '100vw' }}
                header={
                    <div className="flex justify-content-center">
                        <h4 className="">Register Family Planning Client</h4>
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
                            <p className="text-lg">{registerFamilyPlanningClientStore.household_profile?.fullname}</p>
                        </div>
                        <div className="mb-2">
                            <p className="mb-0 font-bold">Address</p>
                            <p className="text-lg">{`${registerFamilyPlanningClientStore.household_profile?.household?.barangay?.barangay_name} ${registerFamilyPlanningClientStore.household_profile?.household?.barangay?.municipality?.municipality_name} ${registerFamilyPlanningClientStore.household_profile?.household?.barangay?.municipality?.province?.province_name}`}</p>
                        </div>
                    </div>
                    <Button label="Register Client" loading={loading.form} onClick={handleSubmit} className="w-full" />
            </Sidebar>
        </>
    )
}
export default RegisterFamilyPlanningClientForm;