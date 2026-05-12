/* ---------------------- Analysis 1 ------------------------- */

/* Graph-1a Variables */
const icons1a = ['', '', '', '\u{e3b2}', ''];
const series1a = [38, 21, 17, 14, 10];
const series1a2 = [16, 9, 7, 6, 4];
const linevalue1a = 'FIRES';
const labels1a = ['hotel', 'assembly', 'schools', 'hospital', 'factory'];
const chart1a = document.getElementById('pie-chart-1a');
const placeholder1a = document.getElementById('pie-chart-1a-placeholder');
const colors1a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)'];
let selectedIndex1a = -1;

/* Graph-1b Variables */
const icons1b = ['', '', '', '', ''];
const series1b = [52, 19, 12, 11, 6];
const series1b2 = [1872, 692, 442, 404, 226];
const linevalue1b = 'DEATHS';
const labels1b = ['assembly', 'hotel', 'schools', 'hospital', 'factory'];
const chart1b = document.getElementById('pie-chart-1b');
const placeholder1b = document.getElementById('pie-chart-1b-placeholder');
const colors1b = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)'];
let selectedIndex1b = -1;

/* Graph-1c Variables */

/* Graph-1d Variables */

/* Graph-1e Variables */

/* Graph-1f Variables */

/* Graph-1g Variables */

/* Graph-2a Variables */
const icons2a = ['\u{f1b3}', '\u{f013}', '\u{f1ad}', '\u{e163}', '\u{e3af}', '\u{f508}'];
const series2a = [25, 22, 19, 17, 9, 8];
const series2a2 = [20, 18, 16, 14, 7, 6];
const linevalue2a = 'HOURS';
const labels2a = ['fundamentals', 'systems', 'commercial', 'graphics', 'residential', 'practice'];
const chart2a = document.getElementById('pie-chart-2a');
const placeholder2a = document.getElementById('pie-chart-2a-placeholder');
const colors2a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)', 'var(--neutral-eight-light)'];
let selectedIndex2a = -1;

/* Graph-2b Variables */
const icons2b = ['\u{f1ad}', '\u{f1b3}', '\u{f013}', '\u{f508}', '\u{f1e0}', '\u{e163}'];
const series2b = [37, 23, 16, 10, 8, 6];
const series2b2 = [45, 28, 20, 12, 10, 7];
const linevalue2b = 'HOURS';
const labels2b = ['projects', 'fundamentals', 'systems', 'practice', 'shared', 'graphics'];
const chart2b = document.getElementById('pie-chart-2b');
const placeholder2b = document.getElementById('pie-chart-2b-placeholder');
const colors2b = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)', 'var(--neutral-eight-light)'];
let selectedIndex2b = -1;

/* Graph-2c Variables */
const icons2c = ['\u{f568}', '\u{f0ae}', '\u{f508}'];
const series2c = [78, 16, 6];
const series2c2 = [328, 67, 25];
const linevalue2c = 'Qs.';
const labels2c = ['design', 'management', 'practice'];
const chart2c = document.getElementById('pie-chart-2c');
const placeholder2c = document.getElementById('pie-chart-2c-placeholder');
const colors2c = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)'];
let selectedIndex2c = -1;

/* Graph-2d Variables */
const icons2d = ['\u{f0ae}', '\u{f568}', '\u{f1e0}', '\u{f508}'];
const series2d = [33, 28, 27, 12];
const series2d2 = [162, 137, 132, 59];
const linevalue2d = 'Qs.';
const labels2d = ['management', 'design', 'shared', 'practice'];
const chart2d = document.getElementById('pie-chart-2d');
const placeholder2d = document.getElementById('pie-chart-2d-placeholder');
const colors2d = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)'];
let selectedIndex2d = -1;

/* Graph-3a Variables */
const series3a = [
    {
        name: 'voluntary',
        data: [0, 8, 19, 25, 29]
    },
    {
        name: 'permitting',
        data: [3, 10, 12, 13, 19]
    },
    {
        name: 'restrictions',
        data: [2, 16, 25, 27, 31]
    },
    {
        name: 'regulation',
        data: [5, 8, 6, 2, 2]
    }
];
const categories3a = ['1980s', '1990s', '2000s', '2010s', '2020s'];
const colors3a = ['var(--primary-one)', 'var(--primary-one)', 'var(--neutral-seven)', 'var(--neutral-seven)'];
const dash3a = [0, 8, 0, 8];
const chart3a = document.getElementById('line-chart-3a');
const placeholder3a = document.getElementById('line-chart-3a-placeholder');

/* Graph-4a Variables */
const icons4a = ['\u{e54f}', '\u{e3af}', '\u{f0b1}'];
const series4a = [60, 20, 20];
const series4a2 = [26, 9, 9];
const linevalue4a = 'PEOPLE';
const labels4a = ['interiors', 'architecture', 'business'];
const chart4a = document.getElementById('pie-chart-4a');
const placeholder4a = document.getElementById('pie-chart-4a-placeholder');
const colors4a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)'];
let selectedIndex4a = -1;

/* Graph-4b Variables */
const icons4b = ['\u{e54f}', '\u{f0b1}'];
const series4b = [56, 44];
const series4b2 = [9, 7];
const linevalue4b = 'PEOPLE';
const labels4b = ['interiors', 'business'];
const chart4b = document.getElementById('pie-chart-4b');
const placeholder4b = document.getElementById('pie-chart-4b-placeholder');
const colors4b = ['var(--primary-one)', 'var(--primary-two)'];
let selectedIndex4b = -1;

function piechart(icons, series1, series2, linevalue, labels, chartEl, placeholder, colors, selectedSliceIndex) {
    function getPieLabelEl(idx) {
        return chartEl.querySelector(`.apexcharts-datalabels[data-realindex="${idx}"] text`)
            || [...chartEl.querySelectorAll('.apexcharts-datalabels text')][idx];
    }

    var options = {
        series: series1,
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
                            prevEl.textContent = icons[selectedSliceIndex];
                        }
                    }

                    if (isNowSelected) {
                        const el = getPieLabelEl(clickedIdx);
                        const pieTotal = series1.reduce((a, b) => a + b, 0);
                        if (el) {
                            const origX = el.getAttribute('x') || 0;
                            el.style.fontFamily = '"Space Grotesk", sans-serif';
                            const line1 = Math.round(series1[clickedIdx] / pieTotal * 100) + '%';
                            let line2 = null;
                            if (typeof series2 !== 'undefined' && series2 && typeof linevalue !== 'undefined') {
                                line2 = series2[clickedIdx] + ' ' + linevalue;
                            }
                            if (line2) {
                                el.innerHTML = `
                                    <tspan x="${origX}" dy="-0.4em" style="font-size: 35px;">${line1}</tspan>
                                    <tspan x="${origX}" dy="1.5em" style="font-size: 16px; font-weight: 700;">${line2}</tspan>
                                `;
                            } else {
                                el.innerHTML = `<tspan x="${origX}" dy="0.3em" style="font-size: 35px;">${line1}</tspan>`;
                            }
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
                return icons[opts.seriesIndex];
            },
            style: {
                fontSize: '35px',
                fontWeight: '900',
                fontFamily: '"Font Awesome 7 Free", "Space Grotesk", sans-serif',
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

function lineChart(series, dash, categories, chartEl, placeholder, colors) {
    var markersShown = false;
    var lockedIndex = -1;

    function highlight(idx) {
        chartEl.querySelectorAll('.apexcharts-series').forEach(function (el) {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = (idx === -1 || parseInt(el.getAttribute('data-seriesIndex')) === idx) ? '1' : '0.15';
        });
        var slide = chartEl.closest('.card');
        if (!slide) return;
        var detailsEl = slide.querySelector('.graph-details');
        if (detailsEl) {
            var name = idx !== -1 && series[idx] ? series[idx].name : '';
            detailsEl.textContent = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
        }
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            var itemIdx = parseInt(item.getAttribute('data-series-index'));
            item.setAttribute('aria-pressed', String(itemIdx === idx));
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = (idx === -1 || itemIdx === idx) ? '1' : '0.4';
        });
    }

    function setupInteraction() {
        var slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            var idx = parseInt(item.getAttribute('data-series-index'));
            item.addEventListener('click', function () {
                lockedIndex = (lockedIndex === idx) ? -1 : idx;
                highlight(lockedIndex);
            });
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    lockedIndex = (lockedIndex === idx) ? -1 : idx;
                    highlight(lockedIndex);
                }
            });
        });
    }

    var options = {
        chart: {
            type: 'line',
            width: 392,
            height: 483,
            stacked: false,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 900,
                animateGradually: {
                    enabled: true,
                    delay: 150
                }
            },
            events: {
                mounted: function (chartContext) {
                    placeholder.style.display = 'none';
                    chartEl.style.opacity = '1';
                    setupInteraction();
                },
                animationEnd: function () {
                    if (!markersShown) {
                        markersShown = true;
                        apexChart.updateOptions({
                            markers: { size: 5, strokeWidth: 0, hover: { size: 7 } }
                        }, false, true);
                    }
                },
                dataPointSelection: function (event, chartContext, config) {
                    var idx = config.seriesIndex;
                    lockedIndex = (lockedIndex === idx) ? -1 : idx;
                    highlight(lockedIndex);
                },
                dataPointMouseEnter: function (event, chartContext, config) {
                    if (lockedIndex === -1) highlight(config.seriesIndex);
                },
                dataPointMouseLeave: function (event, chartContext, config) {
                    if (lockedIndex === -1) highlight(-1);
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: colors,
        series: series,
        stroke: {
            width: 4,
            dashArray: dash
        },
        markers: {
            size: 0
        },
        grid: {
            borderColor: 'var(--neutral-six)'
        },
        xaxis: {
            categories: categories,
            axisBorder: {
                show: true,
                color: 'var(--neutral-six)'
            },
            axisTicks: {
                show: true,
                color: 'var(--neutral-six)'
            },
            labels: {
                style: {
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    colors: 'var(--neutral-nine)'
                }
            }
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                    color: 'var(--neutral-six)'
                },
                axisBorder: {
                    show: true,
                    color: 'var(--neutral-six)'
                },
                labels: {
                    style: {
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        colors: 'var(--neutral-nine)'
                    }
                },
                title: {
                    text: "States",
                    style: {
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        color: 'var(--neutral-nine)'
                    }
                }
            }
        ],
        legend: {
            show: false
        },
        tooltip: {
            enabled: false
        }
    };

    if (!chartEl) return;

    var apexChart = new ApexCharts(chartEl, options);
    var dialog = chartEl.closest('[popover]');

    if (dialog) {
        var rendered = false;
        dialog.addEventListener('toggle', function (e) {
            if (e.newState === 'open' && !rendered) {
                rendered = true;
                apexChart.render();
            }
        });
    } else {
        apexChart.render();
    }
}


piechart(icons1a, series1a, series1a2, linevalue1a, labels1a, chart1a, placeholder1a, colors1a, selectedIndex1a);
piechart(icons1b, series1b, series1b2, linevalue1b, labels1b, chart1b, placeholder1b, colors1b, selectedIndex1b);
/* Evoke function for Graph-1c */
/* Evoke function for Graph-1d */
/* Evoke function for Graph-1e */
/* Evoke function for Graph-1f */
/* Evoke function for Graph-1g */
piechart(icons2a, series2a, series2a2, linevalue2a, labels2a, chart2a, placeholder2a, colors2a, selectedIndex2a);
piechart(icons2b, series2b, series2b2, linevalue2b, labels2b, chart2b, placeholder2b, colors2b, selectedIndex2b);
piechart(icons2c, series2c, series2c2, linevalue2c, labels2c, chart2c, placeholder2c, colors2c, selectedIndex2c);
piechart(icons2d, series2d, series2d2, linevalue2d, labels2d, chart2d, placeholder2d, colors2d, selectedIndex2d);
lineChart(series3a, dash3a, categories3a, chart3a, placeholder3a, colors3a);
piechart(icons4a, series4a, series4a2, linevalue4a, labels4a, chart4a, placeholder4a, colors4a, selectedIndex4a);
piechart(icons4b, series4b, series4b2, linevalue4b, labels4b, chart4b, placeholder4b, colors4b, selectedIndex4b);