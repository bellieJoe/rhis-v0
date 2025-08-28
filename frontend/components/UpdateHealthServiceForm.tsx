import { hideUpdateHealthService } from "@/features/updateHealthServiceSlice";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { Steps } from "primereact/steps";
import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UnderDevelopment = () => {
    return (
        <div>
            <h1 className="text-center text-orange-500">Under Development</h1>
            <h6 className="text-center ">This feature is currently under development.</h6>
        </div>
    )
}

const PregnantForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">1. Pregnant(Buntis)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Last Menstrual Period(Petsa ng huling regla)</label>
                <Calendar id="lastMenstrualPeriod" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Date of Giving Birth(Petsa ng panganganak)</label>
                <Calendar id="lastMenstrualPeriod" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Number of Pregnancies(Bilang ng Pagbubuntis)</label>
                <InputText type="number" className="w-full" />
            </div>
        </div>
    );
}

const GaveBirthForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">2. Gave Birth(Nanganak)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Date of Giving Birth(Petsa ng panganganak)</label>
                <Calendar id="lastMenstrualPeriod" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Saan Nanganak(Birth Place)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Type of Birth(Uri ng Panganganak)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Midwife(Nagpaanak)</label>
                <InputText type="text" className="w-full" />
            </div>
        </div>
    );
}

const NewBornChildForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">3. New Born Child(Bagong silang na sanggol)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Date of Birth(Petsa ng panganganak)</label>
                <Calendar id="lastMenstrualPeriod" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Lugar ng Kapanganakan(Birth Place)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Weight(Timbang)</label>
                <InputText type="number" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Gender(Kasarian)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Remarks(Puna)</label>
                <InputText type="text" className="w-full" />
            </div>
        </div>
    );
}

const VaccinatedForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">4. Vaccinated(Binakunahan)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Birthdate</label>
                <Calendar id="lastMenstrualPeriod" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Vaccine (Bakunang Ibinigay)</label>
                <InputText type="text" className="w-full" />
            </div>
        </div>
    );
}

const FamilyPlanningForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">5. Family Planning(Nagpaplano ng Pamilya)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">F.P. Method</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Remarks(Puna)</label>
                <InputText type="text" className="w-full" />
            </div>
        </div>
    );
}


const DeathForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">6. Death(Namatay)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Date of Death(Petsa ng Kamatayan)</label>
                <Calendar id="lastMenstrualPeriod" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Cause of Death(Sanhi ng Pagkamatay)</label>
                <InputText type="text" className="w-full" />
            </div>
        </div>
    );
}

const SickForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">7. Sick(Mga may sakit)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Date of Sickness(Petsa na nakasakit)</label>
                <Calendar id="lastMenstrualPeriod" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Type of Sickness(Uri ng Karamdaman)</label>
                <InputText type="text" className="w-full" />
            </div>
        </div>
    );
}

const HasHighbloodForm = () => {
    return (
        <div className="card">
            <h5 className="text-center ">7. Has Highblood(May sakit na Highblood)</h5>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Name(Pangalan)</label>
                <InputText type="text" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">Age(Edad)</label>
                <InputText type="number" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label mb-2 block">BP</label>
                <InputText type="number" className="w-full" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastMenstrualPeriod" className="form-label mb-2 block">Mga Ginawa bilang BHW</label>
                <InputText type="text" className="w-full" />
            </div>
        </div>
    );
}


export const UpdateHealthServiceForm = () => {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const updateHealthServiceStore = useSelector((state: any) => state.updateHealthService);
    const items : MenuItem[] = [
        { label: "Select Service", className: "mr-2" },
        { label: "Fill-up Form", className: "mr-2"  },
        { label: "Review", className: "mr-2"  },
    ];
    const [form, setForm] = useState<{
        service : string,
        form : ReactNode,
        data : any
    }>({
        service : "",
        form : <UnderDevelopment />,
        data : {}
    });

    const services = [
        {
            label : "1. Pregnant(Buntis)",
            value : "PREGNANT",
            form : <PregnantForm />
        }, 
        {
            label: "2. Gave Birth(Nanganak)",
            value: "GAVE_BIRTH",
            form : <GaveBirthForm />
        },
        {
            label: "3. New Born Child(Bagong Silang na Sanggol)",
            value: "NEW_BORN_CHILD",
            form : <NewBornChildForm />
        },
        {
            label: "4. Vaccinated(Binakunahan)",
            value: "VACCINATED",
            form : <VaccinatedForm />
        }, 
        {
            label: "5. Family Plannning(Nagpalano ng Pamilya)",
            value: "FAMILY_PLANNING",
            form : <FamilyPlanningForm />
        },
        {
            label: "6. Death(Namatay)",
            value: "DEATH",
            form : <DeathForm />
        },
        {
            label: "7. Sick(Mga nagkasakit/may sakit)",
            value: "SICK",
            form : <SickForm />
        },
        {
            label: "8. Has Highblood(May sakit na Highblood)",
            value: "HAS_HIGHBLOOD",
            form : <HasHighbloodForm />
        },
        {
            label: "9. Has Diabetes(May sakit na Diabetes)",
            value: "HAS_DIABETES",
            form : <UnderDevelopment />
        },
        {
            label: "10. Urinalysis Result(Resulta ng Pag-Eksamin sa ihi)",
            value: "URINALYSIS_RESULT",
            form : <UnderDevelopment />
        },
        {
            label: "11. Has Cancer(May sakit na Cancer)",
            value: "HAS_CANCER",
            form : <UnderDevelopment />
        },
        {
            label: "12. (May Problema sa Pagiisip/Epilepsy)",
            value: "HAS_EPILEPSY",
            form : <UnderDevelopment />
        },
        {
            label: "13. Animal Bite(Kinagat ng Hayop/Aso)",
            value: "ANIMAL_BITE",
            form : <UnderDevelopment />
        }
    ]

    const next = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
    };

    const prev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    const onHide = () => {
        dispatch(hideUpdateHealthService());
        setActiveIndex(0);
    }

    return (
        <Sidebar 
            visible={updateHealthServiceStore.visible} 
            position="right" 
            style={{ width: '100vw' }} 
            onHide={onHide}>
            <div className="grid justify-content-center m-0">
                <div className="col-12 sm:col-11 md:col-8 lg:col-6">

                    <div className="w-full overflow-x-scroll scrollbar-none " style={{ 'scrollbarWidth': 'none' }} >
                        <Steps className="mb-4" model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}     />
                    </div>
                    <div className="mb-4">
                        <div className="flex gap-3 justify-content-between">
                            <Button size="small" label="Previous" icon="pi pi-angle-left" onClick={prev} disabled={activeIndex === 0} />
                            <Button size="small" label="Next" icon="pi pi-angle-right" onClick={next} disabled={activeIndex === items.length - 1} />
                        </div>
                    </div>

                    {activeIndex === 0 && (
                        <>
                            <h5 className="text-center mb-4">Select Health Service</h5>
                            <div className="grid gap-2 justify-content-center flex-wrap">
                                {services.map((service, index) => (
                                    <div className={`card col-3 mb-2 p-3 hover:bg-gray-200 cursor-pointer ${form.service === service.value && 'bg-gray-300'}`} onClick={() => setForm({...form, service: service.value, form: service.form})} key={index}>
                                        <div className="flex align-items-center h-full">
                                            <h6 style={{ wordBreak: 'break-all' }} className="mb-0 ">{service.label}</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {activeIndex === 1 && form.form}
                    {activeIndex === 2 && (<UnderDevelopment />)}
                </div>
            </div>
        </Sidebar>
    );
}