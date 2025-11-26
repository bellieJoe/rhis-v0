'use client';

import { getBhwDashboard, getMidwifeDashboard } from '@/api/dashboardApi';
import { AuthMiddleware } from '@/components/middlewares';
import { COLORS, getFirstDate, getLastDate } from '@/utils/helpers';
import { get } from 'http';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';    
import { FaPersonPregnant } from 'react-icons/fa6';
import { MdOutlineVaccines } from 'react-icons/md';
import { TbCoffin } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IoIosPeople } from "react-icons/io";
import { RiSurveyLine } from "react-icons/ri";
import { getGenericTypes } from '@/api/genericTypeApi';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';



const MidwifeDashboard = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const init = async () => {
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        const _data = await getMidwifeDashboard(dispatch, {
            barangayIds : sitios
        });
        console.log(_data);
        setData(_data);
    };

    useEffect(() => {
        init();
    }, [authStore.user?.id, authStore.user?.bhw_designations]);

    return (
        <AuthMiddleware>
            <h2>Dashboard</h2>
            {/* <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} dateFormat="mm/dd/yy" placeholder="Start Date" mask="99/99/9999" /> */}
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Households</span>
                                <div className="text-900 font-medium text-xl">{data.households}</div>
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
                                <div className="text-900 font-medium text-xl">{data.pregnancy}</div>
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
                                <span className="block text-500 font-medium mb-3">Vaccinated Babies</span>
                                <div className="text-900 font-medium text-xl">{data.vaccinated}</div>
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
                                <div className="text-900 font-medium text-xl">{data.deaths}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <TbCoffin className="text-purple-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Population</span>
                                <div className="text-900 font-medium text-xl">{data.totalPopulation}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <IoIosPeople  className="text-purple-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Households Visited</span>
                                <div className="text-900 font-medium text-xl">{data.households}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <RiSurveyLine  className="text-cyan-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Families</span>
                                <div className="text-900 font-medium text-xl">{data.familyCount}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-bluegray-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <RiSurveyLine  className="text-bluegray-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0 h-full">
                        <h3 className="text-lg font-semibold mb-2 text-center">Religion</h3>
                        <DataView
                            value={data.religionData}
                            itemTemplate={(data: any) => {
                                return (
                                    <div className="col-12 p-1">
                                        <span>{data.name} : </span>
                                        <span className="text-900 font-medium">{data.total}</span>
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-0 h-full">
                        <h3 className="text-lg font-semibold mb-2 text-center">Vaccinated Babies FY {moment(new Date()).format('YYYY')}</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={data.vaccinationPermonthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-0">
                        <DataTable value={data.typeOfVaccineData} responsiveLayout="scroll">
                            <Column field="vaccine" header="Vaccine" sortable></Column>
                            <Column field="total" header="Total" sortable></Column>
                        </DataTable>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-0 h-full">
                        <h3 className="text-lg font-semibold mb-2 text-center">Death and Illness Rate FY {moment(new Date()).format('YYYY')}</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={data.deathRateIllnessData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="deaths" stroke="#8884d8" />
                                <Line type="monotone" dataKey="ills" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="col-12 lg:col-12">
                    <div className="card mb-0">
                        <h3 className="text-lg font-semibold mb-2 text-center">Age Bracket</h3>
                        {/* <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={data.ageCategories}
                                layout="horizontal"
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Name" type="category" />
                                <YAxis type="number" dataKey="Male" />
                                <YAxis type="number" dataKey="Female" />
                                <Tooltip />
                                <Bar  dataKey="Total" fill="#8884d8" />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer> */}
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data.ageCategories}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Male" fill="#8884d8" />
                                <Bar dataKey="Female" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="card mb-0">
                        <h3 className="text-lg font-semibold mb-2 text-center">Sickness</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={data.illnessData}
                                layout="horizontal"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" type="category" />
                                <YAxis type="number" />
                                <Tooltip />
                                <Bar dataKey="Total" fill="#8884d8" />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <div className="flex flex-wrap gap-2 justify-content-start">
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Philhealth Members</span>
                                <div className="text-900 font-medium text-xl">{data.philhealthMemberCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Has Asthma</span>
                                <div className="text-900 font-medium text-xl">{data.asthmaCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Has Cancer</span>
                                <div className="text-900 font-medium text-xl">{data.cancerCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">PWD</span>
                                <div className="text-900 font-medium text-xl">{data.pwdCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Stroke</span>
                                <div className="text-900 font-medium text-xl">{data.strokeCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Has Mass</span>
                                <div className="text-900 font-medium text-xl">{data.massCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Smoker</span>
                                <div className="text-900 font-medium text-xl">{data.smokerCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Alchohol Drinker</span>
                                <div className="text-900 font-medium text-xl">{data.alchoholicCount}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Households w/ Sanitary Toilet</span>
                                <div className="text-900 font-medium text-xl">{data.toiletData?.sanitary_toilet}</div>
                            </div>
                        </div>
                        <div className="card mb-0">
                            <div className="">
                                <span className="block text-500 font-medium mb-3">Households w/ Unsanitary Toilet</span>
                                <div className="text-900 font-medium text-xl">{data.toiletData?.unsanitary_toilet}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthMiddleware>
    );
};

export default MidwifeDashboard;
