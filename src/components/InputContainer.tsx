import { IonInput, IonItem, IonLabel, IonNote } from "@ionic/react";
import { InputConfig } from "../model/InputConfig";
import { useState } from "react";
import './InputContainer.css'


interface InputConfigProps {
    inputConfig: InputConfig
}

const InputContainer: React.FC<InputConfigProps> = (props) => {
    const { inputConfig } = props;

    const [value, setValue] = useState<string>();
    const [error, setError] = useState<string>("");

    const handleValue = (val: any) => {
        setValue(val);
        let isError = false;
        if (inputConfig.required && inputConfig.requiredErrorMessage && !val) {
            isError = true;
            setError(inputConfig.requiredErrorMessage);
        }
        else if (inputConfig.validations) {
            inputConfig.validations.forEach((element) => {
                if (!element.regex.test(val)) {
                    isError = true;
                    setError(element.errorMessage);
                }
            })
        }
        if (isError) {
            inputConfig.onError({ name: inputConfig.name, error: true })
            return;
        }
        setError("");
        inputConfig.onError({ name: inputConfig.name, error: false })
        inputConfig.onChange({ name: inputConfig.name, value: val })
    }

    return (<>
        <IonItem>
            <IonLabel position="floating">{inputConfig.label}</IonLabel>
            <IonInput type={inputConfig.type} value={value} onIonChange={(e) => handleValue(e.detail.value!)}></IonInput>
        </IonItem>
        {error ? <IonNote className="error-note" color="danger" >{error}</IonNote> : ""} </>);
}

export default InputContainer