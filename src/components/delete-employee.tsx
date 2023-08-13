import { useEffect } from "react";
import { IEmployeeDelete } from "../types/interfaces";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../services/employee-service";
import { Subscription } from "rxjs";

const DeleteEmployee: React.FC<IEmployeeDelete> = (props) => {
    const navigate = useNavigate();

    useEffect(
        function deleteSelectedEmployee() {
            let subscription: Subscription;

            if (props.selectedEmployeeId !== undefined && props.selectedEmployeeId > -1) {
                subscription = deleteEmployee(props.selectedEmployeeId).subscribe({
                    next: (data) => {
                        console.log(data);
                    },
                    error: (e) => {
                        console.log(e.response.data);
                        alert(e.response.data);
                    },
                    complete: () => console.log('done'),
                    });
                    
                    navigate("/");
            }

            return () => {
                if (subscription && subscription.closed) {
                    subscription.unsubscribe();
                }
            }
    }, []);

    return <></>;    
};

export default DeleteEmployee;
