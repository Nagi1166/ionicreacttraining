import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonGrid,
    IonRow, IonCol, IonIcon, IonButton
} from "@ionic/react";
import { InputConfig } from "../../model/InputConfig";
import { personCircle } from "ionicons/icons"
import './Login.css'
import InputContainer from "../../components/InputContainer";
import { useState } from "react";


const Login: React.FC = () => {

    const [isErrorMobile, setErrorMobile] = useState<boolean>(true);
    const [isErrorPassword, setErrorPassword] = useState<boolean>(true);


    const onChange = (values: any) => {
        const formType = formGroup.find(x => x.name === values.name);
        if (formType) formType.value = values.value;
    }

    const onError = (values: any) => {
        if (values.name === "mobile") {
            setErrorMobile(values.error);
        }
        if (values.name === "password") {
            setErrorPassword(values.error);
        }
    }

    const handleSubmit = (values: any) => {

    }

    const formGroup: InputConfig[] = [
        {
            name: "mobile",
            label: "Mobile",
            type: "text",
            required: true,
            requiredErrorMessage: "Please enter mobile",
            onChange,
            onError,
            validations: [
                {
                    regex: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
                    errorMessage: "Invlid Mobile"
                }
            ]
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
            requiredErrorMessage: "Please enter password",
            onChange,
            onError,
            validations: [
                {
                    regex: /^.{6,}$/,
                    errorMessage: "Password must contain alteast 6 charecters"
                }
            ]
        }
    ]


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Login
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">
                            Login
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="center">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <IonCard class="ion-margin">
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonIcon className="ion-person" icon={personCircle} color="secondary"></IonIcon>
                                    </IonCol>
                                </IonRow>
                                {formGroup.map((type) => (
                                    <IonRow key={type.name}>
                                        <IonCol>
                                            <InputContainer inputConfig={type} />
                                        </IonCol>
                                    </IonRow>
                                ))}
                            </IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonButton disabled={isErrorMobile || isErrorPassword} expand="block" type="submit">Login</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCard>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;