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
                                <tr>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">Prenatal Care</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1. No. of pregnant women with at least 4 prenatal check-ups - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2. No. of pregnant women assessed of their nutritional status during the 1st trimester - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">a. Number of pregnant women seen in the first trimester who have normal BMI -Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b. No. of pregnant women seen in the first trimester who have low BMI - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">c. No. of pregnant women seen in the first trimester who have high BMI - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">3. No. of pregnant women for the first time given at least 2 doses of Td vaccination - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">4. No. of pregnant women for the 2nd or more times given at least 3 doses of Td vaccination (Td2 Plus) - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">5. No. of pregnant women who completed the dose of iron with folic acid supplementation - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">6. No. of pregnant women who completed doses of calcium carbonate supplementation - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">7. No. of pregnant women given iodine capsules – Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">INDICATORS</td>
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
                                <tr>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">8. No. of pregnant women given one dose of deworming tablet - Total </td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">9. No. of pregnant women screened for syphilis - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">10. No. of pregnant women tested positive for syphilis - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">11. No. of pregnant women screened for Hepatitis B - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">12. No. of pregnant women tested positive for Hepatitis B - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">13. No. of pregnant women screened for HIV - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14. No. of pregnant women tested for CBC or Hgb&Hct count-Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">15.No. of pregnant women tested for CBC or Hgb & Hct count diagnosed with anemia - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">16. No. of pregnant women screened for gestational diabetes – Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">17. No. of pregnant women tested positive for gestational diabetes – Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">Intrapartum Care and Delivery Outcome</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">18. No. of deliveries -Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">19. No. of live births -Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">20. No. of live births by birth weight - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">a. No. of live births with normal birth weight-Tot.</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">INDICATORS</td>
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
                                <tr>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b1. No. of live births with low birth weight - Male</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b2. No. of live births with low birth weight - Female</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">c. No. of live births with unknown birth weight- Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">21. No. of deliveries attended by skilled health professionals - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">a. No. of deliveries attended by a physician</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b. No. of deliveries attended by a nurse</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">c. No. of deliveries attended by midwives </td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">22. No. of health facility-based deliveries - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">23. No. of deliveries by health facility ownership - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">a. No. of deliveries in public health facility - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b. No. of deliveries in private health facility - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">24. No. of non-facility-based deliveries - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">25. Type of Delivery</td>
                                    <td colSpan={49} className="border-bottom-1 border-right-1"></td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">a. No. of vaginal deliveries – Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b. No. of deliveries by CS – Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">26. Pregnancy outcome</td>
                                    <td colSpan={49} className="border-bottom-1 border-right-1"></td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">a. No. of full-term births</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b. No. of pre-term births</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">c. No. of fetal deaths</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">d. No. of abortion/ miscarriage</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">Prenatal Care</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">INDICATORS</td>
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
                                <tr>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                    <td className="border-bottom-1 border-right-1 text-center">10-14</td>
                                    <td className="border-bottom-1 border-right-1 text-center">15-19</td>
                                    <td className="border-bottom-1 border-right-1 text-center">20-49</td>
                                    <td className="border-bottom-1 border-right-1 text-center">Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">27. No. of postpartum women together with their newborn who completed at least 2 postpartum check-ups - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">28. No. of postpartum women who completed iron with folic acid supplementation-Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">29. No. of postpartum women with Vitamin A supplementation - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">Additional Indicators</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">28. No. of pregnant women who were diagnosed with hypertension - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">29. No. of women who gave birth who has access the closest birthing facility within 2 hours - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">30a. No. of deliveries with 4ANC – Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">30b. No. of deliveries with 1ANC during 1st trimester – Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">31. No. of women who gave birth for the 1st time - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">32. No. of women who gave birth who are Grand Multigravida (G5 and above) - Total</td>
                                    {Array.from({ length: 49 }).map((_, i) => (
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