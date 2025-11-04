"use client"
import { AuthMiddleware } from "@/components/middlewares";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Unregistered = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    return (
        <>
            <h5>Unregistered Client List</h5>
            <div className="card">
                <DataTable value={data} >
                    <Column field="name" header="Name"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column header="Actions" body={() => {
                        return (
                            <div className="flex gap-2">
                                <button className="p-button p-button-sm p-button-success" >Register</button>
                            </div>
                        )
                    }}></Column>
                </DataTable>
            </div>
        </>
    );
}

const Registered = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    return (
        <>
            <h5>Registered Client List</h5>
            <div className="card">
                <DataTable value={data} >
                    <Column field="name" header="Name"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column header="Actions" body={() => {
                        return (
                            <div className="flex gap-2">
                                <button className="p-button p-button-sm p-button-success" >Register</button>
                            </div>
                        )
                    }}></Column>
                </DataTable>
            </div>
        </>
    );
}

const MaternalCare = () => {
    return (
        <AuthMiddleware>    
            <Unregistered />
            <Registered />
        </AuthMiddleware>
    );
}

export default MaternalCare;