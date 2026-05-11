/* ---------------------- Analysis 1 ------------------------- */

const chartEl = document.getElementById('pie-chart-1a');
let selectedSliceIndex = -1;

// FA7 Free solid Unicode: bed, masks-theater, graduation-cap, industry, hospital
const pieIcons = ['', '', '', '', ''];
const pieSeries = [38, 21, 17, 10, 14];
const pieTotal = pieSeries.reduce((a, b) => a + b, 0);

function getPieLabelEl(idx) {
    return chartEl.querySelector(`.apexcharts-datalabels[data-realindex="${idx}"] text`)
        || [...chartEl.querySelectorAll('.apexcharts-datalabels text')][idx];
}

var options = {
    series: pieSeries,
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
                const clickedIdx = config.dataPointIndex;
                const isNowSelected = (config.selectedDataPoints[0] || []).includes(clickedIdx);

                if (selectedSliceIndex !== -1) {
                    const prevEl = getPieLabelEl(selectedSliceIndex);
                    if (prevEl) {
                        prevEl.style.fontFamily = '"Font Awesome 7 Free"';
                        prevEl.textContent = pieIcons[selectedSliceIndex];
                    }
                }

                if (isNowSelected) {
                    const el = getPieLabelEl(clickedIdx);
                    if (el) {
                        el.style.fontFamily = 'sans-serif';
                        el.textContent = Math.round(pieSeries[clickedIdx] / pieTotal * 100) + '%';
                    }
                    selectedSliceIndex = clickedIdx;
                } else {
                    selectedSliceIndex = -1;
                }
            }
        }
    },
    labels: ['hotel', 'assembly', 'schools', 'factory', 'hospital'],
    plotOptions: {
        pie: {
            dataLabels: {
                offset: -30,
            }
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            return pieIcons[opts.seriesIndex];
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
