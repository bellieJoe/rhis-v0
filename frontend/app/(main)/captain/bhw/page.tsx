"use client";
import { countHouseholdByBarangay } from "@/api/householdApi";
import { getBhwsByCaptain, getUsers } from "@/api/userApi";
import AddBhwForm from "@/components/AddBhwForm";
import AssignBhwForm from "@/components/AssignBhwForm";
import { AuthMiddleware } from "@/components/middlewares";
import { showAddBhwForm } from "@/features/forms/addBhwSlice";
import { assignBhw } from "@/features/forms/assignBhwFormSlice";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UsersProps {
    
}

interface RolesBadgesProps {
    roles : []
}
const RolesBadges = ({roles} : RolesBadgesProps) => {
    return (
        <>
            {
                roles && roles.map((role : any) => {
                    return <Tag key={role.id} severity="success">{role.role_type.name.toUpperCase()}</Tag>
                })
            }
        </>
    )
}

const Users = (props : UsersProps) => {
    const dispatch = useDispatch();
    const { reload } = useSelector((state : any) => state.user);
    const [users, setUsers] = useState([]);
    const authStore = useSelector((state : any) => state.auth);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState({
        users : false
    });
    const [counts, setCounts] = useState({
        households: 0
    });
    
    useEffect(() => {
        (async() => {
            setLoading({ ...loading,users : true });
            const _users = await getBhwsByCaptain(dispatch, authStore.user?.id);
            setUsers(_users);
            const _householdCounts = await countHouseholdByBarangay(dispatch, authStore.user?.captain_designations[0]?.office?.barangay_id);
            setCounts({...counts, households : _householdCounts});
            setLoading({ ...loading,users : false });
        })();
    }, [reload, authStore.user?.id]);
    
    const userActions = (data : any) => {
        return (
            <div className="flex gap-2">
                {
                    data.roles.some((role : any) => role.role_type_id === 1) && <Button size="small" outlined label="BHW Designation" icon="pi pi-user-plus" onClick={() => dispatch(assignBhw({user : data}))} />
                }
                {/* {
                    data.roles.some((role : any) => role.role_type_id === 6) && <Button size="small" outlined label="Baranggay Captain Designation" icon="pi pi-user-plus" onClick={() => dispatch(assignCaptain({user : data}))} />
                }
                {
                    data.roles.some((role : any) => role.role_type_id === 2) && <Button size="small" outlined label="Midwife Designation" icon="pi pi-user-plus" onClick={() => dispatch(assignMidwife({user : data}))} />
                }
                {
                    data.roles.some((role : any) => role.role_type_id === 3) && <Button size="small" outlined label="RHU Personnel Designation" icon="pi pi-user-plus" onClick={() => dispatch(assignRhu({user : data}))} />
                } */}
            </div>
        )
    }

    return (
        <>
            <AuthMiddleware>
                <div className="flex-wrap">
                    <div className="grid mb-2">
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Households</span>
                                        <div className="text-900 font-medium text-xl">{counts.households}</div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-home text-blue-500 text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">BHW's</span>
                                        <div className="text-900 font-medium text-xl">{users?.length}</div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-users text-blue-500 text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h5>Users</h5>
                    <div className="flex justify-content-end mb-3">
                        <Button size="small" label="Add BHW" icon="pi pi-plus" onClick={() => dispatch(showAddBhwForm({user_id : authStore.user?.id}))} />
                    </div>
                    <DataTable value={users} loading={loading.users}>
                        <Column field="email" header="Email"></Column>
                        <Column header="Assigned Sitios" body={(data : any) => data.bhw_designations.length} />
                        <Column header="Role" body={(data : any) => <RolesBadges  roles={data.roles} />} />
                        <Column header="Actions" body={userActions} />
                    </DataTable>
                </div>
                <AssignBhwForm  />
                <AddBhwForm />
            </AuthMiddleware>
        </>
    )
}

export default Users;