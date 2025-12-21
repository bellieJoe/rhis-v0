"use client";
import { getBhwDesignationsByUserId } from "@/api/bhwDesignationApi";
import { getBhwsByCaptain, getUsers } from "@/api/userApi";
import AddBhwForm from "@/components/AddBhwForm";
import AddUserForm from "@/components/AddUserForm";
import AssignBhwForm from "@/components/AssignBhwForm";
import AssignCaptainForm from "@/components/AssignCaptainForm";
import AssignMidwifeForm from "@/components/AssignMidwifeForm";
import AssignRhuForm from "@/components/AssignRhuForm";
import { AuthMiddleware } from "@/components/middlewares";
import { showAddBhwForm } from "@/features/forms/addBhwSlice";
import { showAddUserForm } from "@/features/forms/addUserSlice";
import { assignBhw } from "@/features/forms/assignBhwFormSlice";
import { assignCaptain } from "@/features/forms/assignCaptainFormSlice";
import { assignMidwife } from "@/features/forms/assignMidwifeSlice";
import { assignRhu } from "@/features/forms/assignRhuSlice";
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
    
    useEffect(() => {
        (async() => {
            setLoading({ ...loading,users : true });
            const _users = await getBhwsByCaptain(dispatch, authStore.user?.id);
            setUsers(_users);
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
                <div className="card">
                    <h5>Users</h5>
                    <div className="flex justify-content-end mb-3">
                        <Button size="small" label="Add BHW" icon="pi pi-plus" onClick={() => dispatch(showAddBhwForm({user_id : authStore.user?.id}))} />
                    </div>
                    <DataTable value={users} loading={loading.users}>
                        <Column field="email" header="Email"></Column>
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