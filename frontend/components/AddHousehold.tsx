import { getGenericTypes } from "@/api/genericTypeApi";
import { storeHousehold } from "@/api/householdApi";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { Steps } from "primereact/steps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValidationError from "./ValidationError";
import { setErrors } from "@/features/errorSlice";
import { reloadHouseholds } from "@/features/householdSlice";

interface AddHouseholdProfileProps {
    visible: boolean,
    onHide: () => void
}

const AddHousehold = ({ visible, onHide }: AddHouseholdProfileProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        addHousehold : false
    })
    const onSave = async () => {
        dispatch(setErrors({}));
        setLoading({
            ...loading,
            addHousehold : true
        });
        const success = await storeHousehold(dispatch, form);
        setLoading({
            ...loading,
            addHousehold : false
        });
        if(success) {
            onHide();
            dispatch(reloadHouseholds());
            setForm({
                "sitio" : "",
                "household_name" : "",
                "household_no" : ""
            });
        }
        
    }
    
    const [form, setForm] = useState({
        "sitio" : "",
        "household_name" : "",
        "household_no" : ""
    })

    return (
        <Sidebar 
            title="Add Household" 
            header={<h5 className="mb-0">Add Household</h5>} 
            onHide={onHide} 
            visible={visible} 
            position="right" 
            style={{ width: '100vw', maxWidth: '500px'   }}>
            
            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="householdNo">Household No.</label>
                <InputText id="householdNo" placeholder="YYYYMM-00000" value={form.household_no} onChange={(e) => setForm({...form, household_no : e.target.value})} className="w-full" />
                <ValidationError name="household_no" />
            </div>

            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="householdName">Household Name</label>
                <InputText id="householdName" placeholder="eg. Dela Cruz Residence" value={form.household_name} onChange={(e) => setForm({...form, household_name : e.target.value})} className="w-full" />
                <ValidationError name="household_name" />
            </div>

            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="address">Address </label>
                <Dropdown id="address" placeholder="Purok/Sitio, Barangay, Municipality, Province" value={form.sitio} onChange={(e) => setForm({...form, sitio : e.target.value})} className="w-full" />
                <ValidationError name="sitio" />
            </div>
            <div className="flex justify-content-end">
                <Button size="small" icon="pi pi-save" label="Save" loading={loading.addHousehold} onClick={onSave} />
            </div>
        </Sidebar>
    )
}

export default AddHousehold;