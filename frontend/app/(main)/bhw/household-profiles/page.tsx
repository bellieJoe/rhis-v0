"use client";
import { getUsers } from "@/api/userApi";
import Link from "next/link";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { Steps } from "primereact/steps";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepWizard from "react-step-wizard";

        


interface AddHouseholdProfileProps {
    visible: boolean,
    onHide: () => void
}
const AddHouseholdProfile = ({ visible, onHide }: AddHouseholdProfileProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items : MenuItem[] = [
        { label: "Household Info", className: "mr-2" },
        { label: "Personal Info", className: "mr-2"  },
        { label: "Other Info", className: "mr-2"  },
        { label: "Medical Details", className: "mr-2"  },
        { label: "Review", className: "mr-2"  },
    ];


    const next = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
    };

    const prev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <Sidebar onHide={onHide} visible={visible} position="right" style={{ width: '100vw' }}>
            <h4 className="text-center mb-4">Add Household Profile</h4>
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
                    <div className="card mb-4">
                        {activeIndex === 0 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Household No.</label>
                                    <Dropdown options={["Option 1", "Option 2", "Option 3"]} value={null} placeholder="Select Household"style={{ width: '100%' }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Relationship to Head</label>
                                    <Dropdown options={["Option 1", "Option 2", "Option 3"]} value={null} placeholder="Select Relationship" style={{ width: '100%' }} />
                                </div>
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">First Name</label>
                                    <InputText type="text" style={{ width: '100%' }} placeholder="First Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Middle Name</label>
                                    <InputText type="text" style={{ width: '100%' }} placeholder="Middle Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Last Name</label>
                                    <InputText type="text" style={{ width: '100%' }} placeholder="Last Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Birthdate</label>
                                    <Calendar value={null}  dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" className="w-full" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Sex</label>
                                    <Dropdown options={["Male", "Female"]} value={null} placeholder="Select Gender" className="w-full" />
                                </div>
                                
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Civil Status</label>
                                    <Dropdown options={["Single", "Married"]} value={null} placeholder="Select Civil Status" className="w-full" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Educational Attainment</label>
                                    <Dropdown options={[]} value={null} placeholder="Select Educational Attainment" className="w-full" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Religion</label>
                                    <Dropdown options={[]} value={null} placeholder="Select Religion" className="w-full" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Ethnicity</label>
                                    <Dropdown options={[]} value={null} placeholder="Select Ethnicity" className="w-full" />
                                </div>
                            </div>
                        )}
                        {activeIndex === 3 && (
                            <div>
                                <div className="mb-3">
                                    <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                        <Checkbox  checked={false} ></Checkbox>
                                        <div className="">
                                            <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Is 4P's Member?</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Philhealth No.</label>
                                        <InputText type="text" style={{ width: '100%' }} placeholder="Philhealth No" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Philhealth Membership Type</label>
                                        <Dropdown options={[]} value={null} placeholder="Select Philhealth Membership Type" className="w-full" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Philhealth Category</label>
                                        <Dropdown options={[]} value={null} placeholder="Select Philhealth Category" className="w-full" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Classification by Age/Health Risk Group</label>
                                        <Dropdown options={[]} value={null} placeholder="Select Classification by Age/Health Risk Group" className="w-full" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Last Menstral Period</label>
                                        <Calendar value={null}  dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" className="w-full" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </Sidebar>
    )
}

const HouseholdProfiles = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState({
        addHouseholdProfile: false
    });

    return (
        <>
            <div className="card">
                <h5>Household Profiles</h5>
                <div className="flex justify-content-end">
                    <Button label="Add Profile" size="small"  icon="pi pi-plus" onClick={() => setVisible({ ...visible, addHouseholdProfile: true })}  />
                </div>
                <AddHouseholdProfile visible={visible.addHouseholdProfile} onHide={() => setVisible({ ...visible, addHouseholdProfile: false })} />
            </div>
        </>
    )
}

export default HouseholdProfiles;