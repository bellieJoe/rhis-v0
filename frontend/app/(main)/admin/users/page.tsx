"use client";
import { getUsers } from "@/api/userApi";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UsersProps {
    
}

const Users = (props : UsersProps) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state : any) => state.user);
    const [loading, setLoading] = useState({
        users : false
    })

    useEffect(() => {
        (async() => {
            loading.users = true;
            await getUsers(dispatch);
            loading.users = false;
        })();
    }, []);

    return (
        <>
            <DataTable value={users} >
                <Column field="email" header="Email"></Column>
            </DataTable>
        </>
    )
}

export default Users;