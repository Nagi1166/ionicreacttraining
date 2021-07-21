import { IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from "@ionic/react"
import { cloudUpload, cloudUploadOutline, home, homeOutline, logOut, logOutOutline, mail, mailOutline, person, personOutline, videocam, videocamOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { IAppPage } from "../../model/IAppPage"
import { IUser } from "../../model/IUser"
import authService from "../../services/auth.service"
import UserItem from "../UserItem/UserItem"
import "./Menu.css"

const Menu: React.FC<{ setLogOut: any }> = ({ setLogOut }) => {
    const history = useHistory();
    // const [userName, setUserName] = useState<String>("");
    const [isUserBoard, setUserBoard] = useState<boolean>(false);
    const [isAdminBoard, setAdminBoard] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            //setUserName(user.username);
            const userName = user.username.split(" ");
            const profilePic = user.profilePic ? `http://192.168.31.33:3000/uploads/${user.profilePic}` : "assets/imgs/avatar.png";
            const userInfo: IUser = {
                profilePic,
                id: user.id,
                firstName: userName[0],
                lastName: userName[1],
                email: user.email,
            }
            setUser(userInfo);
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
        {
            name: "Users",
            url: "/users",
            iosIcon: personOutline,
            mdIcon: person,
            roles: ["ADMIN"]
        },
        {
            name: "Send Mail",
            url: "/sendmail",
            iosIcon: mailOutline,
            mdIcon: mail,
            roles: ["ADMIN", "USER"]
        },
        {
            name: "File Upload",
            url: "/fileupload",
            iosIcon: cloudUploadOutline,
            mdIcon: cloudUpload,
            roles: ["ADMIN", "USER"]
        },
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
                    {/* <IonListHeader>Hi {userName}</IonListHeader> */}
                    {user ? <IonMenuToggle> <IonItem lines="none" detail={true} routerLink="/userprofile">
                        <IonAvatar slot="start">
                            <IonImg src={user.profilePic} />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{user.firstName} {user.lastName}</h2>
                            <p>{user.email}</p>
                        </IonLabel>
                    </IonItem></IonMenuToggle> : ""}
                    {/* <IonNote className="note-welcome">Welcome to ionic react training </IonNote> */}
                    <IonItemDivider></IonItemDivider>

                    {
                        appPages.map((value, index) => {
                            return (
                                (value.roles.includes("ADMIN") && isAdminBoard) || (value.roles.includes("USER") && isUserBoard) ?
                                    <IonMenuToggle key={index} autoHide={false}>
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
                        <IonItem detail={false} onClick={() => handleLogout()}>
                            <IonIcon slot="start" ios={logOutOutline} md={logOut} />
                            <IonLabel>Log Out</IonLabel>
                        </IonItem>
                    </IonMenuToggle>

                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu