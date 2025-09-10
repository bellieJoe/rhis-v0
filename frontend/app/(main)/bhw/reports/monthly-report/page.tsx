"use client";

const BHWMonthlyReportPage = () => {
    return (
        <>
            <div className="card">
                <h5 className="text-center mb-0">BUWANANG ULAT</h5>
                <h5 className="text-center mt-0">BARANGAY HEALTH WORKER</h5>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td width="33.33%"> </td>
                            <td width="33.33%"> </td>
                            <td className="text-right" width="33.33%" style={{ width: '50%' }}>Buwan: ____________________________ </td>
                        </tr>
                        <tr>
                            <td width="33.33%"> </td>
                            <td width="33.33%"> </td>
                            <td className="text-right" width="33.33%" style={{ width: '50%' }}>Blg. ng Nasasakupan: _____________</td>
                        </tr>
                        <tr>
                            <td width="33.33%"> </td>
                            <td width="33.33%"> </td>
                            <td className="text-right" width="33.33%" style={{ width: '50%' }}>Sitio: _______________________________</td>
                        </tr>
                    </tbody>
                </table>

                <div className="w-full">
                    <h6>A. HEALTH CARE SERVICE PROVIDER</h6>

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
                </div>
            </div>
        </>
    )
}

export default BHWMonthlyReportPage;