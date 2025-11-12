"use client";

import { deleteChildcareClientRecord, getCandidates, getChildcareClients } from "@/api/childCareApi";
import { AuthMiddleware } from "@/components/middlewares";
import { showUpdateChildcareForm } from "@/features/forms/updateChildcareClientRecordSlice";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Unregistered = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        candidates : false
    });
    const registerChildcareClientStore = useSelector((state : any) => state.registerChildcareClient);
    const [paginator, setPaginator] = useState({
            candidates: useRef<any>(null)
        });
    const onPageChange = async (e: any) => {
            setLoading({ ...loading, candidates: true });
            await getCandidates(dispatch, { page: e.page + 1 });
            setLoading({ ...loading, candidates: false });
        }
    const init = async () => {
        setLoading({...loading, candidates : true});
        const _candidates = await getCandidates(dispatch);
        setData(_candidates);
        setLoading({...loading, candidates : false});
    }
    useEffect(() => {
        init();
    }, [dispatch, registerChildcareClientStore.reload]);
    return (
        <>
            <h5>Unregistered Client List</h5>
            <div className="card">
                <DataTable value={data.data} loading={loading.candidates} >
                    <Column field="fullname" header="Name"></Column>
                    <Column 
                        header="Address" 
                        body={(data) => `${data.household.barangay.barangay_name} ${data.household.barangay.municipality.municipality_name} ${data.household.barangay.municipality.province.province_name}`}
                    />
                    <Column header="Actions" body={(data) => {
                        return (
                            <div className="flex gap-2">
                                <button 
                                className="p-button p-button-sm p-button-success" 
                                onClick={() => {
                                    // dispatch(showRegisterMaternalForm({household_profile:data}))
                                }}>
                                    Register
                                </button>
                            </div>
                        )
                    }}></Column>
                </DataTable>
                <Paginator 
                    ref={paginator.candidates}
                    first={(data.current_page - 1) * data.per_page}
                    rows={data.per_page}
                    totalRecords={data.total}
                    onPageChange={onPageChange}
                />
            </div>
            {/* <RegisterMaternalClientForm /> */}
        </>
    );
}

const Registered = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        clients : false,
        delete : false
    });
    const registerChildcareClientStore = useSelector((state : any) => state.registerChildcareClient);
    const updateChildcareClientStore = useSelector((state : any) => state.updateChildcareClientRecord);
    const [paginator, setPaginator] = useState({
            clients: useRef<any>(null)
        });
    const onPageChange = async (e: any) => {
            setLoading({ ...loading, clients: true });
            await getCandidates(dispatch, { page: e.page + 1 });
            setLoading({ ...loading, clients: false });
        }
    const init = async () => {
        setLoading({...loading, clients : true});
        const _clients = await getChildcareClients(dispatch);
        setData(_clients);
        setLoading({...loading, clients : false});
    }
    const handleDelete = (event : any, data : any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete this maternal client record?',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                setLoading({ ...loading, delete: true });
                await deleteChildcareClientRecord(dispatch, data.id);
                init();
                setLoading({ ...loading, delete: false });
            }
        });
    }
    useEffect(() => {
        init();
    }, [dispatch, registerChildcareClientStore.reload, updateChildcareClientStore.reload]);
    return (
        <>
            <h5>Registered Client List</h5>
            <div className="card">
                <DataTable value={data.data} loading={loading.clients}>
                    <Column field="fullname" header="Name"></Column>
                    <Column 
                        header="Address" 
                        body={(data) => `${data.household_profile?.household?.barangay?.barangay_name} ${data.household_profile?.household?.barangay?.municipality?.municipality_name} ${data.household_profile?.household?.barangay?.municipality?.province?.province_name}`}
                    />
                    <Column header="Actions" body={(data) => {
                        return (
                            <div className="flex gap-2">
                                <Button className="p-button p-button-sm p-button-success" onClick={() => dispatch(showUpdateChildcareForm({maternal_client:data}))} label="Update" />
                                <Button className="p-button p-button-sm p-button-danger" onClick={(event : any) => handleDelete(event, data)} loading={loading.delete} label="Delete" />
                            </div>
                        )
                    }}></Column>
                </DataTable>
                <Paginator 
                    ref={paginator.clients}
                    first={(data.current_page - 1) * data.per_page}
                    rows={data.per_page}
                    totalRecords={data.total}
                    onPageChange={onPageChange}
                />
            </div>
            {/* <UpdateMaternalClientForm /> */}
        </>
    );
}


const ChildCare = () => {
    return (
            <AuthMiddleware >    
                <Unregistered />
                <Registered />
            </AuthMiddleware>
        );
};

export default ChildCare;