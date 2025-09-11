import { getBarangayList, getMunicipalityList } from "@/api/addressApi";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface MuncipalityPickerProps {
  province? : string,
  placeholder?: string,
  municipality : any,
  onChange: (e: any) => any
}
export const MunicipalityPicker = (props : MuncipalityPickerProps) => {
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [province, setProvince] = useState(props.province || 23);
  const dispatch = useDispatch();
  const [municipality, setMunicipality] = useState(props.municipality || null);

  useEffect(() => {
    if (props.province) {
      setProvince(props.province);
    }
  }, [props.province]);

  useEffect(() => {
    (async () => {
      if (province) {
        const _municipalities = await getMunicipalityList(dispatch, { province: province });
        setMunicipalities(_municipalities || []);
      }
    })();
  }, [province]);

  const handleChange = (e: any) => {
    setMunicipality(e.value);
    props.onChange(e.value);
  };

  return (
    <>
      <Dropdown 
        filter
        placeholder={props.placeholder || "Select Municipality"} 
        value={municipality} 
        onChange={handleChange}  
        options={municipalities} 
        optionValue="id" 
        optionLabel="municipality_name" />
    </>
  );
}

interface BaranggayPickerProps {
  municipality? : any,
  barangay : any,
  placeholder?: string,
  onChange: (e: any) => any
}
export const BarangayPicker = (props : BaranggayPickerProps) => {
  const [barangays, setBarangays] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [barangay, setBarangay] = useState(props.barangay || null);

  useEffect(() => {
    (async () => {
      if (props.municipality) {
        const _barangays = await getBarangayList(dispatch, { municipality: props.municipality });
        setBarangays(_barangays || []);
      }
    })();
  }, [props.municipality]);

  const handleChange = (e: any) => {
    setBarangay(e.value);
    props.onChange(e.value);
  };

  return (
    <>
      <Dropdown 
        filter
        placeholder={props.placeholder || "Select Barangay"} 
        value={barangay} 
        onChange={handleChange}  
        options={barangays} 
        optionValue="id" 
        optionLabel="barangay_name" />
    </>
  );
}

export const MonthPicker = (props: { value: number, onChange: (e: any) => any }) => {
  const months = [
    { name: 'January', code: 1 },
    { name: 'February', code: 2 },
    { name: 'March', code: 3 },
    { name: 'April', code: 4 },
    { name: 'May', code: 5 },
    { name: 'June', code: 6 },
    { name: 'July', code: 7 },
    { name: 'August', code: 8 },
    { name: 'September', code: 9 },
    { name: 'October', code: 10 },
    { name: 'November', code: 11 },
    { name: 'December', code: 12 },
  ];

  return (
    <>
      <Dropdown 
        filter
        placeholder="Select Month" 
        value={props.value} 
        onChange={props.onChange}  
        options={months} 
        optionValue="code" 
        optionLabel="name" />
    </>
  );
}

export const YearPicker = (props: { value: number, onChange: (e: any) => any, startYear?: number, endYear?: number }) => {
  const currentYear = new Date().getFullYear();
  const startYear = props.startYear || currentYear - 10;
  const endYear = props.endYear || currentYear;
  const years = [];
  for (let i = endYear; i >= startYear; i--) {
    years.push({ name: i.toString(), code: i });
  }
  return (
    <>
      <Dropdown 
        filter
        placeholder="Select Year" 
        value={props.value} 
        onChange={props.onChange}  
        options={years} 
        optionValue="code" 
        optionLabel="name" />
    </>
  );
}