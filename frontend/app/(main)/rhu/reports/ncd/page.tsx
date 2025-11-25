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
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">INDICATORS</td>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">TARGET / ELIG. POP.</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">JAN</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">FEB</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">MAR</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">1ST QTR</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">APR</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">MAY</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">JUN</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">2ND QTR</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">JUL</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">AUG</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">SEP</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">3RD QTR</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">OCT</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">NOV</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">DEC</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">4TH QTR</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">TOTAL</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                    <td className="border-bottom-1 border-right-1 text-center">M</td>
                                    <td className="border-bottom-1 border-right-1 text-center">F</td>
                                    <td className="border-bottom-1 border-right-1 text-center">T</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={53} className="bg-dark-200 border-bottom-1 border-right-1">Part 1. Lifestyle Related Diseases (Risk-Assessed Using the PhilPEN protocol)</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1. No. of WRA with Unmet Need for MFP - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2. Current smoker - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">3. Alcohol binge drinker-Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">4. Overweight/Obese-Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={53} className="bg-dark-200 border-bottom-1 border-right-1">Part 2. Cancer Prevention and Control</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1. No. of adult women screened for Cervical Cancer using VIA/Pap Smear - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2. No. of adult women found positive or suspect for Cervical Cancer using VIA or Pap Smear - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">3. No. of adult women screened for breast mass - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">4. No. of adult women with suspicious breast mass - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={53} className="bg-dark-200 border-bottom-1 border-right-1">Part 3. Cardiovascular Disease Prevention and Control</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1. No. of newly-identified hypertensive adults - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={53} className="bg-dark-200 border-bottom-1 border-right-1">Part 4. Diabetes Mellitus Prevention and Control</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1. No. of newly-identified adults with Type 2 DM-Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={53} className="bg-dark-200 border-bottom-1 border-right-1">Part 5. Blindness Prevention Program</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1. No. of senior citizens screened for visual acuity - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2. No. of  senior citizens diagnosed with eye disease/s - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={53} className="bg-dark-200 border-bottom-1 border-right-1">Part 6. Immunization for Senior Citizens</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1. No. of senior citizens who received one (1) dose of PPV - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2. No. of senior citizens who received one (1) dose of influenza vaccine - Total</td>
                                    {Array.from({ length: 52 }).map((_, i) => (
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