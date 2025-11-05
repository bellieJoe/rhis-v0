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
import { hideUpdateMaternalForm } from "@/features/forms/updateMaternalClientRecord";

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
    const initialForm : any = {
        id : updateMaternalClientStore.maternal_client?.id ? updateMaternalClientStore.maternal_client?.id : null,
        family_serial_no : updateMaternalClientStore.maternal_client?.family_serial_no ? updateMaternalClientStore.maternal_client?.family_serial_no : null,
        lmp : updateMaternalClientStore.maternal_client?.lmp ? updateMaternalClientStore.maternal_client?.lmp : null,
        gravida : updateMaternalClientStore.maternal_client?.gravida ? updateMaternalClientStore.maternal_client?.gravida : null,
        parity : updateMaternalClientStore.maternal_client?.parity ? updateMaternalClientStore.maternal_client?.parity : null,
        edc : updateMaternalClientStore.maternal_client?.edc ? updateMaternalClientStore.maternal_client?.edc : null,
        has_nearby_facility : updateMaternalClientStore.maternal_client?.has_nearby_facility ? updateMaternalClientStore.maternal_client?.has_nearby_facility : null,
        is_hypertensive : updateMaternalClientStore.maternal_client?.is_hypertensive ? updateMaternalClientStore.maternal_client?.is_hypertensive : null,
        first_tri_checkup_date : updateMaternalClientStore.maternal_client?.first_tri_checkup_date ? updateMaternalClientStore.maternal_client?.first_tri_checkup_date : null,
        third_tri_checkup_date_a : updateMaternalClientStore.maternal_client?.third_tri_checkup_date_a ? updateMaternalClientStore.maternal_client?.third_tri_checkup_date_a : null,
        third_tri_checkup_date_b : updateMaternalClientStore.maternal_client?.third_tri_checkup_date_b ? updateMaternalClientStore.maternal_client?.third_tri_checkup_date_b : null,
        tt1_date : updateMaternalClientStore.maternal_client?.tt1_date ? updateMaternalClientStore.maternal_client?.tt1_date : null,
        tt2_date : updateMaternalClientStore.maternal_client?.tt2_date ? updateMaternalClientStore.maternal_client?.tt2_date : null,
        tt3_date : updateMaternalClientStore.maternal_client?.tt3_date ? updateMaternalClientStore.maternal_client?.tt3_date : null,
        tt4_date : updateMaternalClientStore.maternal_client?.tt4_date ? updateMaternalClientStore.maternal_client?.tt4_date : null,
        tt5_date : updateMaternalClientStore.maternal_client?.tt5_date ? updateMaternalClientStore.maternal_client?.tt5_date : null,
        iodine_capsule_date_given : updateMaternalClientStore.maternal_client?.iodine_capsule_date_given ? updateMaternalClientStore.maternal_client?.iodine_capsule_date_given : null,
        first_tri_bmi : updateMaternalClientStore.maternal_client?.first_tri_bmi ? updateMaternalClientStore.maternal_client?.first_tri_bmi : null,
        deworming_tablet_date_given : updateMaternalClientStore.maternal_client?.deworming_tablet_date_given ? updateMaternalClientStore.maternal_client?.deworming_tablet_date_given : null,
        gestational_diabetes_screening_date : updateMaternalClientStore.maternal_client?.gestational_diabetes_screening_date ? updateMaternalClientStore.maternal_client?.gestational_diabetes_screening_date : null,
        is_gestational_diabetes_positive : updateMaternalClientStore.maternal_client?.is_gestational_diabetes_positive ? updateMaternalClientStore.maternal_client?.is_gestational_diabetes_positive : null,
        cbc_date : updateMaternalClientStore.maternal_client?.cbc_date ? updateMaternalClientStore.maternal_client?.cbc_date : null,
        has_anemia : updateMaternalClientStore.maternal_client?.has_anemia ? updateMaternalClientStore.maternal_client?.has_anemia : null,
        given_iron : updateMaternalClientStore.maternal_client?.given_iron ? updateMaternalClientStore.maternal_client?.given_iron : null,
        remarks : updateMaternalClientStore.maternal_client?.remarks ? updateMaternalClientStore.maternal_client?.remarks : null,
        
    }
    const [form, setForm] = useState<any>(initialForm);
    const items : MenuItem[] = [
        { label: "Page 1/2", className: "mr-2" },
        { label: "Page 2/2", className: "mr-2"  },
        { label: "Review", className: "mr-2"  },
    ];
    const [loading, setLoading] = useState({
        updateMaternalClient : false
    });
    useEffect(() => {
        setForm({
            ...initialForm
        });
    }, [updateMaternalClientStore.maternal_client?.id]);


    const next = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
    };

    const prev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    const handleHouseholdUpdate = async () => {
        const params = { ...form };
        // params.birthdate = formatDate(params.birthdate);
        setLoading({ ...loading, updateMaternalClient : true });
        // const success = await updateHouseholdProfile(dispatch, { ...params });
        // setHouseholdItems(households.data?.map((household: any) => ({ label: `${household.name} - ${household.household_no}`, value: household.id })));
        setLoading({ ...loading, updateMaternalClient : false });
        // if(success) {
        //     setForm(initialForm);
        //     dispatch(hideUpdateProfile());
        //     dispatch(reloadHouseholdProfiles());
        //     setActiveIndex(0);
        // }
    }
    
    const onHide = () => {
        dispatch(hideUpdateMaternalForm());
        setForm(initialForm);
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
        style={{ width: '100vw' }}>
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
                        <Chip label={`Age: `} />
                        <Chip label={`Address: `} />
                    </div>
                    <div className="card mb-4">
                        {activeIndex === 0 && (
                            <div>

                                {/* <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Household No. <Required/></label>
                                    <AutoComplete 
                                        dropdown 
                                        placeholder="Household No." 
                                        onChange={handleHouseholdNoChanged}
                                        suggestions={householdItems}
                                        field="label"
                                        completeMethod={handleHouseholdComplete}
                                        value={form.household_no}
                                        disabled={true}
                                        onSelect={handleHouseholdSelect}
                                        className="w-full" />
                                    <ValidationError name="household_id" />
                                </div>
                                {
                                    updateHouseholdProfileStore.householdProfile.member_relationship_id == 1 && (
                                        <div className="mb-3">
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Relationship to Head <Required/></label>
                                            <Dropdown 
                                                showClear
                                                options={genericTypes.filter((x: any) => {
                                                    return x.type === "MEMBERS_OF_HOUSEHOLD";
                                                })} 
                                                optionLabel="label"
                                                optionValue="id"
                                                value={form.member_relationship_id} 
                                                disabled={true}
                                                placeholder="Select Relationship" 
                                                onChange={(e) => setForm({...form, member_relationship_id : e.value})}
                                                style={{ width: '100%' }} />
                                            <ValidationError name="member_relationship_id" />
                                        </div>
                                    )
                                }
                                {
                                    form.member_relationship_id == "5" && (
                                        <>
                                            <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Other Relationship <Required/></label>
                                            <InputText 
                                                type="text" 
                                                style={{ width: '100%' }} 
                                                placeholder="Other Relationship" 
                                                value={form.other_relation}
                                                onChange={(e) => setForm({...form, other_relation : e.target.value})} />
                                            <ValidationError name="other_relation" />
                                        </>
                                    )
                                } */}
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div>
                                {/* <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">First Name <Required/></label>
                                    <InputText 
                                        type="text" 
                                        style={{ width: '100%' }} 
                                        onChange={(e:any) => setForm({...form, firstname : e.target.value})}
                                        value={form.firstname}
                                        placeholder="First Name" />
                                    <ValidationError name="firstname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Middle Name <Required/></label>
                                    <InputText 
                                        type="text" 
                                        style={{ width: '100%' }} 
                                        value={form.middlename}
                                        onChange={(e:any) => setForm({...form, middlename : e.target.value})}
                                        placeholder="Middle Name" />
                                    <ValidationError name="middlename" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Last Name <Required/></label>
                                    <InputText 
                                        type="text" 
                                        style={{ width: '100%' }} 
                                        value={form.lastname}
                                        onChange={(e:any) => setForm({...form, lastname : e.target.value})}
                                        placeholder="Last Name" />
                                    <ValidationError name="lastname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Birthdate <Required/></label>
                                    <Calendar 
                                        value={form.birthdate ? new Date(form.birthdate) : ''} 
                                        dateFormat="mm-dd-yy" 
                                        placeholder="mm-dd-yyyy" 
                                        mask="99/99/9999" 
                                        maxDate={new Date()}
                                        showIcon
                                        onChange={(e) => setForm({...form, birthdate : (e.value ? e.value.toLocaleString() : form.birthdate) })}
                                        className="w-full" />
                                    <ValidationError name="birthdate" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Sex <Required/></label>
                                    <Dropdown 
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === "GENDER")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.gender_id}
                                        onChange={(e) => setForm({...form, gender_id : e.value})} 
                                        placeholder="Select Gender" 
                                        style={{ width: '100%' }} />
                                    <ValidationError name="gender_id" />
                                </div> */}
                                
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div>
                                {/* <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Civil Status <Required/></label>
                                    <Dropdown 
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === "CIVIL_STATUS")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        onChange={(e) => setForm({...form, civil_status_id : e.value})}
                                        value={form.civil_status_id} 
                                        placeholder="Select Civil Status" 
                                        style={{ width: '100%' }} />
                                    <ValidationError name="civil_status_id" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Educational Attainment <Required/></label>
                                    <Dropdown 
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === "EDUCATIONAL_ATTAINMENT")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.educational_attainment_id} 
                                        onChange={(e) => setForm({...form, educational_attainment_id : e.value})}
                                        placeholder="Select Educational Attainment" 
                                        style={{ width: '100%' }} />
                                    <ValidationError name="educational_attainment_id" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Religion <Required/></label>
                                    <Dropdown 
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === "RELIGION")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.religion_id}
                                        onChange={(e) => setForm({...form, religion_id : e.value})} 
                                        placeholder="Select Religion" 
                                        style={{ width: '100%' }} />
                                    <ValidationError name="religion_id" />
                                </div> */}
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </Sidebar>
    )
}

export default UpdateMaternalClientForm;