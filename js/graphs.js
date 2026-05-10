import ApexCharts from "../node_modules/apexcharts/dist/apexcharts.esm.js";

/* ---------------------- Analysis 1 ------------------------- */

let selectedSliceIndex = -1;

var options = {
    series: [38, 21, 17, 10, 14],
    chart: {
        type: 'pie',
        events: {
            mounted: function (chartContext, config) {
                document.getElementById('pie-chart-1a-placeholder').style.display = 'none';
                document.getElementById('pie-chart-1a').style.opacity = '1';
            },
            dataPointSelection: function (event, chartContext, coonfig) {
                selectedSliceIndex = coonfig.dataPointIndex;
                chartContext.updateOption({});
            }
        }
    },
    labels: ['hotel', 'assembly', 'schools', 'factory', 'hospital'],
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            if (opts.seriesIndex === selectedSliceIndex) {
                return val.toFixed(1) + '%';
            }
            const icons = ['#bed', '#masks-theater', '#graduation-cap', '#industry', '#house-medical'];
            return `<svg class="icon-sm fill-current text-neutral-two-dark"><use href="/assets/sprites/solid.svg${icons[opts.seriesIndex]}"></use></svg>`;
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
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

try {
    chart.render();
} catch (error) {
    console.error("Chart failed ot initialize:", error);
}
