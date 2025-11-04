'use client';

import { getBhwDashboard } from '@/api/dashboardApi';
import { AuthMiddleware } from '@/components/middlewares';
import { COLORS } from '@/utils/helpers';
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

const GenderDistribution = () => {
    const [ageBracketFilter, setAgeBracketFilter] = useState<any>(null);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getGenderDistribution = async () => {
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        console.log('test');
        const _data = await getBhwDashboard(dispatch, { name: 'GENDER_DISTRIBUTION', age_group: ageBracketFilter, sitios: sitios });
        setData(_data);
    };
    const ageBracketOptions = [
        {
            label: 'All',
            value: null
        },
        {
            label: '0-5 Months',
            value: '1'
        },
        {
            label: '6-11 Months',
            value: '2'
        },
        {
            label: '1-4 Years',
            value: '3'
        },
        {
            label: '5-9 Years',
            value: '4'
        },
        {
            label: '10-19 Years',
            value: '5'
        },
        {
            label: '20-59 Years',
            value: '6'
        },
        {
            label: '60+ Years',
            value: '7'
        }
    ];
    useEffect(() => {
        getGenderDistribution();
    }, [authStore.user, ageBracketFilter]);
    return (
        <div className="card mb-0 px-0">
            <h3 className="text-lg font-semibold mb-2 text-center">Gender Distribution</h3>
            <div className="flex justify-content-end p-3">
                <Calendar view="month" dateFormat="mm/yy" value={startDate} placeholder='Start Date' onChange={(e) => setStartDate(e.value)} />
                <Calendar view="month" dateFormat="mm/yy" value={endDate} placeholder='End Date' onChange={(e) => setEndDate(e.value)} />
                <Dropdown value={ageBracketFilter} options={ageBracketOptions} optionLabel="label" optionValue="value" onChange={(e) => setAgeBracketFilter(e.value)} placeholder="Age Bracket" className="w-full md:w-auto" />
            </div>
            <ResponsiveContainer  height={400}>
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie data={data} cx="50%" cy="50%" innerRadius="40%" outerRadius="60%" fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const CivilStatus = () => {
    const [ageBracketFilter, setAgeBracketFilter] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getCivilStatus = async () => {
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        console.log('test');
        const _data = await getBhwDashboard(dispatch, { name: 'CIVIL_STATUS', age_group: ageBracketFilter, sitios: sitios });
        setData(_data);
    };
    const ageBracketOptions = [
        {
            label: 'All',
            value: null
        },
        {
            label: '0-5 Months',
            value: '1'
        },
        {
            label: '6-11 Months',
            value: '2'
        },
        {
            label: '1-4 Years',
            value: '3'
        },
        {
            label: '5-9 Years',
            value: '4'
        },
        {
            label: '10-19 Years',
            value: '5'
        },
        {
            label: '20-59 Years',
            value: '6'
        },
        {
            label: '60+ Years',
            value: '7'
        }
    ];
    useEffect(() => {
        getCivilStatus();
    }, [authStore.user, ageBracketFilter]);
    return (
        <div className="card mb-0 h-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Civil Status</h3>
            <div className="flex justify-content-end p-3">
                <Dropdown value={ageBracketFilter} options={ageBracketOptions} optionLabel="label" optionValue="value" onChange={(e) => setAgeBracketFilter(e.value)} placeholder="Age Bracket" className="w-full md:w-auto" />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="single" fill="#8884d8" />
                    <Bar dataKey="married" fill="#82ca9d" />
                    <Bar dataKey="widowed" fill="#ffc658" />
                    <Bar dataKey="separated" fill="#36a2eb" />
                    <Bar dataKey="cohabitation" fill="#ffce56" />
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const WRA = ({ civilStatus }: { civilStatus: any }) => {
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getData = async () => {
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        console.log('test');
        const _data = await getBhwDashboard(dispatch, { name: 'WRA', civil_status: civilStatus, sitios: sitios });
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user]);
    return (
        <div className="card mb-0 px-0">
            <h3 className="text-lg font-semibold mb-2 text-center">{civilStatus == 75 ? 'SWRA' : 'MWRA'}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie data={data} cx="50%" cy="50%" innerRadius="40%" outerRadius="60%" fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const FourPs = () => {
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getData = async () => {
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        console.log('test');
        const _data = await getBhwDashboard(dispatch, { name: '4PS_PIE_CHART', sitios: sitios });
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user]);
    return (
        <div className="card mb-0 px-0">
            <h3 className="text-lg font-semibold mb-2 text-center">4Ps</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie data={data} cx="50%" cy="50%" innerRadius="40%" outerRadius="60%" fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const FamilyPlanningChart = () => {
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getData = async () => {
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        console.log('test');
        const _data = await getBhwDashboard(dispatch, { name: 'FAMILY_PLANNING_CHART', sitios: sitios });
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user]);
    return (
        <div className="card mb-0 h-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Family Planning</h3>
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

const SeniorMaintenanceChart = () => {
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getData = async () => {
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        console.log('test');
        const _data = await getBhwDashboard(dispatch, { name: 'SENIOR_W_MAINTENANCE', sitios: sitios });
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user]);
    return (
        <div className="card mb-0 h-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Senior with Maintenance</h3>
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
                    <Bar dataKey="Value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const EducationalAttainmentChart = () => {
    const [data, setData] = useState<any>([]);
    const { genericTypes } = useSelector((state: any) => state.genericType);
    const [memberFilter, setMemberFilter] = useState<any>(null);
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const getData = async () => {
        getGenericTypes(dispatch);
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        console.log('test');
        const _data = await getBhwDashboard(dispatch, { name: 'EDUCATIONAL_ATTAINMENT_CHART', sitios: sitios, memberFilter: memberFilter });
        setData(_data);
    };
    useEffect(() => {
        getData();
    }, [authStore.user, memberFilter]);
    return (
        <div className="card mb-0">
            <h3 className="text-lg font-semibold mb-2 text-center">Highest Educational Attainment</h3>
            <div className="flex justify-content-end p-2">
                <Dropdown
                    value={memberFilter}
                    options={genericTypes.filter((gt: any) => gt.type === 'MEMBERS_OF_HOUSEHOLD')}
                    optionLabel="name"
                    optionValue='id'
                    placeholder="Select Educational Attainment"
                    onChange={(e) => setMemberFilter(e.value)}
                />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const BhwDashboard = () => {
    const [data, setData] = useState<any>({});
    const dispatch = useDispatch();
    const authStore = useSelector((state: any) => state.auth);
    const init = async () => {
        console.log(authStore.user);
        const sitios = authStore.user?.bhw_designations?.map((d: any) => d.sitio_id);
        if (!sitios || sitios.length === 0) return;
        const _data = await getBhwDashboard(dispatch, {
            sitios: sitios
        });
        setData(_data);
    };
    useEffect(() => {
        init();
    }, [authStore.user?.id, authStore.user?.bhw_designations]);

    return (
        <AuthMiddleware>
            <h2>Dashboard</h2>
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
                    <GenderDistribution />
                </div>
                <div className="col-12 lg:col-6">
                    <EducationalAttainmentChart />
                    {/* <div className="card mb-0">
                        <h3 className="text-lg font-semibold mb-2 text-center">Highest Educational Attainment</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={data.educationalAttainmentData}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="total" fill="#8884d8" />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div> */}
                </div>
                <div className="col-12 lg:col-6 ">
                    <CivilStatus />
                </div>
                <div className="col-12 lg:col-6">
                    <WRA civilStatus={74} />
                </div>
                <div className="col-12 lg:col-6">
                    <WRA civilStatus={75} />
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
                    <FamilyPlanningChart />
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
                    <FourPs />
                </div>
                <div className="col-12 lg:col-6">
                    <SeniorMaintenanceChart />
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

export default BhwDashboard;
