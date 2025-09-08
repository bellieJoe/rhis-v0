"use client";
import { deleteHousehold, getHouseholds } from "@/api/householdApi";
import { deleteHouseholdProfile, getHouseholdProfiles } from "@/api/householdProfileApi";
import AddHousehold from "@/components/AddHousehold";
import AddHouseholdProfile from "@/components/AddHouseholdProfile";
import { FilterModal } from "@/components/FilterModal";
import { AuthMiddleware } from "@/components/middlewares";
import UpdateHouseholdProfile from "@/components/UpdateHouseholdProfile";
import UpdateHouseholdProfileAddtnlInfo from "@/components/UpdateHouseholdProfileAddtnlInfo";
import { addMember, show } from "@/features/addHouseholdProfileSlice";
import { updateProfileAdditnlInfo } from "@/features/updateHouseholdProfileAddtnlInfoSlice";
import { updateProfile } from "@/features/updateHouseholdProfileSlice";
import { calculateAge } from "@/utils/helpers";
import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
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
            console.log("households ", households);
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
                <Button label="Add Household Member" size="small"  icon="pi pi-plus" onClick={() => dispatch(show())}  />
            </div>
            <DataTable value={households.data} loading={loading.householdsTable} rowHover>
                <Column field="household_no" header="Household No." />
                <Column field="head.updated_details.full_name" header="Household Head" />
                <Column 
                    header="Actions" 
                    body={
                        (data : any) => (
                            <div className="flex gap-2">
                                <Button label="Delete Household" size="small" severity="danger" outlined icon="pi pi-trash" onClick={(event) => handleDeleteHousehold(event, data.id)} loading={loading.householdDelete}   />
                                <Button 
                                    label="Add Member"
                                    size="small"  
                                    outlined icon="pi pi-plus" 
                                    onClick={(event) => {
                                        console.log({
                                            householdId : data.id,
                                            householdNo : data.household_no,
                                            date_of_visit : ""
                                        })
                                        dispatch(addMember({
                                            householdId : data.id,
                                            householdNo : data.household_no,
                                            date_of_visit : ""
                                        })
                                    )}} 
                                    loading={loading.householdDelete}   />
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


const HouseholdProfilesFilter = () => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const initForm = {
        household_no : ''
    };
    const [form, setForm] = useState({
        household_no : ''
    }); 
    const onSubmit = async () => {
        setLoading(true);
        console.log(form)
        await getHouseholdProfiles(dispatch, { household_no : form.household_no });
        setLoading(false);
        setVisible(false);
    }
    const onClear = async () => {
        setForm(initForm);
        setLoading(true);
        await getHouseholdProfiles(dispatch, {});
        setLoading(false);
        setVisible(false);
    }

    return (
        <>
            <Button size="small" icon="pi pi-filter" outlined onClick={() => setVisible(true)}   />
            <Dialog 
                header="Filter Household Profiles" 
                visible={visible} 
                onHide={() => setVisible(false)} 
                style={{ width: '50vw' }} 
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                position="top">
                <div className="field">
                    <label htmlFor="household_no" className="font-bold block mb-2">Household No.</label>
                    <InputText id="household_no" className="w-full" value={form.household_no} onChange={(e) => setForm({...form, household_no : e.target.value})} />
                </div>
                <div className="flex justify-content-end gap-2">
                    <Button label="Clear" outlined icon="pi pi-check" onClick={onClear} loading={loading}  />
                    <Button label="Apply" icon="pi pi-check" onClick={onSubmit} loading={loading}  />
                </div>
            </Dialog>
        </>
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
        householdProfilesTable: false,
        householdProfileDelete : false
    });
    const [paginator, setPaginator] = useState({
        householdProfiles: useRef<any>(null)
    });

    const onPageChange = async (e: any) => {
        setLoading({ ...loading, householdProfilesTable: true });
        await getHouseholdProfiles(dispatch, { page: e.page + 1 });
        setLoading({ ...loading, householdProfilesTable: false });
    }

    const deleteProfile = (event : any, id:any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete this profile?',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                setLoading({ ...loading, householdProfileDelete : true });
                await deleteHouseholdProfile(dispatch, id);
                setLoading({ ...loading, householdProfileDelete : false });
            },
        });
    }

    useEffect(() => {
        (async () => {
            setLoading({ ...loading, householdProfilesTable: true });
            await getHouseholdProfiles(dispatch);
            setLoading({ ...loading, householdProfilesTable: false });
        })();
    }, [reload]);

    return (
        <div className="card">
            <h5>Household Member Additional Information</h5>
            <div className="flex justify-content-end gap-2 mb-3">
                <HouseholdProfilesFilter />
            </div>
            <DataTable value={householdProfiles.data}  loading={loading.householdProfilesTable} rowHover>
                <Column field="household.household_no" header="Household No." />
                <Column field="updated_details.full_name" header="Household Member" />
                <Column  header="Actions" frozen body={(data : any) => (
                    <>
                        <div className="flex gap-2">
                            <Button label="Delete" loading={loading.householdProfileDelete} severity="danger" size="small" outlined icon="pi pi-trash" onClick={(event) => deleteProfile(event, data.id)} />
                            <Button label="Update" size="small" outlined icon="pi pi-pencil" onClick={() => dispatch(updateProfile({householdProfile : data}))} />
                            <Button label="Update Additional Info" size="small" outlined icon="pi pi-pencil" onClick={() => dispatch(updateProfileAdditnlInfo({householdProfile : data}))} />
                        </div>
                    </>
                )} />
              
            </DataTable>
            <Paginator 
                    ref={paginator.householdProfiles}
                    first={(householdProfiles.current_page - 1) * householdProfiles.per_page}
                    rows={householdProfiles.per_page}
                    totalRecords={householdProfiles.total}
                    onPageChange={onPageChange}
                />
            <AddHouseholdProfile  />
            {/* <FilterModal visible={visible.householdProfileFilter} onHide={() => setVisible({ ...visible, householdProfileFilter: false })} /> */}
        </div>
    );
}
     
const HouseholdProfiles = () => {
    
    return (
        <>
            <AuthMiddleware>
                <HouseholdsTable />
                <HouseholdProfilesTable />
                <UpdateHouseholdProfile />
                <UpdateHouseholdProfileAddtnlInfo />
            </AuthMiddleware>
        </>
    )
}

export default HouseholdProfiles;