import { IFormComponentProps } from "../types/interfaces";

const CreateEmployee: React.FC<IFormComponentProps> = (props) => {
    const { formComponent } = props;
    return <>{formComponent}</>;    
};

export default CreateEmployee;
