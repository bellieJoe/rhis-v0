import { getGenericTypes } from '@/api/genericTypeApi';
import { getHouseholds } from '@/api/householdApi';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Sidebar } from 'primereact/sidebar';
import { Steps } from 'primereact/steps';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ValidationError from './ValidationError';
import { calculateAge, formatDate } from '@/utils/helpers';
import { storeHouseholdProfile } from '@/api/householdProfileApi';
import { addMember, hide } from '@/features/addHouseholdProfileSlice';
import { reloadHouseholds } from '@/features/householdSlice';
import { setErrors } from '@/features/errorSlice';
import { Chip } from 'primereact/chip';
import Required from './RequiredIndicator';
import { confirmDialog } from 'primereact/confirmdialog';
import { rejects } from 'assert';

interface AddHouseholdProfileProps {
    visible: boolean;
    onHide: () => void;
}

const AddHouseholdProfile = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { errors } = useSelector((state: any) => state.error);
    const { visible } = useSelector((state: any) => state.addHouseholdProfile);
    const dispatch = useDispatch();
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const { households } = useSelector((state: any) => state.household);
    const [householdItems, setHouseholdItems] = useState([]);
    const addHouseholdProfileStore = useSelector((state: any) => state.addHouseholdProfile);
    const initialForm: any = {
        household: null,
        household_no: '',
        household_id: '',
        date_of_visit: '',
        lastname: '',
        firstname: '',
        middlename: '',
        birthdate: '',
        member_relationship_id: '',
        other_relation: '',
        gender_id: '',
        civil_status_id: '',
        educational_attainment_id: '',
        religion_id: '',
        other_religion: '',
        unit_id: '',
        enthnicity: '',
        fourps_member: false,
        fourps_household_no: '',
        philhealth_id: '',
        philheath_membership_type_id: '',
        philhealth_category_id: '',
        medical_history_id: '',
        other_medical_history: '',
        classification_by_age_hrg_id: '',
        last_menstrual_period: '',
        is_using_fp_method: false,
        family_planning_method_id: '',
        family_planning_status_id: '',
        water_source_type_id: '',
        toilet_facility_type_id: '',
        hc_mhgap: false,
        hc_asthma: false,
        hc_cancer: false,
        hc_pwd: false,
        hc_stroke: false,
        hc_mass: false,
        hc_smoker: false,
        hc_alchohol_drinker: false
    };
    const [form, setForm] = useState(initialForm);
    const items: MenuItem[] = [
        { label: 'Household Info', className: 'mr-2' },
        { label: 'Personal Info', className: 'mr-2' },
        { label: 'Other Info', className: 'mr-2' },
        // { label: "Medical Details", className: "mr-2" },
        // { label: "For Women of Reproductive Age", className: "mr-2" },
        // { label: "Living and Health Condition", className: "mr-2" },
        { label: 'Review', className: 'mr-2' }
    ];
    const [loading, setLoading] = useState({
        createHouseholdProfile: false
    });
    const confirmAddMember = () => {
        if(addHouseholdProfileStore.addHead || addHouseholdProfileStore.addMember) {
            confirmDialog({
                message: addHouseholdProfileStore.addHead ? 'Do you want to add household member?' : 'Do you want to add another household member?',
                header: 'Add Member',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    addHouseholdMember();
                },
                reject: () => {
                    hideAddHouseholdProfile();
                }
            });
        }
        else {
            hideAddHouseholdProfile();
        }
    }
    const addHouseholdMember = () => {
        dispatch(addMember({
            householdNo: form.household_no,
            householdId: form.household_id,
            date_of_visit: form.date_of_visit,
            household: addHouseholdProfileStore.household
        }));
    }

    useEffect(() => {
        dispatch(setErrors({}));
        (async () => {
            await getGenericTypes(dispatch);
        })();
    }, []);

    useEffect(() => {
        const newForm = initialForm;
        newForm.household_id = addHouseholdProfileStore.householdId;
        newForm.household_no = addHouseholdProfileStore.householdNo;
        newForm.date_of_visit = addHouseholdProfileStore.date_of_visit;
        newForm.member_relationship_id = addHouseholdProfileStore.addHead ? 1 : '';
        setForm(newForm);
        console.log(form);
    }, [addHouseholdProfileStore.addHead, addHouseholdProfileStore.addMember, addHouseholdProfileStore.householdId, addHouseholdProfileStore.householdNo, addHouseholdProfileStore.date_of_visit]);

    const next = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
    };

    const prev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleHouseholdNoChanged = async (e: any) => {
        setForm({ ...form, household_no: e.value });
    };

    const handleHouseholdComplete = async (e: any) => {
        await getHouseholds(dispatch, { search: e.query });
        setHouseholdItems(e.query ? households.data?.map((household: any) => ({ label: `${household.household_no}`, value: household.id, household: household })) : []);
        console.log(householdItems);
    };

    const handleHouseholdSelect = (e: any) => {
        setForm({ ...form, household_no: e.value.label, household_id: e.value.value, household: e.value.household });
    };

    const handleHouseholdCreate = async () => {
        const params = { ...form };
        params.birthdate = formatDate(params.birthdate);
        params.last_menstrual_period = params.gender_id == '80' ? formatDate(params.last_menstrual_period) : '';
        setLoading({ ...loading, createHouseholdProfile: true });
        const success = await storeHouseholdProfile(dispatch, { ...params });
        setHouseholdItems(households.data?.map((household: any) => ({ label: `${household.name} - ${household.household_no}`, value: household.id })));
        setLoading({ ...loading, createHouseholdProfile: false });
        if (success) {
            if (addHouseholdProfileStore.addHead || addHouseholdProfileStore.addMember) {
                dispatch(reloadHouseholds());
                // reset the form to add members
                dispatch(hide());
                const _form = { ...form };
                const newForm = initialForm;
                newForm.household_no = _form.household_no;
                newForm.household_id = _form.household_id;
                newForm.date_of_visit = _form.date_of_visit;
                newForm.member_relationship_id = '';
                setForm(newForm);
                confirmAddMember();
            }
            setActiveIndex(0);
            confirmAddMember();
        }
    };
    
    const hideAddHouseholdProfile = () => {
        dispatch(hide());
        setForm(initialForm);
        setActiveIndex(0);
    }

    return (
        <Sidebar
            onHide={hideAddHouseholdProfile}
            visible={visible}
            position="right"
            showCloseIcon={false}
            icons={() => (
                <Button
                    icon="pi pi-times"
                    size="large"
                    severity="danger"
                    text
                    rounded
                    onClick={hideAddHouseholdProfile}
                />
            )}
            style={{ width: '100vw' }}
        >
            <h4 className="text-center mb-4">{addHouseholdProfileStore.title}</h4>
            <div className="grid justify-content-center m-0">
                <div className="col-12 sm:col-11 md:col-8 lg:col-6">
                    <div className="w-full overflow-x-scroll scrollbar-none " style={{ scrollbarWidth: 'none' }}>
                        <Steps className="mb-4" model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
                    </div>
                    <div className="mb-4">
                        <div className="flex gap-3 justify-content-between">
                            <Button size="small" label="Previous" icon="pi pi-angle-left" onClick={prev} disabled={activeIndex === 0} />
                            <Button size="small" label="Next" icon="pi pi-angle-right" onClick={next} disabled={activeIndex === items.length - 1} />
                        </div>
                    </div>
                    {!addHouseholdProfileStore.addHead && !addHouseholdProfileStore.addMember && form.household && (
                        <div className="flex  flex-wrap gap-1 mb-4">
                            <Chip label={`Household No.: ${form.household?.household_no}`} />
                            <Chip label={`Household Head: ${form.household?.head?.updated_details?.full_name}`} />
                        </div>
                    )}
                    {(addHouseholdProfileStore.addHead || addHouseholdProfileStore.addMember) && (
                        <div className="flex  flex-wrap gap-1 mb-4">
                            <Chip label={`Household No.: ${addHouseholdProfileStore.household?.household_no}`} />
                            <Chip label={`Household Head: ${addHouseholdProfileStore.household?.head?.updated_details?.full_name}`} />
                        </div>
                    )}
                    <div className="card mb-4">
                        {activeIndex === 0 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Household No. <Required />
                                    </label>
                                    <AutoComplete
                                        dropdown
                                        placeholder="Household No."
                                        onChange={handleHouseholdNoChanged}
                                        suggestions={householdItems}
                                        field="label"
                                        completeMethod={handleHouseholdComplete}
                                        value={form.household_no}
                                        disabled={addHouseholdProfileStore.addHead || addHouseholdProfileStore.addMember}
                                        onSelect={handleHouseholdSelect}
                                        className="w-full"
                                    />
                                    <ValidationError name="household_id" />
                                </div>

                                {!addHouseholdProfileStore.addHead && (
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                            Relationship to Head <Required />
                                        </label>
                                        <Dropdown
                                            showClear
                                            options={genericTypes.filter((x: any) => {
                                                return x.type === 'MEMBERS_OF_HOUSEHOLD' && (addHouseholdProfileStore.addHead ? x.id == '1' : x.id != '1' || x.id != 1);
                                            })}
                                            optionLabel="label"
                                            optionValue="id"
                                            value={form.member_relationship_id}
                                            disabled={addHouseholdProfileStore.addHead}
                                            placeholder="Select Relationship"
                                            onChange={(e) => setForm({ ...form, member_relationship_id: e.value })}
                                            style={{ width: '100%' }}
                                        />
                                        <ValidationError name="member_relationship_id" />
                                    </div>
                                )}

                                {form.member_relationship_id == '5' && (
                                    <>
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                            Other Relationship <Required />
                                        </label>
                                        <InputText type="text" style={{ width: '100%' }} placeholder="Other Relationship" value={form.other_relation} onChange={(e) => setForm({ ...form, other_relation: e.target.value })} />
                                        <ValidationError name="other_relation" />
                                    </>
                                )}
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        First Name <Required />
                                    </label>
                                    <InputText type="text" style={{ width: '100%' }} onChange={(e: any) => setForm({ ...form, firstname: e.target.value })} value={form.firstname} placeholder="First Name" />
                                    <ValidationError name="firstname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Middle Name <Required />
                                    </label>
                                    <InputText type="text" style={{ width: '100%' }} value={form.middlename} onChange={(e: any) => setForm({ ...form, middlename: e.target.value })} placeholder="Middle Name" />
                                    <ValidationError name="middlename" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Last Name <Required />
                                    </label>
                                    <InputText type="text" style={{ width: '100%' }} value={form.lastname} onChange={(e: any) => setForm({ ...form, lastname: e.target.value })} placeholder="Last Name" />
                                    <ValidationError name="lastname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Birthdate <Required />
                                    </label>
                                    <Calendar
                                        value={form.birthdate ? new Date(form.birthdate) : ''}
                                        dateFormat="mm-dd-yy"
                                        placeholder="mm-dd-yyyy"
                                        mask="99/99/9999"
                                        maxDate={new Date()}
                                        showIcon
                                        onChange={(e) => setForm({ ...form, birthdate: e.value ? e.value.toLocaleString() : form.birthdate })}
                                        className="w-full"
                                    />
                                    <ValidationError name="birthdate" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Sex <Required />
                                    </label>
                                    <Dropdown
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === 'GENDER')}
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.gender_id}
                                        onChange={(e) => setForm({ ...form, gender_id: e.value })}
                                        placeholder="Select Gender"
                                        style={{ width: '100%' }}
                                    />
                                    <ValidationError name="gender_id" />
                                </div>
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Civil Status <Required />
                                    </label>
                                    <Dropdown
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === 'CIVIL_STATUS')}
                                        optionLabel="label"
                                        optionValue="id"
                                        onChange={(e) => setForm({ ...form, civil_status_id: e.value })}
                                        value={form.civil_status_id}
                                        placeholder="Select Civil Status"
                                        style={{ width: '100%' }}
                                    />
                                    <ValidationError name="civil_status_id" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Educational Attainment <Required />
                                    </label>
                                    <Dropdown
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === 'EDUCATIONAL_ATTAINMENT')}
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.educational_attainment_id}
                                        onChange={(e) => setForm({ ...form, educational_attainment_id: e.value })}
                                        placeholder="Select Educational Attainment"
                                        style={{ width: '100%' }}
                                    />
                                    <ValidationError name="educational_attainment_id" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">
                                        Religion <Required />
                                    </label>
                                    <Dropdown
                                        showClear
                                        options={genericTypes.filter((x: any) => x.type === 'RELIGION')}
                                        optionLabel="label"
                                        optionValue="id"
                                        value={form.religion_id}
                                        onChange={(e) => setForm({ ...form, religion_id: e.value })}
                                        placeholder="Select Religion"
                                        style={{ width: '100%' }}
                                    />
                                    <ValidationError name="religion_id" />
                                </div>
                            </div>
                        )}

                        {activeIndex === 3 && (
                            <>
                                <div className="flex justify-content-end">
                                    <Button label="Submit Profile" icon="pi pi-check" className="p-button-success" loading={loading.createHouseholdProfile} onClick={handleHouseholdCreate} />
                                </div>
                                <h5 className="text-center font-bold  mb-2">Household Profiling Form Data</h5>
                                <p className="text-center">
                                    <i>Please review the information below before submitting the Household Profiling Form</i>
                                </p>
                                <br />
                                <br />
                                <div className="flex flex-column gap-2">
                                    <div className="flex gap-2">
                                        <p className="font-bold">Household No:</p>
                                        <p>{form.household_no}</p>
                                        <ValidationError name="household_id" />
                                    </div>
                                    {!addHouseholdProfileStore.addHead && (
                                        <div className="flex gap-2">
                                            <p className="font-bold">Relationship to the head:</p>
                                            <p>{genericTypes.find((g: any) => g.id === form.member_relationship_id)?.name}</p>
                                            <ValidationError name="member_relationship_id" />
                                        </div>
                                    )}
                                    {form.member_relationship_id == '5' && (
                                        <div className="flex gap-2">
                                            <p className="font-bold">Other Relationship:</p>
                                            <p>{form.other_relation}</p>
                                            <ValidationError name="other_relation" />
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <p className="font-bold">Fullname:</p>
                                        <p>{`${form.firstname} ${form.middlename} ${form.lastname}`}</p>
                                        <ValidationError name="firstname" />
                                        <ValidationError name="middlename" />
                                        <ValidationError name="lastname" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Birthdate:</p>
                                        <p>{new Date(form.birthdate).toDateString()}</p>
                                        <ValidationError name="birthdate" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Age:</p>
                                        <p>{calculateAge(form.birthdate)}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <p className="font-bold">Sex:</p>
                                        <p>{genericTypes.find((g: any) => g.id === form.gender_id)?.name}</p>
                                        <ValidationError name="gender_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Civil Status:</p>
                                        <p>{genericTypes.find((g: any) => g.id === form.civil_status_id)?.name}</p>
                                        <ValidationError name="civil_status_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Educational Attainment:</p>
                                        <p>{genericTypes.find((g: any) => g.id === form.educational_attainment_id)?.name}</p>
                                        <ValidationError name="educational_attainment_id" />
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">Religion:</p>
                                        <p>{genericTypes.find((g: any) => g.id === form.religion_id)?.name}</p>
                                        <ValidationError name="religion_id" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default AddHouseholdProfile;
