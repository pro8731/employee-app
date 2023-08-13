import { IFormComponentProps } from "../types/interfaces";

const EditEmployee: React.FC<IFormComponentProps> = (props) => {
    const { formComponent } = props;
    return <>{formComponent}</>;    
};

export default EditEmployee;
