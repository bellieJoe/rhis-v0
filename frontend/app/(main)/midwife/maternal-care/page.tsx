"use client"
import { getCandidates, getMaternalClients } from "@/api/maternalCareApi";
import { AuthMiddleware } from "@/components/middlewares";
import RegisterMaternalClientForm from "@/components/RegisterMaternalClientForm";
import UpdateMaternalClientForm from "@/components/UpdateMaternalClientForm";
import { showRegisterMaternalForm } from "@/features/forms/registerMaternalClient";
import { showUpdateMaternalForm } from "@/features/forms/updateMaternalClientRecord";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Unregistered = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        candidates : false
    });
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
    }, [dispatch]);
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
                                    dispatch(showRegisterMaternalForm({household_profile:data}))
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
            <RegisterMaternalClientForm />
        </>
    );
}

const Registered = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({
        clients : false
    });
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
        const _clients = await getMaternalClients(dispatch);
        setData(_clients);
        setLoading({...loading, clients : false});
    }
    useEffect(() => {
        init();
    }, [dispatch]);
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
                                <button className="p-button p-button-sm p-button-success" onClick={() => dispatch(showUpdateMaternalForm({maternal_client:data}))}>Update Maternal Record</button>
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
            <UpdateMaternalClientForm />
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