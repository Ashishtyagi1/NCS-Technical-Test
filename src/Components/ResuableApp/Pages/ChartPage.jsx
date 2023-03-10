import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const ChartPage = (props) => {
    const [yearaArray, setYearsArray] = useState([]);

    useEffect(() => {
        var max = new Date().getFullYear()
        var min = max - 9
        var years = []

        for (var i = max; i >= min; i--) {
            years.push(i)
        }
        setYearsArray(years);
    }, [])

    var data = {
        labels: yearaArray && yearaArray.map(year => year),
        datasets: [{
            label: '# of Votes',
            data: [2, 4, 3, 5, 2, 3, 5, 10, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }

    return (
        <div>
            <Bar
                data={data}
                height={400}
                options={options}
            />
        </div>
    )
}
export default ChartPage;