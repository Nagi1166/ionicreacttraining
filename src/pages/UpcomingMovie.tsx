import UpcomingMovieCard from "../components/UpcomingMovieCard"
import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import IUpcomingMovie from "../model/IUpcomingMovie";


const UpcomingMovie: React.FC = () => {

    const upcomingMovies: IUpcomingMovie[] = [
        {
            id: 1,
            poster: "assets/imgs/avengers.jpg",
            name: "Avengers End game",
            releaseDate: "26 April 2019"
        },
        {
            id: 2,
            poster: "assets/imgs/gravity.jpg",
            name: "Gravity",
            releaseDate: "11 October 2013"
        },
        {
            id: 3,
            poster: "assets/imgs/titanic.jpg",
            name: "Titanic",
            releaseDate: "1 November 1997"
        }
    ]

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Upcoming Movies
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Upcoming Movies</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        {upcomingMovies.length == 0 ? 'No Moviews released yet' :
                            upcomingMovies.map((mov) => (
                                <IonCol key={mov.id} sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3" sizeXl="2">
                                    <UpcomingMovieCard upcomingMovie={mov} />
                                </IonCol>
                            ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default UpcomingMovie