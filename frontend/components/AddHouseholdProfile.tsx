import { getGenericTypes } from "@/api/genericTypeApi";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { Steps } from "primereact/steps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddHouseholdProfileProps {
    visible: boolean,
    onHide: () => void
}

const AddHouseholdProfile = ({ visible, onHide }: AddHouseholdProfileProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch();
    const {genericTypes} = useSelector((state: any) => state.genericType);

    const items : MenuItem[] = [
        { label: "Household Info", className: "mr-2" },
        { label: "Personal Info", className: "mr-2"  },
        { label: "Other Info", className: "mr-2"  },
        { label: "Medical Details", className: "mr-2" },
        { label: "For Women of Reproductive Age", className: "mr-2" },
        { label: "Living and Health Condition", className: "mr-2" },
        { label: "Review", className: "mr-2"  },
    ];

    useEffect(() => {
        (async()=>{
            await getGenericTypes(dispatch);
            console.log(genericTypes)
        })();
    }, []);


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
                                    <Dropdown 
                                        options={genericTypes.filter((x: any) => x.type === "MEMBERS_OF_HOUSEHOLD")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} placeholder="Select Relationship" 
                                        style={{ width: '100%' }} />
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
                                    <Dropdown 
                                        options={genericTypes.filter((x: any) => x.type === "GENDER")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} 
                                        placeholder="Select Gender" 
                                        style={{ width: '100%' }} />
                                </div>
                                
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Civil Status</label>
                                    <Dropdown 
                                        options={genericTypes.filter((x: any) => x.type === "CIVIL_STATUS")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} placeholder="Select Civil Status" 
                                        style={{ width: '100%' }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Educational Attainment</label>
                                    <Dropdown 
                                        options={genericTypes.filter((x: any) => x.type === "EDUCATIONAL_ATTAINMENT")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} placeholder="Select Educational Attainment" 
                                        style={{ width: '100%' }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Religion</label>
                                    <Dropdown 
                                        options={genericTypes.filter((x: any) => x.type === "RELIGION")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} placeholder="Select Religion" 
                                        style={{ width: '100%' }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Ethnicity</label>
                                    <Dropdown 
                                        options={[
                                            {
                                                id: "IP",
                                                label: "IP"
                                            },
                                            {
                                                id: "Non-IP",
                                                label: "Non-IP"
                                            }
                                        ]} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} placeholder="Select Ethnicity" 
                                        style={{ width: '100%' }} />
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
                                        <Dropdown 
                                            options={genericTypes.filter((x: any) => x.type === "PHILHEALTH_MEMBERSHIP")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={null} placeholder="Select Philhealth Membership Type" 
                                            style={{ width: '100%' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Philhealth Category</label>
                                        <Dropdown 
                                            options={genericTypes.filter((x: any) => x.type === "PHILHEALTH_CATEGORY")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={null} placeholder="Select Philhealth Category" 
                                            style={{ width: '100%' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Medical History</label>
                                        <Dropdown 
                                            options={genericTypes.filter((x: any) => x.type === "MEDICAL_HISTORY")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={null} placeholder="Select Medical History" 
                                            style={{ width: '100%' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Classification by Age/Health Risk Group</label>
                                        <Dropdown 
                                            options={genericTypes.filter((x: any) => x.type === "CLASSIFICATION_BY_AHRG")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={null} placeholder="Select Classification" 
                                            style={{ width: '100%' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Last Menstral Period</label>
                                        <Calendar value={null}  dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" className="w-full" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeIndex === 4 && (
                            <div className="">
                                <p className="text-italic"><i>For Women of reproductive age only.</i></p>
                                <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                    <Checkbox  checked={false} ></Checkbox>
                                    <div className="">
                                        <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Using any Family Planning method?</p>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Family Planning Method Used</label>
                                    <Dropdown 
                                        options={genericTypes.filter((x: any) => x.type === "FAMILY_PLANNING_METHOD")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} placeholder="Select Family Planning Method" 
                                        style={{ width: '100%' }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Family Planning Status</label>
                                    <Dropdown 
                                        options={genericTypes.filter((x: any) => x.type === "FAMILY_PLANNING_STATUS")} 
                                        optionLabel="label"
                                        optionValue="id"
                                        value={null} placeholder="Select Family Planning Status" 
                                        style={{ width: '100%' }} />
                                </div>
                            </div>
                        )}

                        {activeIndex === 5 && (
                            <div className="">
                                <div className="mb-3">
                                    <h6>Living Condition</h6>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Water Source Type</label>
                                        <Dropdown 
                                            options={genericTypes.filter((x: any) => x.type === "WATER_SOURCE_TYPE")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={null} placeholder="Select Water Source" 
                                            style={{ width: '100%' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900 mb-1">Toilet Facility Type</label>
                                        <Dropdown 
                                            options={genericTypes.filter((x: any) => x.type === "TOILET_FACILITY_TYPE")} 
                                            optionLabel="label"
                                            optionValue="id"
                                            value={null} placeholder="Select Toilet Facility" 
                                            style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Health Condition </h6>
                                    <span><i>(Put a check on the box)</i></span>
                                    <br /><br />
                                    <div className="">
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={false} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Asthma (Hika)</p>
                                            </div>
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={false} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Cancer</p>
                                            </div>
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={false} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">PWD (May kapansanan)</p>
                                            </div>
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={false} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Stroke</p>
                                            </div>
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={false} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">MHGAP</p>
                                            </div>
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={false} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Smoker</p>
                                            </div>
                                        </div>
                                        <div className="flex vertical-align-middle align-items-center gap-2 mb-3">
                                            <Checkbox  checked={false} ></Checkbox>
                                            <div className="">
                                                <p className="block text-sm font-medium text-gray-900 mb-0 flex vertical-align-text-bottom align-items-center ">Alchohol Drinker</p>
                                            </div>
                                        </div>
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

export default AddHouseholdProfile;