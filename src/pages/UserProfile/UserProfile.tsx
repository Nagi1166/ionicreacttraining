import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonImg, IonFab, IonFabButton, IonIcon, IonCard, IonButton } from "@ionic/react"
import axios from "axios"
import { camera } from "ionicons/icons"
import { useState } from "react"
import InputContainer from "../../components/InputContainer"
import { usePhotoGallery } from "../../hooks/UsePhotoGallery"
import { InputConfig } from "../../model/InputConfig"
import getHeader from "../../services/auth.header"
import authService from "../../services/auth.service"
import "./UserProfile.css"


const UserProfile: React.FC = () => {
    const [mobile, setMobile] = useState<String>("");
    const [isErrorMobile, setErrorMobile] = useState<boolean>(true);

    const { photo, takePhoto } = usePhotoGallery();

    const onChange = (values: any) => {
        if (values.name === "mobile") {
            setMobile(values.value);
        }
        // if (values.name === "password") {
        //     setpassword(values.value);
        // }
    }

    const onError = (values: any) => {
        if (values.name === "mobile") {
            setErrorMobile(values.error);
        }
        // if (values.name === "password") {
        //     setErrorPassword(values.error);
        // }
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

    const handleSubmit = (event: any) => {
        if (event) event.preventDefault();
        if (!mobile || !photo) return;

        const formData = new FormData();

        formData.append("profilePic", DataURIToBlob(photo.imageData), photo.fileName);
        formData.append("mobile", String(mobile));

        const api = axios.create({
            baseURL: `http://localhost:3000`
        })

        const userInfo = authService.getUser();

        api.put(`/users/${userInfo.id}`, formData )
            .then(res => {
                console.log(res);

            })
            .catch(error => {
                console.log(error);
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
    ]

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
                        {formGroup.map((type) => (
                            <IonRow key={type.name}>
                                <IonCol>
                                    <InputContainer inputConfig={type} />
                                </IonCol>
                            </IonRow>
                        ))}
                        <IonRow>
                            <IonCol>
                                <IonButton disabled={isErrorMobile || !photo} expand="block" type="submit">Update</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </form>
        </IonContent>
    </IonPage>)
}
export default UserProfile