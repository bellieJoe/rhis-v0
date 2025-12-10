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
import ValidationError from "./forms/ValidationError";
import { setErrors } from "@/features/errorSlice";
import { reloadHouseholds } from "@/features/householdSlice";
import { AutoComplete } from "primereact/autocomplete";
import { getBarangays } from "@/api/addressApi";
import { addHead } from "@/features/forms/addHouseholdProfileSlice";
import { formatDate } from "@/utils/helpers";
import Required from "./forms/RequiredIndicator";
import { getSitios } from "@/api/sitioApi";

interface AddHouseholdProfileProps {
    visible: boolean,
    onHide: () => void
}

const AddHousehold = ({ visible, onHide }: AddHouseholdProfileProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        addHousehold : false
    });
    const authStore = useSelector((state: any) => state.auth);
    const [barangays, setBarangays] = useState([]);
    const onSave = async () => {
        console.log(form);
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
                date_of_visit : formatDate(form.date_of_visit ),
                household : household.household
            }));
            dispatch(reloadHouseholds());
            setForm(initialState);
        }
    }
    const initialState = {
        "barangay" : "",
        "sitio" : null,
        "barangay_name" : "",
        'date_of_visit' : "",
        "household_no" : ""
    }
    const [form, setForm] = useState(initialState);
    const [sitios, setSitios] = useState<any[]>([]);
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
    useEffect(() => {
        (async () => {
            const _sitios = await getSitios(dispatch, { barangay : form.barangay, paginate : false });
            setSitios(_sitios);
        })();
    }, [form.barangay]);

    useEffect(() => {
        console.log("User changed", authStore.user);
        if(authStore.user?.bhw_designations[0]) {    
            setForm({...form, barangay_name : authStore.user?.bhw_designations[0].barangay?.full_address, barangay : authStore.user?.bhw_designations[0].barangay_id});
        }
    }, [authStore.user]);

    return (
        <Sidebar 
            title="Add Household" 
            header={<h5 className="mb-0">Add Household</h5>} 
            onHide={onHide} 
            visible={visible} 
            position="right" 
            style={{ width: '100vw', maxWidth: '500px'   }}>

            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="householdNo">Date of Visit <Required/></label>
                <Calendar 
                    value={form.date_of_visit ? new Date(form.date_of_visit) : ''}  
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    showIcon
                    maxDate={new Date()}
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
                <label htmlFor="address">Address <Required/></label>
                <InputText id="address" placeholder="eg. Dela Cruz Residence" value={form.barangay_name} readOnly  className="w-full" />
                {/* <AutoComplete   
                    dropdown
                    id="address" 
                    placeholder="Barangay, Municipality, Province" 
                    suggestions={barangays} 
                    value={form.barangay_name} 
                    field="label"
                    completeMethod={handleBarangayComplete}
                    onChange={handleBarangayChanged} 
                    onSelect={handleBarangaySelect}
                    readOnly
                    className="w-full" /> */}
                <ValidationError name="barangay" />
            </div>

            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="sitio">Sitio <Required/></label>
                <Dropdown   
                    id="sitio" 
                    placeholder="Select Sitio" 
                    value={form.sitio} 
                    onChange={(e) => setForm({...form, sitio : e.value})}
                    options={
                        sitios.filter((sitio: any) =>
                            authStore.user?.bhw_designations?.some(
                                (d: any) => d.sitio_id === sitio.id
                            )
                        )}
                    optionLabel="sitio_name"
                    optionValue="id"
                    className="w-full" />
                <ValidationError name="sitio" />
            </div>            
            <div className="flex justify-content-end">
                <Button size="small" icon="pi pi-save" label="Save" loading={loading.addHousehold} onClick={onSave} />
            </div>
        </Sidebar>
    )
}

export default AddHousehold;