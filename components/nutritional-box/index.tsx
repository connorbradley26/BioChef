"use client"
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function NutritionalBox() {

    const chartRef = React.useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current == null) return;
        var ctx = chartRef.current.getContext('2d');
        if (ctx == null) return;
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["11/04/23", "11/05/23", "11/06/23", "11/07/23", "11/08/23", "11/09/23", "11/10/23"],
                datasets: [{
                    data: [205, 201, 197, 198, 193, 189, 185],
                    borderColor: "rgb(62,149,205)",
                    backgroundColor: "rgb(62,149,205,0.1)",
                    
                }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Weight (lbs)'
                    }
                },
                maintainAspectRatio: false
            }
        });
    }, [])


    return (
        <div className="p-4 h-[200px] relative">
            <canvas className="" ref={chartRef} />
      </div>

    )
}