import { useSelector } from "react-redux";

const ValidationError = ({ name }: { name: string }) => {
    const { errors } = useSelector((state: any) => state.error);
    return (
        <>
            <div className="text-red-500">{errors[name] ? errors[name][0] : ""}</div> 
        </>
    )
};

export default ValidationError;