"use client";

import { getSummaryReport } from "@/api/reportApi";
import { YearPicker } from "@/components/forms/CustomPickers";
import { AuthMiddleware } from "@/components/middlewares";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const SummaryReport = () => {
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
        setBarangay(authStore.user?.bhw_designations[0]?.barangay_id);
        setBarangayName(authStore.user?.bhw_designations[0]?.barangay?.full_address);
        (async () => {
            setLoading({ ...loading, records: true });
            console.log(authStore.user?.bhw_designations[0]);
            const _report = await getSummaryReport(dispatch, { barangay, year });
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
            <div className="card">
                {
                    loading.records && (
                        <div className="flex gap-2">
                            <ProgressSpinner className="flex-none" style={{width: '20px', height: '20px'}} strokeWidth="8" aria-label="Loading"  /> 
                            <span className="flex-grow-1">Loading</span>
                        </div>
                    )
                }
                <div className="p-4" ref={contentRef}>
                    <h5 className="text-center mb-0">Summary Report</h5>
                    <h6 className="text-center mt-0">{ year }</h6>
                    <div className="grid text-sm leading-tight">
                        <div className="col-6">
                            <p className="mb-0">BRGY. <span className="underline">&nbsp; { barangayName } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">ACTUAL POPULATION: <span className="underline">&nbsp; { report.actual_population } &nbsp;</span></p>
                            <p className="mb-0">TOTAL NO. OF HOUSEHOLDS: <span className="underline">&nbsp; { report.total_no_of_households } &nbsp;</span></p>
                            <p className="mb-0">TOTAL NO. OF FAMILIES: <span className="underline">&nbsp; { report.total_no_of_households } &nbsp;</span></p>

                            <p className="mt-4 mb-0">TOTAL NO. OF HH WITH SANITARY TOILET: <span className="underline">&nbsp; { report.total_no_of_hh_with_sanitary_toilet } &nbsp;</span></p>
                            <p className="mb-0">TOTAL NO. OF HH WITH UNSANITARY TOILET: <span className="underline">&nbsp; { report.total_no_of_hh_without_sanitary_toilet } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF CHILDREN: </p>
                            <p className="mb-0 ">0-5 MONTHS: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.zero_to_five_months_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.zero_to_five_months_female } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">6-11 MONTHS: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.six_to_eleven_months_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.six_to_eleven_months_female } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">1-4 YEARS OLD: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.one_to_four_years_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.one_to_four_years_female } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">5-9 YEARS OLD: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.five_to_nine_years_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.five_to_nine_years_female } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">10-19 YEARS OLD: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.ten_to_nineteen_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.ten_to_nineteen_female } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">TOTAL NO. OF MWRA: </p>
                            <p className="mb-0 ">10-14: <span className="underline">&nbsp; { report.total_no_of_mwra_ten_to_fourteen } &nbsp;</span></p>
                            <p className="mb-0 ">15-19: <span className="underline">&nbsp; { report.total_no_of_mwra_fifteen_to_nineteen } &nbsp;</span></p>
                            <p className="mb-0 ">20-49: <span className="underline">&nbsp; { report.total_no_of_mwra_twenty_to_fourtynine } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">TOTAL NO. OF SWRA: </p>
                            <p className="mb-0 ">10-14: <span className="underline">&nbsp; { report.total_no_of_swra_ten_to_fourteen } &nbsp;</span></p>
                            <p className="mb-0 ">15-19: <span className="underline">&nbsp; { report.total_no_of_swra_fifteen_to_nineteen } &nbsp;</span></p>
                            <p className="mb-0 ">20-49: <span className="underline">&nbsp; { report.total_no_of_swra_twenty_to_fourtynine } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">TOTAL NO. OF PREGNANT: </p>
                            <p className="mb-0 ">10-14: <span className="underline">&nbsp; { report.total_no_of_pregnant_ten_to_fourteen } &nbsp;</span></p>
                            <p className="mb-0 ">15-19: <span className="underline">&nbsp; { report.total_no_of_pregnant_fifteen_to_nineteen } &nbsp;</span></p>
                            <p className="mb-0 ">20-49: <span className="underline">&nbsp; { report.total_no_of_pregnant_twenty_to_fourtynine } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">TOTAL NO. OF NANGANAK: </p>
                            <p className="mb-0 ">10-14: <span className="underline">&nbsp; { report.total_no_of_nanganak_ten_to_fourteen } &nbsp;</span></p>
                            <p className="mb-0 ">15-19: <span className="underline">&nbsp; { report.total_no_of_nanganak_fifteen_to_nineteen } &nbsp;</span></p>
                            <p className="mb-0 ">20-49: <span className="underline">&nbsp; { report.total_no_of_nanganak_twenty_to_fourtynine } &nbsp;</span></p>
                            
                            <p className="mt-4 mb-0 ">TOTAL NO. OF DELIVERIES: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp;  &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp;  &nbsp;</span></p>
                        </div>
                        <div className="col-6">
                            <p className="mt-4 mb-0 ">TOTAL NO. OF LIVE BIRTH: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp;  &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp;  &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF HYPERTENSIVE: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_hypertensive_male} &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_hypertensive_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF DIABETIC: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_diabetic_male} &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_diabetic_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF SMOKERS: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_smokers_male} &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_smokers_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF DRINKERS: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_drinkers_male} &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_drinkers_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF PWD: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_drinkers_male} &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_drinkers_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF BED RIDDEN: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp;  &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp;  &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF MENTAL PATIENTS: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_mental_patients_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_mental_patients_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF SENIOR: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_seniors_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_seniors_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. OF CANCER PATIENT: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_cancer_patient_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_cancer_patient_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. NG NAMATAY: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_namatay_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_namatay_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. NG NAGKASAKIT: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_nagkasakit_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_nagkasakit_female } &nbsp;</span></p>

                            <p className="mt-4 mb-0 ">TOTAL NO. NG HAYOP/ASO: </p>
                            <p className="mb-0 ">MALE: <span className="underline">&nbsp; { report.total_no_of_animal_bites_male } &nbsp;</span></p>
                            <p className="mb-0 ">FEMALE: <span className="underline">&nbsp; { report.total_no_of_animal_bites_female } &nbsp;</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthMiddleware>
    )
}

export default SummaryReport;