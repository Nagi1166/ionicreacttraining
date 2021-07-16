import { IonImg, IonItem, IonAvatar, IonLabel } from "@ionic/react";
import { IUser } from "../../model/IUser";

interface UserProps {
    user: IUser
}

const UserItem: React.FC<UserProps> = (props) => {
    const { user } = props;
    return (
        <IonItem detail={false}>
            <IonAvatar slot="start">
                <IonImg src={user.profilePic} />
            </IonAvatar>
            <IonLabel>
                <h2>{user.firstName} {user.lastName}</h2>
                <h3>{user.mobile}</h3>
                <p>{user.email}</p>
            </IonLabel>
        </IonItem>
    )
};

export default UserItem;