import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonGrid,
    IonRow, IonCol, IonIcon, IonButton, IonAlert, IonLoading
} from "@ionic/react";
import { InputConfig } from "../../model/InputConfig";
import { personCircle } from "ionicons/icons"
import './Login.css'
import InputContainer from "../../components/InputContainer";
import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import authService from "../../services/auth.service";


const Login: React.FC<{ setLogin: any }> = ({ setLogin }) => {
    const history = useHistory();
    const [mobile, setMobile] = useState<String>("");
    const [password, setpassword] = useState<String>("");
    const [isErrorMobile, setErrorMobile] = useState<boolean>(true);
    const [isErrorPassword, setErrorPassword] = useState<boolean>(true);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [iserror, setIserror] = useState<boolean>(false);
    const [header, setHeader] = useState<string>("Error!");
    const [isLoginSuccess, setLoginSuccess] = useState<boolean>();


    const onChange = (values: any) => {
        if (values.name === "mobile") {
            setMobile(values.value);
        }
        if (values.name === "password") {
            setpassword(values.value);
        }
    }

    const onError = (values: any) => {
        if (values.name === "mobile") {
            setErrorMobile(values.error);
        }
        if (values.name === "password") {
            setErrorPassword(values.error);
        }
    }

    const handleSubmit = (event: any) => {
        if (event) event.preventDefault();
        if (!mobile || !password) return;

        const api = axios.create({
            baseURL: `http://192.168.31.33:3000`
        })
        setShowLoading(true);
        setLoginSuccess(false);
        api.post("/auth/login", { mobile: mobile, password: password })
            .then(res => {
                console.log(res);
                setShowLoading(false);
                if (res.data.status === "success") {
                    //authService.login(res.data);
                    // setHeader("Success!");
                    // setMessage("Login successfully");
                    // setIserror(true)
                    setLoginSuccess(true);
                    authService.setUser(res.data);
                    setLogin(res.data);
                    history.push("/upcomingmovie")

                }
                else {
                    setHeader("Error!");
                    setMessage(res.data.message);
                    setIserror(true)
                }
                //history.push("/dashboard/" + email);
            })
            .catch(error => {
                setShowLoading(false);
                setHeader("Error!");
                setMessage("Server Error! Please try again later");
                setIserror(true)
            })
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

    const handleAlertClose = () => {
        setIserror(false)
        if (isLoginSuccess) {
            history.push('/upcomingmovie');
        }
    }


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
                                        <IonAlert
                                            isOpen={iserror}
                                            onDidDismiss={() => handleAlertClose()}
                                            header={header}
                                            message={message}
                                            buttons={["Dismiss"]}
                                        />
                                    </IonCol>
                                    <IonCol>
                                        <IonLoading
                                            spinner="lines"
                                            cssClass='main-menu-loader'
                                            isOpen={showLoading}
                                            onDidDismiss={() => setShowLoading(false)}
                                            message={'Login, Please wait...'}
                                        ></IonLoading>
                                    </IonCol>
                                </IonRow>
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
                                    <p style={{ fontSize: "medium" }}>
                                        New User. Please   <a onClick={(e) => { e.preventDefault(); history.push("/register") }}> Register</a> Here
                                    </p>
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