
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { dataset } from '@/types';

interface NutritionalBoxProps {
    labels: string[],
    data: dataset
}

const NutritionalBox = ({ labels, data }: NutritionalBoxProps) => {

    const chartRef = React.useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current == null || !data) return;
        var ctx = chartRef.current.getContext('2d');
        if (ctx == null) return;
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: data.data,
                    borderColor: "rgb(62,149,205)",
                    backgroundColor: "#rgb(242, 242, 242)",
                    
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
                        text: data.type
                    }
                },
                elements: {
                    line: {
                        spanGaps: true
                    }
                },
                
            },
            
        });
        return () => {
            myChart.destroy();
        }
    }, [data, labels])


    return (
        <div className="relative p-4 bg-base-100 rounded-box">
            <canvas className="" ref={chartRef} />
      </div>

    )
}

export default NutritionalBox;