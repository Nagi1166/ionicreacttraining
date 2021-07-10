import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonGrid, IonRow,
    IonCol,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAlert,
    IonNote
} from "@ionic/react";

import { personCircle } from "ionicons/icons"
import React, { useState } from 'react';

import "./Register.css"

const Register: React.FC = () => {
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


    const handleRegiser = () => {
        if (!firstName) {
            // setHeader("Info!");
            // setMessage("Please enter the first name");
            // setAlert(true);
            setErrorFirstName("Please enter first name");
            return;
        }
        if (!lastName) {
            // setHeader("Info!");
            // setMessage("Please enter the first name");
            // setAlert(true);
            setErrorLastName("Please enter last name");
            return;
        }
        if (!email) {
            // setHeader("Info!");
            // setMessage("Please enter the first name");
            // setAlert(true);
            setErrorEmail("Please enter email");
            return;
        }
        if (!mobile) {
            // setHeader("Info!");
            // setMessage("Please enter the first name");
            // setAlert(true);
            setErrorMobile("Please enter mobile");
            return;
        }
        if (!password) {
            // setHeader("Info!");
            // setMessage("Please enter the first name");
            // setAlert(true);
            setErrorPassword("Please enter password");
            return;
        }
        setErrorFirstName("");
        setErrorLastName("");
        setErrorEmail("");
        setErrorMobile("");
        setErrorPassword("");
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
                                <IonIcon className="ion-person" icon={personCircle} color="secondary"></IonIcon>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">FirstName</IonLabel>
                                    <IonInput type="text" value={firstName} onIonChange={(e) => {
                                        setFirstName(e.detail.value!);
                                        e.detail.value ? setErrorFirstName("") : setErrorFirstName("Please enter firstname")
                                    }}>

                                    </IonInput>
                                </IonItem>
                                {errorFirstName ? (<IonNote className="error-note" color="danger">{errorFirstName}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">LastName</IonLabel>
                                    <IonInput type="text" value={lastName} onIonChange={(e) => {
                                        setLastName(e.detail.value!);
                                        e.detail.value ? setErrorLastName("") : setErrorLastName("Please enter last name")
                                    }}>

                                    </IonInput>
                                </IonItem>
                                {errorLastName ? (<IonNote className="error-note" color="danger">{errorLastName}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <IonInput type="email" value={email} onIonChange={(e) => {
                                        setEmail(e.detail.value!);
                                        e.detail.value ? setErrorEmail("") : setErrorEmail("Please enter email")
                                    }}>

                                    </IonInput>
                                </IonItem>
                                {errorEmail ? (<IonNote className="error-note" color="danger">{errorEmail}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Mobile</IonLabel>
                                    <IonInput type="tel" value={mobile} onIonChange={(e) => {
                                        setMobile(e.detail.value!);
                                        e.detail.value ? setErrorMobile("") : setErrorMobile("Please enter mobile")
                                    }}>

                                    </IonInput>
                                </IonItem>
                                {errorMobile ? (<IonNote className="error-note" color="danger">{errorMobile}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <IonInput type="password" value={password} onIonChange={(e) =>  {setPassword(e.detail.value!);
                                     e.detail.value ? setErrorPassword("") : setErrorPassword("Please enter password")}}>
                                    </IonInput>
                                </IonItem>
                                {errorPassword ? (<IonNote className="error-note" color="danger">{errorPassword}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton expand="block" onClick={handleRegiser}>Register</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Register;