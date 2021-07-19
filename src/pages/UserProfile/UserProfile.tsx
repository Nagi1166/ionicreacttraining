import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonImg, IonFab, IonFabButton, IonIcon, IonCard, IonButton, IonAlert, IonLoading, IonInput, IonItem, IonLabel, IonNote, IonDatetime } from "@ionic/react"
import axios from "axios"
import { camera } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import InputContainer from "../../components/InputContainer"
import { base64FromPath, usePhotoGallery } from "../../hooks/UsePhotoGallery"
import { InputConfig } from "../../model/InputConfig"
import { IPhoto } from "../../model/IPhoto"
import getHeader from "../../services/auth.header"
import authService from "../../services/auth.service"
import "./UserProfile.css"


const UserProfile: React.FC<{ setProfile: any }> = ({ setProfile }) => {
    const history = useHistory();
    const api = axios.create({
        baseURL: `http://192.168.31.33:3000`
    })

    const userInfo = authService.getUser();

    const nameRegex = /^[a-zA-Z ]+$/;
    const mobileRegex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    const emailRegex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    const passwordRegex = /^.{6,}$/;

    const [mobile, setMobile] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [mobileError, setMobileError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");
    const [dobError, setDobError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const [isAlert, setAlert] = useState<boolean>(false);
    const [header, setHeader] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [loader, setLoader] = useState<boolean>(false);
    const [isUpdateSuccess, setUpdateSuccess] = useState<boolean>(false);

    const { photo, setPhoto, takePhoto } = usePhotoGallery();

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        setLoader(true);
        api.get(`/users/${userInfo.id}`, { headers: getHeader() }).then(async (res) => {
            setLoader(false);
            if (res.data.status === "success" && res.data.result) {
                const result = res.data.result;
                setFirstName(result.FirstName ? result.FirstName : "");
                setLastName(result.LastName ? result.LastName : "");
                setMobile(result.mobile ? result.mobile : "");
                setEmail(result.email ? result.email : "");
                setPassword(result.password ? result.password : "");
                if (result.profilePic) {
                    const webFilePath = `http://192.168.31.33:3000/uploads/${result.profilePic}`;
                    const imageData = await base64FromPath(webFilePath);
                    const photo: IPhoto = {
                        fileName: result.profilePic,
                        webFilePath,
                        imageData
                    }
                    setPhoto(photo);
                }
                setDob(result.dob ? result.dob : "");
                return;
            }
            setHeader("Error!")
            setMessage(res.data && res.data.message ? res.data.message : "Server Error");
            setAlert(true);
        }).catch((err) => {
            setLoader(false);
            setHeader("Error!")
            setMessage("Server Error");
            setAlert(true);
        })
    }


    function DataURIToBlob(dataURI: string) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
    }

    const handleFirstName = (value: any) => {
        setFirstName(value);
        if (!value) {
            setFirstNameError("Please enter first name");
            return;
        }
        if (!nameRegex.test(String(value).toLocaleLowerCase())) {
            setFirstNameError("Firstname is invalid");
            return;
        }
        setFirstNameError("");
    }

    const handleLastName = (value: any) => {
        setLastName(value);
        if (!value) {
            setLastNameError("Please enter last name");
            return;
        }
        if (!nameRegex.test(String(value).toLocaleLowerCase())) {
            setLastNameError("Lastname is invalid");
            return;
        }
        setLastNameError("");
    }

    const handleDob = (value: any) => {
        setDob(value);
        if (!value) {
            setDobError("Please select date of birth");
            return;
        }
        setDobError("");
    }

    const handleDobClose = () => {
        if (!dob) {
            setDobError("Please select date of birth");
            return;
        }
        setDobError("");
    }

    const handleMobile = (value: any) => {
        setMobile(value);
        if (!value) {
            setMobileError("Please enter mobile");
            return;
        }
        if (!mobileRegex.test(value)) {
            setMobileError("Mobile is invalid");
            return;
        }
        setMobileError("");
    }

    const handleEmail = (value: any) => {
        setEmail(value);
        if (!value) {
            setEmailError("Please enter email");
            return;
        }
        if (!emailRegex.test(String(value).toLocaleLowerCase())) {
            setEmailError("email is invalid");
            return;
        }
        setEmailError("");
    }

    const handlePassword = (value: any) => {
        setPassword(value);
        if (!value) {
            setPasswordError("Please enter password");
            return;
        }
        if (!passwordRegex.test(value)) {
            setPasswordError("password is invalid");
            return;
        }
        setPasswordError("");
    }

    const handleSubmit = (event: any) => {
        if (event) event.preventDefault();
        if (!photo) {
            setHeader("Error!")
            setMessage("Please select photo");
            setAlert(true);
            return;
        }
        if (!mobile || !password || !email || !lastName || !firstName || !dob || !photo) return;

        const formData = new FormData();

        formData.append("profilePic", DataURIToBlob(photo.imageData), photo.fileName);
        formData.append("mobile", String(mobile));
        formData.append("password", String(password));
        formData.append("lastName", String(lastName));
        formData.append("firstName", String(firstName));
        formData.append("dob", String(dob));
        formData.append("email", String(email));
        setLoader(true);
        setUpdateSuccess(false);
        api.put(`/users/${userInfo.id}`, formData, { headers: getHeader() })
            .then(res => {
                setLoader(false);
                console.log(res);
                if(res.data.status === "success") {
                    setHeader("Success!")
                    setMessage("Profile has been updated successfully. Please relogin");
                    setAlert(true);
                    authService.removeUser();
                    setUpdateSuccess(true);
                    return;
                }
                setHeader("Error!")
                setMessage("Server Error");
                setAlert(true);
            })
            .catch(error => {
                console.log(error);
                setLoader(false);
                setHeader("Error!")
                setMessage("Server Error");
                setAlert(true);
            })
    }

    const handleAlertClose = () => {
        setAlert(false);
        if(isUpdateSuccess){
            setProfile(null);
            history.push('/login');
        }
    }


    return (<IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>
                    User Profile
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding ion-text-center">
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">
                        User Profile
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <form onSubmit={(e) => handleSubmit(e)}>
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonAlert isOpen={isAlert} header={header} message={message} buttons={["Dismiss"]}
                                    onDidDismiss={() => handleAlertClose()} ></IonAlert>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLoading isOpen={loader} spinner="lines" message={"Please wait..."}
                                    onDidDismiss={() => setLoader(false)} ></IonLoading>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="profile-pic-col">
                                <IonAvatar className="profile-avatar">
                                    <IonImg className="profile-img" src={photo ? photo.webFilePath : "assets/imgs/avatar.png"}></IonImg>
                                    <IonFab className="profile-fab" vertical="bottom" horizontal="center" edge>
                                        <IonFabButton color="secondary" size="small" onClick={() => takePhoto()} >
                                            <IonIcon icon={camera}></IonIcon>
                                        </IonFabButton>
                                    </IonFab>
                                </IonAvatar>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">FirstName</IonLabel>
                                    <IonInput type="text" value={firstName} onIonChange={(e) => handleFirstName(e.detail.value!)}>
                                    </IonInput>
                                </IonItem>
                                {firstNameError ? (<IonNote className="error-note" color="danger">{firstNameError}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">LastName</IonLabel>
                                    <IonInput type="text" value={lastName} onIonChange={(e) => handleLastName(e.detail.value!)}>

                                    </IonInput>
                                </IonItem>
                                {lastNameError ? (<IonNote className="error-note" color="danger">{lastNameError}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <IonInput type="text" value={email} onIonChange={(e) => handleEmail(e.detail.value!)}>

                                    </IonInput>
                                </IonItem>
                                {emailError ? (<IonNote className="error-note" color="danger">{emailError}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Date of Birth</IonLabel>
                                    <IonDatetime placeholder="Select date of birth" value={dob} displayFormat="DD/MM/YYYY" onIonCancel={() => handleDobClose()} onIonChange={(e) => handleDob(e.detail.value!)} ></IonDatetime>
                                </IonItem>
                                {dobError ? (<IonNote className="error-note" color="danger">{dobError}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Mobile</IonLabel>
                                    <IonInput readonly type="tel" value={mobile} onIonChange={(e) => handleMobile(e.detail.value!)}>

                                    </IonInput>
                                </IonItem>
                                {mobileError ? (<IonNote className="error-note" color="danger">{mobileError}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <IonInput type="password" value={password} onIonChange={(e) => handlePassword(e.detail.value!)}>
                                    </IonInput>
                                </IonItem>
                                {passwordError ? (<IonNote className="error-note" color="danger">{passwordError}</IonNote>) : ""}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton disabled={(firstNameError ? true : false) ||
                                    (lastNameError ? true : false) ||
                                    (mobileError ? true : false) ||
                                    (passwordError ? true : false) ||
                                    (dobError ? true : false) ||
                                    (emailError ? true : false) || !photo} expand="block" type="submit">Update</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </form>
        </IonContent>
    </IonPage>)
}
export default UserProfile