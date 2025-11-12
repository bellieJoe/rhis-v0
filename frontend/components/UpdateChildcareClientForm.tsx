import { getGenericTypes } from "@/api/genericTypeApi";
import { getHouseholds } from "@/api/householdApi";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { Steps } from "primereact/steps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValidationError from "./forms/ValidationError";
import { calculateAge, formatDate } from "@/utils/helpers";
import { storeHouseholdProfile, updateHouseholdProfile } from "@/api/householdProfileApi";
import { hideUpdateProfile } from "@/features/forms/updateHouseholdProfileSlice";
import { reloadHouseholdProfiles } from "@/features/householdProfileSlice";
import { setErrors } from "@/features/errorSlice";
import { Chip } from "primereact/chip";
import Required from "./forms/RequiredIndicator";
import { hideUpdateMaternalForm, maternalClientUpdated, updateMaternalClientRecord } from "@/features/forms/updateMaternalClientRecordSlice";
import { InputTextarea } from "primereact/inputtextarea";
import moment from "moment";
import { get } from "http";
import { updateMaternalClient } from "@/api/maternalCareApi";
import { updateChildcareClient } from "@/api/childCareApi";
import { childcareClientUpdated, hideUpdateChildcareForm } from "@/features/forms/updateChildcareClientRecordSlice";

interface UpdateMaternalClientProps {
    visible: boolean,
    onHide: () => void
}

const UpdateChildcareClientForm = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { errors } = useSelector((state: any) => state.error);
    const { visible } = useSelector((state: any) => state.updateHouseholdProfile);
    const dispatch = useDispatch();
    const [genericOptions, setGenericOptions] = useState<any>([]);
    const genericTypeStore = useSelector((state: any) => state.genericTypes);
    const updateChildcareClientStore = useSelector((state: any) => state.updateChildcareClientRecord);
    const yesNoOptions = [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
    ];
    const [form, setForm] = useState<any>([]);
    const items : MenuItem[] = [
        { label: "Basic Information", className: "mr-2" },
        { label: "New Born (0-28 days old)", className: "mr-2"  },
        { label: "1-3 months old", className: "mr-2"  },
        { label: "6-11 months old", className: "mr-2"  },
        { label: "12 months old", className: "mr-2"  },
        { label: "Others", className: "mr-2"  },
    ];
    const [loading, setLoading] = useState({
        updateChildcareClient : false
    });
    const nsaStatusOptions = [
        { label: 'S = stunted', value: 'S' },
        { label: 'W-MAM = waisted - MAM', value: 'W-MAM' },
        { label: 'W-SAM = waisted - SAM', value: 'W-SAM' },
        { label: 'O = obese', value: 'O' },
        { label: 'N = normal', value: 'N' },
    ];
    const _getGenericTypes = async () => {
        await getGenericTypes(dispatch);
    };
    useEffect(() => {
        setForm(denormalizeDatesFromMySQL(updateChildcareClientStore.childcare_client));
        _getGenericTypes
    }, [updateChildcareClientStore.childcare_client?.id]);
    const next = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
    };

    const prev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    /**
     * Recursively converts all Date objects in an object (or array) to MySQL-compatible date strings ("YYYY-MM-DD").
     * It handles deeply nested structures.
     */
    function normalizeDatesForMySQL(obj: any): any {
        if (obj === null || obj === undefined) return obj;

        // If it's a Date, convert to MySQL format
        if (obj instanceof Date) {
            const year = obj.getFullYear();
            const month = String(obj.getMonth() + 1).padStart(2, "0");
            const day = String(obj.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }

        // If it's an array, recursively normalize each element
        if (Array.isArray(obj)) {
            return obj.map((item) => normalizeDatesForMySQL(item));
        }

        // If it's an object, recursively normalize its properties
        if (typeof obj === "object") {
            const newObj: any = {};
            for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = normalizeDatesForMySQL(obj[key]);
            }
            }
            return newObj;
        }

        // If it's neither Date, array, nor object — return as is
        return obj;
    }

    function denormalizeDatesFromMySQL(obj: any): any {
        if (obj === null || obj === undefined) return obj;

        // Check if it's a valid MySQL-style date or datetime string
        if (typeof obj === "string") {
            // Match formats: YYYY-MM-DD or YYYY-MM-DD HH:mm:ss
            const mysqlDateRegex = /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2}:\d{2})?$/;

            if (mysqlDateRegex.test(obj)) {
                const date = new Date(obj);

                // Ensure it's a valid date before returning
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }
        }

        // If it's an array → process each element
        if (Array.isArray(obj)) {
            return obj.map((item) => denormalizeDatesFromMySQL(item));
        }

        // If it's an object → process each property
        if (typeof obj === "object") {
            const newObj: any = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    newObj[key] = denormalizeDatesFromMySQL(obj[key]);
                }
            }
            return newObj;
        }

        // Primitive (number, boolean, etc.) — return as is
        return obj;
    }

    const handleSubmit = async () => {
        const params = normalizeDatesForMySQL(form);
        console.log(params);
        setLoading({ ...loading, updateChildcareClient : true });
        const success = await updateChildcareClient(dispatch, { ...params });
        // setHouseholdItems(households.data?.map((household: any) => ({ label: `${household.name} - ${household.household_no}`, value: household.id })));
        setLoading({ ...loading, updateChildcareClient : false });
        if(success) {
            dispatch(childcareClientUpdated());
            onHide();
        }
    }
    
    const onHide = () => {
        dispatch(hideUpdateChildcareForm());
        setForm({});
        setActiveIndex(0);
    }

    return (
        <Sidebar 
        onHide={onHide} 
        visible={updateChildcareClientStore.visible} 
        position="right" 
        showCloseIcon={false}
        icons={() =>  (
            <Button icon="pi pi-times" size="large" severity="danger" text rounded  onClick={onHide} />
        )}
        style={{ width: '100vw' }}
        header={<h5>Update Childcare Client Record</h5>}>
            <h4 className="text-center mb-4">{ updateChildcareClientStore.title }</h4>
            <div className="grid justify-content-center m-0">
                <div className="col-12 sm:col-11 md:col-8 lg:col-6">
                    <div className="w-full overflow-x-scroll scrollbar-none " style={{ 'scrollbarWidth': 'none' }} >
                        <Steps className="mb-4" model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}     />
                    </div>
                    <div className="mb-4">
                        <div className="flex gap-3 justify-content-between">
                            <Button size="small" label="Previous" icon="pi pi-angle-left" onClick={prev} disabled={activeIndex === 0} />
                            <Button size="small" label="Next" icon="pi pi-angle-right" onClick={next} disabled={activeIndex === items.length - 1} />
                        </div>
                    </div>
                    <div className="flex  flex-wrap gap-1 mb-4">
                        <Chip label={`Name: ${updateChildcareClientStore.childcare_client?.fullname}`} />
                        <Chip label={`Age: ${calculateAge(form.household_profile?.birthdate)}`} />
                        <Chip label={`Address: ${form.household_profile?.household?.barangay?.barangay_name}, ${form.household_profile?.household?.barangay?.municipality?.municipality_name}, ${form.household_profile?.household?.barangay?.municipality?.province?.province_name}`} />
                        <Chip label={`Date of Registration: ${moment(form.date_of_registration).format('MMM d, Y')}`} />
                    </div>
                    <div className="card mb-4">
                        {activeIndex === 0 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Family Serial No. <Required/></label>
                                    <InputText
                                        className="w-full"
                                        value={form.family_serial_number}
                                        onChange={(e) => setForm({...form, family_serial_number : e.target.value})} />
                                    <ValidationError name="family_serial_number" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Name of Child <Required/></label>
                                    <InputText
                                        type="number"
                                        className="w-full"
                                        value={form.name_of_child}
                                        onChange={(e) => setForm({...form, name_of_child: e.target.value})} />
                                    <ValidationError name="name_of_child" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Sex <Required/></label>
                                    <Dropdown 
                                        showClear
                                        options={genericTypeStore.genericTypes.filter((x: any) => x.type === "GENDER")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.sex}
                                        onChange={(e) => setForm({...form, sex : e.value})} 
                                        placeholder="Select Gender" 
                                        style={{ width: '100%' }} />
                                    <ValidationError name="sex" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Complete Name of Mother <Required/></label>
                                    <InputText
                                        type="number"
                                        className="w-full"
                                        value={form.complete_name_of_mother}
                                        onChange={(e) => setForm({...form, complete_name_of_mother: e.target.value})} />
                                    <ValidationError name="complete_name_of_mother" />  
                                </div>
                                <div className="mb-3">
                                    <br />
                                    <h5>Child Protected at Birth</h5>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">TT1/Td2 given <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.cpab_a}
                                            onChange={(e) => setForm({...form, cpab_a: e.target.value})} />
                                        <ValidationError name="cpab_a" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">TT2/Td2-TT5/Td5 given <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.cpab_b}
                                            onChange={(e) => setForm({...form, cpab_b: e.target.value})} />
                                        <ValidationError name="cpab_b" />  
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div className="mb-3">
                                <h5>New Born (0-11 months old)</h5>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Length <Required/></label>
                                    <InputText
                                        type="number"
                                        className="w-full"
                                        value={form.length}
                                        onChange={(e) => setForm({...form, length: e.target.value})} />
                                    <ValidationError name="length" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Weight <Required/></label>
                                    <InputText
                                        type="number"
                                        className="w-full"
                                        value={form.weight}
                                        onChange={(e) => setForm({...form, weight: e.target.value})} />
                                    <ValidationError name="weight" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Initiated breastfeeding immediately after birth lasting for 90 minutes <Required/></label>
                                    <Calendar
                                        className="w-full"
                                        value={form.initial_breastfeeding_duration}
                                        onChange={(e) => setForm({...form, initial_breastfeeding_duration : e.value})} />
                                    <ValidationError name="initial_breastfeeding_duration" />  
                                </div>
                                <div className="mb-3">
                                    <hr />
                                    <h6>Immunization</h6>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">BCG <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.immunization_bcg}
                                            onChange={(e) => setForm({...form, immunization_bcg : e.value})} />
                                        <ValidationError name="immunization_bcg" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Hepa B-BD <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.immunization_hepa_b}
                                            onChange={(e) => setForm({...form, immunization_hepa_b : e.value})} />
                                        <ValidationError name="immunization_hepa_b" />  
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div className="mb-3">
                                <h5>1-3 Months Old)</h5>
                                <div className="mb-3">
                                    <h6>Nutritional Status Assessment</h6>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Age in Months <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.nsa_age_13}
                                            onChange={(e) => setForm({...form, nsa_age_13: e.target.value})} />
                                        <ValidationError name="nsa_age_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Length <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.nsa_length_13}
                                            onChange={(e) => setForm({...form, nsa_length_13: e.target.value})} />
                                        <ValidationError name="nsa_length_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Weight <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.nsa_weight_13}
                                            onChange={(e) => setForm({...form, nsa_weight_13: e.target.value})} />
                                        <ValidationError name="nsa_weight_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Status <Required/></label>
                                        <Dropdown
                                            options={nsaStatusOptions}
                                            optionLabel="label"
                                            optionValue="value"
                                            className="w-full"
                                            value={form.nsa_status_13}
                                            onChange={(e) => setForm({...form, nsa_status_13 : e.value})} />
                                        <ValidationError name="nsa_status_13" />  
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <hr />
                                    <h6>Low birth weight given iron</h6>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1 mos <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.lbwgi_1month_13}
                                            onChange={(e) => setForm({...form, lbwgi_1month_13 : e.value})} />
                                        <ValidationError name="lbwgi_1month_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2 mos <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.lbwgi_2month_13}
                                            onChange={(e) => setForm({...form, lbwgi_2month_13 : e.value})} />
                                        <ValidationError name="lbwgi_2month_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3 mos <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.lbwgi_3month_13}
                                            onChange={(e) => setForm({...form, lbwgi_3month_13 : e.value})} />
                                        <ValidationError name="lbwgi_3month_13" />  
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <hr />
                                    <h6>Immunization</h6>
                                    <p>DPT-Hi-B-HepB</p>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.dhh_1st_dose_13}
                                            onChange={(e) => setForm({...form, dhh_1st_dose_13 : e.value})} />
                                        <ValidationError name="dhh_1st_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd dose 2 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.dhh_2nd_dose_13}
                                            onChange={(e) => setForm({...form, dhh_2nd_dose_13 : e.value})} />
                                        <ValidationError name="dhh_2nd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd dose 3 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.dhh_3rd_dose_13}
                                            onChange={(e) => setForm({...form, dhh_3rd_dose_13 : e.value})} />
                                        <ValidationError name="dhh_3rd_dose_13" />  
                                    </div>
                                    <p>OPV</p>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.opv_1st_dose_13}
                                            onChange={(e) => setForm({...form, opv_1st_dose_13 : e.value})} />
                                        <ValidationError name="opv_1st_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd dose 2 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.opv_2nd_dose_13}
                                            onChange={(e) => setForm({...form, opv_2nd_dose_13 : e.value})} />
                                        <ValidationError name="opv_2nd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd dose 3 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.opv_3rd_dose_13}
                                            onChange={(e) => setForm({...form, opv_3rd_dose_13 : e.value})} />
                                        <ValidationError name="opv_3rd_dose_13" />  
                                    </div>
                                    <p>PCV</p>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.pcv_1st_dose_13}
                                            onChange={(e) => setForm({...form, pcv_1st_dose_13 : e.value})} />
                                        <ValidationError name="pcv_1st_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd dose 2 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.pcv_2nd_dose_13}
                                            onChange={(e) => setForm({...form, pcv_2nd_dose_13 : e.value})} />
                                        <ValidationError name="pcv_2nd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd dose 3 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.pcv_3rd_dose_13}
                                            onChange={(e) => setForm({...form, pcv_3rd_dose_13 : e.value})} />
                                        <ValidationError name="pcv_3rd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">IPV 1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.ipv_1st_dose_13}
                                            onChange={(e) => setForm({...form, ipv_1st_dose_13 : e.value})} />
                                        <ValidationError name="ipv_1st_dose_13" />  
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeIndex === 3 && (
                            <div className="mb-3">
                                <h5>6-11 Months Old</h5>
                                <div className="mb-3">
                                    <h6>Nutritional Status Assessment</h6>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Age in Months <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.nsa_age_611}
                                            onChange={(e) => setForm({...form, nsa_age_611: e.target.value})} />
                                        <ValidationError name="nsa_age_611" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Length <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.nsa_length_611}
                                            onChange={(e) => setForm({...form, nsa_length_611: e.target.value})} />
                                        <ValidationError name="nsa_length_611" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Weight <Required/></label>
                                        <InputText
                                            type="number"
                                            className="w-full"
                                            value={form.nsa_weight_611}
                                            onChange={(e) => setForm({...form, nsa_weight_611: e.target.value})} />
                                        <ValidationError name="nsa_weight_611" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Status <Required/></label>
                                        <Dropdown
                                            options={nsaStatusOptions}
                                            optionLabel="label"
                                            optionValue="value"
                                            className="w-full"
                                            value={form.nsa_status_611}
                                            onChange={(e) => setForm({...form, nsa_status_611 : e.value})} />
                                        <ValidationError name="nsa_status_611" />  
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Exclusively breastfeed fir up to 5 months and 23 days  <Required/></label>
                                    <Calendar
                                        className="w-full"
                                        value={form.eb_611}
                                        onChange={(e) => setForm({...form, eb_611 : e.value})} />
                                    <ValidationError name="eb_611" />  
                                </div>
                                <div className="mb-3">
                                    <hr />
                                    <h6>Low birth weight given iron</h6>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1 mos <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.lbwgi_1month_13}
                                            onChange={(e) => setForm({...form, lbwgi_1month_13 : e.value})} />
                                        <ValidationError name="lbwgi_1month_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2 mos <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.lbwgi_2month_13}
                                            onChange={(e) => setForm({...form, lbwgi_2month_13 : e.value})} />
                                        <ValidationError name="lbwgi_2month_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3 mos <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.lbwgi_3month_13}
                                            onChange={(e) => setForm({...form, lbwgi_3month_13 : e.value})} />
                                        <ValidationError name="lbwgi_3month_13" />  
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <hr />
                                    <h6>Immunization</h6>
                                    <p>DPT-Hi-B-HepB</p>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.dhh_1st_dose_13}
                                            onChange={(e) => setForm({...form, dhh_1st_dose_13 : e.value})} />
                                        <ValidationError name="dhh_1st_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd dose 2 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.dhh_2nd_dose_13}
                                            onChange={(e) => setForm({...form, dhh_2nd_dose_13 : e.value})} />
                                        <ValidationError name="dhh_2nd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd dose 3 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.dhh_3rd_dose_13}
                                            onChange={(e) => setForm({...form, dhh_3rd_dose_13 : e.value})} />
                                        <ValidationError name="dhh_3rd_dose_13" />  
                                    </div>
                                    <p>OPV</p>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.opv_1st_dose_13}
                                            onChange={(e) => setForm({...form, opv_1st_dose_13 : e.value})} />
                                        <ValidationError name="opv_1st_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd dose 2 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.opv_2nd_dose_13}
                                            onChange={(e) => setForm({...form, opv_2nd_dose_13 : e.value})} />
                                        <ValidationError name="opv_2nd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd dose 3 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.opv_3rd_dose_13}
                                            onChange={(e) => setForm({...form, opv_3rd_dose_13 : e.value})} />
                                        <ValidationError name="opv_3rd_dose_13" />  
                                    </div>
                                    <p>PCV</p>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.pcv_1st_dose_13}
                                            onChange={(e) => setForm({...form, pcv_1st_dose_13 : e.value})} />
                                        <ValidationError name="pcv_1st_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd dose 2 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.pcv_2nd_dose_13}
                                            onChange={(e) => setForm({...form, pcv_2nd_dose_13 : e.value})} />
                                        <ValidationError name="pcv_2nd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd dose 3 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.pcv_3rd_dose_13}
                                            onChange={(e) => setForm({...form, pcv_3rd_dose_13 : e.value})} />
                                        <ValidationError name="pcv_3rd_dose_13" />  
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">IPV 1st dose 1 1/2 months <Required/></label>
                                        <Calendar
                                            className="w-full"
                                            value={form.ipv_1st_dose_13}
                                            onChange={(e) => setForm({...form, ipv_1st_dose_13 : e.value})} />
                                        <ValidationError name="ipv_1st_dose_13" />  
                                    </div>
                                </div>
                                
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </Sidebar>
    )
}

export default UpdateChildcareClientForm;