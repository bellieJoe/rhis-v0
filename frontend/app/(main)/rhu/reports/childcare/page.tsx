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
                                    <td rowSpan={2} width={"90px"} className="border-bottom-1 border-right-1 text-center font-bold">Elig. Pop.</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">JAN</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">AUG</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">SEP</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">3rd Qtr</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">OCT</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">NOV</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">DEC</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">4th Qtr</td>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={29} className="bg-gray-200 font-bold border-bottom-1">Part 1 - Immunization and Nutrition Services</td>
                                </tr>
                                <tr>
                                    <td colSpan={29} className="font-bold border-bottom-1">A.  Immunization Services</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.    Newborns/infants vaccinated with:</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• BCG - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• HepB1, w/in 24 hours-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• Child Protected at Birth - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• DPT-HiB-HepB 1  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• DPT-HiB-HepB 2  - Total </td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• DPT-HiB-HepB 3  - Total </td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• OPV  1 - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• OPV 2 - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• OPV 3 - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• IPV 1  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• IPV 2 (routine)  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• IPV 2 (catch-up)  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• PCV 1  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• PCV 2 - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• PCV 3 - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• MCV 1 - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• MCV 2- Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2.    Fully Immunized Child - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">3.    Completely Immunized Child (13-23 months) - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={29} className="font-bold border-bottom-1">4.    School-Based Immunization</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">4.1.  Total Grade 1 Learners: </td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• Td  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• MR  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">4.2.  Total Grade 7 Learners: </td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• Td  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">• MR  - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={29} className="font-bold border-bottom-1">B. Nutrition Services</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">5.   Newborns initiated on breastfeeding immediately after birth lasting for at least 90 minutes - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">6.    Preterm infants and/or infants with low birth weight given iron supplement starting 1 month until 3 months - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">7.    Infants exclusively breastfed until 5th month and 29 days - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">8.    Infants 6 months old who have initiated and received complementaryfood with continued BF - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">9.    Infants 6 months old who have initiated and received complementary feeding but has stopped BF or has never been breastfed at all - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">10.  Infants, 6-11 months old given 1 dose of Vitamin A 100,000 I.U. - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">11.  Children, 12-59 months old given 2 doses of Vitamin A 200,000 I.U. - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <td rowSpan={2} width={"200px"} className="border-bottom-1 border-right-1 text-center font-bold">INDICATORS</td>
                                    <td rowSpan={2} width={"90px"} className="border-bottom-1 border-right-1 text-center font-bold">Elig. Pop.</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">JAN</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">AUG</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">SEP</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">3rd Qtr</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">OCT</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">NOV</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">DEC</td>
                                    <td colSpan={3} className="border-bottom-1 border-right-1 text-center font-bold">4th Qtr</td>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">13.  Children, 12-23 months old who completed MNP supplementation - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.  Nutritional Status 0-59 mons</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.1.  Stunted - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.  Wasted - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.a.  MAM - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.a.1.MAM-admitted in SFT-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.a.2 MAM-cured in SFP-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.a.3 MAM-defaulted in SFP-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.a.4 MAM died in SFP-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.b.  SAM - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.b.1 SAM- admitted to OTC-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.b.2 SAM - cured in OTC-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.b.2 SAM-defaulted in OTC-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.2.b.2 SAM- died in OTC-Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.3.  Overweight and Obese - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">14.4.  Normal - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={29} className="bg-gray-200 font-bold border-bottom-1">Part 2 - Deworming Services</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.    Children given 2 doses of deworming tablet - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.1.  PSAC, 1 to 4 y.o. - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.2.  SAC, 5-9 y.o. - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.3.  Adolescents, 10-19 y.o. - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={29} className="bg-gray-200 font-bold border-bottom-1">Part 3 - Management of Sick Infants and Children</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.    Sick Children seen - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.1   6-11 mos. - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">1.2   12-59 mos. - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2.    Sick Children who received Vitamin A - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2.1   6-11 months old - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">2.2   12-59 months old - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">3.    Diarrhea Cases 0-59 months old seen - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">3.1.  0-59 months old diarrhea cases who received ORS - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">3.2.  0-59 months old diarrhea cases who received ORS w/ oral zinc drops or syrup - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">4.    Pneumonia cases 0-59 months old seen - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">4.1.  Pneumonia cases 0-59 months old who completed Treatment - Total</td>
                                    {Array.from({ length: 28 }).map((_, i) => (
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