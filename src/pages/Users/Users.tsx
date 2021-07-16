import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonAlert, IonCol, IonGrid, IonLoading, IonRow, IonList } from "@ionic/react"
import { useEffect, useState } from "react"
import UserItem from "../../components/UserItem/UserItem";
import { IUser } from "../../model/IUser"
import axios from "axios";
import getHeader from "../../services/auth.header";


const Users: React.FC = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [isAlert, setAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoader(true);
        const api = axios.create({
            baseURL: `http://localhost:3000`
        })
        api.get("/users", { headers: getHeader() }).then((result) => {
            setLoader(false);
            if (result && result.data) {
                if (result.data.status === "success") {
                    const users: IUser[] = [];
                    result.data.result.forEach((element: any) => {
                        const user: IUser = {
                            profilePic: "assets/imgs/avatar.png",
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
                <IonList>
                    {(users) && (
                        users.map((val) => (
                            <UserItem key={val.id} user={val} />
                        ))
                    )}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Users