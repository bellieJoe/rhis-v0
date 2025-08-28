"use client";
import { getBarangayList, getMunicipalityList } from "@/api/addressApi";
import { getHouseholdProfiles } from "@/api/householdProfileApi";
import { UpdateHealthServiceForm } from "@/components/UpdateHealthServiceForm";
import { setHouseholdProfiles } from "@/features/householdProfileSlice";
import { showUpdateHealthService } from "@/features/updateHealthServiceSlice";
import { calculateAge } from "@/utils/helpers";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const HealthcareServices = () => {

    const [barangays, setBarangays] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [householdProfiles, setHouseholdProfiles] = useState<any>({});
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        barangay: null,
        municipality: null
    });
    const [loading, setLoading] = useState({
        barangays: false,
        municipalities: false,
        patients : false
    });

    useEffect(() => {
        console.log("fetch municipalities");
        (async () => {
            console.log("fetching municipalities");
            setLoading({ ...loading, municipalities: true });
            const _municipalities = await getMunicipalityList(dispatch, {
                province: 23
            });
            console.log(_municipalities);
            console.log("fetched municipalities");
            setMunicipalities(_municipalities);
            setLoading({ ...loading, municipalities: false });
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            if(!filter.municipality) return;
            setLoading({ ...loading, barangays: true });
            const _barangays = await getBarangayList(dispatch, {
                municipality: filter.municipality
            });
            setBarangays(_barangays);
            setLoading({ ...loading, barangays: false });
        })();
    },[filter.municipality]);

    useEffect(() => {
        (async () => {
            if(!filter.barangay) return;
            setLoading({ ...loading, patients: true });
            const _profiles = await getHouseholdProfiles(dispatch, { barangay: (filter.barangay ? filter.barangay : 0) });
            setHouseholdProfiles(_profiles);
            setLoading({ ...loading, patients: false });
        })();
    },[filter.barangay]);

    return (
        <div>
            <div className="card">
                <h5>Patients</h5>
                <div className="flex gap-2 mb-2">
                    <Dropdown filter value={filter.municipality} onChange={(e) => setFilter({...filter, municipality: e.value})} options={municipalities} optionLabel="municipality_name" optionValue="id" placeholder="Select Municipality" className="w-full md:w-14rem"></Dropdown>
                    <Dropdown filter value={filter.barangay} onChange={(e) => setFilter({...filter, barangay: e.value})} options={barangays} optionLabel="barangay_name" optionValue="id" placeholder="Select Barangay" className="w-full md:w-14rem"></Dropdown>
                </div>
                <DataTable value={householdProfiles?.data} loading={loading.patients}>
                    <Column field="household.household_no" header="Household No."></Column>
                    <Column field="household.head.updated_details.full_name" header="Head"></Column>
                    <Column field="updated_details.full_name" header="Household Member Name"></Column>
                    <Column header="Age" body={(data : any) => calculateAge(data.birthdate)}></Column>
                    <Column header="Actions" body={(data : any) => (
                        <>
                            <Button size="small" label="Update Record" icon="pi pi-pencil" outlined onClick={() => dispatch(showUpdateHealthService())}></Button>
                        </>
                    )}></Column>
                </DataTable>
            </div>

            <UpdateHealthServiceForm />
        </div>
    )
}

export default HealthcareServices;