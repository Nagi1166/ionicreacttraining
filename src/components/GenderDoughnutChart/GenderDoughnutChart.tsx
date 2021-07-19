import { ChartData } from "chart.js"
import { Doughnut, Pie } from "react-chartjs-2"

const GenderDoughnutChart: React.FC = () => {

    const gendetUsers: ChartData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: 'Users',
                backgroundColor: ['rgba(118, 215, 196)', 'rgba(241, 148, 138 )'],
                borderColor: 'rgba(14, 98, 81,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [3500, 3500]
            }
        ]
    }

    return (
        <Doughnut type="doughnut" style={{ marginTop: "20px" }} data={gendetUsers} options={
            {
                maintainAspectRatio: true
            }
        }>
        </Doughnut>
    )
}

export default GenderDoughnutChart
