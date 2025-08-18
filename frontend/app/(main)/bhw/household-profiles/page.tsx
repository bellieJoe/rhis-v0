"use client";
import AddHouseholdProfile from "@/components/AddHouseholdProfile";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

        
const HouseholdProfiles = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState({
        addHouseholdProfile: false
    });

    return (
        <>
            <div className="card">
                <h5>Household Profiles</h5>
                <div className="flex justify-content-end">
                    <Button label="Add Profile" size="small"  icon="pi pi-plus" onClick={() => setVisible({ ...visible, addHouseholdProfile: true })}  />
                </div>
                <AddHouseholdProfile visible={visible.addHouseholdProfile} onHide={() => setVisible({ ...visible, addHouseholdProfile: false })} />
            </div>
        </>
    )
}

export default HouseholdProfiles;