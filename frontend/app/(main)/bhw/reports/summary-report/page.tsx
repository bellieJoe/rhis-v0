"use client";

import { getSummaryReport } from "@/api/reportApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SummaryReport = () => {
    const [report, setReport] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [barangay, setBarangay] = useState(null);
    const [municipality, setMunicipality] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const _report = await getSummaryReport(dispatch, { barangay, year });
            setReport(_report);
        })();
    }, []);

    return (
        <>
            <div className="card">
                <h5 className="text-center">Summary Report</h5>
                <h6 className="text-center">2025</h6>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td>BRGY.___________</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ACTUAL POPULATION:___________</td>
                            <td>TOTAL NO. OF LIVE BIRTH:_________</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF HOUSE HOLDS:___________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF FAMILIES:___________</td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF HH WITH SANITARY TOILET:___________</td>
                            <td>TOTAL NO. OF HYPERTENSIVE:_________</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF HH WITHOUT SANITARY TOILET:___________</td>
                            <td>MALE:_________</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>FEMALE:_________</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF CHILDREN:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>TOTAL NO. OF CHILDREN:</td>
                            <td>TOTAL NO. OF DIABETIC:_________</td>
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
                            <td>6-11 MONTHS :</td>
                            <td>TOTAL NO. OF SMOKERS</td>
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
                            <td>1-4 YEARS OLD :</td>
                            <td>TOTAL NO. OF DRINKERS</td>
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
                            <td>5-9 YEARS OLD :</td>
                            <td>TOTAL NO. OF PWD</td>
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
                            <td>10-19 YEARS OLD :</td>
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
                </table>
            </div>
        </>
    )
}

export default SummaryReport;