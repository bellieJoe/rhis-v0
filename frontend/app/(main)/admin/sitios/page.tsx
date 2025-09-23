"use client"

import { deleteSitio, getSitios } from "@/api/sitioApi";
import AddSitioForm from "@/components/AddSitioForm";
import { BarangayPicker, MunicipalityPicker } from "@/components/forms/CustomPickers";
import UpdateSitioForm from "@/components/UpdateSitioForm";
import { showUpdateSitio } from "@/features/forms/updateSitioFormSlice";
import { reloadSitios } from "@/features/sitioSlice";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SitioPage = () => {

    const [filter, setFilter] = useState({
        municipality : null,
        barangay : null
    });
    const dispatch = useDispatch();
    const sitioStore = useSelector((state : any) => state.sitio);
    const [sitios, setSitios] = useState<any>({});
    const [loading, setLoading] = useState({
        sitioTable : false,
        sitioDelete : false
    });
    const init = async () => {
        setLoading({...loading, sitioTable : true});
        const _sitios = await getSitios(dispatch, {...filter});
        console.log(_sitios);
        setSitios(_sitios);
        setLoading({...loading, sitioTable : false});
    }
    const [paginator, setPaginator] = useState({
        sitios: useRef<any>(null)
    });
    const onPageChange = async (e : any) => {
        setLoading({...loading, sitioTable : true});
        const _sitios = await getSitios(dispatch, {...filter, page : e.page + 1});
        console.log(_sitios);
        setSitios(_sitios);
        setLoading({...loading, sitioTable : false});
    }
    const onSitioDelete = (e : any, data : any) => {
        confirmPopup({
            target: e.currentTarget,
            message: 'Are you sure you want to delete this sitio?',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                setLoading({...loading, sitioTable : true});
                const _success = await deleteSitio(dispatch, data.id);
                if(_success) 
                    dispatch(reloadSitios());
                setLoading({...loading, sitioTable : false});
            },
        })
    }
    const SitioActions = (data : any) => {
        return (
            <>
                <div className="flex gap-2">
                    <Button type="button" outlined size="small" severity="danger" icon="pi pi-trash" onClick={(e) => onSitioDelete(e, data)}></Button>
                    <Button type="button" outlined size="small" icon="pi pi-pencil" onClick={(e) => dispatch(showUpdateSitio({sitio : data}))} ></Button>
                </div>
            </>
        )
    }
    
    useEffect(() => {
        init();
    }, [filter.barangay, sitioStore.reload]);
    

    return (
        <div>
            <div className="card">
                <h5>Purok/Sitios</h5>
                <div className="flex justify-content-end mb-2 gap-2">
                    <MunicipalityPicker onChange={(e : any) => setFilter({...filter, municipality : e})} municipality={filter.municipality} />
                    <BarangayPicker onChange={(e : any) => setFilter({...filter, barangay : e})} barangay={filter.barangay} municipality={filter.municipality} />
                    <AddSitioForm />
                </div>
                <DataTable loading={loading.sitioTable} value={sitios.data}>
                    <Column field="sitio_name" header="Name" />
                    <Column field="barangay.full_address" header="Full Address" />
                    <Column header="Actions" body={SitioActions} />
                </DataTable>
                <Paginator 
                    ref={paginator.sitios}
                    first={(sitios.current_page - 1) * sitios.per_page}
                    rows={sitios.per_page}
                    totalRecords={sitios.total}
                    onPageChange={onPageChange}
                />
            </div>

            <UpdateSitioForm />
        </div>
    )
}

export default SitioPage;