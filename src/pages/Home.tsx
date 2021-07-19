import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ActiveInActiveUsersPieChart from '../components/ActiveInActiveUsersPieChart/ActiveInactiveUsersPieChart';
import GenderDoughnutChart from '../components/GenderDoughnutChart/GenderDoughnutChart';
import IncomeLineChart from '../components/IncomeLineChart/IncomeLinechart';
import UserCountBarChart from '../components/UserCountBarChart/UserCountBarChart';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="ion-margin">
          <IncomeLineChart />
          <ActiveInActiveUsersPieChart />
          <UserCountBarChart />
          <GenderDoughnutChart />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
