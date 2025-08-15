"use client";
import { getOffices } from "@/api/officeApi";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface OfficeTypeBadgesProps {
    office_type: "barangay" | "rhu" | "pho" | string;
}
const OfficeTypeBadge = ({ office_type }: OfficeTypeBadgesProps) => {
    return (
        <>
            <div className="">
                {
                    office_type === "pho" && <Tag severity="info">{office_type.toUpperCase()}</Tag>
                }
                {
                    office_type === "rhu" && <Tag severity="success">{office_type.toUpperCase()}</Tag>
                }
                {
                    office_type === "barangay" && <Tag >{office_type.toUpperCase()}</Tag>
                }
            </div>
        </>
    )
}
const Offices = () => {
    const dispatch = useDispatch();
    const offices = useSelector((state:any) => state.office.offices);
    const [loading, setLoading] = useState({
        offices: false
    });
    const [paginator, setPaginator] = useState({
        offices: useRef<any>(null)
    });

    useEffect(() => {
        (async () => {
            setLoading({ ...loading, offices: true });
            await getOffices(dispatch, {});  
            setLoading({ ...loading, offices: false });
        })();
    }, []);

    const onPageChange = async (e: any) => {
        setLoading({ ...loading, offices: true });
        await getOffices(dispatch, { page: e.page + 1 });
        console.log(offices);
        setLoading({ ...loading, offices: false });
    };

    return (
        <>
            <div className="card">
                <h5>Offices</h5>
                <DataTable value={offices.data} loading={loading.offices} >
                    <Column field="name" header="Office Name"></Column>
                    <Column field="office_type" header="Office Type" body={(data : any) => <OfficeTypeBadge office_type={data.office_type} />}  />
                    <Column header="Address" field="address" />
                    <Column header="Parent Office" body={(data : any) => data.parent_office_name ? data.parent_office_name : "N/A"}  />
                    {/* <Column header="Actions" /> */}
                </DataTable>
                <Paginator 
                    ref={paginator.offices}
                    first={(offices.current_page - 1) * offices.per_page}
                    rows={offices.per_page}
                    totalRecords={offices.total}
                    onPageChange={onPageChange}
                />
            </div>  
        </>
    )
}

export default Offices;

