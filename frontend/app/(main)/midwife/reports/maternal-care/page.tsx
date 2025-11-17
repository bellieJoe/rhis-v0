"use client";

import { getSummaryReport } from "@/api/reportApi";
import { YearPicker } from "@/components/forms/CustomPickers";
import { AuthMiddleware } from "@/components/middlewares";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const MaternalCareReport = () => {
    const [report, setReport] = useState<any>({});
    const [year, setYear] = useState(new Date().getFullYear());
    const [barangay, setBarangay] = useState(null);
    const [barangayName, setBarangayName] = useState(null);
    const [ loading, setLoading ] = useState({ records: false });
    const [municipality, setMunicipality] = useState(null);
    const authStore = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
     const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    // useEffect(() => {
    //     setBarangay(authStore.user?.bhw_designations[0]?.barangay_id);
    //     setBarangayName(authStore.user?.bhw_designations[0]?.barangay?.full_address);
    //     (async () => {
    //         setLoading({ ...loading, records: true });
    //         console.log(authStore.user?.bhw_designations[0]);
    //         const _report = await getSummaryReport(dispatch, { barangay, year });
    //         console.log(_report);
    //         setReport(_report);
    //         setLoading({ ...loading, records: false });
    //     })();
    // }, [authStore.user?.id, year]);
    const verticalText: React.CSSProperties = {
        writingMode: 'vertical-rl',       // makes text vertical top-to-bottom
        textOrientation: 'upright',       // makes letters upright
        WebkitTextOrientation: 'upright', // for Safari support
        whiteSpace: 'nowrap',             // prevent wrapping
        textAlign: 'center',
    };

    return (
        <AuthMiddleware>
            <div className="flex justify-content-end gap-1 mb-3">
                <YearPicker value={year} onChange={(e) => setYear(e.value)} />
                <Button label="Print" icon="pi pi-print" onClick={reactToPrintFn} />
            </div>
            <div className="card" style={{
                overflowX: "scroll"
            }}>
                {
                    loading.records && (
                        <div className="flex gap-2">
                            <ProgressSpinner className="flex-none" style={{width: '20px', height: '20px'}} strokeWidth="8" aria-label="Loading"  /> 
                            <span className="flex-grow-1">Loading</span>
                        </div>
                    )
                }
                <div className="" style={{
                    minWidth: "1500px"
                }}>
                    <div className="p-4" ref={contentRef}>
                        <table className="w-full border-1" style={{ borderCollapse: 'collapse' }} >
                            <thead>
                                <tr>
                                    <td rowSpan={2} className="border-bottom-1 border-right-1 text-center font-bold">INDICATORS</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">JAN</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">FEB</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">MAR</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">APR</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">MAY</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">JUN</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">JUL</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">AUG</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">SEP</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">OCT</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">NOV</td>
                                    <td colSpan={4} className="border-bottom-1 border-right-1 text-center font-bold">DEC</td>
                                    <td rowSpan={2} className="border-bottom-1 text-center font-bold">Remarks</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={verticalText}>asd</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthMiddleware>
    )
}

export default MaternalCareReport;