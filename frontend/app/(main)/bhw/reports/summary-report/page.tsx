"use client";

import { getSummaryReport } from "@/api/reportApi";
import { AuthMiddleware } from "@/components/middlewares";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SummaryReport = () => {
    const [report, setReport] = useState<any>({});
    const [year, setYear] = useState(new Date().getFullYear());
    const [barangay, setBarangay] = useState(null);
    const [municipality, setMunicipality] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const _report = await getSummaryReport(dispatch, { barangay, year });
            console.log(_report);
            setReport(_report);
        })();
    }, []);

    return (
        <AuthMiddleware>
            <div className="card">
                <h5 className="text-center">Summary Report</h5>
                <h6 className="text-center">2025</h6>
                <div className="grid text-sm leading-tight">
                    <div className="col-6">
                        <p className="mb-0">BRGY. ____________________</p>

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
                    </div>
                </div>




                {/* <table className="w-full">
                    <tbody>
                        <tr>
                            <td>BRGY.___________</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ACTUAL POPULATION: <span className="underline">&nbsp; { report.actual_population } &nbsp;</span></td>
                            <td>TOTAL NO. OF LIVE BIRTH:_________</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF HOUSE HOLDS: <span className="underline">&nbsp; { report.total_no_of_households } &nbsp;</span></td>
                            <td>MALE: </td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF FAMILIES: <span className="underline">&nbsp; { report.total_no_of_households } &nbsp;</span></td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF HH WITH SANITARY TOILET: <span className="underline">&nbsp; { report.total_no_of_hh_with_sanitary_toilet } &nbsp;</span></td>
                            <td>TOTAL NO. OF HYPERTENSIVE: <span className="underline">&nbsp; { report.total_no_of_hypertensive_female +  report.total_no_of_hypertensive_male } &nbsp;</span></td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF HH WITHOUT SANITARY TOILET: <span className="underline">&nbsp; { report.total_no_of_hh_without_sanitary_toilet } &nbsp;</span></td>
                            <td>MALE: <span className="underline">&nbsp; { report.total_no_of_hypertensive_male } &nbsp;</span></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>FEMALE: <span className="underline">&nbsp; { report.total_no_of_hypertensive_female } &nbsp;</span></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF CHILDREN :</td>
                            <td>TOTAL NO. OF DIABETIC:_________</td>
                        </tr>
                        <tr>
                            <td>MALE: <span className="underline">&nbsp; { report.total_no_of_children_male } &nbsp;</span></td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>FEMALE: <span className="underline">&nbsp; { report.total_no_of_children_female } &nbsp;</span></td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>6-11 MONTHS :</td>
                            <td>TOTAL NO. OF SMOKERS</td>
                        </tr>
                        <tr>
                            <td>MALE: <span className="underline">&nbsp; { report.six_to_eleven_months_male } &nbsp;</span></td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>FEMALE: <span className="underline">&nbsp; { report.six_to_eleven_months_female } &nbsp;</span></td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>1-4 YEARS OLD :</td>
                            <td>TOTAL NO. OF DRINKERS</td>
                        </tr>
                        <tr>
                            <td>MALE: <span className="underline">&nbsp; { report.one_to_four_years_male } &nbsp;</span></td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>FEMALE: <span className="underline">&nbsp; { report.one_to_four_years_female } &nbsp;</span></td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>5-9 YEARS OLD :</td>
                            <td>TOTAL NO. OF PWD</td>
                        </tr>
                        <tr>
                            <td>MALE: <span className="underline">&nbsp; { report.five_to_nine_years_male } &nbsp;</span></td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>FEMALE: <span className="underline">&nbsp; { report.five_to_nine_years_female } &nbsp;</span></td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF BED RIDDEN</td>
                        </tr>
                        <tr>
                            <td>MALE:_________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>FEMALE:_________</td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF MWRA:</td>
                            <td>TOTAL NO. OF MENTAL PATIENTS</td>
                        </tr>
                        <tr>
                            <td>10-14:_________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>15-19:_________</td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>20-49:_________</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF SWRA:</td>
                            <td>TOTAL NO. OF SENIOR:</td>
                        </tr>
                        <tr>
                            <td>10-14:_________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>15-19:_________</td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>20-49:_________</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF PREGNANT:</td>
                            <td>TOTAL NO. OF CANCER PATIENT:</td>
                        </tr>
                        <tr>
                            <td>10-14:_________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>15-19:_________</td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>20-49:_________</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF NANGANAK:</td>
                            <td>TOTAL NO. OF NAMATAY:</td>
                        </tr>
                        <tr>
                            <td>10-14:_________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>15-19:_________</td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>20-49:_________</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF DELIVERIES:</td>
                            <td>TOTAL NO. OF NAGKASAKIT:</td>
                        </tr>
                        <tr>
                            <td>10-14:_________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>15-19:_________</td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>20-49:_________</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>TOTAL NO. NG NAKAGAT ng HAYOP/ASO</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>MALE:________</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>FEMALE:________</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </AuthMiddleware>
    )
}

export default SummaryReport;