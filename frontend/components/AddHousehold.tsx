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
import { emit } from "process";
import { AutoComplete } from "primereact/autocomplete";
import { getBarangays } from "@/api/addressApi";
import { addHead } from "@/features/addHouseholdProfileSlice";
import { formatDate } from "@/utils/helpers";

interface AddHouseholdProfileProps {
    visible: boolean,
    onHide: () => void
}

const AddHousehold = ({ visible, onHide }: AddHouseholdProfileProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        addHousehold : false
    });
    const [barangays, setBarangays] = useState([]);
    const onSave = async () => {
        dispatch(setErrors({}));
        setLoading({
            ...loading,
            addHousehold : true
        });
        const household = await storeHousehold(dispatch, {
            ...form,
            date_of_visit : formatDate(form.date_of_visit)
        });
        setLoading({
            ...loading,
            addHousehold : false
        });
        if(household.household) {
            onHide();
            dispatch(addHead({ 
                householdNo : household.household.household_no, 
                householdId : household.household.id,
                date_of_visit : formatDate(form.date_of_visit )
            }));
            dispatch(reloadHouseholds());
            setForm({
                "barangay" : "",
                "barangay_name" : "",
                'date_of_visit' : "",
                "household_no" : "",
            });
        }
    }
    
    const [form, setForm] = useState({
        "barangay" : "",
        "barangay_name" : "",
        'date_of_visit' : "",
        "household_no" : ""
    });

    const handleBarangayChanged = async (e: any) => {
        setForm({...form, barangay_name : e.value});
    }

    const handleBarangaySelect = (e: any) => {
        console.log(e.value.value);
        setForm({...form, barangay_name : e.value.label, barangay : e.value.value});
    }

    const handleBarangayComplete = async (e: any) => {
        const barangaysResult = await getBarangays(dispatch, { search : e.query });
        console.log(barangaysResult)
        setBarangays(e.query ? barangaysResult?.map((barangay: any) => ({ label: barangay.full_address, value: barangay.id })) : []);
    }

    // useEffect(() => {
    //     (async () => {
    //         const response = await getBarangays(dispatch);
    //         setBarangays(response.map((barangay : any) => ({ label : barangay.full_address, value : barangay.id })));
    //     })();
    // }, []);

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
                <InputText 
                    id="householdNo" 
                    placeholder="YYYYMM-00000" 
                    value={form.household_no} 
                    onChange={(e) => setForm({...form, household_no : e.target.value})} 
                    onBeforeInput={(e) => {
                        if (!/^[0-9-]+$/.test(e.data)) {
                        e.preventDefault();
                        }
                    }}
                    className="w-full" />
                <ValidationError name="household_no" />
            </div>

            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="householdNo">Date of Visit</label>
                <Calendar 
                    value={form.date_of_visit ? new Date(form.date_of_visit) : ''}  
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    onChange={(e) => setForm({...form, date_of_visit : (e.value ? e.value.toLocaleString() : form.date_of_visit) })}
                    className="w-full" />
                <ValidationError name="date_of_visit" />
            </div>
            
            

            {/* <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="householdName">Household Name</label>
                <InputText id="householdName" placeholder="eg. Dela Cruz Residence" value={form.household_name} onChange={(e) => setForm({...form, household_name : e.target.value})} className="w-full" />
                <ValidationError name="household_name" />
            </div> */}

            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="address">Address </label>
                <AutoComplete   
                    dropdown
                    id="address" 
                    placeholder="Barangay, Municipality, Province" 
                    suggestions={barangays} 
                    value={form.barangay_name} 
                    field="label"
                    completeMethod={handleBarangayComplete}
                    onChange={handleBarangayChanged} 
                    onSelect={handleBarangaySelect}
                    className="w-full" />
                <ValidationError name="barangay" />
            </div>
            <div className="flex justify-content-end">
                <Button size="small" icon="pi pi-save" label="Save" loading={loading.addHousehold} onClick={onSave} />
            </div>
        </Sidebar>
    )
}

export default AddHousehold;