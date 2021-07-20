import { IonAvatar, IonCol, IonImg, IonRow, IonText } from "@ionic/react";
import { IUser } from "../../model/IUser";
import "./UserItemTabular.css"

interface UserItemProps {
    user: IUser
}
const UserItemTabular: React.FC<UserItemProps> = (props) => {
    const { user } = props;
    return (
        <IonRow>
            <IonCol size="3" className="user-profile-pic user-col">
                <IonAvatar>
                    <IonImg src={user.profilePic}></IonImg>
                </IonAvatar>
            </IonCol>
            <IonCol className="user-col" size="3"><IonText>{user.firstName} {user.lastName}</IonText></IonCol>
            <IonCol className="user-col" size="3"><IonText>{user.email}</IonText></IonCol>
            <IonCol className="user-col" size="3"><IonText>{user.mobile}</IonText></IonCol>
        </IonRow>
    )
}

export default UserItemTabular;