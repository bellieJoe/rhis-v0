"use client";

import { getSummaryReport, submitReport } from "@/api/reportApi";
import { getEnvironmentalSummary } from "@/api/summaryTableApi";
import { YearPicker } from "@/components/forms/CustomPickers";
import { AuthMiddleware } from "@/components/middlewares";
import { setToast } from "@/features/toastSlice";
import { Button } from "primereact/button";
import { confirmPopup } from "primereact/confirmpopup";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const MaternalCareReport = () => {
    const [report, setReport] = useState<any>({});
    const [year, setYear] = useState(new Date().getFullYear());
    const [barangays, setBarangays] = useState(null);
    const [barangayName, setBarangayName] = useState(null);
    const [ loading, setLoading ] = useState({ records: false, submit: false });
    const [municipality, setMunicipality] = useState(null);
    const authStore = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const handleSubmit = (e) => {
        confirmPopup({
            target: e.target,
            message: 'Are you sure you want to submit the report?',
            accept: async () => {
                if(!year || !barangays ) {
                    dispatch(setToast({severity: 'error', summary: 'Error', detail: 'Please select year'}));
                    return;
                }
                setLoading({ ...loading, submit: true });
                await submitReport(dispatch, {
                    barangayIds: authStore.user?.midwife_designations.map((d: any) => d.barangay_id), 
                    year : year 
                }, 3);
                setLoading({ ...loading, submit: false });
            }
        })
    }

    useEffect(() => {
        if(!authStore.user?.midwife_designations) return;
        setBarangays(authStore.user?.midwife_designations.map((d: any) => d.barangay_id));
        (async () => {
            setLoading({ ...loading, records: true });
            const _report = await getEnvironmentalSummary(dispatch, { 
                barangayIds: authStore.user?.midwife_designations.map((d: any) => d.barangay_id), 
                year : year 
            });
            console.log(_report);
            setReport(_report);
            setLoading({ ...loading, records: false });
        })();
    }, [authStore.user?.id, year]);

    return (
        <AuthMiddleware>
            <div className="flex justify-content-end gap-1 mb-3">
                <YearPicker value={year} onChange={(e) => setYear(e.value)} />
                <Button label="Print" icon="pi pi-print" onClick={reactToPrintFn} />
                <Button label="Submit" severity="success" size="small" icon="pi pi-send" onClick={handleSubmit} />
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
                    minWidth: "2500px"
                }}>
                    <div className="p-4" ref={contentRef}>
                        <table className="w-full border-1" style={{ borderCollapse: 'collapse' }} >
                            <thead>
                                <tr>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">Indicators</td>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">Target</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">Q1</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">Q2</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">Q3</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">Q4</td>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">OVERALL TOTAL</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1 text-center">JAN</td>
                                    <td className="border-bottom-1 border-right-1 text-center">FEB</td>
                                    <td className="border-bottom-1 border-right-1 text-center">MAR</td>
                                    <td className="border-bottom-1 border-right-1 text-center">APR</td>
                                    <td className="border-bottom-1 border-right-1 text-center">MAY</td>
                                    <td className="border-bottom-1 border-right-1 text-center">JUN</td>
                                    <td className="border-bottom-1 border-right-1 text-center">JUL</td>
                                    <td className="border-bottom-1 border-right-1 text-center">AUG</td>
                                    <td className="border-bottom-1 border-right-1 text-center">SEP</td>
                                    <td className="border-bottom-1 border-right-1 text-center">OCT</td>
                                    <td className="border-bottom-1 border-right-1 text-center">NOV</td>
                                    <td className="border-bottom-1 border-right-1 text-center">DEC</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td colSpan={16} className="bg-gray-200 border-bottom-1 border-right-1">Actual Number of Household</td>
                                </tr>
                                {
                                    report[0] && report[0].map((r: any, i: number) => (
                                        (
                                            <tr key={i}>
                                                <td className=" border-bottom-1 border-right-1">{ r.label }</td>
                                                <td className=" border-bottom-1 border-right-1"></td>
                                                {
                                                    r.data.map((d: any, j: number) => (
                                                        <td key={j} className="border-bottom-1 border-right-1 text-center">{ d }</td>
                                                    ))
                                                }
                                            </tr>
                                        )
                                    ))
                                }
                                <tr className="bg-gray-200 ">
                                    <td  className="bg-gray-200 border-bottom-1 border-right-1"></td>
                                    <td  className="bg-gray-200 border-bottom-1 border-right-1 font-bold">Total No. of Barangays</td>
                                    <td colSpan={13} className="bg-gray-200 border-bottom-1 border-right-1 font-bold"></td>
                                </tr>
                                {
                                    report[1] && report[1].map((r: any, i: number) => (
                                        (
                                            <tr key={i}>
                                                <td className=" border-bottom-1 border-right-1">{ r.label }</td>
                                                <td className=" border-bottom-1 border-right-1"></td>
                                                {
                                                    r.data.map((d: any, j: number) => (
                                                        <td key={j} className="border-bottom-1 border-right-1 text-center">{ d }</td>
                                                    ))
                                                }
                                            </tr>
                                        )
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthMiddleware>
    )
}

export default MaternalCareReport;