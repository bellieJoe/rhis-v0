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

interface UpdateMaternalClientProps {
    visible: boolean,
    onHide: () => void
}

const UpdateMaternalClientForm = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { errors } = useSelector((state: any) => state.error);
    const { visible } = useSelector((state: any) => state.updateHouseholdProfile);
    const dispatch = useDispatch();
    const updateMaternalClientStore = useSelector((state: any) => state.updateMaternalClientRecord);
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
        updateMaternalClient : false
    });
    const updateSupplementField = (
        visitNumber: number,
        supplementType: string,
        field: string,
        value: any
        ) => {
        const index = form.maternal_supplements?.findIndex(
            (s: any) => s.visit_number === visitNumber && s.supplement_type === supplementType
        );
        if (index !== -1) {
            const updatedSupplements = [...form.maternal_supplements];
            updatedSupplements[index] = {
            ...updatedSupplements[index],
            [field]: value, // dynamic field update
            };

            setForm({
            ...form,
            maternal_supplements: updatedSupplements,
            });
        }
    };
    const getSupplementIndex = (
        visitNumber: number,
        supplementType: string
        ) => {
        const index = form.maternal_supplements?.findIndex(
            (s: any) => s.visit_number === visitNumber && s.supplement_type === supplementType
        );

        return index;
    };
    const getSupplementField = (
        visitNumber: number,
        supplementType: string,
        field: string
        ) => {
        return (
            form.maternal_supplements?.find(
            (s: any) => s.visit_number === visitNumber && s.supplement_type === supplementType
            )?.[field] || null
        );
    };
    const updateInfectiousDiseaseField = (
        disease: string,
        field: string,
        value: any
        ) => {
        const index = form.maternal_infectious_diseases?.findIndex(
            (s: any) => s.disease === disease
        );
        if (index !== -1) {
            const updatedInfectiousDiseases = [...form.maternal_infectious_diseases];
            updatedInfectiousDiseases[index] = {
            ...updatedInfectiousDiseases[index],
            [field]: value, // dynamic field update
            };

            setForm({
            ...form,
            maternal_infectious_diseases: updatedInfectiousDiseases,
            });
        }
    };
    const getInfectiousDiseaseIndex = (
        disease: string
        ) => {
        const index = form.maternal_infectious_diseases?.findIndex(
            (s: any) => s.disease === disease
        );

        return index;
    };
    const getInfectiousDiseaseField = (
        disease: string,
        field: string
        ) => {
        return (
            form.maternal_infectious_diseases?.find(
            (s: any) => s.disease === disease
            )?.[field] || null
        );
    };
    useEffect(() => {
        setForm(denormalizeDatesFromMySQL(updateMaternalClientStore.maternal_client));
    }, [updateMaternalClientStore.maternal_client?.id]);
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
        setLoading({ ...loading, updateMaternalClient : true });
        const success = await updateMaternalClient(dispatch, { ...params });
        // setHouseholdItems(households.data?.map((household: any) => ({ label: `${household.name} - ${household.household_no}`, value: household.id })));
        setLoading({ ...loading, updateMaternalClient : false });
        if(success) {
            dispatch(maternalClientUpdated());
            onHide();
        }
    }
    
    const onHide = () => {
        dispatch(hideUpdateMaternalForm());
        setForm({});
        setActiveIndex(0);
    }

    return (
        <Sidebar 
        onHide={onHide} 
        visible={updateMaternalClientStore.visible} 
        position="right" 
        showCloseIcon={false}
        icons={() =>  (
            <Button icon="pi pi-times" size="large" severity="danger" text rounded  onClick={onHide} />
        )}
        style={{ width: '100vw' }}
        header={<h5>Update Maternal Client Record</h5>}>
            <h4 className="text-center mb-4">{ updateMaternalClientStore.title }</h4>
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
                        <Chip label={`Name: ${updateMaternalClientStore.maternal_client?.fullname}`} />
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
                                        value={form.family_serial_no}
                                        onChange={(e) => setForm({...form, family_serial_no : e.target.value})} />
                                    <ValidationError name="family_serial_no" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Last Menstrual Period <Required/></label>
                                    <Calendar
                                        className="w-full"
                                        value={form.lmp}
                                        onChange={(e) => setForm({...form, lmp : e.value})} />
                                    <ValidationError name="lmp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Gravida <Required/></label>
                                    <InputText
                                        type="number"
                                        className="w-full"
                                        value={form.gravida}
                                        onChange={(e) => setForm({...form, gravida : e.target.value})} />
                                    <ValidationError name="gravida" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Parity <Required/></label>
                                    <InputText
                                        type="number"
                                        className="w-full"
                                        value={form.parity}
                                        onChange={(e) => setForm({...form, parity : e.target.value})} />
                                    <ValidationError name="parity" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Estimated Date of Confinement <Required/></label>
                                    <Calendar
                                        className="w-full"
                                        value={form.edc}
                                        onChange={(e) => setForm({...form, edc : e.value})} />
                                    <ValidationError name="edc" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">There is an available facility 2 hours from the resident of the pregnant women? <Required/></label>
                                    <Dropdown
                                        options={yesNoOptions}
                                        optionLabel="label"
                                        optionValue="value"
                                        className="w-full"
                                        value={form.has_nearby_facility}
                                        onChange={(e) => setForm({...form, has_nearby_facility : e.value})} />
                                    <ValidationError name="has_nearby_facility" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Pregnancy with Hypertennsive Complication?</label>
                                    <Dropdown
                                        options={yesNoOptions}
                                        className="w-full"
                                        optionLabel="label"
                                        optionValue="value"
                                        value={form.is_hypertensive}
                                        onChange={(e) => setForm({...form, is_hypertensive : e.value})} />
                                    <ValidationError name="is_hypertensive" />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Estimated Date of Confinement <Required/></label>
                                    <Calendar
                                        className="w-full"
                                        value={form.edc}
                                        onChange={(e) => setForm({...form, edc : e.value})} />
                                    <ValidationError name="edc" />  
                                </div>
                                <h6>Dates of Pre-natal Check-ups</h6>
                                <div className="grid">
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st Tri </label>
                                        <Calendar
                                            className="w-full"
                                            value={form.first_tri_checkup_date	}
                                            onChange={(e) => setForm({...form, first_tri_checkup_date	 : e.value})} />
                                        <ValidationError name="first_tri_checkup_date	" />
                                    </div>
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd Tri</label>
                                        <Calendar
                                            className="w-full"
                                            value={form.second_tri_checkup_date	}
                                            onChange={(e) => setForm({...form, second_tri_checkup_date	 : e.value})} />
                                        <ValidationError name="second_tri_checkup_date	" />
                                    </div>
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd Tri</label>
                                        <Calendar
                                            className="w-full"
                                            value={form.third_tri_checkup_date_a	}
                                            onChange={(e) => setForm({...form, third_tri_checkup_date_a	 : e.value})} />
                                        <ValidationError name="third_tri_checkup_date_a" />
                                    </div>
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">&nbsp;</label>
                                        <Calendar
                                            className="w-full"
                                            value={form.third_tri_checkup_date_b}
                                            onChange={(e) => setForm({...form, third_tri_checkup_date_b : e.value})} />
                                        <ValidationError name="third_tri_checkup_date_b" />
                                    </div>
                                </div>
                                <hr />
                                <h6>Immunization Status</h6>
                                <p className="text-400">Date Tetanus diptheria (Td) or Tetanus Toxoid (TT) given</p>
                                <div className="grid">
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Td1/TT1 </label>
                                        <Calendar
                                            className="w-full"
                                            value={form.tt1_date	}
                                            onChange={(e) => setForm({...form, tt1_date	 : e.value})} />
                                        <ValidationError name="tt1_date" />
                                    </div>
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Td2/TT2 </label>
                                        <Calendar
                                            className="w-full"
                                            value={form.tt2_date	}
                                            onChange={(e) => setForm({...form, tt2_date	 : e.value})} />
                                        <ValidationError name="tt2_date" />
                                    </div>
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Td3/TT3 </label>
                                        <Calendar
                                            className="w-full"
                                            value={form.tt3_date	}
                                            onChange={(e) => setForm({...form, tt3_date	 : e.value})} />
                                        <ValidationError name="tt3_date" />
                                    </div>
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Td4/TT4 </label>
                                        <Calendar
                                            className="w-full"
                                            value={form.tt4_date	}
                                            onChange={(e) => setForm({...form, tt4_date	 : e.value})} />
                                        <ValidationError name="tt4_date" />
                                    </div>
                                    <div className="col-12 md:col-6 mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Td5/TT5 </label>
                                        <Calendar
                                            className="w-full"
                                            value={form.tt5_date	}
                                            onChange={(e) => setForm({...form, tt5_date	 : e.value})} />
                                        <ValidationError name="tt5_date" />
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div>
                                <div className="">
                                    <h6>Micronutrient Supplementation</h6>
                                    <div className="">
                                        <h6>Iron Sulfate with Folic Acid</h6>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st Visit </label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    placeholder="Date Given"
                                                    value={getSupplementField(1, 'IRON SULFATE', 'given_date')}
                                                    onChange={(e) => updateSupplementField(1, 'IRON SULFATE', 'given_date', e.value) }
                                                />
                                                <InputText
                                                    type="number"
                                                    placeholder="Amount Given"
                                                    value={getSupplementField(1, 'IRON SULFATE', 'amount')}
                                                    onChange={(e) => updateSupplementField(1, 'IRON SULFATE', 'amount', e.target.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(1, 'IRON SULFATE')}.amount`} />
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(1, 'IRON SULFATE')}.given_date`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd Visit </label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Date Given"
                                                    value={getSupplementField(2, 'IRON SULFATE', 'given_date')}
                                                    onChange={(e) => updateSupplementField(2, 'IRON SULFATE', 'given_date', e.value) }
                                                    />
                                                <InputText
                                                    type="number"
                                                    placeholder="Amount Given"
                                                    value={getSupplementField(2, 'IRON SULFATE', 'amount')}
                                                    onChange={(e) => updateSupplementField(2, 'IRON SULFATE', 'amount', e.target.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(2, 'IRON SULFATE')}.amount`} />
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(2, 'IRON SULFATE')}.given_date`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd Visit </label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Date Given"
                                                    value={getSupplementField(3, 'IRON SULFATE', 'given_date')}
                                                    onChange={(e) => updateSupplementField(3, 'IRON SULFATE', 'given_date', e.value) }
                                                    />
                                                <InputText
                                                    type="number"
                                                    placeholder="Amount Given"
                                                    value={getSupplementField(3, 'IRON SULFATE', 'amount')}
                                                    onChange={(e) => updateSupplementField(3, 'IRON SULFATE', 'amount', e.target.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(3, 'IRON SULFATE')}.amount`} />
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(3, 'IRON SULFATE')}.given_date`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">4th Visit </label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Date Given"
                                                    value={getSupplementField(4, 'IRON SULFATE', 'given_date')}
                                                    onChange={(e) => updateSupplementField(4, 'IRON SULFATE', 'given_date', e.value) }
                                                    />
                                                <InputText
                                                    type="number"
                                                    placeholder="Amount Given"
                                                    value={getSupplementField(4, 'IRON SULFATE', 'amount')}
                                                    onChange={(e) => updateSupplementField(4, 'IRON SULFATE', 'amount', e.target.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(4, 'IRON SULFATE')}.amount`} />
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(4, 'IRON SULFATE')}.given_date`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Date Completed </label>
                                            <Calendar
                                                className=""
                                                placeholder="Date Completed"
                                                value={form.iron_sulfate_date_completed	}
                                                onChange={(e) => setForm({...form, iron_sulfate_date_completed : e.value})}
                                                />
                                            <ValidationError name="iron_sulfate_date_completed" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="">
                                        <h6>Calcium Carbonate</h6>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">2nd Visit </label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Date Given"
                                                    value={getSupplementField(2, 'CALCIUM CARBONATE', 'given_date')}
                                                    onChange={(e) => updateSupplementField(2, 'CALCIUM CARBONATE', 'given_date', e.value) }
                                                    />
                                                <InputText
                                                    type="number"
                                                    placeholder="Amount Given"
                                                    value={getSupplementField(2, 'CALCIUM CARBONATE', 'amount')}
                                                    onChange={(e) => updateSupplementField(2, 'CALCIUM CARBONATE', 'amount', e.target.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(2, 'CALCIUM CARBONATE')}.amount`} />
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(2, 'CALCIUM CARBONATE')}.given_date`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">3rd Visit </label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Date Given"
                                                    value={getSupplementField(3, 'CALCIUM CARBONATE', 'given_date')}
                                                    onChange={(e) => updateSupplementField(3, 'CALCIUM CARBONATE', 'given_date', e.value) }
                                                    />
                                                <InputText
                                                    type="number"
                                                    placeholder="Amount Given"
                                                    value={getSupplementField(3, 'CALCIUM CARBONATE', 'amount')}
                                                    onChange={(e) => updateSupplementField(3, 'CALCIUM CARBONATE', 'amount', e.target.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(3, 'CALCIUM CARBONATE')}.amount`} />
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(3, 'CALCIUM CARBONATE')}.given_date`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">4th Visit </label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Date Given"
                                                    value={getSupplementField(4, 'CALCIUM CARBONATE', 'given_date')}
                                                    onChange={(e) => updateSupplementField(4, 'CALCIUM CARBONATE', 'given_date', e.value) }
                                                    />
                                                <InputText
                                                    type="number"
                                                    placeholder="Amount Given"
                                                    value={getSupplementField(4, 'CALCIUM CARBONATE', 'amount')}
                                                    onChange={(e) => updateSupplementField(4, 'CALCIUM CARBONATE', 'amount', e.target.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(4, 'CALCIUM CARBONATE')}.amount`} />
                                            <ValidationError name={`maternal_supplements.${getSupplementIndex(4, 'CALCIUM CARBONATE')}.given_date`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Date Completed </label>
                                            <Calendar
                                                className=""
                                                placeholder="Date Completed"
                                                value={form.calcium_carbonate_date_completed}
                                                onChange={(e) => setForm({...form, calcium_carbonate_date_completed : e.value})}
                                                />
                                            <ValidationError name="calcium_carbonate_date_completed" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="">
                                        <h6>Iodine Capsules</h6>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">1st Visit </label>
                                            <Calendar
                                                className=""
                                                placeholder="Date Given"
                                                value={form?.iodine_capsule_date_given}
                                                onChange={(e) => {setForm({...form, iodine_capsule_date_given : e.value})}}
                                                />
                                            <ValidationError name="iodine_capsule_date_given" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="">
                                        <h6>Nutritional Assessment</h6>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">BMI</label>
                                            <InputText
                                                type="number"
                                                className="w-full"
                                                placeholder="BMI"
                                                value={form?.first_tri_bmi}
                                                onChange={(e) => {setForm({...form, first_tri_bmi : e.target.value})}}
                                                />
                                            <ValidationError name="first_tri_bmi" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Deworming Tablet Date Given</label>
                                        <Calendar
                                            className="w-full"
                                            placeholder="Date Given"
                                            value={form?.deworming_tablet_date_given}
                                            onChange={(e) => {setForm({...form, deworming_tablet_date_given: e.value})}}
                                            />
                                        <ValidationError name="deworming_tablet_date_given" />
                                    </div>
                                    <hr />
                                    <div className="">
                                        <h6>Infectious Disease Surveillance</h6>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Syphylis Screening</label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Diagnosis Date"
                                                    value={getInfectiousDiseaseField('SYPHILIS', 'diagnosis_date')}
                                                    onChange={(e) => updateInfectiousDiseaseField('SYPHILIS', 'diagnosis_date', e.value) }
                                                    />
                                                <Dropdown
                                                    options={yesNoOptions}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                    placeholder="Is Positive?"
                                                    value={getInfectiousDiseaseField('SYPHILIS', 'is_positive')}
                                                    onChange={(e) => updateInfectiousDiseaseField('SYPHILIS', 'is_positive', e.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_infectious_diseases.${getInfectiousDiseaseIndex('SYPHILIS')}.diagnosis_date`} />
                                            <ValidationError name={`maternal_infectious_diseases.${getInfectiousDiseaseIndex('SYPHILIS')}.is_positive`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Hepatitis B Screening</label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Diagnosis Date"
                                                    value={getInfectiousDiseaseField('HEPATITIS B', 'diagnosis_date')}
                                                    onChange={(e) => updateInfectiousDiseaseField('HEPATITIS B', 'diagnosis_date', e.value) }
                                                    />
                                                <Dropdown
                                                    options={yesNoOptions}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                    placeholder="Is Positive?"
                                                    value={getInfectiousDiseaseField('HEPATITIS B', 'is_positive')}
                                                    onChange={(e) => updateInfectiousDiseaseField('HEPATITIS B', 'is_positive', e.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_infectious_diseases.${getInfectiousDiseaseIndex('HEPATITIS B')}.diagnosis_date`} />
                                            <ValidationError name={`maternal_infectious_diseases.${getInfectiousDiseaseIndex('HEPATITIS B')}.is_positive`} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">HIV Screening</label>
                                            <div className="flex gap-1">
                                                <Calendar
                                                    className=""
                                                    placeholder="Diagnosis Date"
                                                    value={getInfectiousDiseaseField('HIV', 'diagnosis_date')}
                                                    onChange={(e) => updateInfectiousDiseaseField('HIV', 'diagnosis_date', e.value) }
                                                    />
                                                <Dropdown
                                                    options={yesNoOptions}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                    placeholder="Is Positive?"
                                                    value={getInfectiousDiseaseField('HIV', 'is_positive')}
                                                    onChange={(e) => updateInfectiousDiseaseField('HIV', 'is_positive', e.value) }
                                                    />
                                            </div>
                                            <ValidationError name={`maternal_infectious_diseases.${getInfectiousDiseaseIndex('HIV')}.diagnosis_date`} />
                                            <ValidationError name={`maternal_infectious_diseases.${getInfectiousDiseaseIndex('HIV')}.is_positive`} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="">
                                        <h6>Laboratory Screening</h6>
                                        <div className="grid">
                                            <div className="mb-3 col-6">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Gestational Diabetes</label>
                                                <Calendar
                                                    className="w-full"
                                                    placeholder="Date Given"
                                                    value={form?.gestational_diabetes_screening_date}
                                                    onChange={(e) => {setForm({...form, gestational_diabetes_screening_date: e.value})}}
                                                    />
                                                <ValidationError name="gestational_diabetes_screening_date" />
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Is Positive?</label>
                                                <Dropdown
                                                    options={yesNoOptions}
                                                    optionLabel="label"
                                                    className="w-full"
                                                    placeholder="Result"
                                                    value={form?.is_gestational_diabetes_positive}
                                                    onChange={(e) => {setForm({...form, is_gestational_diabetes_positive: e.value})}}
                                                    />
                                                <ValidationError name="is_gestational_diabetes_positive" />
                                            </div>
                                        </div>
                                        <div className="grid">
                                            <div className="mb-3 col-6">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">CBC/Hdb&Hct Count</label>
                                                <Calendar
                                                    className="w-full"
                                                    placeholder="Date Screened"
                                                    value={form?.cbc_date}
                                                    onChange={(e) => {setForm({...form, cbc_date: e.value})}}
                                                    />
                                                <ValidationError name="cbc_date" />
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Is Positive?</label>
                                                <Dropdown
                                                    options={yesNoOptions}
                                                    optionLabel="label"
                                                    className="w-full"
                                                    placeholder="Result"
                                                    value={form?.has_anemia}
                                                    onChange={(e) => {setForm({...form, has_anemia: e.value})}}
                                                    />
                                                <ValidationError name="has_anemia" />
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Given Iron?</label>
                                                <Dropdown
                                                    options={yesNoOptions}
                                                    optionLabel="label"
                                                    className="w-full"
                                                    placeholder="Result"
                                                    value={form?.given_iron}
                                                    onChange={(e) => {setForm({...form, given_iron: e.value})}}
                                                    />
                                                <ValidationError name="given_iron" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Remarks</label>
                                        <InputTextarea
                                            className="w-full"
                                            placeholder="Remarks"
                                            value={form?.remarks}
                                            onChange={(e) => {setForm({...form, remarks: e.target.value})}}
                                            />
                                        <ValidationError name="remarks" />
                                    </div>
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

export default UpdateMaternalClientForm;