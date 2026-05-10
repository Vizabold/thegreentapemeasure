/* ---------------------- Analysis 1 ------------------------- */

const chartEl = document.getElementById('pie-chart-1a');
let selectedSliceIndex = -1;

var options = {
    series: [38, 21, 17, 10, 14],
    chart: {
        type: 'pie',
        id: 'pie-1a',
        width: '100%',
        events: {
            mounted: function (chartContext) {
                document.getElementById('pie-chart-1a-placeholder').style.display = 'none';
                chartEl.style.opacity = '1';
            },
            dataPointSelection: function (event, chartContext, config) {
                if (selectedSliceIndex === config.dataPointIndex) {
                    selectedSliceIndex = '-1';
                } else {
                    selectedSliceIndex = config.dataPointIndex;
                };

                chartContext.updateOptions({});
            }
        }
    },
    labels: ['hotel', 'assembly', 'schools', 'factory', 'hospital'],
    plotOptions: {
        pie: {
            dataLabels: {
                offset: -20,
            }
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            if (opts.dataPointIndex === selectedSliceIndex) {
                return val.toFixed(1) + '%';
            }
            const iconIds = ['#bed', '#masks-theater', '#graduation-cap', '#industry', '#house-medical'];
            return 'X';
        },
        style: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '3rem',
            fontWeight: 'bold',
            colors: ['var(--neutral-two-dark'],
        }
    },
    colors: ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)'],
    stroke: {
        show: true,
        width: 2,
        color: ['var(--neutral-nine)']
    },
    legend: {
        show: false
    }
}

if (chartEl) {
    var chart = new ApexCharts(chartEl, options);
    chart.render();
}
