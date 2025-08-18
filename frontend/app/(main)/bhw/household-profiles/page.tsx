"use client";
import { getHouseholds } from "@/api/householdApi";
import AddHousehold from "@/components/AddHousehold";
import AddHouseholdProfile from "@/components/AddHouseholdProfile";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
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
        householdsTable: false
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
    
    return (
        <div className="card">
            <h5>Households</h5>
            <div className="flex justify-content-end gap-2 mb-3">
                <Button label="Add Household" size="small"  icon="pi pi-plus" onClick={() => setVisible({ ...visible, addHousehold: true })}  />
            </div>
            <DataTable value={households.data} loading={loading.householdsTable}>
                <Column field="household_no" header="Household No." />
                <Column field="name" header="Household Name" />
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
    });
    return (
        <div className="card">
            <h5>Household Profiles</h5>
            <div className="flex justify-content-end gap-2">
                <Button label="Add Household Profile" size="small"  icon="pi pi-plus" onClick={() => setVisible({ ...visible, addHouseholdProfile: true })}  />
            </div>
            <AddHouseholdProfile visible={visible.addHouseholdProfile} onHide={() => setVisible({ ...visible, addHouseholdProfile: false })} />
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