"use client";
import { getHouseholdMembers } from "@/api/householdApi";
import { setHouseholdId } from "@/features/viewMemberSlice";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ViewMembers = () => {
    const viewMemberStore = useSelector((state:any) => state.viewMember);
    const [members, setMembers] = useState<any>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(viewMemberStore.household_id == 0) return;
        setMembers([]);
        (async () => {
            const _members = await getHouseholdMembers(dispatch, viewMemberStore.household_id);
            console.log(_members);
            setMembers(_members);
        })();

    }, [viewMemberStore.household_id]);



    const hide = () => {
        dispatch(setHouseholdId(0));
    }

    

    return (
        <>
            <Sidebar
                onHide={hide}
                visible={viewMemberStore.household_id !== 0}
                showCloseIcon={false}
                style={{ maxWidth: '30rem', width: '100vw' }}
                icons={() => (
                    <Button
                        icon="pi pi-times"
                        size="large"
                        severity="danger"
                        text
                        rounded
                        onClick={hide}
                    />
                )}
                position="right">
                <div className="card">
                    <h1>{members.length}</h1>
                    <label htmlFor="">Members</label>
                </div>
                <DataView value={members} layout="list"  itemTemplate={(data:any) => 
                    (
                        <div className="flex p-2 align-items-center gap-3">
                            <Avatar icon="pi pi-user" shape="circle" size="large" className="bg-primary text-0" />
                            <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                                <span className="font-bold">{data.fullname}</span>
                            </div>
                        </div>
                    )
                }></DataView>
            </Sidebar>
        </>
    )
}