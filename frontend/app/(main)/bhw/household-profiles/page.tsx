"use client";
import { deleteHousehold, getHouseholds } from "@/api/householdApi";
import { getHouseholdProfiles } from "@/api/householdProfileApi";
import AddHousehold from "@/components/AddHousehold";
import AddHouseholdProfile from "@/components/AddHouseholdProfile";
import { FilterModal } from "@/components/FilterModal";
import { calculateAge } from "@/utils/helpers";
import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HouseholdsTable = () => {
    const dispatch = useDispatch();
    const { households, reload : householdReload } = useSelector((state : any) => state.household);
    const [paginator, setPaginator] = useState({
        households: useRef<any>(null)
    });

    const [visible, setVisible] = useState({
        addHousehold: false
    });
    const [loading, setLoading] = useState({
        householdsTable: false,
        householdDelete : false
    });

    useEffect(() => {
        (async () => {
            setLoading({ ...loading, householdsTable: true });
            await getHouseholds(dispatch);
            setLoading({ ...loading, householdsTable: false });
        })();
    }, [householdReload]);

    const onPageChange = async (e: any) => {
        setLoading({ ...loading, householdsTable: true });
        await getHouseholds(dispatch, { page: e.page + 1 });
        setLoading({ ...loading, householdsTable: false });
    }

    const handleDeleteHousehold = (event : any, id : any) => {
        confirmPopup({
            target : event.currentTarget,
            message : 'Are you sure you want to delete this household?',
            icon : 'pi pi-exclamation-triangle',
            accept : async () => {
                setLoading({ ...loading, householdDelete : true });
                const success = await deleteHousehold(dispatch, id);
                if(success) {
                    await getHouseholds(dispatch);
                }
                setLoading({ ...loading, householdDelete : false });
            }
        })
    }
    
    return (
        <div className="card">
            <h5>Households</h5>
            <div className="flex justify-content-end gap-2 mb-3">
                <Button label="Add Household" size="small"  icon="pi pi-plus" onClick={() => setVisible({ ...visible, addHousehold: true })}  />
            </div>
            <DataTable value={households.data} loading={loading.householdsTable} rowHover>
                <Column field="household_no" header="Household No." />
                <Column field="name" header="Household Name" />
                <Column 
                    header="Actions" 
                    body={
                        (data : any) => (
                            <div className="flex gap-2">
                                <Button label="Delete" size="small" severity="danger" outlined icon="pi pi-trash" onClick={(event) => handleDeleteHousehold(event, data.id)} loading={loading.householdDelete}   />
                            </div>
                        )
                    } />
            </DataTable>
            <Paginator 
                    ref={paginator.households}
                    first={(households.current_page - 1) * households.per_page}
                    rows={households.per_page}
                    totalRecords={households.total}
                    onPageChange={onPageChange}
                />
            <AddHousehold visible={visible.addHousehold} onHide={() => setVisible({ ...visible, addHousehold: false })} />
        </div>
    )
}

const HouseholdProfilesTable = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState({
        addHouseholdProfile: false,
        householdProfileFilter : false,
    });
    const { householdProfiles, reload } = useSelector((state : any) => state.householdProfile);
    const [loading, setLoading] = useState({
        householdProfilesTable: false
    });
    const [paginator, setPaginator] = useState({
        householdProfiles: useRef<any>(null)
    });

    const onPageChange = async (e: any) => {
        setLoading({ ...loading, householdProfilesTable: true });
        await getHouseholdProfiles(dispatch, { page: e.page + 1 });
        setLoading({ ...loading, householdProfilesTable: false });
    }

    useEffect(() => {
        (async () => {
            setLoading({ ...loading, householdProfilesTable: true });
            await getHouseholdProfiles(dispatch);
            console.log("profiles",householdProfiles);
            setLoading({ ...loading, householdProfilesTable: false });
        })();
    }, [reload]);
    
    return (
        <div className="card">
            <h5>Household Profiles</h5>
            <div className="flex justify-content-end gap-2 mb-3">
                <Button label="" size="small" icon="pi pi-filter" outlined onClick={() => setVisible({ ...visible, householdProfileFilter: true })}  />
                <Button label="Add Household Profile" size="small"  icon="pi pi-plus" onClick={() => setVisible({ ...visible, addHouseholdProfile: true })}  />
            </div>
            <DataTable value={householdProfiles.data}  loading={loading.householdProfilesTable} rowHover>
                <Column  header="Actions" frozen body={(data : any) => (
                    <>
                        <div className="flex gap-2">
                            <Button label="Update" size="small" outlined icon="pi pi-pencil" />
                        </div>
                    </>
                )} />
                <Column field="household.household_no" header="Household No." />
                <Column field="updated_details.firstname" header="Firstname" />
                <Column field="updated_details.middlename" header="Middlename" />
                <Column field="updated_details.lastname" header="Lastname" />
                <Column field="updated_details.member_relationship.name" header="Relationship to the head" />
                <Column field="birthdate" header="Date of Birth" body={(data : any) => moment(data.birthdate).format('MMM DD, YYYY')} />
                <Column header="Age" body={(data : any) => calculateAge(data.birthdate)} />
                <Column field="updated_details.gender.name" header="Sex"  />
                <Column field="updated_details.civil_status.name" header="Civil Status"  />
                <Column field="updated_details.educational_attainment.name" header="Educational Attainment"  />
                <Column field="updated_details.religion.name" header="Religion"  />
                <Column field="updated_details.enthnicity" header="Ethnicity"  />
                <Column field="updated_details.fourps_household_no" header="4Ps Household ID No."  />
                <Column field="updated_details.philhealth_id" header="PHILHEALTH ID"  />
                <Column field="updated_details.philhealth_membership_type.name" header="Membership Type"  />
                <Column field="updated_details.philhealth_category.name" header="PHILHEALTH Category"  />
                <Column field="updated_details.medical_history.name" header="Medical History"  />
                <Column field="updated_details.classification_by_age_hrg.name" header="Classification by Age/Health Risk Group"  />
                <Column field="updated_details.last_menstrual_period" header="Last Menstrual Period" body={(data : any) => data.updated_details.last_menstrual_period ? moment(data.updated_details.last_menstrual_period).format('MMM DD, YYYY') : "N/A"}  />
                <Column field="updated_details.using_fp_method" header="Is Using Family Planning Method" body={(data : any) => data.updated_details.using_fp_method ? "Yes" : "No"}  />
                <Column field="updated_details.family_planning_method.name" header="Family Planning Method Use" />
                <Column field="updated_details.family_planning_status.name" header="Family Planning Status" />
                <Column field="updated_details.water_source.name" header="Type of Water Source" />
                <Column field="updated_details.toilet_facility.name" header="Type of Toilet Facility" />
                <Column header="Asthma (Hika)" body={(data : any) => (data.updated_details.hc_asthma && data.updated_details.hc_asthma == 1) ? "Yes" : "No"} />
                <Column header="Cancer" body={(data : any) => (data.updated_details.hc_cancer && data.updated_details.hc_cancer == 1) ? "Yes" : "No"} />
                <Column header="PWD (May kapansanan)" body={(data : any) => (data.updated_details.hc_pwd && data.updated_details.hc_pwd == 1) ? "Yes" : "No"} />
                <Column header="Stroke" body={(data : any) => (data.updated_details.hc_stroke && data.updated_details.hc_stroke == 1) ? "Yes" : "No"} />
                <Column header="Mass (Bukol)" body={(data : any) => (data.updated_details.hc_mass && data.updated_details.hc_mass == 1) ? "Yes" : "No"} />
                <Column header="MHGAP" body={(data : any) => (data.updated_details.hc_mhgap && data.updated_details.hc_mhgap == 1) ? "Yes" : "No"} />
                <Column header="Smoker" body={(data : any) => (data.updated_details.hc_smoker && data.updated_details.hc_smoker == 1) ? "Yes" : "No"} />
                <Column header="Alchohol Drinker" body={(data : any) => (data.updated_details.hc_alchohol_drinker && data.updated_details.hc_alchohol_drinker == 1) ? "Yes" : "No"} />

            </DataTable>
            <Paginator 
                    ref={paginator.householdProfiles}
                    first={(householdProfiles.current_page - 1) * householdProfiles.per_page}
                    rows={householdProfiles.per_page}
                    totalRecords={householdProfiles.total}
                    onPageChange={onPageChange}
                />
            <AddHouseholdProfile visible={visible.addHouseholdProfile} onHide={() => setVisible({ ...visible, addHouseholdProfile: false })} />
            <FilterModal visible={visible.householdProfileFilter} onHide={() => setVisible({ ...visible, householdProfileFilter: false })} />
        </div>
    )
}
        
const HouseholdProfiles = () => {
    
    return (
        <>
            <HouseholdsTable />
            <HouseholdProfilesTable />
        </>
    )
}

export default HouseholdProfiles;