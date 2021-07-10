import { IonCard, IonCardHeader, IonImg, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import IUpcomingMovie from "../model/IUpcomingMovie";

interface MovieProps {
    upcomingMovie: IUpcomingMovie
}

const UpcomingMovieCard: React.FC<MovieProps> = (props) => {
    const { upcomingMovie } = props;
    return (
        <IonCard>
            <IonImg src={upcomingMovie.poster} />
            <IonCardHeader>
                <IonCardSubtitle>Release Date: {upcomingMovie.releaseDate}</IonCardSubtitle>
                <IonCardTitle>Movie Name: {upcomingMovie.name}</IonCardTitle>
            </IonCardHeader>
        </IonCard>
    )
};

export default UpcomingMovieCard;