"use client";
import { getUsers } from "@/api/userApi";
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
    const { users } = useSelector((state : any) => state.user);
    const [loading, setLoading] = useState({
        users : false
    })

    useEffect(() => {
        (async() => {
            setLoading({ ...loading,users : true });
            await getUsers(dispatch);
            setLoading({ ...loading,users : false });
        })();
    }, []);

    return (
        <>
        <div className="card">
            <h5>Users</h5>
            <DataTable value={users.data} loading={loading.users}>
                <Column field="email" header="Email"></Column>
                <Column header="Role" body={(data : any) => <RolesBadges  roles={data.roles} />} />
                <Column header="Actions" />
            </DataTable>
            
        </div>
        </>
    )
}

export default Users;