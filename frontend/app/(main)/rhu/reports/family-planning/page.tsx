"use client";

import { getSummaryReport } from "@/api/reportApi";
import { getFamilyPlanningSummary } from "@/api/summaryTableApi";
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

    useEffect(() => {
        if(!authStore.user?.midwife_designations) return;
        setBarangay(authStore.user?.bhw_designations[0]?.barangay_id);
        (async () => {
            setLoading({ ...loading, records: true });
            console.log(authStore.user?.bhw_designations[0]);
            const _report = await getFamilyPlanningSummary(dispatch, { 
                barangayIds : authStore.user?.rhu_designation.office.offices.map((d: any) => d.barangay_id), 
                year: year 
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
                                    <td className="border-bottom-1 border-right-1 font-bold bg-gray-200">1. No. of WRA with Unmet Need for MFP - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1 font-bold bg-gray-200">2. Current Users Beginning - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                {
                                    (report && report[0]) && report[0].map((d: any, i: number) => (
                                        <tr key={d}>
                                            <td className="border-bottom-1 border-right-1">{d.label}</td>
                                            {
                                                d.data?.map((m: any, i: number) => (
                                                    m.map((v: any, i: number) => (
                                                        <td key={`${v}-${i}`} className="border-bottom-1 border-right-1 text-center">{v}</td>
                                                    ))
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">3. Total New Acceptors</td>
                                </tr>
                                {
                                    (report && report[1]) && report[1].map((d: any, i: number) => (
                                        <tr key={d}>
                                            <td className="border-bottom-1 border-right-1">{d.label}</td>
                                            {
                                                d.data?.map((m: any, i: number) => (
                                                    m.map((v: any, i: number) => (
                                                        <td key={`${v}-${i}`} className="border-bottom-1 border-right-1 text-center">{v}</td>
                                                    ))
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
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
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">4. Total Other Acceptors</td>
                                </tr>
                                {
                                    (report && report[2]) && report[2].map((d: any, i: number) => (
                                        <tr key={d}>
                                            <td className="border-bottom-1 border-right-1">{d.label}</td>
                                            {
                                                d.data?.map((m: any, i: number) => (
                                                    m.map((v: any, i: number) => (
                                                        <td key={`${v}-${i}`} className="border-bottom-1 border-right-1 text-center">{v}</td>
                                                    ))
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">5. Total Drop-outs</td>
                                </tr>
                                {
                                    (report && report[3]) && report[3].map((d: any, i: number) => (
                                        <tr key={d}>
                                            <td className="border-bottom-1 border-right-1">{d.label}</td>
                                            {
                                                d.data?.map((m: any, i: number) => (
                                                    m.map((v: any, i: number) => (
                                                        <td key={`${v}-${i}`} className="border-bottom-1 border-right-1 text-center">{v}</td>
                                                    ))
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
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
                                    <td colSpan={50} className="bg-gray-200 font-bold border-bottom-1">6. Total Current Users End</td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">a. Bilateral Tubal Ligation (BTL) - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">b. No-Scalpel Vasectomy (NSV) - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">c. Condom – Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">d. Pills (POP & COC)- Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">d.1. Pills-POP - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">d.2. Pills-COC - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">e. Injectables (DMPA/CIC) - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">f. Implant - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">g. IUD (I & PP)- Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">g.1. IUD-I - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">g.2. IUD-PP - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">h. NFP-LAM - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">i. NFP-BBT – Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">j. NFP-CMM - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">k. NFP-STM – Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
                                    <td key={i} className="border-bottom-1 border-right-1 text-center"></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-bottom-1 border-right-1">l. NFP-SDM - Total</td>
                                    {Array.from({ length: 48 }).map((_, i) => (
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