
"use client"

import { getBhwDashboard } from "@/api/dashboardApi";
import { AuthMiddleware } from "@/components/middlewares";
import { useEffect, useState } from "react";
import { FaPersonPregnant } from "react-icons/fa6";
import { MdOutlineVaccines } from "react-icons/md";
import { TbCoffin } from "react-icons/tb";
import { useDispatch } from "react-redux";



const BhwDashboard = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const init = async () => {
        const _data = await getBhwDashboard(dispatch);
        setData(_data);
    }
    useEffect(() => {
        init()  
    }, []);

    return (
        <AuthMiddleware>
            <h2>Dashboard</h2>
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Households</span>
                                <div className="text-900 font-medium text-xl">152</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-home text-blue-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Pregnancy</span>
                                <div className="text-900 font-medium text-xl">$2.100</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <FaPersonPregnant className="text-orange-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Vaccinated</span>
                                <div className="text-900 font-medium text-xl">28441</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <MdOutlineVaccines className="text-cyan-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Death Toll</span>
                                <div className="text-900 font-medium text-xl">152</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <TbCoffin className="text-purple-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0">
                        Male/Female
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0">
                       No. of Married, Single, Widow/er, Separated, Cohabitation
                        Top 3 Highest Educational Attainment
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0">
                       Religion Counts
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0">
                       Vaccination Status – Monthly (ilan yong nagpa vaccine ng specific month)
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-0">
                       Type of Vaccine
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0">
                       Line Chart (Monthly/ Yearly)
                        Death Rate
                        Illness
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0">
                       Column Chart	
                        Illness Disease Category (HB, DB,CC, EPILEPSY, Kinagat ng Hayop, etc.) based po don sa healthcare services na sakit
                    </div>
                </div>
                <div className="col-12 lg:col-4">
                    <div className="card mb-0">
                       Column Chart
                        Age Bracket (Based po don sa nasa summary report)
                    </div>
                </div>
                <div className="col-12 lg:col-4">
                    <div className="card mb-0">
                       Count
                        Philhealth Member
                        Health Condition (Asthma, Cancer, PWD, etc.)
                    </div>
                </div>
                <div className="col-12 lg:col-4">
                    <div className="card mb-0">
                       Count
                        Total No. of HH with Sanitary Toilet
                        Total No. of HH without Sanitary Toilet
                    </div>
                </div>
            </div>
        </AuthMiddleware>
    );
}

export default BhwDashboard