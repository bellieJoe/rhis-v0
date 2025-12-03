"use client";
import { getOffices } from "@/api/officeApi";
import { getEnvironmental } from "@/api/phoReportApi";
import { OfficePicker } from "@/components/forms/CustomPickers";
import { setToast } from "@/features/toastSlice";
import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from "primereact/progressspinner";
import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";

const Page = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        office: null,
        start: moment().startOf('month').toDate(),
        end: moment().endOf('month').toDate(),
        office_name: null
    });
    const [loading, setLoading] = useState<any>({
        data : false
    });

    useEffect(() => {
        (async() => {
            const _offices = await getOffices(dispatch, { full: true });
            setFilters({ ...filters, office_name: _offices.find((o : any) => o.id === filters.office)?.municipality.municipality_name });
        })()
    }, [filters.office]);
    
    const getData = async () => {
        if(!filters.office || !filters.start || !filters.end){ 
            setToast({severity : "error", summary : "Error", detail : "Please select all fields", life : 3000});
            return;
        }
        setLoading({ ...loading, data: true });
        const _data = await getEnvironmental(dispatch, {
            start: moment(filters.start).format('YYYY-MM-DD'),
            end: moment(filters.end).format('YYYY-MM-DD'),
            office: filters.office
        });
        setData(_data);
        setLoading({ ...loading, data: false });
    }

    const contentRef = createRef<HTMLDivElement>();
    const reactToPrintFn = useReactToPrint({ contentRef });

    // useEffect(() => {
    //     console.log(filters);
    // }, [dispatch]);

    return (
        <div className="">
            <div className="flex justify-content-end gap-2 mb-2">
                <OfficePicker placeholder="Select Municipality" onChange={(e) => setFilters({ ...filters, office: e })} office_type="rhu" office={filters.office} />
                <Calendar value={filters.start} onChange={(e) => setFilters({ ...filters, start: e.value })} placeholder="From" />
                <Calendar value={filters.end} onChange={(e) => setFilters({ ...filters, end: e.value })}  placeholder="To" />
                <Button label="Filter" onClick={getData} />
                <Button label="Print" icon="pi pi-print" onClick={reactToPrintFn} />
            </div>
            <div className="card">
                <div className="" style={{
                    overflowX: "scroll"
                }}>
                    {
                        loading.data && (
                            <div className="flex gap-2">
                                <ProgressSpinner className="flex-none" style={{width: '20px', height: '20px'}} strokeWidth="8" aria-label="Loading"  /> 
                                <span className="flex-grow-1">Loading</span>
                            </div>
                        )
                    }
                    <div className="" ref={contentRef} style={{
                         minWidth: "1500px"
                    }}>
                        <h5 className="text-center mb-0">ENVIRONMENTAL</h5>
                        <p className="text-center mb-0">Households with access to basic safe and managed water supply and sanitaion services</p>
                        <p className="text-center mb-0">{filters.office_name?.toUpperCase()}, MARINDUQUE</p>
                        <p className="text-center mb-0">From {moment(filters.start).format('MMMM DD, YYYY')} &nbsp;&nbsp;&nbsp;&nbsp; To {moment(filters.end).format('MMMM DD, YYYY')} </p>
                        <br />
                        <table className="w-full border-1" style={{ borderCollapse: 'collapse' }} >
                            <thead>
                                <tr>
                                    <th width="200px" className="border-bottom-1 border-right-1 text-center font-bold " >Area</th>
                                    <th width="120px" className="border-bottom-1 border-right-1 text-center font-bold" >Number of HH (Projected)</th>
                                    <th width="300px" className="border-bottom-1 border-right-1 text-center font-bold" >HH with access to basic safe water supply</th>
                                    <th width="120px" className="border-bottom-1 border-right-1 text-center font-bold" >% HH with access to basic save water supply</th>
                                    <th width="120px"  className="border-bottom-1 border-right-1 text-center font-bold" >HHs using safely managed drinking water</th>
                                    <th width="120px"  className="border-bottom-1 border-right-1 text-center font-bold" >% HHs using safely managed drinking water</th>
                                    <th className="border-bottom-1 border-right-1 text-center font-bold" >HH with basic sanitation facility</th>
                                    <th width="120px"  className="border-bottom-1 border-right-1 text-center font-bold" >% HH with basic sanitation facility</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((d, i) => (
                                        <tr key={i}>
                                            <td className="border-bottom-1 border-right-1">{d.barangay?.full_address}</td>
                                            <td className="border-bottom-1 border-right-1 text-center">{d.c1}</td>
                                            <td className="border-bottom-1 border-right-1 text-center">{d.c2}</td>
                                            <td className="border-bottom-1 border-right-1 text-center">{d.c1 > 0 ? ((d.c2 / d.c1) * 100).toFixed(2) : 0}%</td>
                                            <td className="border-bottom-1 border-right-1 text-center">{d.c3}</td>
                                            <td className="border-bottom-1 border-right-1 text-center">{d.c1 > 0 ? ((d.c3 / d.c1) * 100).toFixed(2) : 0}%</td>
                                            <td className="border-bottom-1 border-right-1 text-center">{d.c4}</td>
                                            <td className="border-bottom-1 border-right-1 text-center">{d.c1 > 0 ? ((d.c4 / d.c1) * 100).toFixed(2) : 0}%</td>
                                        </tr>
                                    ))
                                }
                                {
                                    data.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="border-bottom-1 border-right-1 text-center">No data</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;