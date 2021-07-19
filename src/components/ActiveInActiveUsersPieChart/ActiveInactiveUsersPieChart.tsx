import { ChartData } from "chart.js"
import { Pie } from "react-chartjs-2"

const ActiveInActiveUsersPieChart: React.FC = () => {

    const activeInActiveUsers: ChartData = {
        labels: ["Active Users ", "InActive Users"],
        datasets: [
            {
                label: 'Active and InActive Users',
                backgroundColor: ['rgba(241, 148, 138 )', 'rgba(118, 215, 196)'],
                borderColor: 'rgba(14, 98, 81,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [5000, 2000]
            }
        ]
    }

    return (
        <Pie type="pie" style={{ marginTop: "20px" }} data={activeInActiveUsers} options={
            {
                maintainAspectRatio: true
            }
        }>
        </Pie>
    )
}

export default ActiveInActiveUsersPieChart
