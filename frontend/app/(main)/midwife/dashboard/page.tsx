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
import { MdChildFriendly, MdOutlineVaccines } from 'react-icons/md';
import { TbCoffin } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IoIosPeople } from "react-icons/io";
import { RiSurveyLine } from "react-icons/ri";
import { getGenericTypes } from '@/api/genericTypeApi';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const PregnantWomenChart = ({ startDate, endDate , barangayIds} : { startDate: any, endDate: any, barangayIds: any[] }) => {
    const [ageBracketFilter, setAgeBracketFilter] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getData = async () => {
        if (!barangayIds || barangayIds.length === 0) return;
        console.log('test');
        const _data = await getMidwifeDashboard(dispatch, { 
            name: 'PREGNANT_WOMEN_CHART', 
            start : startDate ? moment(startDate).format('YYYY-MM-DD') : null,
            end : endDate ? moment(endDate).format('YYYY-MM-DD') : null,
            barangayIds : barangayIds
        });
        console.log(_data);
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user, ageBracketFilter, startDate, endDate]);

    return (
        <div className="card mb-0 h-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Pregnant Women</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="horizontal"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="Name"  />
                    <YAxis type="number"  />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const ChildcareWeightStatusChart = ({ startDate, endDate , barangayIds} : { startDate: any, endDate: any, barangayIds: any[] }) => {
    const [ageBracketFilter, setAgeBracketFilter] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const [ageGroup, setAgeGroup] = useState<any>(1);
    const ageGroupOptions = [
        { label: '1-3 months', value: 1 },
        { label: '6-11 months', value: 2 },
        { label: '12 months', value: 3 },
    ]
    const getData = async () => {
        if (!barangayIds || barangayIds.length === 0) return;
        console.log('test');
        const _data = await getMidwifeDashboard(dispatch, { 
            name: 'CHILD_CARE_WEIGHT_STATUS_CHART', 
            start : startDate ? moment(startDate).format('YYYY-MM-DD') : null,
            end : endDate ? moment(endDate).format('YYYY-MM-DD') : null,
            barangayIds : barangayIds,
            ageGroup : ageGroup
        });
        console.log(_data);
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user, ageBracketFilter, startDate, endDate, ageGroup]);

    return (
        <div className="card mb-0 h-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Childcare Weight Status</h3>
            <div className="flex justify-content-end p-3 gap-1">
                <Dropdown options={ageGroupOptions} value={ageGroup} onChange={(e) => setAgeGroup(e.value)} placeholder="Select Age Group" />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="horizontal"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="Name"  />
                    <YAxis type="number"  />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const ChildcareNewbornChart  = ({ startDate, endDate , barangayIds} : { startDate: any, endDate: any, barangayIds: any[] }) => {
    const [ageBracketFilter, setAgeBracketFilter] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);

    const getData = async () => {
        if (!barangayIds || barangayIds.length === 0) return;
        console.log('test');
        const _data = await getMidwifeDashboard(dispatch, { 
            name: 'CHILD_CARE_NEWBORN_CHART', 
            start : startDate ? moment(startDate).format('YYYY-MM-DD') : null,
            end : endDate ? moment(endDate).format('YYYY-MM-DD') : null,
            barangayIds : barangayIds,
        });
        console.log(_data);
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user, ageBracketFilter, startDate, endDate]);

    return (
        <div className="card mb-0 h-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Newborn Weight Status</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="horizontal"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="Name"  />
                    <YAxis type="number"  />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const MidwifeDashboard = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const [startDate, setStartDate] = useState<any>(getFirstDate());
    const [endDate, setEndDate] = useState<any>(getLastDate());
    const [barangayIds, setBarangayIds] = useState<any>([]);

    const init = async () => {
        const _barangayIds = authStore.user?.midwife_designations?.map((d: any) => d.barangay_id);
        setBarangayIds(_barangayIds);
        if (!_barangayIds || _barangayIds.length === 0) return;
        const _data = await getMidwifeDashboard(dispatch, {
            barangayIds : _barangayIds,
            start: startDate,
            end: endDate
        });
        console.log(_data);
        setData(_data);
    };

    useEffect(() => {
        init();
    }, [authStore.user?.id, authStore.user?.midwife_designations, startDate, endDate]);

    return (
        <AuthMiddleware>
            <h2>Dashboard</h2>
            <div className="flex mb-4 justify-content-center gap-3">
                <div className="">
                    <label htmlFor="">From</label>&nbsp;&nbsp;
                    <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                </div>
                <div className="">
                    <label htmlFor="">To</label>&nbsp;&nbsp;
                    <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                </div>
            </div>
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Population</span>
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
                                <span className="block text-500 font-medium mb-3">Total Pregnants</span>
                                <div className="text-900 font-medium text-xl">{data.totalPregnants}</div>
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
                                <span className="block text-500 font-medium mb-3">Total Family Planners</span>
                                <div className="text-900 font-medium text-xl">{data.totalFamilyPlanning}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-bluegray-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <RiSurveyLine  className="text-bluegray-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Children</span>
                                <div className="text-900 font-medium text-xl">{data.totalChildren}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <MdChildFriendly  className="text-purple-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h5>Maternal Care and Services</h5>
            <div className="grid">
                <div className="col-12 lg:col-6">
                    <PregnantWomenChart startDate={startDate} endDate={endDate} barangayIds={barangayIds} />
                </div>
            </div>

            <h5>Child Care and Services</h5>
            <div className="grid">
                <div className="col-12">
                    <ChildcareWeightStatusChart startDate={startDate} endDate={endDate} barangayIds={barangayIds} />
                </div>
                <div className="col-12">
                    <ChildcareNewbornChart startDate={startDate} endDate={endDate} barangayIds={barangayIds} />
                </div>
            </div>

            <h5>Environmental Health</h5>
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div className="flex gap-2 align-items-center">
                                <h2 className="text-900 font-medium mb-0">{data.hhWithBasicWaterSupply}</h2>
                                <span className="block text-500 font-medium mb-0">HHs with access to basic safe water supply</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div className="flex gap-2 align-items-center">
                                <h2 className="text-900 font-medium mb-0">{data.hhWithSafelyManagedwaterSupply}</h2>
                                <span className="block text-500 font-medium mb-0">HHs using safely managed drinking-water services </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div className="flex gap-2 align-items-center">
                                <h2 className="text-900 font-medium mb-0">{data.hhWithBasicSanitation}</h2>
                                <span className="block text-500 font-medium mb-0">HHs with basic sanitation facility </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div className="flex gap-2 align-items-center">
                                <h2 className="text-900 font-medium mb-0">{data.hhWithSafelyManagedSanitation}</h2>
                                <span className="block text-500 font-medium mb-0">HHs using safely managed sanitation services </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </AuthMiddleware>
    );
};

export default MidwifeDashboard;
