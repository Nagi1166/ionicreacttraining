import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonTitle, IonContent, IonItem, IonButton, IonAlert, IonCol, IonGrid, IonLoading, IonRow } from "@ionic/react"
import axios from "axios";
import { listCircle, apps } from "ionicons/icons"
import { useState } from "react"
import "./FileUpload.css"


const FileUpload: React.FC = () => {

    const [file, setFile] = useState<any>();
    const [uploadFile, setUploadedFile] = useState<string>();

    const [isAlert, setAlert] = useState<boolean>(false);
    const [header, setHeader] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [loader, setLoader] = useState<boolean>(false);

    const onFileChange = (file: any) => {
        setUploadedFile("");
        setFile(file.target.files[0]);
    }

    const handleSubmit = () => {
        if (!file) {
            setHeader("Error!")
            setMessage("Please uplaod the file");
            setAlert(true);
            return;
        }
        const api = axios.create({
            baseURL: `http://192.168.31.33:3000`
        })

        const formData = new FormData();
        formData.append("file", file, file.name);
        setLoader(true);
        setUploadedFile("");
        api.post("/uploads", formData).then(res => {
            setLoader(false);
            if (res.data.status === "success" && res.data.file) {
                const filePath = `http://192.168.31.33:3000/uploads/${res.data.file}`
                setUploadedFile(filePath)
                return;
            }

            setHeader("Error!")
            setMessage(res && res.data && res.data.errorMessage ? res.data.errorMessage : "Server Error");
            setAlert(true);


        }).catch((err) => {
            console.log(err);
            setLoader(false);
            setHeader("Error!")
            setMessage("Server Error");
            setAlert(true);
        })
    }



    return (<IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>
                    File Upload
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding ion-text-center">
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">
                        File Upload
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonContent>
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonAlert isOpen={isAlert} header={header} message={message} buttons={["Dismiss"]}
                        onDidDismiss={() => setAlert(false)} ></IonAlert>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonLoading isOpen={loader} spinner="lines" message={"Please wait..."}
                        onDidDismiss={() => setLoader(false)} ></IonLoading>
                </IonCol>
            </IonRow>
        </IonGrid>
        <div className="center">
            <IonItem>
                <input type="file" onChange={(ev) => onFileChange(ev)} />
            </IonItem>
            {!uploadFile ?
                <IonButton className="upload-button" onClick={() => handleSubmit()}>
                    Upload
                </IonButton>
                :
                <a className="center-download" href={uploadFile} target="_blank" rel="noopener noreferrer" download>
                    <IonButton className="upload-button">
                        Download
                    </IonButton>
                </a>
            }

        </div>
    </IonPage>)
}

export default FileUpload