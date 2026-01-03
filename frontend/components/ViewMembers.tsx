"use client";
import { countPregnantByHousehold, countSeniorsByHousehold, getHouseholdMembers, setHouseholdHead } from "@/api/householdApi";
import { setHouseholdId } from "@/features/viewMemberSlice";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { confirmPopup } from "primereact/confirmpopup";
import { DataView } from "primereact/dataview";
import { Divider } from "primereact/divider";
import { Sidebar } from "primereact/sidebar";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ViewMembers = () => {
    const viewMemberStore = useSelector((state:any) => state.viewMember);
    const [members, setMembers] = useState<any>([]);
    const dispatch = useDispatch();
    const initialCounts = {
        pregnants : 0,
        seniors : 0
    }
    const [counts, setCounts] = useState<any>(initialCounts);

    const init = () => {
        setMembers([]);
        (async () => {
            const _members = await getHouseholdMembers(dispatch, viewMemberStore.household_id);
            setMembers(_members);
        })();
        (async () => {
            const _pregnants = await countPregnantByHousehold(dispatch, viewMemberStore.household_id);
            const _seniors = await countSeniorsByHousehold(dispatch, viewMemberStore.household_id);
            setCounts({
                pregnants: _pregnants,
                seniors : _seniors
            })
        })();
    }

    useEffect(() => {
        if(viewMemberStore.household_id == 0) return;
        init();
    }, [viewMemberStore.household_id]);

    const setHead = (e, member : any) => {
        confirmPopup({
            target: e.target,
            message: 'Are you sure you want to set this member as head of the household?',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await setHouseholdHead(dispatch, member.id);
                init();
            }
        })
    }

    const hide = () => {
        dispatch(setHouseholdId(0));
    }

    const getFamilyGroupKey = (member: any) => {
        if (member.updated_details.is_family_head === 1) {
            // Family head starts a new group using THEIR OWN ID
            return member.id;
        }

        if (member.updated_details.family_head_id !== 0) {
            // Member belongs to a family
            return member.updated_details.family_head_id;
        }

        // Standalone person (no family)
        return `solo-${member.id}`;
    };

    

    return (
        <>
            <Sidebar
                onHide={hide}
                visible={viewMemberStore.household_id !== 0}
                showCloseIcon={false}
                style={{ maxWidth: '40rem', width: '100vw' }}
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
                <div className="flex gap-3 justify-content-center">
                    <div className="card h-fit">
                        <h1 className="text-center">{members.length}</h1>
                        <p className="text-center" >Members</p>
                    </div>
                    <div className="card h-fit">
                        <h1 className="text-center">{counts.pregnants}</h1>
                        <p className="text-center" >Pregnants</p>
                    </div>
                    <div className="card h-fit">
                        <h1 className="text-center">{counts.seniors}</h1>
                        <p className="text-center" >Seniors</p>
                    </div>
                </div>
                {/* <DataView className="w-full" value={members} layout="list"  itemTemplate={(data:any) => 
                    (
                        <div className="flex flex-wrap p-2 align-items-center gap-3 w-full">
                            <Avatar icon="pi pi-user" shape="circle" size="large" className="bg-primary text-0" />
                            <div className="flex-1 flex flex-auto gap-2 xl:mr-8">
                                <span className="font-bold">{data.fullname}</span>
                                {
                                    data.updated_details.member_relationship_id == 1 && (
                                        <Tag severity="info" className="ml-2 " value="HH" title="Household Head"></Tag>
                                    )
                                }
                                {
                                    data.updated_details.is_family_head == 1 && (
                                        <Tag severity="success" className="ml-2" value="FH" title="Family Head"></Tag>
                                    )
                                }
                                {
                                    data.is_pregnant == 1 && (
                                        <Tag className="ml-2" value="Pregnant" title="Pregnant"></Tag>
                                    )
                                }
                                {
                                    data.is_senior && (
                                        <Tag className="ml-2" value="Senior" title="Senior"></Tag>
                                    )
                                }
                            </div>
                            {
                                data.updated_details.member_relationship_id != 1 && (
                                    <Button label="Set as HH" className="ml-2" outlined size="small" severity="success" onClick={() => setHead(event, data)}></Button>
                                )
                            }
                        </div>
                    )
                }></DataView> */}
                <DataView
                    className="w-full"
                    value={members}
                    layout="list"
                    itemTemplate={(data: any, options: any) => {
                        const index = members.findIndex((s: any) => s.id === data.id);
                        const prev = index > 0 ? members[index - 1] : null;

                        const currentKey = getFamilyGroupKey(data);
                        const prevKey = prev ? getFamilyGroupKey(prev) : null;

                        const showDivider = prev && currentKey !== prevKey;

                        return (
                            <>
                                {/* Divider when family_head_id changes */}
                                {showDivider && (
                                    <Divider align="left" className="mb-2" >
                                        <span className="text-sm font-semibold text-500">
                                            New Family
                                        </span>
                                    </Divider>
                                )}

                                <div  className={`flex flex-wrap p-2 align-items-center gap-3 w-full ${
                                        showDivider ? 'border-top-0 mt-2 pt-2' : ''
                                    }`}>
                                    <Avatar
                                        icon="pi pi-user"
                                        shape="circle"
                                        size="large"
                                        className="bg-primary text-0"
                                    />

                                    <div className="flex-1 flex flex-auto gap-2 xl:mr-8">
                                        <span className="font-bold">{data.fullname}</span>

                                        {data.updated_details.member_relationship_id === 1 && (
                                            <Tag severity="info" className="ml-2" value="HH" />
                                        )}

                                        {data.updated_details.is_family_head === 1 && (
                                            <Tag severity="success" className="ml-2" value="FH" />
                                        )}

                                        {data.is_pregnant === 1 && (
                                            <Tag className="ml-2" value="Pregnant" />
                                        )}

                                        {data.is_senior && (
                                            <Tag className="ml-2" value="Senior" />
                                        )}
                                    </div>

                                    {data.updated_details.member_relationship_id !== 1 && (
                                        <Button
                                            label="Set as HH"
                                            outlined
                                            size="small"
                                            severity="success"
                                            onClick={() => setHead(event, data)}
                                        />
                                    )}
                                </div>
                            </>
                        );
                    }}
                />

            </Sidebar>
        </>
    )
}