import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonAlert, IonCol, IonGrid, IonLoading, IonRow, IonList, IonButton, IonIcon, IonText } from "@ionic/react"
import { useEffect, useState } from "react"
import UserItem from "../../components/UserItem/UserItem";
import { IUser } from "../../model/IUser"
import axios from "axios";
import getHeader from "../../services/auth.header";
import { apps, listCircle } from "ionicons/icons";
import UserItemTabular from "../../components/UserItemTabular/UsetItemTabular";
import "./Users.css"


const Users: React.FC = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [isAlert, setAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const [isList, setIsList] = useState<boolean>(true);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoader(true);
        const api = axios.create({
            baseURL: `http://192.168.31.33:3000`
        })
        api.get("/users", { headers: getHeader() }).then((result) => {
            setLoader(false);
            if (result && result.data) {
                if (result.data.status === "success") {
                    const users: IUser[] = [];
                    result.data.result.forEach((element: any) => {
                        const profilePic = element.profilePic ? `http://192.168.31.33:3000/uploads/${element.profilePic}` : "assets/imgs/avatar.png";
                        const user: IUser = {
                            profilePic,
                            id: element.ID,
                            lastName: element.LastName,
                            firstName: element.FirstName,
                            mobile: element.mobile,
                            email: element.email
                        }
                        users.push(user);
                    });
                    setUsers(users);
                    return;
                }
                setMessage(result.data.message);
                setAlert(true);
                return;
            }
            console.log("Invlid response from server");
            setMessage("Server error. Please try again later");
            setAlert(true);

        }).catch((err) => {
            setLoader(false);
            setMessage("Server error. Please try again later");
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
                    <IonButtons slot="end">
                        <IonButtons onClick={() => setIsList(true)}>
                            <IonIcon size="large" slot="icon-only" src={listCircle} color={isList ? "secondary" : ""}></IonIcon>
                        </IonButtons>
                        <IonButtons onClick={() => setIsList(false)}>
                            <IonIcon slot="icon-only" src={apps} color={!isList ? "secondary" : ""}></IonIcon>
                        </IonButtons>
                    </IonButtons>
                    <IonTitle>
                        Users
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">
                            Users
                        </IonTitle>
                    </IonToolbar>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonAlert isOpen={isAlert} header={"Error!"} message={message} buttons={["Dismiss"]}
                                    onDidDismiss={() => setAlert(false)} ></IonAlert>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLoading isOpen={loader} spinner="lines" message={"Getting Users. please wait..."}
                                    onDidDismiss={() => setLoader(false)} ></IonLoading>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonHeader>
                {isList ?
                    <IonList>
                        {(users) && (
                            users.map((val) => (
                                <UserItem key={val.id} user={val} />
                            ))
                        )}
                    </IonList>
                    :
                    <IonGrid>
                        <IonRow className="user-header">
                            <IonCol className="user-col" size="3">
                                <IonText>Profile Pic</IonText>
                            </IonCol>
                            <IonCol className="user-col" size="3">
                                <IonText>Name</IonText>
                            </IonCol>
                            <IonCol className="user-col" size="3">
                                <IonText>Email</IonText>
                            </IonCol>
                            <IonCol className="user-col" size="3">
                                <IonText>mobile</IonText>
                            </IonCol>
                        </IonRow>
                        {(users) && (
                            users.map((val) => (
                                <UserItemTabular key={val.id} user={val} />
                            ))
                        )}
                    </IonGrid>
                }
            </IonContent>
        </IonPage>
    )
}

export default Users