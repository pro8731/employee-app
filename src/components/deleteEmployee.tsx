import { useEffect } from "react";
import { IEmployeeDelete } from "../types/interfaces";
import { deleteEmployee } from "../services/employee.service";
import { useNavigate } from "react-router-dom";

const DeleteEmployee: React.FC<IEmployeeDelete> = (props) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (props.selectedEmployeeId !== undefined) {
            deleteEmployee(props.selectedEmployeeId);
            navigate("/");
        }
      }, []);

    return <></>;    
};

export default DeleteEmployee;