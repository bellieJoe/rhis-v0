import { hideAddUserForm } from "@/features/forms/addUserSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Required from "./forms/RequiredIndicator";
import { Dropdown } from "primereact/dropdown";
import { getRoleTypes } from "@/api/roleTypeApi";
import { getOffices } from "@/api/officeApi";
import ValidationError from "./forms/ValidationError";
import { storeUser } from "@/api/userApi";
import { reloadUsers } from "@/features/userSlice";


const AddUserForm = () => {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [roleTypes, setRoleTypes] = useState([]);
    const [offices, setOffices] = useState([]);
    const addUserStore = useSelector((state: any) => state.addUser);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<any>({
        email : '',
        firstname : '',
        middlename : '',
        lastname : '',
        role_type_id : ''
    });
    const onHide = async () => {
        dispatch(hideAddUserForm());
    }

    const onInit = async () => {
        const _roleTypes = await getRoleTypes(dispatch);
        setRoleTypes(_roleTypes);
        const _offices = await getOffices(dispatch, { full: true });
        setOffices(_offices);
    }

    const handleSubmit = async() => {
        setLoading(true);
        const success = await storeUser(dispatch, form);
        setLoading(false);
        if(success) {
            dispatch(reloadUsers());
            onHide();
        }
    }

    useEffect(() => {
        onInit();
    }, []);

    return (
        <>
            <Sidebar 
            onHide={onHide}
            visible={addUserStore.visible}
            position="right"
            showCloseIcon={false}
            header={
                <div className="flex justify-content-center">
                    <h4 className="">Add User</h4>
                </div>
            }
            icons={() => (
                <Button
                    icon="pi pi-times"
                    size="large"
                    severity="danger"
                    text
                    rounded
                    onClick={onHide}
                />
            )}
            style={{ width: '100vw', maxWidth: '400px' }}
            >
                <div className="mb-3">
                    <label htmlFor="" className="form-label mb-2 block">Firstname <Required /></label>
                    <InputText type="text" className="w-full" placeholder="Enter Firstname" onChange={(e) => setForm({...form, firstname : e.target.value})} value={form.firstname} />
                    <ValidationError name="firstname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label mb-2 block">Middlename <Required /></label>
                    <InputText type="text" className="w-full" placeholder="Enter Middlename" onChange={(e) => setForm({...form, middlename : e.target.value})} value={form.middlename} />
                    <ValidationError name="middlename" />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label mb-2 block">Lastname <Required /></label>
                    <InputText type="text" className="w-full" placeholder="Enter Lastname" onChange={(e) => setForm({...form, lastname : e.target.value})} value={form.lastname} />
                    <ValidationError name="lastname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label mb-2 block">Email <Required /></label>
                    <InputText type="email" className="w-full" placeholder="Enter Email" onChange={(e) => setForm({...form, email : e.target.value})} value={form.email}  />
                    <ValidationError name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label mb-2 block">Role <Required /></label>
                    <Dropdown className="w-full" placeholder="Select Role"  filter options={roleTypes} optionLabel="caps_name" optionValue="id" value={form.role_type_id} onChange={(e) => setForm({...form, role_type_id : e.value})}  />
                    <ValidationError name="role_type_id" />
                </div>
                <div className="flex justify-content-end">
                    <Button label="Save" onClick={handleSubmit} loading={loading} />
                </div>
            </Sidebar>
        </>
    );
}

export default AddUserForm;