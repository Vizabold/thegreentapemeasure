/* ---------------------- Analysis 1 ------------------------- */

const chartEl = document.getElementById('pie-chart-1a');
let selectedSliceIndex = -1;

// FA7 Free solid Unicode: bed, masks-theater, graduation-cap, industry, hospital
const pieIcons = ['', '', '', '', ''];

var options = {
    series: [38, 21, 17, 10, 14],
    chart: {
        type: 'pie',
        width: 483,
        height: 483,
        id: 'pie-1a',
        events: {
            mounted: function (chartContext) {
                document.getElementById('pie-chart-1a-placeholder').style.display = 'none';
                chartEl.style.opacity = '1';
            },
            dataPointSelection: function (event, chartContext, config) {
                selectedSliceIndex = (selectedSliceIndex === config.dataPointIndex) ? -1 : config.dataPointIndex;
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
            const idx = opts.seriesIndex;
            if (idx === selectedSliceIndex) {
                return Math.round(val) + '%';
            }
            return pieIcons[idx];
        },
        style: {
            fontSize: '35px',
            fontWeight: '900',
            fontFamily: '"Font Awesome 7 Free", sans-serif',
            colors: ['var(--neutral-two-dark)'],
        },
        dropShadow: {
            enabled: false
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
    },
    responsive: [
        {
            breakpoint: 1000,
            options: {
                chart: { width: 336, height: 336 }
            }
        },
        {
            breakpoint: 400,
            options: {
                chart: { width: 236, height: 236 }
            }
        }
    ],
    tooltip: {
        enabled: false
    }
}

if (chartEl) {
    var chart = new ApexCharts(chartEl, options);
    chart.render();
}
