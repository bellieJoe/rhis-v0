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
                                    <td colSpan={16} className="bg-gray-200 border-bottom-1 border-right-1">1. No. of HHs with access to basic safe water supply - Total</td>
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">a. No. of HHs with Level I - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">b. No. of HHs with Level II - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">c. No. of HHs with Level III - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">2. No. of HHs using safely manageddrinking-water services - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">3. No of HHs with basic sanitation facility - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">a. No. of HH with pour/flush toilet connected to septic tank - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">b. No. of HHs with pour/flush toilet connected to community sewer/ sewerage system or any other approved treatment system-Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">c. No. of HHs with ventilated improved pit latrine (VIP) - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">4. No. of HHs using safely managed sanitation services - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className=" border-bottom-1 border-right-1">5a. No. of industrial establishments - Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr className="bg-gray-200 ">
                                    <td  className="bg-gray-200 border-bottom-1 border-right-1"></td>
                                    <td  className="bg-gray-200 border-bottom-1 border-right-1 font-bold">Total No. of Barangays</td>
                                    <td colSpan={13} className="bg-gray-200 border-bottom-1 border-right-1 font-bold"></td>
                                </tr>
                                <tr>
                                    <td className="bg-dark-200 border-bottom-1 border-right-1">6. No. of Barangays Declared ZOD-Total</td>
                                    {Array.from({ length: 14 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
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