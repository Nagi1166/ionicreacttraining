import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonText, IonFooter, IonButton } from "@ionic/react";
import React from "react";

import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
} from '@capacitor/push-notifications';

import { Capacitor } from '@capacitor/core';

const INITIAL_STATE = {
    notifications: []
};

export class AppNotifications extends React.Component {
    state: any = {};
    constructor(props: any) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }

    push = () => {

        console.log('Initializing AppNotifications');
        const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

        if (!isPushNotificationsAvailable) {
            alert('PushNotifications are not suppoerted');
            return;
        }

        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                alert("No Notifications permissions");
            }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: Token) => {
                console.log(token.value);
                alert('Push registration success, token: ' + token.value);
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                console.log(error);
                //alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                console.log('Push received: ' + JSON.stringify(notification));
                let notif = this.state.notifications;
                notif.push({ id: notification.id, title: notification.title, body: notification.body })
                this.setState({
                    notifications: notif
                })
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                console.log('Push action performed: ' + JSON.stringify(notification));
                let notif = this.state.notifications;
                notif.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body })
                this.setState({
                    notifications: notif
                })
            }
        );
    }

    render() {
        const { notifications } = this.state;
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Notifications
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen className="ion-padding ion-text-center">
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">
                                Notifications
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonList>
                        {notifications && notifications.map((notif: any) =>
                            <IonItem key={notif.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3>{notif.title}</h3>
                                    </IonText>
                                    <p>{notif.body}</p>
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>
                </IonContent>
                <IonFooter>
                    <IonToolbar>
                        <IonButton expand="full" onClick={() => this.push()}>Register</IonButton>
                    </IonToolbar>
                </IonFooter>
            </IonPage>
        )
    }
}