"use client";

import { Button } from "primereact/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PregnantsTable = () => {
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
            </table>
        </>
    )
}

const BirthTable = () => {
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
            </table>
        </>
    )
}

const NewBornTable = () => {
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
            </table>
        </>
    )
}

const VaccinatedTable = () => {
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
            </table>
        </>
    )
}

const FamilyPlanningTable = () => {
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
            </table>
        </>
    )
}

const DeathTable = () => {
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
            </table>
        </>
    )
}

const SickTable = () => {
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
            </table>
        </>
    )
}

const HighbloodTable = () => {
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
            </table>
        </>
    )
}

const DiabetesTable = () => {
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
            </table>
        </>
    )
}

const UrinalysisResultTable = () => {
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
            </table>
        </>
    )
}

const CancerTable = () => {
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
            </table>
        </>
    )
}

const EpilepsyTable = () => {
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
            </table>
        </>
    )
}

const AnimalBiteTable = () => {
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
            </table>
        </>
    )
}

const BHWMonthlyReportPage = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <>
            <div className="flex justify-content-end mb-3">
                <Button label="Print" size="small" icon="pi pi-print" onClick={reactToPrintFn}/>
            </div>
            <div className="card">
                <div className="p-5" ref={contentRef}>
                    <h5 className="text-center mb-0">BUWANANG ULAT</h5>
                    <h5 className="text-center mt-0">BARANGAY HEALTH WORKER</h5>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td width="35%"> </td>
                                <td className="text-right" width="65%" style={{ width: '50%' }}>Buwan: ____________________________ </td>
                            </tr>
                            <tr>
                                <td width="35%"> </td>
                                <td className="text-right" width="65%" style={{ width: '50%' }}>Blg. ng Nasasakupan: _____________</td>
                            </tr>
                            <tr>
                                <td width="35%"> </td>
                                <td className="text-right" width="65%" style={{ width: '50%' }}>Sitio: _______________________________</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="w-full">
                        <h6>A. HEALTH CARE SERVICE PROVIDER</h6>
                        <PregnantsTable />
                        <BirthTable />
                        <NewBornTable />
                        <VaccinatedTable />
                        <FamilyPlanningTable />
                        <DeathTable />
                        <SickTable />
                        <HighbloodTable />
                        <DiabetesTable />
                        <UrinalysisResultTable />
                        <CancerTable />
                        <EpilepsyTable />
                        <AnimalBiteTable />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BHWMonthlyReportPage;