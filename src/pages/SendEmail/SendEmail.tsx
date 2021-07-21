import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonGrid, IonRow, IonCol, IonAlert, IonLoading, IonInput, IonItem, IonLabel, IonNote, IonTextarea, IonImg, IonFab, IonButton } from "@ionic/react"
import axios from "axios";
import { useState } from "react";
import { usePhotoGallery } from "../../hooks/UsePhotoGallery";

const SendEmail: React.FC = () => {

    const [toadddress, setToaddress] = useState<string>("");
    const [ccadddress, setccaddresses] = useState<string>("");
    const [bccadddress, setbccaddresses] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const [isAlert, setAlert] = useState<boolean>(false);
    const [header, setHeader] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [loader, setLoader] = useState<boolean>(false);

    const { photo, setPhoto, takePhoto } = usePhotoGallery();

    function DataURIToBlob(dataURI: string) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
    }


    const composeEmail = (event: any) => {
        if (event) event.preventDefault();
        const api = axios.create({
            baseURL: `http://192.168.31.33:3000`
        })
        if (!photo) {
            setHeader("Error!")
            setMessage("Please select photo");
            setAlert(true);
            return;
        }
        if (!toadddress || !ccadddress || !bccadddress || !body) return;

        const formData = new FormData();
        formData.append("attachment", DataURIToBlob(photo.imageData), photo.fileName);
        formData.append("to", String(toadddress));
        formData.append("cc", String(ccadddress));
        formData.append("bcc", String(bccadddress));
        formData.append("text", String(body));
        setLoader(true);
        api.post("/email", formData).then((res) => {
            setLoader(false);
            if (res.data.status === "success") {
                setHeader("Success!")
                setMessage("Email has sent successfully");
                setAlert(true);
                return;
            }
            setHeader("Error!")
            setMessage("Server Error");
            setAlert(true);

        }).catch((err) => {
            console.log(err);
            setLoader(false);
            setHeader("Error!")
            setMessage("Server Error");
            setAlert(true);
        })

    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>
                        Send Email
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">
                            Send Email
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form onSubmit={(e) => composeEmail(e)}>
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
                                    <IonLoading isOpen={loader} spinner="lines" message={"Sending mail. Please wait..."}
                                        onDidDismiss={() => setLoader(false)} ></IonLoading>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonRow>

                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">To Address</IonLabel>
                                    <IonTextarea value={toadddress} onIonChange={(e) => setToaddress(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">CC Addresses</IonLabel>
                                    <IonTextarea value={ccadddress} onIonChange={(e) => setccaddresses(e.detail.value!)}>
                                    </IonTextarea>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">BCC Addresses</IonLabel>
                                    <IonTextarea value={bccadddress} onIonChange={(e) => setbccaddresses(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Body</IonLabel>
                                    <IonTextarea value={body} onIonChange={(e) => setBody(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem lines="none">
                                    <IonLabel position="fixed">Attachment</IonLabel>
                                </IonItem>

                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                {photo ?
                                    <IonImg src={photo ? photo.webFilePath : "assets/imgs/avatar.png"}></IonImg>
                                    :
                                    <IonButton onClick={() => takePhoto()}>Attach File</IonButton>
                                }
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton expand="block" type="submit">Send Mail</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </form >
            </IonContent >
        </IonPage >
    )
}

export default SendEmail


