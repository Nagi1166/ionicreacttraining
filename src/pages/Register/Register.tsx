import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonGrid, IonRow,
    IonCol,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAlert,
    IonNote,
    IonLoading
} from "@ionic/react";

import { personCircle } from "ionicons/icons"
import React, { useState } from 'react';
import axios from 'axios';

import "./Register.css"
import { useHistory } from "react-router";

const Register: React.FC = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mobile, setMobile] = useState<string>();
    const [password, setPassword] = useState<string>("");
    const [isAlert, setAlert] = useState<boolean>(false);
    const [header, setHeader] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [errorFirstName, setErrorFirstName] = useState<string>("");
    const [errorLastName, setErrorLastName] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorMobile, setErrorMobile] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);

    const nameRegex = /^[a-zA-Z ]+$/;
    const mobileRegex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    const emailRegex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    const passwordRegex = /^.{6,}$/;

    const handleFirstName = (value: any) => {
        setFirstName(value);
        if (!value) {
            setErrorFirstName("Please enter first name");
            return;
        }
        if (!nameRegex.test(String(value).toLocaleLowerCase())) {
            setErrorFirstName("Firstname is invalid");
            return;
        }
        setErrorFirstName("");
    }

    const handleLastName = (value: any) => {
        setLastName(value);
        if (!value) {
            setErrorLastName("Please enter last name");
            return;
        }
        if (!nameRegex.test(String(value).toLocaleLowerCase())) {
            setErrorLastName("Lastname is invalid");
            return;
        }
        setErrorLastName("");
    }

    const handleMobile = (value: any) => {
        setMobile(value);
        if (!value) {
            setErrorMobile("Please enter mobile");
            return;
        }
        if (!mobileRegex.test(value)) {
            setErrorMobile("Mobile is invalid");
            return;
        }
        setErrorMobile("");
    }

    const handleEmail = (value: any) => {
        setEmail(value);
        if (!value) {
            setErrorEmail("Please enter email");
            return;
        }
        if (!emailRegex.test(String(value).toLocaleLowerCase())) {
            setErrorEmail("email is invalid");
            return;
        }
        setErrorEmail("");
    }

    const handlePassword = (value: any) => {
        setPassword(value);
        if (!value) {
            setErrorPassword("Please enter password");
            return;
        }
        if (!passwordRegex.test(value)) {
            setErrorPassword("password is invalid");
            return;
        }
        setErrorPassword("");
    }


    const handleRegiser = () => {
        setErrorFirstName("");
        setErrorLastName("");
        setErrorEmail("");
        setErrorMobile("");
        setErrorPassword("");

        const api = axios.create({
            baseURL: `http://localhost:3000`
        })

        const data = {
            firstName,
            lastName,
            email,
            password,
            mobile,
        }
        setLoader(true);
        api.post('/users', data).then((result) => {
            setLoader(false);
            console.log(result);
            if (result && result.data) {
                if (result.data.status === "success") {
                    // setHeader("Success!");
                    // setMessage("User Register Successfully");
                    // setAlert(true);
                    history.push("/login");
                    return;
                }
                setHeader("Error!");
                setMessage(result.data.message);
                setAlert(true);
                return;
            }
            console.log("Invlid response from server");
            setHeader("Error!");
            setMessage("Server error. Please try again later");
            setAlert(true);
        }
        ).catch((err) => {
            setLoader(false);
            console.log(err);
            setHeader("Error!");
            setMessage("Server error. Please try again later");
            setAlert(true);
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Register
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">
                            Register
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonAlert isOpen={isAlert} header={header} message={message} buttons={["Dismiss"]}
                                    onDidDismiss={() => setAlert(false)} ></IonAlert>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLoading isOpen={loader} spinner="lines" message={"Registering please wait..."}
                                    onDidDismiss={() => setLoader(false)} ></IonLoading>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonIcon className="ion-person" icon={personCircle} color="secondary"></IonIcon>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">FirstName</IonLabel>
                                    <IonInput type="text" value={firstName} onIonChange={(e) => handleFirstName(e.detail.value!)}>
                                    </IonInput>
                                </IonItem>
                                {errorFirstName ? (<IonNote className="error-note" color="danger">{errorFirstName}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">LastName</IonLabel>
                                    <IonInput type="text" value={lastName} onIonChange={(e) => handleLastName(e.detail.value!)}>

                                    </IonInput>
                                </IonItem>
                                {errorLastName ? (<IonNote className="error-note" color="danger">{errorLastName}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <IonInput type="email" value={email} onIonChange={(e) => handleEmail(e.detail.value!)}>

                                    </IonInput>
                                </IonItem>
                                {errorEmail ? (<IonNote className="error-note" color="danger">{errorEmail}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Mobile</IonLabel>
                                    <IonInput type="tel" value={mobile} onIonChange={(e) => handleMobile(e.detail.value!)}>

                                    </IonInput>
                                </IonItem>
                                {errorMobile ? (<IonNote className="error-note" color="danger">{errorMobile}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <IonInput type="password" value={password} onIonChange={(e) => handlePassword(e.detail.value!)}>
                                    </IonInput>
                                </IonItem>
                                {errorPassword ? (<IonNote className="error-note" color="danger">{errorPassword}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton disabled={(errorFirstName ? true : false) ||
                                    (errorLastName ? true : false) ||
                                    (errorMobile ? true : false) ||
                                    (errorPassword ? true : false) ||
                                    (errorEmail ? true : false)} expand="block" onClick={handleRegiser}>Register</IonButton>
                                <p style={{ fontSize: "medium" }}>
                                    Already registered. Please   <a onClick={() => history.push("./login")}> Login</a> Here
                                </p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Register;