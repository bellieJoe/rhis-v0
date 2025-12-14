import { storeAnimalBites, storeDeath, storeFamilyPlanning, storeGaveBirth, storeHasCancer, storeHasDiabetes, storeHasEpilepsy, storeHasHighblood, storeMedication, storeNewBorn, storePregnant, storeSick, storeUnirinalysis, storeUrinalysis, storeVaccinated } from "@/api/healthcareServicesApi";
import handler from "@/app/api/upload";
import store from "@/app/store";
import { hide } from "@/features/forms/addHouseholdProfileSlice";
import { hideUpdateHealthService, onHealthServiceFinish, onHealthServiceSubmit, resetHealthServiceForm } from "@/features/forms/updateHealthServiceSlice";
import { calculateAge, formatDate } from "@/utils/helpers";
import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { Steps } from "primereact/steps";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValidationError from "./forms/ValidationError";
import { AutoComplete } from "primereact/autocomplete";
import { getBarangays } from "@/api/addressApi";
import { Dropdown } from "primereact/dropdown";
import { getGenericTypes } from "@/api/genericTypeApi";
import { InputTextarea } from "primereact/inputtextarea";
import { Chip } from "primereact/chip";

const UnderDevelopment = () => {
    return (
        <div>
            <h1 className="text-center text-orange-500">Under Development</h1>
            <h6 className="text-center ">This feature is currently under development.</h6>
        </div>
    )
}

const PregnantForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const initialForm = {
        household_profile_id : "",
        name : "",
        age : "",
        last_menstrual_period : "",
        date_of_giving_birth : "",
        number_of_pregnancies : 1
    };
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        last_menstrual_period : updateHealthServiceStore.householdProfile?.updated_details?.last_menstrual_period,
        date_of_giving_birth : "",
        number_of_pregnancy : 1
    });
    const [loading, setLoading] = useState(updateHealthServiceStore.loading);
    const estimateDob = () => {
        if(!form.last_menstrual_period) return;
        const start = moment(formatDate(form.last_menstrual_period), 'YYYY-MM-DD');
        const end = start;
        end.add(9, 'months');
        setForm({ ...form, date_of_giving_birth : end.toLocaleString() }); 
    }
    useEffect(() => {
        estimateDob();
    }, [form.last_menstrual_period]);
    useEffect(() => {
        setLoading(updateHealthServiceStore.loading);
    }, [updateHealthServiceStore.loading])

    return (
        <div className="card">
            <h5 className="text-center ">1. Pregnant(Buntis)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" disabled value={form.age} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Last Menstrual Period(Petsa ng huling regla)</label>
                <Calendar 
                    id="lastMenstrualPeriod" 
                    className="w-full"
                    value={form.last_menstrual_period ? new Date(form.last_menstrual_period) : null}
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    maxDate={new Date()}
                    onChange={(e) => {
                        if(!e.value) return;
                        console.log(e.value ? e.value.toLocaleString() : "")
                        setForm({...form, last_menstrual_period : (e.value ? e.value.toLocaleString() : form.last_menstrual_period) })
                    }}
                    />
                <ValidationError name="last_menstrual_period" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Date of Giving Birth(Petsa ng panganganak)</label>
                <Calendar 
                    id="dateOfGivingBirth" 
                    className="w-full"
                    value={form.date_of_giving_birth ? new Date(form.date_of_giving_birth) : null}
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    // maxDate={new Date()}
                    // disabled
                    />
                <ValidationError name="date_of_giving_birth" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Number of Pregnancies(Bilang ng Pagbubuntis)</label>
                <InputText type="number" className="w-full" value={form.number_of_pregnancy.toString()} onChange={(e) => setForm({...form, number_of_pregnancy : parseInt(e.target.value)})} min={1} />
                <ValidationError name="number_of_pregnancy" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={loading} onClick={() => {
                    onSubmit(form)
                }} />
            </div>
        </div>
    );
}

const GaveBirthForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        date_gave_birth : "",
        place_of_birth : "",
        barangay_name: "",
        type_of_birth : "",
        midwife : ""
    });
    const [barangays, setBarangays] = useState([]);
    const handleBarangayChanged = async (e: any) => {
        setForm({...form, barangay_name : e.value});
    }
    const handleBarangaySelect = (e: any) => {
        console.log(e.value.value);
        setForm({...form, barangay_name : e.value.label, place_of_birth : e.value.value});
    }
    const handleBarangayComplete = async (e: any) => {
        const barangaysResult = await getBarangays(dispatch, { search : e.query });
        console.log(barangaysResult)
        setBarangays(e.query ? barangaysResult?.map((barangay: any) => ({ label: barangay.full_address, value: barangay.id })) : []);
    }
    return (
        <div className="card">
            <h5 className="text-center ">2. Gave Birth(Nanganak)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" value={form.name} disabled />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Date of Giving Birth(Petsa ng panganganak)</label>
                <Calendar 
                    id="dateOfGivingBirth" 
                    className="w-full"
                    value={form.date_gave_birth ? new Date(form.date_gave_birth) : null}
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    onChange={(e) => setForm({...form, date_gave_birth : (e.value ? e.value.toLocaleString() : form.date_gave_birth) })}
                    maxDate={new Date()}
                    />
                <ValidationError name="date_gave_birth" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Saan Nanganak(Birth Place)</label>
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
                <ValidationError name="place_of_birth" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Type of Birth(Uri ng Panganganak)</label>
                <Dropdown 
                    type="text" 
                    options={["Vaginal Delivery", "Cesarean Section"]}
                    value={form.type_of_birth}
                    onChange={(e) => setForm({...form, type_of_birth : e.value})}
                    className="w-full" />
                <ValidationError name="type_of_birth" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Midwife(Nagpaanak)</label>
                <InputText type="text" className="w-full" value={form.midwife} onChange={(e) => setForm({...form, midwife : e.target.value})} />
                <ValidationError name="midwife" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => {
                    onSubmit(form);
                }} />
            </div>
        </div>
    );
}

const NewBornChildForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        barangay_name : "",
        date_of_birth : updateHealthServiceStore.householdProfile?.birthdate,
        place_of_birth : "",
        weight: "",
        gender : updateHealthServiceStore.householdProfile?.updated_details?.gender_id,
        remarks : ""
    });
    const [barangays, setBarangays] = useState([]);
    const handleBarangayChanged = async (e: any) => {
        setForm({...form, barangay_name : e.value});
    }
    const handleBarangaySelect = (e: any) => {
        console.log(e.value.value);
        setForm({...form, barangay_name : e.value.label, place_of_birth : e.value.value});
    }
    const handleBarangayComplete = async (e: any) => {
        const barangaysResult = await getBarangays(dispatch, { search : e.query });
        console.log(barangaysResult)
        setBarangays(e.query ? barangaysResult?.map((barangay: any) => ({ label: barangay.full_address, value: barangay.id })) : []);
    }
    useEffect(() => {
        (async() => {
            await getGenericTypes(dispatch)
        })()
    }, []);
    return (
        <div className="card">
            <h5 className="text-center ">3. New Born Child(Bagong silang na sanggol)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" value={form.name} disabled />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="date_of_birth" className="form-label mb-2 block">Date of Birth(Petsa ng panganganak)</label>
                <Calendar 
                    id="date_of_birth" 
                    className="w-full"
                    value={form.date_of_birth ? new Date(form.date_of_birth) : null}
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    disabled
                    onChange={(e) => setForm({...form, date_of_birth : (e.value ? e.value.toLocaleString() : form.date_of_birth) })}
                    maxDate={new Date()}
                    />
                <ValidationError name="date_of_birth" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Lugar ng Kapanganakan(Birth Place)</label>
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
                <ValidationError name="place_of_birth" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Weight(Timbang)</label>
                <InputText type="number" className="w-full" value={form.weight} onChange={(e) => setForm({...form, weight : e.target.value})} />
                <ValidationError name="weight" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Gender(Kasarian)</label>
                <Dropdown 
                    className="w-full"
                    options={genericTypes?.filter((genericType: any) => genericType.type === "GENDER")?.map((gender: any) => gender)} 
                    value={form.gender} 
                    optionLabel="name"
                    optionValue="id"
                    onChange={(e) => setForm({...form, gender : e.value})}
                    disabled />
                <ValidationError name="gender" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Remarks(Puna)</label>
                <InputTextarea className="w-full" value={form.remarks} onChange={(e) => setForm({...form, remarks : e.target.value})} />
                <ValidationError name="remarks" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => {
                    onSubmit(form)
                }}  />
            </div>
        </div>
    );
}

const VaccinatedForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        birthdate : updateHealthServiceStore.householdProfile?.birthdate,
        vaccine : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">4. Vaccinated(Binakunahan)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="birthdate" className="form-label mb-2 block">Birthdate</label>
                <Calendar 
                    id="birthdate" 
                    className="w-full"
                    value={form.birthdate ? new Date(form.birthdate) : null}
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    disabled
                    onChange={(e) => setForm({...form, birthdate : (e.value ? e.value.toLocaleString() : form.birthdate) })}
                    maxDate={new Date()}
                    />
                <ValidationError name="birthdate" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Vaccine (Bakunang Ibinigay)</label>
                <InputText type="text" className="w-full" value={form.vaccine} onChange={(e) => setForm({...form, vaccine : e.target.value})} />
                <ValidationError name="vaccine" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const FamilyPlanningForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        family_planning_method : '',
        remarks : ""
    });
    useEffect(() => {
        (async() => {
            await getGenericTypes(dispatch)
        })()
    }, []);
    return (
        <div className="card">
            <h5 className="text-center ">5. Family Planning(Nagpaplano ng Pamilya)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} disabled />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label className="form-label mb-2 block">F.P. Method</label>
                <Dropdown 
                    options={genericTypes?.filter((genericType: any) => genericType.type === "FAMILY_PLANNING_METHOD")?.map((method: any) => method)}
                    optionLabel="name"
                    optionValue="id"
                    value={form.family_planning_method}
                    onChange={(e) => setForm({...form, family_planning_method : e.value})}
                    className="w-full" />
                <ValidationError name="family_planning_method" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Remarks(Puna)</label>
                <InputText type="text" className="w-full" value={form.remarks} onChange={(e) => setForm({...form, remarks : e.target.value})} />
                <ValidationError name="remarks" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const DeathForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        date_of_death : '',
        cause_of_death : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">6. Death(Namatay)</h5>
            <div className="mb-2">
                <label htmlFor="date_of_death" className="form-label mb-2 block">Date of Death(Petsa ng Kamatayan)</label>
                <Calendar 
                    id="date_of_death" 
                    className="w-full"
                    value={form.date_of_death ? new Date(form.date_of_death) : null}
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    onChange={(e) => setForm({...form, date_of_death : (e.value ? e.value.toLocaleString() : form.date_of_death) })}
                    maxDate={new Date()}
                    />
                <ValidationError name="date_of_death" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} min={0} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label  className="form-label mb-2 block">Cause of Death(Sanhi ng Pagkamatay)</label>
                <InputText type="text" className="w-full" value={form.cause_of_death} onChange={(e) => setForm({...form, cause_of_death : e.target.value})} maxLength={100} />
                <ValidationError name="cause_of_death" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const SickForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        date_of_sickness : '',
        type_of_sickness : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">7. Sick(Mga may sakit)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Date of Sickness(Petsa na nakasakit)</label>
                <Calendar 
                    id="date_of_sickness" 
                    className="w-full"
                    value={form.date_of_sickness ? new Date(form.date_of_sickness) : null}
                    dateFormat="mm-dd-yy" 
                    placeholder="mm-dd-yyyy" 
                    mask="99/99/9999" 
                    onChange={(e) => setForm({...form, date_of_sickness : (e.value ? e.value.toLocaleString() : form.date_of_sickness) })}
                    maxDate={new Date()}
                    />
                <ValidationError name="date_of_sickness" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Type of Sickness(Uri ng Karamdaman)</label>
                <InputText type="text" className="w-full" value={form.type_of_sickness} onChange={(e) => setForm({...form, type_of_sickness : e.target.value})} maxLength={100} />
                <ValidationError name="type_of_sickness" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const HasHighbloodForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        blood_pressure : '',
        bp_count : '',
        actions : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">8. Has Highblood(May sakit na Highblood)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">BP</label>
                <InputText className="w-full" value={form.blood_pressure} onChange={(e) => setForm({...form, blood_pressure : e.target.value})}  />
                <ValidationError name="blood_pressure" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">BP Check Count</label>
                <InputText type="number" className="w-full" value={form.bp_count} onChange={(e) => setForm({...form, bp_count : e.target.value})}  />
                <ValidationError name="bp_count" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Mga Ginawa bilang BHW</label>
                <InputTextarea value={form.actions} onChange={(e) => setForm({...form, actions : e.target.value})} className="w-full"  />
                <ValidationError name="actions" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const HasDiabetesForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        glucose_level : '',
        observation : "",
        actions : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">9. Has Diabetes(May sakit na Diabetes)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Glucose Level</label>
                <InputText type="number" className="w-full" value={form.glucose_level} onChange={(e) => setForm({...form, glucose_level : e.target.value})} />
                <ValidationError name="glucose_level" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Obserbasyon</label>
                <InputText type="text" className="w-full" value={form.observation} onChange={(e) => setForm({...form, observation : e.target.value})} />
                <ValidationError name="observation" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Mga Ginawa bilang BHW</label>
                <InputTextarea className="w-full" value={form.actions} onChange={(e) => setForm({...form, actions : e.target.value})} />
                <ValidationError name="actions" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const UrinalysisResultForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        results : '',
        actions : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">10. Urinalysis Result(Resulta ng pag-eksamin sa ihi)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Nakitang Resulta</label>
                <InputText type="text" className="w-full" value={form.results} onChange={(e) => setForm({...form, results : e.target.value})} />
                <ValidationError name="results" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const HasCancerForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        affected_areas : '',
        actions : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">11. Has Cancer(May sakit na Cancer)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Apektadong Bahagi ng Katawan</label>
                <InputText type="text" className="w-full" value={form.affected_areas} onChange={(e) => setForm({...form, affected_areas : e.target.value})} />
                <ValidationError name="affected_areas" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Mga Ginawa bilang BHW</label>
                <InputText type="text" className="w-full" value={form.actions} onChange={(e) => setForm({...form, actions : e.target.value})} />
                <ValidationError name="actions" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const HasEpilepsyForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        affected_areas : '',
        actions : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">12. Has Epilepsy(May problema sa pagiisip/Epilepsy)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} />
                <ValidationError name="age" />
            </div>
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const AnimalBitesForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        age : calculateAge(updateHealthServiceStore.householdProfile?.birthdate).toString(),
        animal_type : '',
        actions : "",
        other_animal_type : ""
    });
    return (
        <div className="card">
            <h5 className="text-center ">11. Animal Bites(Kinagat ng Hayop/Aso)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" value={form.age} onChange={(e) => setForm({...form, age : e.target.value})} />
                <ValidationError name="age" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Uri ng Hayop</label>
                {/* <InputText type="text" className="w-full" value={form.animal_type} onChange={(e) => setForm({...form, animal_type : e.target.value})} /> */}
                <Dropdown 
                    options={genericTypes?.filter((genericType: any) => genericType.type === "ANIMAL_BITES")?.map((animalType: any) => animalType)}
                    optionLabel="name"
                    optionValue="id"
                    value={form.animal_type}
                    onChange={(e) => setForm({...form, animal_type : e.value})}
                    className="w-full" />
                <ValidationError name="animal_type" />
            </div>
            {
                form.animal_type == '96' && (
                    <div className="mb-2">
                        <label htmlFor="">Specify Animal Type</label>
                        <InputText type="text" className="w-full" value={form.other_animal_type} onChange={(e) => setForm({...form, other_animal_type : e.target.value})} />
                    </div>
                )
            }
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}

const MedicationForm = ({ onSubmit } : { onSubmit : (form:any) => void }) => {
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        household_profile_id : updateHealthServiceStore.householdProfile?.id,
        name : updateHealthServiceStore.householdProfile?.updated_details?.full_name,
        medication_id : '',
        other_medication: "",
        actions : ""
    });
    useEffect(() => {
        getGenericTypes(dispatch);
    }, [])
    return (
        <div className="card">
            <h5 className="text-center ">Drug Maintenance</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" disabled value={form.name} />
                <ValidationError name="household_profile_id" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Medication</label>
                <Dropdown className="w-full" options={genericTypes.filter((genericType: any) => genericType.type === "MEDICATION")} value={form.medication_id} onChange={(e) => setForm({...form, medication_id : e.value})} placeholder="Select Medication" optionLabel="name" optionValue="id" />
                <ValidationError name="household_profile_id" />
            </div>
            {
                form.medication_id == '93' && (
                    <div className="mb-2">
                        <label htmlFor="" className="form-label mb-2 block">Other Medication</label>
                        <InputText type="text" className="w-full" value={form.other_medication} onChange={(e) => setForm({...form, other_medication : e.target.value})} />
                        <ValidationError name="other_medication" />
                    </div>
                )
            }
            <div className="flex justify-content-end">
                <Button label="Save" className="p-button-success" icon="pi pi-check" loading={updateHealthServiceStore.loading} onClick={() => onSubmit(form)} />
            </div>
        </div>
    );
}


export const UpdateHealthServiceForm = () => {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const { visible, loading, error, householdProfile } = useSelector((state: any) => state.updateHealthService);
    const items : MenuItem[] = [
        { label: "Select Service", className: "mr-2" },
        { label: "Fill-up Form", className: "mr-2"  }
    ];
    const [form, setForm] = useState<{
        service : string,
        form : ReactNode,
        data : any
    }>({
        service : "",
        form : <UnderDevelopment />,
        data : {}
    });
    const services = [
        {
            label : "1. Pregnant(Buntis)",
            value : "PREGNANT",
            form : <PregnantForm onSubmit={(data) => submitForm(services.find(s => s.value == "PREGNANT"), data)} />,
            handler : storePregnant,
            visible : householdProfile?.updated_details?.gender_id == 80 && !householdProfile.is_dead && calculateAge(householdProfile?.birthdate) >= 9 && calculateAge(householdProfile?.birthdate) <= 60 && householdProfile.updated_details?.is_pregnant == 1 && householdProfile.already_gave_birth
        }, 
        {
            label: "2. Gave Birth(Nanganak)",
            value: "GAVE_BIRTH",
            form : <GaveBirthForm onSubmit={(data) => submitForm(services.find(s => s.value == "GAVE_BIRTH"), data)} />,
            handler : storeGaveBirth,
            visible : householdProfile?.updated_details?.gender_id == 80 && !householdProfile.is_dead && calculateAge(householdProfile?.birthdate) >= 9 && calculateAge(householdProfile?.birthdate) <= 60 && !householdProfile.already_gave_birth
        },
        {
            label: "3. New Born Child(Bagong Silang na Sanggol)",
            value: "NEW_BORN_CHILD",
            form : <NewBornChildForm onSubmit={(data) => submitForm(services.find(s => s.value == "NEW_BORN_CHILD"), data)} />,
            handler : storeNewBorn,
            visible : calculateAge(householdProfile?.birthdate) < 2 && !householdProfile.is_dead &&  calculateAge(householdProfile?.birthdate) < 2
        },
        {
            label: "4. Vaccinated(Binakunahan)",
            value: "VACCINATED",
            form : <VaccinatedForm onSubmit={(data) => submitForm(services.find(s => s.value == "VACCINATED"), data)} />,
            handler : storeVaccinated,
            visible : !householdProfile.is_dead
        }, 
        {
            label: "5. Family Planning(Nagpalano ng Pamilya)",
            value: "FAMILY_PLANNING",
            form : <FamilyPlanningForm onSubmit={(data) => submitForm(services.find(s => s.value == "FAMILY_PLANNING"), data)} />,
            handler : storeFamilyPlanning, 
            visible : householdProfile?.updated_details?.gender_id == 80 && !householdProfile.is_dead && calculateAge(householdProfile?.birthdate) >= 9 && calculateAge(householdProfile?.birthdate) <= 60 
        },
        {
            label: "6. Death(Namatay)",
            value: "DEATH",
            form : <DeathForm onSubmit={(data) => submitForm(services.find(s => s.value == "DEATH"), data)}/>,
            handler : storeDeath,
            visible : !householdProfile.is_dead
        },
        {
            label: "7. Sick(Mga nagkasakit/may sakit)",
            value: "SICK",
            form : <SickForm onSubmit={(data) => submitForm(services.find(s => s.value == "SICK"), data)}/>,
            handler : storeSick,
            visible : !householdProfile.is_dead
        },
        {
            label: "8. Has Highblood(May sakit na Highblood)",
            value: "HAS_HIGHBLOOD",
            form : <HasHighbloodForm onSubmit={(data) => submitForm(services.find(s => s.value == "HAS_HIGHBLOOD"), data)}/>,
            handler : storeHasHighblood,
            visible : !householdProfile.is_dead && householdProfile?.updated_details?.hc_hypertensive == 1
        },
        {
            label: "9. Has Diabetes(May sakit na Diabetes)",
            value: "HAS_DIABETES",
            form : <HasDiabetesForm onSubmit={(data) => submitForm(services.find(s => s.value == "HAS_DIABETES"), data)}/>,
            handler : storeHasDiabetes,
            visible : !householdProfile.is_dead && householdProfile?.updated_details?.hc_diabetes == 1
        },
        {
            label: "10. Urinalysis Result(Resulta ng Pag-Eksamin sa ihi)",
            value: "URINALYSIS_RESULT",
            form : <UrinalysisResultForm onSubmit={(data) => submitForm(services.find(s => s.value == "URINALYSIS_RESULT"), data)}/>,
            handler : storeUrinalysis,
            visible : !householdProfile.is_dead
        },
        {
            label: "11. Has Cancer(May sakit na Cancer)",
            value: "HAS_CANCER",
            form : <HasCancerForm onSubmit={(data) => submitForm(services.find(s => s.value == "HAS_CANCER"), data)}/>,
            handler : storeHasCancer,
            visible : !householdProfile.is_dead && householdProfile?.updated_details?.hc_cancer == 1
        },
        {
            label: "12. (May Problema sa Pagiisip/Epilepsy)",
            value: "HAS_EPILEPSY",
            form : <HasEpilepsyForm onSubmit={(data) => submitForm(services.find(s => s.value == "HAS_EPILEPSY"), data)}/>,
            handler : storeHasEpilepsy,
            visible : !householdProfile.is_dead
        },
        {
            label: "13. Animal Bite(Kinagat ng Hayop/Aso)",
            value: "ANIMAL_BITE",
            form : <AnimalBitesForm onSubmit={(data) => submitForm(services.find(s => s.value == "ANIMAL_BITE"), data)}/>,
            handler : storeAnimalBites,
            visible : !householdProfile.is_dead
        },
        // {
        //     label: "Drug Maintenance",
        //     value: "MEDICATION",
        //     form : <MedicationForm onSubmit={(data) => submitForm(services.find(s => s.value == "MEDICATION"), data)}/>,
        //     handler : storeMedication,
        //     visible : !householdProfile.is_dead
        // }
    ]
    const next = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
    };
    const prev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    const onHide = () => {
        dispatch(hideUpdateHealthService());
        setActiveIndex(0);
    }
    const submitForm = async (service : any, data : any) => {
        console.log(data);
        dispatch(onHealthServiceSubmit());
        const success = await service.handler(dispatch, { ...data });
        if(success) {
            dispatch(resetHealthServiceForm());
            dispatch(hideUpdateHealthService());
            setActiveIndex(0);
        }
        dispatch(onHealthServiceFinish());
    }
    return (
        <Sidebar 
            visible={visible} 
            position="right" 
            style={{ width: '100vw' }} 
            showCloseIcon={false}
            icons={() =>  (
                <Button icon="pi pi-times" size="large" severity="danger" text rounded  onClick={onHide} />
            )}
            onHide={onHide}>
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
                        <Chip label={`Household No.: ${householdProfile?.household?.household_no}`} />
                        <Chip label={`Member Name: ${householdProfile.updated_details?.full_name}`} />
                        <Chip label={`Gender: ${householdProfile.updated_details?.gender.name}`} />
                        <Chip label={`Address: ${householdProfile.household?.address}`} />
                    </div>

                    {activeIndex === 0 && (
                        <>
                            <h5 className="text-center mb-4">Select Health Service</h5>
                            <div className="grid gap-3 justify-content-center flex-wrap">
                                {services.map((service, index) =>
                                    
                                        service.visible && 
                                        <div className={`card p-3 py-6 col-12 md:col-4 lg:col-3  mb-2 p-3 hover:bg-gray-200 cursor-pointer ${form.service === service.value && 'bg-gray-300'}`} onClick={() => {setForm({...form, service: service.value, form: service.form}); next();}} key={index}>
                                            <div className="flex  align-items-center h-full">
                                                <h5 style={{ wordBreak: 'break-all' }} className="mb-0 ">{service.label}</h5>
                                            </div>
                                        </div>
                                    
                                )}
                            </div>
                        </>
                    )}
                    {activeIndex === 1 && form.form}
                    {activeIndex === 2 && (<UnderDevelopment />)}
                </div>
            </div>
        </Sidebar>
    );
}