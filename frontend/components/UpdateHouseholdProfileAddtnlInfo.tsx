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
import ValidationError from "./ValidationError";
import { calculateAge, convertTinyIntToBoolean, formatDate } from "@/utils/helpers";
import { hideUpdateProfile } from "@/features/updateHouseholdProfileSlice";
import { reloadHouseholdProfiles } from "@/features/householdProfileSlice";
import { updateHouseholdProfileAddtnlInfo } from "@/api/householdProfileApi";
import { hideUpdateProfileAdditnlInfo } from "@/features/updateHouseholdProfileAddtnlInfoSlice";
import { Checkbox } from "primereact/checkbox";

interface UpdateHouseholdProfileProps {
    visible: boolean,
    onHide: () => void
}

const UpdateHouseholdProfileAddtnlInfo = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { errors } = useSelector((state: any) => state.error);
    const { visible } = useSelector((state: any) => state.updateHouseholdProfileAddtnlInfo);
    const dispatch = useDispatch();
    const {genericTypes} = useSelector((state: any) => state.genericType);
    const { households } = useSelector((state: any) => state.household);
    const [householdItems , setHouseholdItems] = useState([]);
    const updateHouseholdProfileStore = useSelector((state: any) => state.updateHouseholdProfileAddtnlInfo);
    const initialForm : any = {
        household_profile_id : "",
        household_no : "",
        household_id : "",
        date_of_visit : "",
        lastname : "",
        firstname : "",
        middlename : "",
        birthdate : "",
        member_relationship_id: "",
        other_relation : "",
        gender_id : "",
        civil_status_id : "",
        educational_attainment_id : "",
        religion_id : "",
        other_religion : "",
        unit_id : "",
        enthnicity : "",
        fourps_member: false,
        fourps_household_no : "",
        philhealth_id : "",
        philheath_membership_type_id: "",
        philhealth_category_id: "",
        medical_history_id : "",
        other_medical_history: "",
        classification_by_age_hrg_id : "",
        is_pregnant : false,
        last_menstrual_period : "",
        is_using_fp_method : false,
        family_planning_method_id: "",
        family_planning_status_id : "",
        water_source_type_id : "",
        toilet_facility_type_id : "",
        hc_mhgap : false,
        hc_asthma: false,
        hc_cancer : false,
        hc_pwd : false,
        hc_stroke : false,
        hc_mass : false,
        hc_smoker: false,
        hc_alchohol_drinker : false,
    }
    const [form, setForm] = useState<any>(initialForm);
    const items : MenuItem[] = [
        { label: "Medical Details", className: "mr-2" },
        { label: "For Women of Reproductive Age", className: "mr-2" },
        { label: "Living and Health Condition", className: "mr-2" },
        { label: "Review", className: "mr-2"  },
    ];
    const [loading, setLoading] = useState({
        updateHouseholdProfile : false
    });

    useEffect(() => {
        (async()=>{
            await getGenericTypes(dispatch);
        })();
    }, []);

    useEffect(() => {
        setForm({
            ...initialForm,
            household_profile_id : updateHouseholdProfileStore.householdProfile.id,
            household_no : updateHouseholdProfileStore.householdProfile.household?.household_no,
            household_id : updateHouseholdProfileStore.householdProfile.household?.id,
            date_of_visit : updateHouseholdProfileStore.householdProfile.household?.date_of_visit,
            lastname : updateHouseholdProfileStore.householdProfile.updated_details?.lastname,
            firstname : updateHouseholdProfileStore.householdProfile.updated_details?.firstname,
            middlename : updateHouseholdProfileStore.householdProfile.updated_details?.middlename,
            birthdate : updateHouseholdProfileStore.householdProfile.birthdate,
            member_relationship_id: updateHouseholdProfileStore.householdProfile.updated_details?.member_relationship_id,
            other_relation : updateHouseholdProfileStore.householdProfile.updated_details?.other_relation,
            gender_id : updateHouseholdProfileStore.householdProfile.updated_details?.gender_id,
            civil_status_id : updateHouseholdProfileStore.householdProfile.updated_details?.civil_status_id,
            educational_attainment_id : updateHouseholdProfileStore.householdProfile.updated_details?.educational_attainment_id,
            religion_id : updateHouseholdProfileStore.householdProfile.updated_details?.religion_id,
            other_religion : updateHouseholdProfileStore.householdProfile.updated_details?.other_religion,

            enthnicity : updateHouseholdProfileStore.householdProfile.updated_details?.enthnicity,
            fourps_member: updateHouseholdProfileStore.householdProfile.updated_details?.fourps_member,
            fourps_household_no : updateHouseholdProfileStore.householdProfile.updated_details?.fourps_household_no,
            philhealth_id : updateHouseholdProfileStore.householdProfile.updated_details?.philhealth_id,
            philheath_membership_type_id: updateHouseholdProfileStore.householdProfile.updated_details?.philheath_membership_type_id,
            philhealth_category_id: updateHouseholdProfileStore.householdProfile.updated_details?.philhealth_category_id,
            medical_history_id : updateHouseholdProfileStore.householdProfile.updated_details?.medical_history_id,
            other_medical_history: updateHouseholdProfileStore.householdProfile.updated_details?.other_medical_history,
            classification_by_age_hrg_id : updateHouseholdProfileStore.householdProfile.updated_details?.classification_by_age_hrg_id,
            is_pregnant : updateHouseholdProfileStore.householdProfile.updated_details?.is_pregnant,
            last_menstrual_period : updateHouseholdProfileStore.householdProfile.updated_details?.last_menstrual_period,
            is_using_fp_method : convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.is_using_fp_method),
            family_planning_method_id: updateHouseholdProfileStore.householdProfile.updated_details?.family_planning_method_id,
            family_planning_status_id : updateHouseholdProfileStore.householdProfile.updated_details?.family_planning_status_id,
            water_source_type_id : updateHouseholdProfileStore.householdProfile.updated_details?.water_source_type_id,
            toilet_facility_type_id : updateHouseholdProfileStore.householdProfile.updated_details?.toilet_facility_type_id,
            hc_mhgap : convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_mhgap),
            hc_asthma: convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_asthma),
            hc_cancer : convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_cancer),
            hc_pwd : convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_pwd),
            hc_stroke : convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_stroke),
            hc_mass : convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_mass),
            hc_smoker: convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_smoker),
            hc_alchohol_drinker : convertTinyIntToBoolean(updateHouseholdProfileStore.householdProfile.updated_details?.hc_alchohol_drinker),
        });
    }, [updateHouseholdProfileStore.householdProfile]);


    const next = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
    };

    const prev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    const handleHouseholdUpdate = async () => {
        const params = { ...form };
        params.birthdate = formatDate(params.birthdate);
        params.last_menstrual_period = params.gender_id == "80" && params.is_pregnant ? formatDate(params.last_menstrual_period) : "";
        setLoading({ ...loading, updateHouseholdProfile : true });
        const success = await updateHouseholdProfileAddtnlInfo(dispatch, { ...params });
        setHouseholdItems(households.data?.map((household: any) => ({ label: `${household.name} - ${household.household_no}`, value: household.id })));
        setLoading({ ...loading, updateHouseholdProfile : false });
        if(success) {
            setForm(initialForm);
            dispatch(hideUpdateProfileAdditnlInfo());
            dispatch(reloadHouseholdProfiles());
            setActiveIndex(0);
        }
    }

    return (
        <Sidebar onHide={() => {
            dispatch(hideUpdateProfileAdditnlInfo());
            setForm(initialForm);
            setActiveIndex(0);
        }} 
        visible={visible} 
        position="right" 
        style={{ width: '100vw' }}>
            <h4 className="text-center mb-4">Update Household Profile Additional Information</h4>
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
                    <div className="card mb-4">


                        {activeIndex === 0 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Ethnicity</label>
                                    <Dropdown 
                                        showClear
                                        options={[
                                            {
                                                id: "IP",
                                                label: "IP"
                                            },
                                            {
                                                id: "Non-IP",
                                                label: "Non-IP"
                                            }
                                        ]} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.enthnicity}
                                        onChange={(e) => setForm({...form, enthnicity : e.value})} 
                                        placeholder="Select Ethnicity" 
                                        style={{ width: '100%' }} />
                                    <ValidationError name="enthnicity" />
                                </div> 
                                <div className="mb-3">
                                    <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                        <Checkbox  checked={form.fourps_member} onChange={(e) => setForm({...form, fourps_member : (e.checked || false)})} ></Checkbox>
                                        <div className="">
                                            <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Is 4P's Member?</p>
                                        </div>
                                    </div>
                                    {
                                        form.fourps_member && (
                                            <div className="mb-3">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">4Ps Household ID No.</label>
                                                <InputText 
                                                    type="text" 
                                                    style={{ width: '100%' }} 
                                                    value={form.fourps_household_no}
                                                    onChange={(e) => setForm({...form, fourps_household_no : e.target.value})}
                                                    placeholder="4ps Household ID" />
                                                <ValidationError name="fourps_household_no" />
                                            </div>
                                        )
                                    }
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Philhealth No.</label>
                                        <InputText 
                                            type="text" 
                                            style={{ width: '100%' }} 
                                            value={form.philhealth_id}
                                            onChange={(e) => setForm({...form, philhealth_id : e.target.value})}
                                            placeholder="Philhealth No" />
                                        <ValidationError name="philhealth_id" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Philhealth Membership Type</label>
                                        <Dropdown 
                                            showClear
                                            options={genericTypes.filter((x: any) => x.type === "PHILHEALTH_MEMBERSHIP")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={form.philheath_membership_type_id}
                                            onChange={(e) => setForm({...form, philheath_membership_type_id : e.value})} 
                                            placeholder="Select Philhealth Membership Type" 
                                            style={{ width: '100%' }} />
                                        <ValidationError name="philheath_membership_type_id" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Philhealth Category</label>
                                        <Dropdown 
                                            showClear
                                            options={genericTypes.filter((x: any) => x.type === "PHILHEALTH_CATEGORY")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            onChange={(e) => setForm({...form, philhealth_category_id : e.value})}
                                            value={form.philhealth_category_id} 
                                            placeholder="Select Philhealth Category" 
                                            style={{ width: '100%' }} />
                                        <ValidationError name="philhealth_category_id" />   
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Medical History</label>
                                        <Dropdown 
                                            showClear
                                            options={genericTypes.filter((x: any) => x.type === "MEDICAL_HISTORY")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            onChange={(e) => setForm({...form, medical_history_id : e.value})}
                                            value={form.medical_history_id} 
                                            placeholder="Select Medical History" 
                                            style={{ width: '100%' }} />
                                        <ValidationError name="medical_history_id" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Classification by Age/Health Risk Group</label>
                                        <Dropdown 
                                            showClear
                                            options={genericTypes.filter((x: any) => x.type === "CLASSIFICATION_BY_AHRG")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={form.classification_by_age_hrg_id}
                                            onChange={(e) => setForm({...form, classification_by_age_hrg_id : e.value})} 
                                            placeholder="Select Classification" 
                                            style={{ width: '100%' }} />
                                        <ValidationError name="classification_by_age_hrg_id" />
                                    </div>
                                    {
                                        form.gender_id == "80" && (
                                            <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                                <Checkbox  checked={form.is_pregnant} onChange={(e) => setForm({...form, is_pregnant : (e.checked || false)})} ></Checkbox>
                                                <div className="">
                                                    <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Is Pregnant?</p>
                                                </div>
                                                <ValidationError name="is_pregnant" />
                                            </div>
                                        )
                                    }
                                    {
                                        (form.gender_id == "80" && form.is_pregnant) ? (
                                            <div className="mb-3">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Last Menstrual Period</label>
                                                <Calendar 
                                                    value={form.last_menstrual_period ? new Date(form.last_menstrual_period) : new Date()}  
                                                    dateFormat="mm-dd-yy" 
                                                    placeholder="mm-dd-yyyy" 
                                                    mask="99/99/9999" 
                                                    onChange={(e) => setForm({...form, last_menstrual_period : (e.value ? e.value.toLocaleString() : form.last_menstrual_period) })}
                                                    className="w-full" />
                                                <ValidationError name="last_menstrual_period" />
                                            </div>
                                        ) : ''
                                    }
                                </div>
                            </div>
                        )}

                        {(activeIndex === 1 && form.gender_id == "80" && form.classification_by_age_hrg_id == "43") && (
                            <div className="">
                                <p className="text-italic"><i>For Women of reproductive age only.</i></p>
                                <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                    <Checkbox  checked={form.is_using_fp_method} onChange={(e) => setForm({...form, is_using_fp_method : (e.checked || false)})} ></Checkbox>
                                    <div className="">
                                        <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Using any Family Planning method?</p>
                                    </div>
                                    <ValidationError name="is_using_fp_method" />
                                </div>
                                
                                {
                                    form.is_using_fp_method && (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Family Planning Method Used</label>
                                                <Dropdown 
                                                    showClear
                                                    options={genericTypes.filter((x: any) => x.type === "FAMILY_PLANNING_METHOD")} 
                                                    optionLabel="label"
                                                    optionValue="id"
                                                    value={form.family_planning_method_id}
                                                    onChange={(e) => setForm({...form, family_planning_method_id : e.value})} 
                                                    placeholder="Select Family Planning Method" 
                                                    style={{ width: '100%' }} />
                                                <ValidationError name="family_planning_method_id" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Family Planning Status</label>
                                                <Dropdown 
                                                    showClear
                                                    options={genericTypes.filter((x: any) => x.type === "FAMILY_PLANNING_STATUS")} 
                                                    optionLabel="label"
                                                    optionValue="id"
                                                    value={form.family_planning_status_id}
                                                    onChange={(e) => setForm({...form, family_planning_status_id : e.value})} 
                                                    placeholder="Select Family Planning Status" 
                                                    style={{ width: '100%' }} />
                                                <ValidationError name="family_planning_status_id" />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        )}
                        { (activeIndex === 1 && (form.gender_id != "80" || form.classification_by_age_hrg_id != "43")) && (
                            <>
                                <p className="text-center"><i>This is not applicable for the selected age/health risk group and gender.</i></p>
                            </>
                        )}

                        {activeIndex === 2 && (
                            <div className="">
                                <div className="mb-3">
                                    <h6>Living Condition</h6>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Water Source Type</label>
                                        <Dropdown 
                                            showClear
                                            options={genericTypes.filter((x: any) => x.type === "WATER_SOURCE_TYPE")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={form.water_source_type_id} 
                                            onChange={(e) => setForm({...form, water_source_type_id : e.value})}
                                            placeholder="Select Water Source" 
                                            style={{ width: '100%' }} />
                                        <ValidationError name="water_source_type_id" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Toilet Facility Type</label>
                                        <Dropdown 
                                            showClear
                                            options={genericTypes.filter((x: any) => x.type === "TOILET_FACILITY_TYPE")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={form.toilet_facility_type_id} 
                                            onChange={(e) => setForm({...form, toilet_facility_type_id : e.value})}
                                            placeholder="Select Toilet Facility" 
                                            style={{ width: '100%' }} />
                                        <ValidationError name="toilet_facility_type_id" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Health Condition </h6>
                                    <span><i>(Put a check on the box)</i></span>
                                    <br /><br />
                                    <div className="">
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={form.hc_asthma} onChange={(e) => setForm({...form, hc_asthma : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Asthma (Hika)</p>
                                            </div>
                                            <ValidationError name="hc_asthma" />
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={form.hc_cancer} onChange={(e) => setForm({...form, hc_cancer : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Cancer</p>
                                            </div>
                                            <ValidationError name="hc_cancer" />
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={form.hc_pwd} onChange={(e) => setForm({...form, hc_pwd : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">PWD (May kapansanan)</p>
                                            </div>
                                            <ValidationError name="hc_pwd" />
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={form.hc_stroke} onChange={(e) => setForm({...form, hc_stroke : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Stroke</p>
                                            </div>
                                            <ValidationError name="hc_stroke" />
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox checked={form.hc_mass} onChange={(e) => setForm({...form, hc_mass : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Mass (Bukol)</p>
                                            </div>
                                            <ValidationError name="hc_mass" />
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox checked={form.hc_mhgap} onChange={(e) => setForm({...form, hc_mhgap : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">MHGAP</p>
                                            </div>
                                            <ValidationError name="hc_mhgap" />
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={form.hc_smoker} onChange={(e) => setForm({...form, hc_smoker : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Smoker</p>
                                            </div>
                                            <ValidationError name="hc_smoker" />
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={form.hc_alchohol_drinker} onChange={(e) => setForm({...form, hc_alchohol_drinker : e.checked || false})} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Alchohol Drinker</p>
                                            </div>
                                            <ValidationError name="hc_alchohol_drinker" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeIndex === 3 && (
                            <>
                                <div className="flex justify-content-end">
                                    <Button label="Submit Profile" icon="pi pi-check" className="p-button-success" loading={loading.updateHouseholdProfile} onClick={handleHouseholdUpdate}  />
                                </div>
                                <h5 className="text-center font-bold  mb-2">Household Profiling Form Data</h5>
                                <p className="text-center"><i>Please review the information below before submitting the Household Profiling Form</i></p>
                                <br />
                                <br />
                                <div className="flex flex-column gap-2">
                                    {/* <div className="flex gap-2">
                                        <p className="font-bold">Household No:</p>
                                        <p>{form.household_no}</p>
                                        <ValidationError name="household_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Relationship to the head:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.member_relationship_id)?.name }</p>
                                        <ValidationError name="member_relationship_id" />
                                    </div>
                                    {
                                        form.member_relationship_id == "5" && (
                                            <div className="flex gap-2">
                                                <p className="font-bold">Other Relationship:</p>
                                                <p>{ form.other_relation }</p>
                                                <ValidationError name="other_relation" />
                                            </div>
                                        )
                                    }
                                    <div className="flex gap-2">
                                        <p className="font-bold">Fullname:</p>
                                        <p>{ `${form.firstname} ${form.middlename} ${form.lastname}` }</p>
                                        <ValidationError name="firstname" />
                                        <ValidationError name="middlename" />
                                        <ValidationError name="lastname" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Birthdate:</p>
                                        <p>{ (new Date(form.birthdate)).toDateString() }</p>
                                        <ValidationError name="birthdate" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Age:</p>
                                        <p>{ calculateAge(form.birthdate) }</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <p className="font-bold">Sex:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.gender_id)?.name }</p>
                                        <ValidationError name="gender_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Civil Status:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.civil_status_id)?.name }</p>
                                        <ValidationError name="civil_status_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Civil Status:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.civil_status_id)?.name }</p>
                                        <ValidationError name="civil_status_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Educational Attainment:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.educational_attainment_id)?.name }</p>
                                        <ValidationError name="educational_attainment_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Religion:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.religion_id)?.name }</p>
                                        <ValidationError name="religion_id" />
                                    </div> */}
                                    <div className="flex gap-2">
                                        <p className="font-bold">Ethnicity:</p>
                                        <p>{ form.enthnicity }</p>
                                        <ValidationError name="enthnicity" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">4Ps Member?</p>
                                        <p>{form.fourps_member ? 'Yes' : 'No'}</p>
                                        <ValidationError name="fourps_member" />
                                    </div>
                                    {
                                        form.fourps_member && (
                                            <div className="flex gap-2">
                                                <p className="font-bold">4Ps Household ID No.:</p>
                                                <p>{form.fourps_household_no ? 'Yes' : 'No'}</p>
                                                <ValidationError name="fourps_household_no" />
                                            </div>
                                        )
                                    }
                                    <div className="flex gap-2">
                                        <p className="font-bold">Philhealth ID no.:</p>
                                        <p>{ form.philhealth_id }</p>
                                        <ValidationError name="philhealth_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Philhealth Membership Type:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.philheath_membership_type_id)?.name }</p>
                                        <ValidationError name="philheath_membership_type_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Philhealth Category:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.philhealth_category_id)?.name }</p>
                                        <ValidationError name="philhealth_category_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Medical History:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.medical_history_id)?.name }</p>
                                        <ValidationError name="medical_history_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Classification by Age/Health Risk Group:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.classification_by_age_hrg_id)?.name }</p>
                                        <ValidationError name="classification_by_age_hrg_id" />
                                    </div>
                                    {
                                        form.gender_id == "80" && (
                                            <div className="flex gap-2">
                                                <p className="font-bold">Is Pregnant:</p>
                                                <p>{ form.is_pregnant ? 'Yes' : 'No' }</p>
                                                <ValidationError name="is_pregnant" />
                                            </div>
                                        )
                                    }
                                    {
                                        (form.gender_id == "80" && form.is_pregnant) ? (
                                            <div className="flex gap-2">
                                                <p className="font-bold">Last Menstrual Period:</p>
                                                <p>{ (new Date(form.last_menstrual_period)).toDateString() }</p>
                                                <ValidationError name="last_menstrual_period" />
                                            </div>
                                        ) : ''
                                    }
                                    {(form.gender_id == 80 && form.classification_by_age_hrg_id == 43) ? (
                                        <>
                                            <div className="flex gap-2">
                                                <p className="font-bold">Is using any Family Planning method?</p>
                                                <p>{form.is_using_fp_method ? 'Yes' : 'No'}</p>
                                                <ValidationError name="is_using_fp_method" />
                                            </div>
                                            {
                                                form.is_using_fp_method && (
                                                    <>
                                                        <div className="flex gap-2">
                                                            <p className="font-bold">Family Planning Method:</p>
                                                            <p>{ genericTypes.find((g: any) => g.id === form.family_planning_method_id)?.name }</p>
                                                            <ValidationError name="family_planning_method_id" />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <p className="font-bold">Family Planning Status:</p>
                                                            <p>{ genericTypes.find((g: any) => g.id === form.family_planning_status_id)?.name }</p>
                                                            <ValidationError name="family_planning_status_id" />
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </>
                                    ) : ''}

                                    <div className="flex gap-2">
                                        <p className="font-bold">Type of Water Source:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.water_source_type_id)?.name }</p>
                                        <ValidationError name="water_source_type_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Type of Toilet Facility:</p>
                                        <p>{ genericTypes.find((g : any) => g.id === form.toilet_facility_type_id)?.name }</p>
                                        <ValidationError name="toilet_facility_type_id" />
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <p className="font-bold">Asthma:</p>
                                        <p>{form.hc_asthma ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_asthma" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Cancer:</p>
                                        <p>{form.hc_cancer ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_cancer" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">PWD (May Kapansanan):</p>
                                        <p>{form.hc_pwd ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_pwd" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Stroke:</p>
                                        <p>{form.hc_stroke ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_stroke" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">MASS (Bukol):</p>
                                        <p>{form.hc_mass ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_mass" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">MHGAP:</p>
                                        <p>{form.hc_mhgap ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_mhgap" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Smoker:</p>
                                        <p>{form.hc_smoker ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_smoker" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Alchohol Drinker:</p>
                                        <p>{form.hc_alchohol_drinker ? 'Yes' : 'No'}</p>
                                        <ValidationError name="hc_alchohol_drinker" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    
                </div>
            </div>
        </Sidebar>
    )
}

export default UpdateHouseholdProfileAddtnlInfo;