import { ChartData } from "chart.js"
import { Line } from "react-chartjs-2"

const IncomeLineChart: React.FC = () => {

    const lastSixYearsIncome: ChartData = {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
        datasets: [
            {
                label: 'Last Five Years Income',
                backgroundColor: 'rgba(118, 215, 196,0.2)',
                borderColor: 'rgba(14, 98, 81,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [400, 300, 200, 500, 600, 550, 800]
            }
        ]
    }

    return (
        <Line type="line" data={lastSixYearsIncome} options={
            {
                maintainAspectRatio: true
            }
        }>
        </Line>
    )
}

export default IncomeLineChart
