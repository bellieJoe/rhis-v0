import { getGenericTypes } from "@/api/genericTypeApi";
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
import { Chip } from "primereact/chip";
import Required from "./forms/RequiredIndicator";
import { InputTextarea } from "primereact/inputtextarea";
import moment from "moment";
import { updateFamilyPlanningClient } from "@/api/familyPlanningTargetApi";
import { familyPlanningClientUpdated, hideUpdateFamilyPlanningForm } from "@/features/forms/updateFamilyPlanningClientRecordSlice";
import { calculateAge } from "@/utils/helpers";

interface UpdateMaternalClientProps {
    visible: boolean,
    onHide: () => void
}

const UpdateFamilyPlanningClientForm = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { errors } = useSelector((state: any) => state.error);
    const { visible } = useSelector((state: any) => state.updateHouseholdProfile);
    const dispatch = useDispatch();
    const [genericOptions, setGenericOptions] = useState<any>([]);
    const genericTypeStore = useSelector((state: any) => state.genericType);
    const updateFamilyPlanningClientStore = useSelector((state: any) => state.updateFamilyPlanningClientRecord);
    const yesNoOptions = [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
    ];
    const [form, setForm] = useState<any>([]);
    const items : MenuItem[] = [
        { label: "Page 1/2", className: "mr-2" },
        { label: "Page 2/2", className: "mr-2"  },
    ];
    const [loading, setLoading] = useState({
        updateFamilyPlanningClient : false
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
        setForm(denormalizeDatesFromMySQL(updateFamilyPlanningClientStore.family_planning_client));
        _getGenericTypes();
    }, [updateFamilyPlanningClientStore.family_planning_client?.id]);
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
        setLoading({ ...loading, updateFamilyPlanningClient : true });
        const success = await updateFamilyPlanningClient(dispatch, { ...params });
        // setHouseholdItems(households.data?.map((household: any) => ({ label: `${household.name} - ${household.household_no}`, value: household.id })));
        setLoading({ ...loading, updateFamilyPlanningClient : false });
        if(success) {
            dispatch(familyPlanningClientUpdated());
            onHide();
        }
    }
    
    const onHide = () => {
        dispatch(hideUpdateFamilyPlanningForm());
        setForm({});
        setActiveIndex(0);
    }

    return (
        <Sidebar 
        onHide={onHide} 
        visible={updateFamilyPlanningClientStore.visible} 
        position="right" 
        showCloseIcon={false}
        icons={() =>  (
            <Button icon="pi pi-times" size="large" severity="danger" text rounded  onClick={onHide} />
        )}
        style={{ width: '100vw' }}
        header={<h5>Update Family Planning Client Record</h5>}>
            <h4 className="text-center mb-4">{ updateFamilyPlanningClientStore.title }</h4>
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
                        <Chip label={`Name: ${updateFamilyPlanningClientStore.family_planning_client?.complete_name}`} />
                        <Chip label={`Age: ${calculateAge(form.household_profile?.birthdate)}`} />
                        <Chip label={`Address: ${form.household_profile?.household?.barangay?.barangay_name}, ${form.household_profile?.household?.barangay?.municipality?.municipality_name}, ${form.household_profile?.household?.barangay?.municipality?.province?.province_name}`} />
                        <Chip label={`Date of Registration: ${moment(form.date_of_registration).format('MMM d, Y')}`} />
                    </div>
                    <div className="card mb-4">
                        {activeIndex === 0 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Family Serial No. </label>
                                    <InputText
                                        className="w-full"
                                        value={form.family_serial_no}
                                        onChange={(e) => setForm({...form, family_serial_no : e.target.value})} />
                                    <ValidationError name="family_serial_no" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Complete Address <Required/></label>
                                    <InputText
                                        type="text"
                                        className="w-full"
                                        value={form.complete_address}
                                        onChange={(e) => setForm({...form, complete_address: e.target.value})} />
                                    <ValidationError name="complete_address" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Type of Client </label>
                                    <Dropdown
                                        value={form.type_of_client}
                                        options={[
                                            {
                                                label: "Current User",
                                                value: "Current User"
                                            },
                                            {
                                                label: "New Acceptor",
                                                value: "New Acceptor"
                                            },
                                            {
                                                label: "Other Acceptors",
                                                value: "Other Acceptors"
                                            },
                                        ]}
                                        optionLabel="label"
                                        optionValue="value"
                                        className="w-full"
                                        onChange={(e) => setForm({...form, type_of_client: e.value})} />
                                    <ValidationError name="type_of_client" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Source </label>
                                    <Dropdown
                                        value={form.source}
                                        options={[
                                            {
                                                label: "Public",
                                                value: "Public"
                                            },
                                            {
                                                label: "Private",
                                                value: "Private"
                                            },
                                        ]}
                                        optionLabel="label"
                                        optionValue="value"
                                        className="w-full"
                                        onChange={(e) => setForm({...form, source: e.value})} />
                                    <ValidationError name="source" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Previous Method </label>
                                    <Dropdown
                                        value={form.previous_method}
                                        optionLabel="label"
                                        optionValue="value"
                                        options={genericTypeStore.genericTypes.filter((genericType : any) => genericType.type === "FAMILY_PLANNING_METHOD").map((genericType : any) => ({label: genericType.name, value: genericType.id}))}
                                        className="w-full"
                                        onChange={(e) => setForm({...form, previous_method: e.value})} />
                                    <ValidationError name="previous_method" />  
                                </div>
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div className="mb-3">
                                <h6>Follow Up Visits</h6>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Jan </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_jan}
                                        onChange={(e) => setForm({ ...form, ff_jan: e.value })}
                                        />
                                        <ValidationError name="ff_jan" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Feb </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_feb}
                                        onChange={(e) => setForm({ ...form, ff_feb: e.value })}
                                        />
                                        <ValidationError name="ff_feb" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Mar </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_mar}
                                        onChange={(e) => setForm({ ...form, ff_mar: e.value })}
                                        />
                                        <ValidationError name="ff_mar" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Apr </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_apr}
                                        onChange={(e) => setForm({ ...form, ff_apr: e.value })}
                                        />
                                        <ValidationError name="ff_apr" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">May </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_may}
                                        onChange={(e) => setForm({ ...form, ff_may: e.value })}
                                        />
                                        <ValidationError name="ff_may" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Jun </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_jun}
                                        onChange={(e) => setForm({ ...form, ff_jun: e.value })}
                                        />
                                        <ValidationError name="ff_jun" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Jul </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_jul}
                                        onChange={(e) => setForm({ ...form, ff_jul: e.value })}
                                        />
                                        <ValidationError name="ff_jul" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Aug </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_aug}
                                        onChange={(e) => setForm({ ...form, ff_aug: e.value })}
                                        />
                                        <ValidationError name="ff_aug" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Sep </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_sep}
                                        onChange={(e) => setForm({ ...form, ff_sep: e.value })}
                                        />
                                        <ValidationError name="ff_sep" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Oct </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_oct}
                                        onChange={(e) => setForm({ ...form, ff_oct: e.value })}
                                        />
                                        <ValidationError name="ff_oct" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Nov </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_nov}
                                        onChange={(e) => setForm({ ...form, ff_nov: e.value })}
                                        />
                                        <ValidationError name="ff_nov" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Dec </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.ff_dec}
                                        onChange={(e) => setForm({ ...form, ff_dec: e.value })}
                                        />
                                        <ValidationError name="ff_dec" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <hr />
                                    <h6>Drop-Out</h6>
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Date </label>
                                        <Calendar
                                        className="w-full"
                                        value={form.dr_date}
                                        onChange={(e) => setForm({ ...form, dr_date: e.value })}
                                        />
                                        <ValidationError name="dr_date" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Reason </label>
                                        <InputTextarea
                                            className="w-full"
                                            value={form.dr_reason}
                                            onChange={(e) => setForm({...form, dr_reason: e.target.value})} />
                                        <ValidationError name="dr_reason" />
                                    </div>
                                </div>
                                <hr />
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Remarks </label>
                                    <InputTextarea
                                        className="w-full"
                                        value={form.remarks}
                                        onChange={(e) => setForm({...form, remarks: e.target.value})} />
                                    <ValidationError name="remarks" />
                                </div>
                                <div className="flex justify-content-end">
                                    <Button label="Submit" icon="pi pi-check" className="p-button-success" onClick={handleSubmit} />
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </Sidebar>
    )
}

export default UpdateFamilyPlanningClientForm;