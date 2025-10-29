"use client";

import { getBhwDesignationsByUserId } from "@/api/bhwDesignationApi";
import { getMonthlyRecords } from "@/api/healthcareServicesApi";
import { BarangayPicker, MonthPicker, MONTHS, MunicipalityPicker, YearPicker } from "@/components/forms/CustomPickers";
import { AuthMiddleware } from "@/components/middlewares";
import { calculateAge } from "@/utils/helpers";
import moment from "moment";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const PregnantsTable = ({records} : {records: any})  => {
    return (
        <>
            <h6 className="mb-0">1. Buntis</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1 border-right-1">Petsa ng Huling Regla</th>
                        <th className="border-bottom-1 border-right-1">Petsa ng Panganganak</th>
                        <th className="border-bottom-1">Bilang ng Pagbubuntis</th>
                    </tr>
                </thead>
                {
                    records.pregnancyRecords?.length <= 0 && (
                            <tbody>
                                <tr>
                                    <td className="border-bottom-1">1.</td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1"></td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1">2.</td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1"></td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1">3.</td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1"></td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1">4.</td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1"></td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-1">5.</td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1 border-right-1"></td>
                                    <td className="border-bottom-1"></td>
                                </tr>
                            </tbody>
                    )
                }
                {
                    records.pregnancyRecords?.length > 0 && (
                        <tbody>
                            {
                                records.pregnancyRecords.map((record: any, index: number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{calculateAge(record.household_profile?.birthdate)}</td>
                                        <td className="border-bottom-1 border-right-1">{moment(record.last_menstrual_period).format('MMMM DD, YYYY')}</td>
                                        <td className="border-bottom-1 border-right-1">{moment(record.date_of_giving_birth).format('MMMM DD, YYYY')}</td>
                                        <td className="border-bottom-1">{record.number_of_pregnancy}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const BirthTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">2. Nanganak</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Petsa ng Panganganak</th>
                        <th className="border-bottom-1 border-right-1">Saan Nanganak</th>
                        <th className="border-bottom-1 border-right-1">Uri ng Panganganak</th>
                        <th className="border-bottom-1">Nagpaanak</th>
                    </tr>
                </thead>
                {
                    records.birthRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.birthRecords?.length > 0 && (
                        <tbody>
                            {
                                records.birthRecords?.map((record: any, index: number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{moment(record.date_gave_birth).format('MMMM DD, YYYY')}</td>
                                        <td className="border-bottom-1 border-right-1">{record.placeofbirth}</td>
                                        <td className="border-bottom-1 border-right-1">{record.type_of_birth}</td>
                                        <td className="border-bottom-1">{record.midwife}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const NewBornTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">3. Bagong Silang na Sanggol</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Petsa ng Kapanganakan</th>
                        <th className="border-bottom-1 border-right-1">Timbang</th>
                        <th className="border-bottom-1 border-right-1">Kasarian</th>
                        <th className="border-bottom-1 border-right-1">Lugar ng Kapanganakan</th>
                        <th className="border-bottom-1">Puna</th>
                    </tr>
                </thead>
                {
                    records.newBornRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.newBornRecords?.length > 0 && (
                        <tbody>
                            {
                                records.newBornRecords.map((record : any, index : number) => (
                                    <tr>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{ record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{ moment(record.date_of_birth).format('MMMM DD, YYYY') }</td>
                                        <td className="border-bottom-1 border-right-1">{ record.weight }</td>
                                        <td className="border-bottom-1 border-right-1">{ record.household_profile?.updated_details?.gender?.name }</td>
                                        <td className="border-bottom-1 border-right-1">{ record.placeofbirth }</td>
                                        <td className="border-bottom-1">{ record.remarks }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const VaccinatedTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">4. Binakunahan</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Birhtdate</th>
                        <th className="border-bottom-1">Bakunang Ibinigay</th>
                    </tr>
                </thead>
                {
                    records.vaccinatedRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.vaccinatedRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.vaccinatedRecords.map((record : any, index : number) => (
                                    <tr>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{ record.household_profile?.updated_details?.full_name }</td>
                                        <td className="border-bottom-1 border-right-1">{ moment(record.household_profile?.date_of_birth).format('MMMM DD, YYYY') }</td>
                                        <td className="border-bottom-1">{ record.vaccine }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
                
            </table>
        </>
    )
}

const FamilyPlanningTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">5. Nagplano ng Pamilya</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1 border-right-1">F.P. Method</th>
                        <th className="border-bottom-1">Puna</th>
                    </tr>
                </thead>
                {
                    records.familyPlanningRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.familyPlanningRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.familyPlanningRecords.map((record : any, index : number) => (
                                    <tr>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{ record.household_profile?.updated_details?.full_name }</td>
                                        <td className="border-bottom-1 border-right-1">{ calculateAge(record.household_profile?.birthdate) }</td>
                                        <td className="border-bottom-1 border-right-1">{ record.fp_method?.name }</td>
                                        <td className="border-bottom-1">{ record.remarks }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const DeathTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">6. Namatay</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" >Petsa ng Kamatayan</th>
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1">Sanhi ng Pagkamatay</th>
                    </tr>
                </thead>
                {
                    records.deathRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.deathRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.deathRecords.map((record : any, index : number) => (
                                    <tr>
                                        <td className="border-bottom-1 border-right-1">{ moment(record.date_of_death).format('MMMM DD, YYYY') }</td>
                                        <td className="border-bottom-1 ">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{ record.household_profile?.updated_details?.full_name }</td>
                                        <td className="border-bottom-1 border-right-1">{ calculateAge(record.household_profile?.birthdate) }</td>
                                        <td className="border-bottom-1">{ record.cause_of_death }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const SickTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">7. Mga Nagkasakit/May Sakit</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" >Petsa ng Pagkakasakit</th>
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1">Uri ng Karamdaman</th>
                    </tr>
                </thead>
                {
                    records.sickRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 ">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.sickRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.sickRecords.map((record : any, index : number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1 border-right-1">{ moment(record.date_of_sick).format("MMMM DD, YYYY") }</td>
                                        <td className="border-bottom-1 ">1.</td>
                                        <td className="border-bottom-1 border-right-1">{ record.household_profile?.updated_details?.full_name }</td>
                                        <td className="border-bottom-1 border-right-1">{ calculateAge(record.household_profile?.birthdate) }</td>
                                        <td className="border-bottom-1">{ record.type_of_sickness }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const HighbloodTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">8. May Sakit na Highblood</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1 border-right-1">BP</th>
                        <th className="border-bottom-1">Mga Ginawa bilang BHW</th>
                    </tr>
                </thead>       
                {
                    records.highbloodRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.highbloodRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.highbloodRecords.map((record : any, index : number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1">{index+1}.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{calculateAge(record.household_profile?.birthdate)}</td>
                                        <td className="border-bottom-1 border-right-1">{record.blood_pressure}</td>
                                        <td className="border-bottom-1">{record.actions}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const DiabetesTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">9. May Sakit na Diabetes</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1 border-right-1">Glucose Level</th>
                        <th className="border-bottom-1 border-right-1">Obserbasyon</th>
                        <th className="border-bottom-1">Mga Ginawa bilang BHW</th>
                    </tr>
                </thead>
                {
                    records.diabetesRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.diabetesRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.diabetesRecords.map((record : any, index : number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1">1.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{calculateAge(record.household_profile?.birthdate)}</td>
                                        <td className="border-bottom-1 border-right-1">{record.glucose_level}</td>
                                        <td className="border-bottom-1 border-right-1">{record.observation}</td>
                                        <td className="border-bottom-1">{record.actions}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const UrinalysisResultTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">10. Resulta ng Pag-Eksamin ng Ihi</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1">Nakitang Resulta</th>
                    </tr>
                </thead>
                {
                    records.urinalysisResultRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.urinalysisResultRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.urinalysisResultRecords.map((record : any, index : number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{record.age}</td>
                                        <td className="border-bottom-1">{record.results}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const CancerTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">11. May Sakit na Kanser</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1 border-right-1">Apektadong bahagi ng katawan</th>
                        <th className="border-bottom-1">Mga Ginawa bilang BHW</th>
                    </tr>
                </thead>
                {
                    records.cancerRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.cancerRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.cancerRecords.map((record : any, index : number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1 " >{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{record.age}</td>
                                        <td className="border-bottom-1 border-right-1">{record.affected_areas}</td>
                                        <td className="border-bottom-1">{record.actions}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const EpilepsyTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">12. May Problema sa Pag-iisip/Epilepsy</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1">Edad</th>
                    </tr>
                </thead>
                {
                    records.epilepsyRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.epilepsyRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.epilepsyRecords.map((record : any, index : number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1">{record.age}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const AnimalBiteTable = ({records} : {records: any}) => {
    return (
        <>
            <h6 className="mb-0">13. Kinagat ng Hayop/Aso</h6>
            <table className="w-full border-1" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr >
                        <th className="border-bottom-1 border-right-1" colSpan={2}>Pangalan</th>
                        <th className="border-bottom-1 border-right-1">Edad</th>
                        <th className="border-bottom-1">Uri ng Hayop</th>
                    </tr>
                </thead>
                {
                    records.animalBiteRecords?.length <= 0 && (
                        <tbody>
                            <tr>
                                <td className="border-bottom-1">1.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">2.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">3.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">4.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                            <tr>
                                <td className="border-bottom-1">5.</td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1 border-right-1"></td>
                                <td className="border-bottom-1"></td>
                            </tr>
                        </tbody>
                    )
                }
                {
                    records.animalBiteRecords?.length > 0 && (
                        <tbody> 
                            {
                                records.animalBiteRecords.map((record : any, index : number) => (
                                    <tr key={index}>
                                        <td className="border-bottom-1">{index + 1}.</td>
                                        <td className="border-bottom-1 border-right-1">{record.household_profile?.updated_details?.full_name}</td>
                                        <td className="border-bottom-1 border-right-1">{record.age}</td>
                                        <td className="border-bottom-1">{record.animal_type}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}

const BHWMonthlyReportPage = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const [filter, setFilter] = useState<any>({ 
        municipality: null, 
        barangay: null, 
        sitio : null,
        month: parseInt(moment().format('M')), 
        year: parseInt(moment().format('YYYY'))
    });
    const authStore = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState({
        records: false
    });
    const dispatch = useDispatch();
    const [sitios, setSitios] = useState<any[]>([]);
    const [records, setRecords] = useState<any>([]);

    useEffect(() => {
        if(filter.sitio && filter.month && filter.year) {
            (async() => {
                setLoading({ ...loading, records: true });
                const _records = await getMonthlyRecords(dispatch, {
                    sitio: filter.sitio,
                    month: filter.month,
                    year: filter.year
                });
                setRecords(_records);
                console.log(_records)
                setLoading({ ...loading, records: false });
            })();
        }
    }, [filter.sitio, filter.year, filter.month]);

    useEffect(() => {
        (async() => {
            const _designations = await getBhwDesignationsByUserId(dispatch, {user_id : authStore.user?.id});
            setSitios(_designations.map((designation : any) => {
                return designation.sitio;
            }));
        })();
    }, [authStore.user?.id]);

    return (
        <AuthMiddleware>
            <div className="flex flex-wrap justify-content-between mb-3 gap-2">
                <div className="flex flex-wrap gap-2">
                    {/* <MunicipalityPicker municipality={filter.municipality} onChange={(e: any) => setFilter({ ...filter, municipality: e })} /> */}
                    {/* <BarangayPicker municipality={filter.municipality} barangay={filter.barangay} onChange={(e: any) => setFilter({ ...filter, barangay: e })} /> */}
                    <Dropdown value={filter.sitio} onChange={(e: any) => setFilter({ ...filter, sitio: e.value })} options={sitios} placeholder="Select Sitio" optionLabel="sitio_name" optionValue="id" />
                    <MonthPicker value={filter.month} onChange={(e: any) => setFilter({ ...filter, month: e.value })} />
                    <YearPicker value={filter.year} onChange={(e: any) => setFilter({ ...filter, year: e.value })} />
                </div>
                <Button label="Print" size="small" icon="pi pi-print" onClick={reactToPrintFn}/>
            </div>
            <div className="card overflow-x-scroll">
                {
                    loading.records && (
                        <div className="flex gap-2">
                            <ProgressSpinner className="flex-none" style={{width: '20px', height: '20px'}} strokeWidth="8" aria-label="Loading"  /> 
                            <span className="flex-grow-1">Loading</span>
                        </div>
                    )
                }
                <div className="" style={{
                    minWidth: "800px",
                }}>
                    <div className="p-5" ref={contentRef}>
                        <h5 className="text-center mb-0">BUWANANG ULAT</h5>
                        <h5 className="text-center mt-0">BARANGAY HEALTH WORKER</h5>
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td width="65%"> </td>
                                    <td className="text-left" width="35%" style={{ width: '50%' }}>Buwan: <span style={{textDecoration: 'underline'}}> { filter.month && MONTHS.find((m : any) => m.code === filter.month)?.name} {filter.year} </span> </td>
                                </tr>
                                <tr>
                                    <td width="65%"> </td>
                                    <td className="text-left" width="35%" style={{ width: '50%' }}>Blg. ng Nasasakupan: </td>
                                </tr>
                                <tr>
                                    <td width="65%"> </td>
                                    <td className="text-left" width="35%" style={{ width: '50%' }}>Sitio: <span style={{textDecoration: 'underline'}}> { filter.sitio && sitios.find((s : any) => s.id === filter.sitio)?.full_address}  </span></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="w-full">
                            <h6>A. HEALTH CARE SERVICE PROVIDER</h6>
                            <PregnantsTable records={records} />
                            <BirthTable records={records} />
                            <NewBornTable records={records} />
                            <VaccinatedTable records={records} />
                            <FamilyPlanningTable records={records} />
                            <DeathTable records={records} />
                            <SickTable records={records} />
                            <HighbloodTable records={records} />
                            <DiabetesTable records={records} />
                            <UrinalysisResultTable records={records} />
                            <CancerTable records={records} />
                            <EpilepsyTable records={records} />
                            <AnimalBiteTable records={records} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthMiddleware>
    )
}

export default BHWMonthlyReportPage;