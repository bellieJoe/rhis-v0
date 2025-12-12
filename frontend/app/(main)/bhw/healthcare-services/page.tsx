"use client";
import { getBarangayList, getMunicipalityList } from "@/api/addressApi";
import { getHouseholdProfiles } from "@/api/householdProfileApi";
import { AuthMiddleware } from "@/components/middlewares";
import { UpdateHealthServiceForm } from "@/components/UpdateHealthServiceForm";
import { setHouseholdProfiles } from "@/features/householdProfileSlice";
import { showUpdateHealthService } from "@/features/forms/updateHealthServiceSlice";
import { calculateAge } from "@/utils/helpers";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "primereact/tag";
import { Tooltip } from 'primereact/tooltip';


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
        (async () => {
            setLoading({ ...loading, municipalities: true });
            const _municipalities = await getMunicipalityList(dispatch, {
                province: 23
            });
            setMunicipalities(_municipalities);
            setLoading({ ...loading, municipalities: false });
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            if(!filter.municipality) return;
            setLoading({ ...loading, barangays: true, patients: true });
            const _barangays = await getBarangayList(dispatch, {
                municipality: filter.municipality
            });
            setBarangays(_barangays);
            const _profiles = await getHouseholdProfiles(dispatch, {municipality: (filter.municipality ? filter.municipality : 0)});
            setHouseholdProfiles(_profiles);
            setLoading({ ...loading, barangays: false, patients: false });
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

    useEffect(() => {
        (async () => {
            setLoading({ ...loading, patients: true });
            const _profiles = await getHouseholdProfiles(dispatch, {});
            setHouseholdProfiles(_profiles);
            setLoading({ ...loading, patients: false });
        })();
    }, []);

    return (
        <AuthMiddleware>
            <div className="card">
                <h5><i className="pi pi-users mr-2 fw-bold" /> Patients</h5>
                <div className="flex gap-2 mb-2">
                    {/* <Dropdown filter value={filter.municipality} onChange={(e) => setFilter({...filter, municipality: e.value})} options={municipalities} optionLabel="municipality_name" optionValue="id" placeholder="Select Municipality" className="w-full md:w-14rem"></Dropdown> */}
                    {/* <Dropdown filter value={filter.barangay} onChange={(e) => setFilter({...filter, barangay: e.value})} options={barangays} optionLabel="barangay_name" optionValue="id" placeholder="Select Barangay" className="w-full md:w-14rem"></Dropdown> */}
                </div>
                <DataTable value={householdProfiles?.data} loading={loading.patients}>
                    <Column field="household.household_no" header="Household No."></Column>
                    <Column field="household.head.updated_details.full_name" header="Head"></Column>
                    <Column header="Household Member Name" body={(data : any) => (
                        <div>
                            {data.updated_details.full_name} 
                            {
                                data.updated_details.member_relationship_id == 1 && (
                                    <Tag severity="info" className="ml-2" value="HH" title="Household Head"></Tag>
                                )
                            }
                            {
                                data.updated_details.is_family_head == 1 && (
                                    <Tag severity="info" className="ml-2" value="FH" title="Family Head"></Tag>
                                )
                            }
                        </div>
                    )}></Column>
                    <Column header="Age" body={(data : any) => calculateAge(data.birthdate)}></Column>
                    <Column header="Address" body={(data : any) => data.household.address}></Column>
                    <Column header="Actions" body={(data : any) => (
                        <>
                            <Button size="small" label="Update Record" icon="pi pi-pencil" outlined onClick={() => dispatch(showUpdateHealthService({householdProfile: data}))}></Button>
                        </>
                    )}></Column>
                </DataTable>
            </div>

            <UpdateHealthServiceForm />
        </AuthMiddleware>
    );
}

export default HealthcareServices;