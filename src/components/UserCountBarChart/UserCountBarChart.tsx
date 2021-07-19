import axios from "axios";
import { ChartData } from "chart.js"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"

const IncomeLineChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData>();

    useEffect(() => {
        getUsersCount();
    }, []);

    const getUsersCount = () => {
        const api = axios.create({
            baseURL: `http://192.168.31.33:3000`
        })
        api.get('/chart/userscount').then((result) => {
            if (result && result.data && result.data.count) {
                lastMonthsUserCount.datasets[0].data = result.data.count;
                setChartData(lastMonthsUserCount);
            }
        }).catch((err) => {
            console.log("error ", err);
        })
    }

    const lastMonthsUserCount: ChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: 'Last six months user count',
                backgroundColor: 'rgba(241, 148, 138 ,0.2)',
                borderColor: 'rgba(120, 40, 31,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: []
            },
        ]
    }

    return (
        <>
            {
                chartData ?
                    <Bar style={{ marginTop: "20px" }} type="bar" data={chartData} options={{ maintainAspectRatio: true }}>

                    </Bar>
                    : ""
            }
        </>
    )
}
export default IncomeLineChart
