/* ---------------------- Analysis 1 ------------------------- */

/* Graph-1a Variables */
const icons1a = ['', '', '', '', ''];
const series1a = [38, 21, 17, 10, 14];
const labels1a = ['hotel', 'assembly', 'schools', 'factory', 'hospital'];
const chart1a = document.getElementById('pie-chart-1a');
const placeholder1a = document.getElementById('pie-chart-1a-placeholder');
const colors1a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)'];
let selectedIndex1a = -1;

/* Graph-1b Variables */
const icons1b = ['', '', '', '', ''];
const series1b = [52, 19, 12, 11, 6];
const labels1b = ['assembly', 'hotel', 'schools', 'hospital', 'factory'];
const chart1b = document.getElementById('pie-chart-1b');
const placeholder1b = document.getElementById('pie-chart-1b-placeholder');
const colors1b = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)'];
let selectedIndex1b = -1;

function piechart(pieIcons, pieSeries, labels, chartEl, placeholder, colors, selectedSliceIndex) {
    function getPieLabelEl(idx) {
        return chartEl.querySelector(`.apexcharts-datalabels[data-realindex="${idx}"] text`)
            || [...chartEl.querySelectorAll('.apexcharts-datalabels text')][idx];
    }

    var options = {
        series: pieSeries,
        labels: labels,
        chart: {
            type: 'pie',
            width: 483,
            height: 483,
            id: chartEl,
            events: {
                mounted: function (chartContext) {
                    placeholder.style.display = 'none';
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
                        const pieTotal = pieSeries.reduce((a, b) => a + b, 0);
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
        colors: colors,
        stroke: {
            show: true,
            width: 2,
            color: ['var(--neutral-nine)']
        },
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
        legend: {
            show: false
        },
        tooltip: {
            enabled: false
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
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            }
        }
    }

    if (chartEl) {
        var chart = new ApexCharts(chartEl, options);
        chart.render();
    }
}


piechart(icons1a, series1a, labels1a, chart1a, placeholder1a, colors1a, selectedIndex1a);
piechart(icons1b, series1b, labels1b, chart1b, placeholder1b, colors1b, selectedIndex1b);


