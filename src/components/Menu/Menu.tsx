import { IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from "@ionic/react"
import { home, homeOutline, logOut, logOutOutline, videocam, videocamOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { IAppPage } from "../../model/IAppPage"
import authService from "../../services/auth.service"
import "./Menu.css"

const Menu: React.FC<{setLogOut:any}> = ({setLogOut}) => {
    const history = useHistory();
    const [userName, setUserName] = useState<String>("");
    const [isUserBoard, setUserBoard] = useState<boolean>(false);
    const [isAdminBoard, setAdminBoard] = useState<boolean>(false);

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUserName(user.username);
            setUserBoard(user.roles.includes("USER"))
            setAdminBoard(user.roles.includes("ADMIN"))
        }
    }, [])

    const appPages: IAppPage[] = [
        {
            name: "Home",
            url: "/home",
            iosIcon: homeOutline,
            mdIcon: home,
            roles: ["ADMIN", "USER"]
        },
        // {
        //     name: "Users",
        //     url: "/home",
        //     iosIcon: "homeOutline",
        //     mdIcon: "home",
        //     roles: ["ADMIN", "USER"]
        // }
        {
            name: "Upcoming Movies",
            url: "/upcomingmovie",
            iosIcon: videocamOutline,
            mdIcon: videocam,
            roles: ["ADMIN", "USER"]
        },
    ]

    const handleLogout = () => {
        authService.removeUser();
        setLogOut(undefined);
        history.push("/login");
    }

    return (
        <IonMenu contentId="main" side="start" type="overlay">
            <IonContent>
                <IonList>
                    <IonListHeader>Hi {userName}</IonListHeader>
                    <IonNote className="note-welcome">Welcome to ionic react training </IonNote>
                    <IonItemDivider></IonItemDivider>

                    {
                        appPages.map((value, index) => {
                            return (
                                (value.roles.includes("ADMIN") && isAdminBoard) || (value.roles.includes("USER") && isUserBoard) ?
                                    <IonMenuToggle autoHide={false}>
                                        <IonItem key={index} routerLink={value.url} routerDirection="none" detail={false}>
                                            <IonIcon slot="start" ios={value.iosIcon} md={value.mdIcon}></IonIcon>
                                            <IonLabel>{value.name}</IonLabel>
                                        </IonItem>
                                    </IonMenuToggle>
                                    : ""
                            )
                        }
                        )
                    }

                    <IonMenuToggle autoHide={false}>
                        <IonItem detail={false} onClick={()=> handleLogout()}>
                            <IonIcon slot="start" ios={logOutOutline} md={logOut}/>
                            <IonLabel>Log Out</IonLabel>
                        </IonItem>
                    </IonMenuToggle>

                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu