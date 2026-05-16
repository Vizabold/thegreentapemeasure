/* ---------------------- Analysis 1 ------------------------- */

/* Graph-1a Variables */
const icons1a = ['', '', '', '\u{e3b2}', ''];
const series1a = [38, 21, 17, 14, 10];
const labels1a = ['hotel', 'assembly', 'schools', 'hospital', 'factory'];
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

/* Graph-1c Variables */
const series1c = [946, 226, 282, 34, 1010, 247, 135, 214, 264, 112, 100, 49, 17];
const categories1c = ['1900s', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
const colors1c = [
    'var(--primary-two)'];
const groupRanges1c = [[0, 3], [4, 7], [8, 12]];
const chart1c = document.getElementById('bar-chart-1c');
const placeholder1c = document.getElementById('bar-chart-1c-placeholder');

/* Graph-1d Variables */
const icons1d = [
    /* First set of three circles that have bg-primary-two */
    ['\u{f52b}', '\u{f5aa}', '\u{f0f3}'],
    /* Second set of three circles that have bg-primary-three */
    [['\u{f5aa}', '\u{f0f3}'], ['\u{f52b}', '\u{f5aa}'], ['\u{f52b}', '\u{f0f3}']],
    /* Third circle that has bg-neutral-seven-light */
    [['\u{f52b}', '\u{f0f3}', '\u{f5aa}']]
];
const series1d = [
    /* First set of three circles that have bg-primary-two */
    [19, 7, 7],
    /* Second set of three circles that have bg-primary-three */
    [26, 24, 12],
    /* Third circle that has bg-neutral-seven-light */
    [5]
];
const labels1d = ['one reason', 'two reasons', 'all three'];
const chart1d = document.getElementById('venn-chart-1d');
const placeholder1d = document.getElementById('venn-chart-1d-placeholder');
const colors1d = [
    ['var(--primary-two)', 'var(--primary-two)', 'var(--primary-two)'],
    ['var(--primary-three)', 'var(--primary-three)', 'var(--primary-three)'],
    ['var(--neutral-seven-light)']
];
const positions1d = [
    [{ cx: 116, cy: 155 }, { cx: 240, cy: 330 }, { cx: 340, cy: 175 }],
    [{ cx: 367, cy: 350 }, { cx: 130, cy: 375 }, { cx: 240, cy: 80 }],
    [{ cx: 245, cy: 225 }]
];
const scaleFactor1d = 120;
let selectedIndex1d = -1;

/* Graph-1e Variables */
const icons1e = [
    /* First set of three circles that have bg-primary-two */
    ['\u{f52b}', '\u{f5aa}', '\u{f0f3}'],
    /* Second set of three circles that have bg-primary-three */
    [['\u{f52b}', '\u{f5aa}'], ['\u{f5aa}', '\u{f0f3}'], ['\u{f52b}', '\u{f0f3}']],
    /* Third circle that has bg-neutral-seven-light */
    [['\u{f52b}', '\u{f0f3}', '\u{f5aa}']]
];
const series1e = [
    /* First set of three circles that have bg-primary-two */
    [14, 5, 2],
    /* Second set of three circles that have bg-primary-three */
    [47, 19, 6],
    /* Third circle that has bg-neutral-seven-light */
    [7]
];
const labels1e = ['one reason', 'two reasons', 'all three'];
const chart1e = document.getElementById('venn-chart-1e');
const placeholder1e = document.getElementById('venn-chart-1e-placeholder');
const colors1e = [
    ['var(--primary-two)', 'var(--primary-two)', 'var(--primary-two)'],
    ['var(--primary-three)', 'var(--primary-three)', 'var(--primary-three)'],
    ['var(--neutral-seven-light)']
];
const positions1e = [
    [{ cx: 150, cy: 85 }, { cx: 200, cy: 270 }, { cx: 325, cy: 160 }],
    [{ cx: 338, cy: 338 }, { cx: 100, cy: 225 }, { cx: 280, cy: 90 }],
    [{ cx: 240, cy: 175 }]
]
const scaleFactor1e = 150;
let selectedIndex1e = -1;

/* Graph-1f Variables */
const icons1f = ['\u{f568}', '\u{e4d8}', '\u{f0e3}'];
const series1f = [2, 48, 50];
const labels1f = ['architect', 'codes', 'enforcement'];
const chart1f = document.getElementById('pyramid-chart-1f');
const placeholder1f = document.getElementById('pyramid-chart-1f-placeholder');
const colors1f = ['var(--primary-three)', 'var(--primary-two)', 'var(--primary-one)'];
let selectedIndex1f = -1;

/* Graph-1g Variables */
const icons1g = ['\u{f568}', '\u{e4d8}', '\u{f0e3}'];
const series1g = [1, 32, 67];
const labels1g = ['architect', 'codes', 'enforcement'];
const chart1g = document.getElementById('pyramid-chart-1g');
const placeholder1g = document.getElementById('pyramid-chart-1g-placeholder');
const colors1g = ['var(--primary-three)', 'var(--primary-two)', 'var(--primary-one)'];
let selectedIndex1g = -1;

/* Graph-2a Variables */
const icons2a = ['\u{f1b3}', '\u{f013}', '\u{f1ad}', '\u{e163}', '\u{e3af}', '\u{f508}'];
const series2a = [25, 22, 19, 17, 9, 8];
const labels2a = ['fundamentals', 'systems', 'commercial', 'graphics', 'residential', 'practice'];
const chart2a = document.getElementById('pie-chart-2a');
const placeholder2a = document.getElementById('pie-chart-2a-placeholder');
const colors2a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)', 'var(--neutral-eight-light)'];
let selectedIndex2a = -1;

/* Graph-2b Variables */
const icons2b = ['\u{f1ad}', '\u{f1b3}', '\u{f013}', '\u{f508}', '\u{f1e0}', '\u{e163}'];
const series2b = [37, 23, 16, 10, 8, 6];
const labels2b = ['projects', 'fundamentals', 'systems', 'practice', 'shared', 'graphics'];
const chart2b = document.getElementById('pie-chart-2b');
const placeholder2b = document.getElementById('pie-chart-2b-placeholder');
const colors2b = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)', 'var(--neutral-eight-light)'];
let selectedIndex2b = -1;

/* Graph-2c Variables */
const icons2c = ['\u{f568}', '\u{f0ae}', '\u{f508}'];
const series2c = [78, 16, 6];
const labels2c = ['design', 'management', 'practice'];
const chart2c = document.getElementById('pie-chart-2c');
const placeholder2c = document.getElementById('pie-chart-2c-placeholder');
const colors2c = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)'];
let selectedIndex2c = -1;

/* Graph-2d Variables */
const icons2d = ['\u{f0ae}', '\u{f568}', '\u{f1e0}', '\u{f508}'];
const series2d = [33, 28, 27, 12];
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
const labels4a = ['interiors', 'architecture', 'business'];
const chart4a = document.getElementById('pie-chart-4a');
const placeholder4a = document.getElementById('pie-chart-4a-placeholder');
const colors4a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)'];
let selectedIndex4a = -1;

/* Graph-4b Variables */
const icons4b = ['\u{e54f}', '\u{f0b1}'];
const series4b = [56, 44];
const labels4b = ['interiors', 'business'];
const chart4b = document.getElementById('pie-chart-4b');
const placeholder4b = document.getElementById('pie-chart-4b-placeholder');
const colors4b = ['var(--primary-one)', 'var(--primary-two)'];
let selectedIndex4b = -1;

function piechart(icons, series1, labels, chartEl, placeholder, colors, selectedSliceIndex) {
    if (!chartEl) return;

    var svgNS = 'http://www.w3.org/2000/svg';
    var VW = 500, VH = 500;
    var cx = 250, cy = 250, outerR = 210, labelR = 130;
    var lockedSliceIndex = -1;
    var suppressToggle = false;
    var n = series1.length;
    var pieTotal = series1.reduce(function (a, b) { return a + b; }, 0);

    var startAngles = [], endAngles = [], midAngles = [];
    var cur = -Math.PI / 2;
    for (var i = 0; i < n; i++) {
        var sweep = (series1[i] / pieTotal) * 2 * Math.PI;
        startAngles.push(cur);
        endAngles.push(cur + sweep);
        midAngles.push(cur + sweep / 2);
        cur += sweep;
    }

    function slicePath(i) {
        var sa = startAngles[i], ea = endAngles[i], sw = ea - sa;
        var x1 = cx + outerR * Math.cos(sa), y1 = cy + outerR * Math.sin(sa);
        var ea2 = sw >= 2 * Math.PI - 0.001 ? ea - 0.001 : ea;
        var x2 = cx + outerR * Math.cos(ea2), y2 = cy + outerR * Math.sin(ea2);
        return 'M ' + cx + ' ' + cy + ' L ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
            ' A ' + outerR + ' ' + outerR + ' 0 ' + (sw > Math.PI ? 1 : 0) + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + ' Z';
    }

    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
    svg.setAttribute('width', '483');
    svg.setAttribute('height', '483');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';

    var sliceEls = [], textEls = [];

    for (var i = 0; i < n; i++) {
        var path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', slicePath(i));
        path.style.fill = colors[i];
        path.style.stroke = 'var(--neutral-nine)';
        path.style.strokeWidth = '2';
        path.style.cursor = 'pointer';
        path.style.transition = 'opacity 0.3s ease';
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', labels[i] + ': ' + Math.round(series1[i] / pieTotal * 100) + '%');
        svg.appendChild(path);
        sliceEls.push(path);

        var lx = (cx + labelR * Math.cos(midAngles[i])).toFixed(2);
        var ly = (cy + labelR * Math.sin(midAngles[i])).toFixed(2);
        var t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', lx);
        t.setAttribute('y', ly);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dominant-baseline', 'central');
        t.setAttribute('font-family', '"Font Awesome 7 Free"');
        t.setAttribute('font-size', '35');
        t.setAttribute('font-weight', '900');
        t.setAttribute('pointer-events', 'none');
        t.style.fill = 'var(--neutral-two-dark)';
        t.textContent = icons[i];
        svg.appendChild(t);
        textEls.push(t);
    }

    chartEl.appendChild(svg);
    placeholder.style.display = 'none';

    function highlightPie(idx) {
        sliceEls.forEach(function (el, i) {
            el.style.opacity = (idx === -1 || i === idx) ? '1' : '0.15';
        });
        textEls.forEach(function (el, i) {
            el.style.opacity = (idx === -1 || i === idx) ? '1' : '0.15';
        });
        var slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            var itemIdx = parseInt(item.getAttribute('data-series-index'));
            if (item.tagName !== 'DETAILS') {
                item.setAttribute('aria-pressed', String(idx !== -1 && itemIdx === idx));
            }
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = (idx === -1 || itemIdx === idx) ? '1' : '0.4';
        });
    }

    function restoreLabel(idx) {
        var t = textEls[idx];
        t.setAttribute('font-family', '"Font Awesome 7 Free"');
        t.setAttribute('font-size', '35');
        t.setAttribute('font-weight', '900');
        t.textContent = icons[idx];
        t.style.fill = 'var(--neutral-two-dark)';
    }

    function applyLabel(idx) {
        var t = textEls[idx];
        var lx = t.getAttribute('x');
        t.setAttribute('font-family', '"Space Grotesk", sans-serif');
        t.setAttribute('font-weight', '700');
        var line1 = Math.round(series1[idx] / pieTotal * 100) + '%';
        t.innerHTML = '<tspan x="' + lx + '" dy="0.3em" font-size="35">' + line1 + '</tspan>';
    }

    function syncAccordions(idx, isOpen) {
        var slide = chartEl.closest('.card');
        if (!slide) return;
        suppressToggle = true;
        slide.querySelectorAll('details[data-series-index]').forEach(function (item) {
            item.open = isOpen && parseInt(item.getAttribute('data-series-index')) === idx;
        });
        setTimeout(function () { suppressToggle = false; }, 0);
    }

    function handleClick(idx) {
        var wasSelected = lockedSliceIndex === idx;
        if (lockedSliceIndex !== -1) restoreLabel(lockedSliceIndex);
        if (wasSelected) {
            lockedSliceIndex = -1;
            selectedSliceIndex = -1;
            highlightPie(-1);
            syncAccordions(idx, false);
        } else {
            lockedSliceIndex = idx;
            selectedSliceIndex = idx;
            applyLabel(idx);
            highlightPie(idx);
            syncAccordions(idx, true);
        }
    }

    sliceEls.forEach(function (el, i) {
        el.addEventListener('click', function () { handleClick(i); });
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(i); }
        });
    });

    var slide = chartEl.closest('.card');
    if (!slide) return;
    slide.querySelectorAll('[data-series-index]').forEach(function (item) {
        var idx = parseInt(item.getAttribute('data-series-index'));
        if (item.tagName === 'DETAILS') {
            item.addEventListener('toggle', function () {
                if (suppressToggle) return;
                if (item.open) {
                    if (lockedSliceIndex !== -1) restoreLabel(lockedSliceIndex);
                    lockedSliceIndex = idx;
                    selectedSliceIndex = idx;
                    applyLabel(idx);
                    highlightPie(idx);
                    syncAccordions(idx, true);
                } else {
                    var anyOpen = Array.from(slide.querySelectorAll('details[data-series-index]'))
                        .some(function (d) { return d.open; });
                    if (!anyOpen) {
                        if (lockedSliceIndex !== -1) restoreLabel(lockedSliceIndex);
                        lockedSliceIndex = -1;
                        selectedSliceIndex = -1;
                        highlightPie(-1);
                    }
                }
            });
        } else {
            item.addEventListener('click', function () { handleClick(idx); });
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(idx); }
            });
        }
    });
}

function lineChart(series, dash, categories, chartEl, placeholder, colors) {
    if (!chartEl) return;

    var svgNS = 'http://www.w3.org/2000/svg';
    var VW = 500, VH = 500;
    var ml = 60, mr = 15, mt = 15, mb = 42;
    var cX = ml, cY = mt, cW = VW - ml - mr, cH = VH - mt - mb;
    var yMin = 0, yMax = 35;
    var lockedIndex = -1;
    var nCats = categories.length;

    var pts = series.map(function (s) {
        return s.data.map(function (v, xi) {
            return {
                x: cX + (xi / (nCats - 1)) * cW,
                y: cY + cH - ((v - yMin) / (yMax - yMin)) * cH
            };
        });
    });

    function makeD(points) {
        return points.map(function (p, i) {
            return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1);
        }).join(' ');
    }

    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
    svg.setAttribute('width', '483');
    svg.setAttribute('height', '483');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    svg.style.cursor = 'pointer';

    var gridColor = 'var(--neutral-six)';

    function gridLine(x1, y1, x2, y2) {
        var el = document.createElementNS(svgNS, 'line');
        el.setAttribute('x1', x1); el.setAttribute('y1', y1);
        el.setAttribute('x2', x2); el.setAttribute('y2', y2);
        el.style.stroke = gridColor;
        el.style.strokeWidth = '1';
        el.setAttribute('pointer-events', 'none');
        return el;
    }

    [0, 5, 10, 15, 20, 25, 30, 35].forEach(function (v) {
        var y = cY + cH - ((v - yMin) / (yMax - yMin)) * cH;
        svg.appendChild(gridLine(cX, y, cX + cW, y));
        var t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', cX - 6);
        t.setAttribute('y', y);
        t.setAttribute('text-anchor', 'end');
        t.setAttribute('dominant-baseline', 'middle');
        t.setAttribute('font-family', 'Inter, sans-serif');
        t.setAttribute('font-size', '15');
        t.setAttribute('fill', 'var(--neutral-nine)');
        t.setAttribute('pointer-events', 'none');
        t.textContent = v;
        svg.appendChild(t);
    });

    var yMid = cY + cH / 2;
    var yTitle = document.createElementNS(svgNS, 'text');
    yTitle.setAttribute('x', 14);
    yTitle.setAttribute('y', yMid);
    yTitle.setAttribute('text-anchor', 'middle');
    yTitle.setAttribute('dominant-baseline', 'middle');
    yTitle.setAttribute('font-family', 'Inter, sans-serif');
    yTitle.setAttribute('font-size', '15');
    yTitle.setAttribute('fill', 'var(--neutral-nine)');
    yTitle.setAttribute('transform', 'rotate(-90 14 ' + yMid + ')');
    yTitle.setAttribute('pointer-events', 'none');
    yTitle.textContent = 'States';
    svg.appendChild(yTitle);

    svg.appendChild(gridLine(cX, cY, cX, cY + cH));
    svg.appendChild(gridLine(cX, cY + cH, cX + cW, cY + cH));

    categories.forEach(function (cat, xi) {
        var x = cX + (xi / (nCats - 1)) * cW;
        svg.appendChild(gridLine(x, cY + cH, x, cY + cH + 5));
        var t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', x);
        t.setAttribute('y', cY + cH + 20);
        t.setAttribute('text-anchor', xi === 0 ? 'start' : xi === nCats - 1 ? 'end' : 'middle');
        t.setAttribute('font-family', 'Inter, sans-serif');
        t.setAttribute('font-size', '14');
        t.setAttribute('fill', 'var(--neutral-nine)');
        t.setAttribute('pointer-events', 'none');
        t.textContent = cat;
        svg.appendChild(t);
    });

    var lineEls = [], markerGroups = [];

    function highlight(idx) {
        lineEls.forEach(function (el, i) {
            el.style.opacity = (idx === -1 || i === idx) ? '1' : '0.15';
        });
        markerGroups.forEach(function (g, i) {
            g.style.opacity = (idx === -1 || i === idx) ? '1' : '0.15';
        });
        var slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            var itemIdx = parseInt(item.getAttribute('data-series-index'));
            item.setAttribute('aria-pressed', String(idx !== -1 && itemIdx === idx));
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = (idx === -1 || itemIdx === idx) ? '1' : '0.4';
        });
    }

    series.forEach(function (s, si) {
        var color = colors[si];
        var dashVal = dash[si];
        var d = makeD(pts[si]);

        var path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.style.fill = 'none';
        path.style.stroke = color;
        path.style.strokeWidth = '4';
        if (dashVal) path.style.strokeDasharray = dashVal + ' ' + dashVal;
        path.style.transition = 'opacity 0.3s ease';
        path.setAttribute('pointer-events', 'none');
        svg.appendChild(path);
        lineEls.push(path);

        var mg = document.createElementNS(svgNS, 'g');
        mg.style.transition = 'opacity 0.3s ease';
        mg.setAttribute('pointer-events', 'none');
        pts[si].forEach(function (p) {
            var c = document.createElementNS(svgNS, 'circle');
            c.setAttribute('cx', p.x);
            c.setAttribute('cy', p.y);
            c.setAttribute('r', '5');
            c.style.fill = color;
            mg.appendChild(c);
        });
        svg.appendChild(mg);
        markerGroups.push(mg);

        var hit = document.createElementNS(svgNS, 'path');
        hit.setAttribute('d', d);
        hit.style.fill = 'none';
        hit.style.stroke = 'transparent';
        hit.style.strokeWidth = '20';
        hit.setAttribute('tabindex', '0');
        hit.setAttribute('role', 'button');
        hit.setAttribute('aria-label', s.name);
        hit.addEventListener('mouseenter', function () { if (lockedIndex === -1) highlight(si); });
        hit.addEventListener('mouseleave', function () { if (lockedIndex === -1) highlight(-1); });
        hit.addEventListener('click', function () {
            lockedIndex = (lockedIndex === si) ? -1 : si;
            highlight(lockedIndex);
        });
        hit.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                lockedIndex = (lockedIndex === si) ? -1 : si;
                highlight(lockedIndex);
            }
        });
        hit.addEventListener('touchstart', function () {
            lockedIndex = (lockedIndex === si) ? -1 : si;
            highlight(lockedIndex);
        }, { passive: true });
        svg.appendChild(hit);
    });

    chartEl.appendChild(svg);
    placeholder.style.display = 'none';

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

function barChart(series, categories, chartEl, placeholder, colors, groupRanges) {
    if (!chartEl) return;

    var svgNS = 'http://www.w3.org/2000/svg';
    var VW = 500, VH = 500;
    var ml = 48, mr = 8, mt = 8, mb = 8;
    var cX = ml, cY = mt, cW = VW - ml - mr, cH = VH - mt - mb;
    var maxVal = 1200;
    var lockedGroup = -1;
    var n = series.length;
    var barGap = 3, groupGap = 14;
    var barW = (cW - (n - 1) * barGap - (groupRanges.length - 1) * groupGap) / n;

    function valY(v) { return cY + cH - (v / maxVal) * cH; }

    var barXs = [];
    var cx = cX;
    for (var i = 0; i < n; i++) {
        barXs.push(cx);
        if (i < n - 1) {
            cx += barW + barGap;
            var curGi = groupRanges.findIndex(function (r) { return i >= r[0] && i <= r[1]; });
            var nxtGi = groupRanges.findIndex(function (r) { return (i + 1) >= r[0] && (i + 1) <= r[1]; });
            if (curGi !== nxtGi) cx += groupGap;
        }
    }

    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
    svg.setAttribute('width', '483');
    svg.setAttribute('height', '483');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';

    function makeLine(x1, y1, x2, y2) {
        var el = document.createElementNS(svgNS, 'line');
        el.setAttribute('x1', x1); el.setAttribute('y1', y1);
        el.setAttribute('x2', x2); el.setAttribute('y2', y2);
        el.style.stroke = 'var(--neutral-six)';
        el.style.strokeWidth = '1';
        el.setAttribute('pointer-events', 'none');
        return el;
    }

    [0, 200, 400, 600, 800, 1000, 1200].forEach(function (v) {
        var y = valY(v);
        svg.appendChild(makeLine(cX, y, cX + cW, y));
        var t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', cX - 6);
        t.setAttribute('y', y);
        t.setAttribute('text-anchor', 'end');
        t.setAttribute('dominant-baseline', 'middle');
        t.setAttribute('font-family', 'Inter, sans-serif');
        t.setAttribute('font-size', '15');
        t.setAttribute('fill', 'var(--neutral-nine)');
        t.setAttribute('pointer-events', 'none');
        t.textContent = v;
        svg.appendChild(t);
    });

    svg.appendChild(makeLine(cX, cY, cX, cY + cH));

    groupRanges.forEach(function (range, gi) {
        if (gi < groupRanges.length - 1) {
            var sepX = (barXs[range[1]] + barW + barXs[range[1] + 1]) / 2;
            svg.appendChild(makeLine(sepX, cY, sepX, cY + cH));
        }
    });

    var barEls = [];
    series.forEach(function (val, idx) {
        var gi = groupRanges.findIndex(function (r) { return idx >= r[0] && idx <= r[1]; });
        var rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', barXs[idx]);
        rect.setAttribute('y', valY(val));
        rect.setAttribute('width', barW);
        rect.setAttribute('height', (val / maxVal) * cH);
        rect.setAttribute('rx', '2');
        rect.style.fill = colors[0];
        rect.style.cursor = 'pointer';
        rect.style.transition = 'opacity 0.3s ease';
        rect.setAttribute('tabindex', '0');
        rect.setAttribute('role', 'button');
        rect.setAttribute('aria-label', categories[idx] + ': ' + val + ' deaths');
        svg.appendChild(rect);
        barEls.push({ el: rect, gi: gi });
    });

    chartEl.appendChild(svg);
    placeholder.style.display = 'none';

    function highlightGroup(groupIdx) {
        barEls.forEach(function (b) {
            b.el.style.opacity = (groupIdx === -1 || b.gi === groupIdx) ? '1' : '0.15';
        });
        var slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-group-index]').forEach(function (item) {
            var itemGroup = parseInt(item.getAttribute('data-group-index'));
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = (groupIdx === -1 || itemGroup === groupIdx) ? '1' : '0.4';
        });
    }

    function handleBarClick(gi) {
        var wasSelected = lockedGroup === gi;
        lockedGroup = wasSelected ? -1 : gi;
        highlightGroup(lockedGroup);
        var slide = chartEl.closest('.card');
        if (!slide) return;
        Array.from(slide.querySelectorAll('[data-group-index]')).forEach(function (d) {
            d.open = !wasSelected && parseInt(d.getAttribute('data-group-index')) === gi;
        });
    }

    barEls.forEach(function (b) {
        b.el.addEventListener('click', function () { handleBarClick(b.gi); });
        b.el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBarClick(b.gi); }
        });
    });

    var slide = chartEl.closest('.card');
    if (!slide) return;
    slide.querySelectorAll('[data-group-index]').forEach(function (details) {
        var gi = parseInt(details.getAttribute('data-group-index'));
        details.addEventListener('toggle', function () {
            if (details.open) {
                lockedGroup = gi;
                highlightGroup(gi);
            } else {
                var anyOpen = Array.from(slide.querySelectorAll('[data-group-index]')).some(function (d) { return d.open; });
                if (!anyOpen) { lockedGroup = -1; highlightGroup(-1); }
            }
        });
    });
}

function pyramidChart(icons, series1, labels, chartEl, placeholder, colors, selectedIndex) {
    if (!chartEl) return;

    var lockedIndex = -1;
    var suppressToggle = false;
    var n = series1.length;
    var total = series1.reduce(function (a, b) { return a + b; }, 0);
    var VW = 400, VH = 400;
    var cx = VW / 2;
    var sH = VH / n;

    function halfAt(y) { return cx * (y / VH); }

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
    svg.setAttribute('width', '483');
    svg.setAttribute('height', '483');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';

    var polys = [];
    var textEls = [];

    for (var i = 0; i < n; i++) {
        var y1 = i * sH;
        var y2 = (i + 1) * sH;
        var pts;

        pts = (cx - halfAt(y1)) + ',' + y1 + ' ' +
            (cx + halfAt(y1)) + ',' + y1 + ' ' +
            (cx + halfAt(y2)) + ',' + y2 + ' ' +
            (cx - halfAt(y2)) + ',' + y2;

        var poly = document.createElementNS(svgNS, 'polygon');
        poly.setAttribute('points', pts);
        poly.style.fill = colors[i];
        poly.style.cursor = 'pointer';
        poly.style.transition = 'opacity 0.3s ease';
        poly.setAttribute('tabindex', '0');
        poly.setAttribute('role', 'button');
        poly.setAttribute('aria-label', labels[i] + ': ' + Math.round(series1[i] / total * 100) + '%');
        svg.appendChild(poly);
        polys.push(poly);

        var text = document.createElementNS(svgNS, 'text');
        var lx = (i === 0) ? cx + halfAt(y2) + 8 : cx;
        var ly = (y1 + y2) / 2;

        text.setAttribute('x', String(lx));
        text.setAttribute('y', String(ly));
        text.setAttribute('text-anchor', i === 0 ? 'start' : 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-family', '"Font Awesome 7 Free"');
        text.setAttribute('font-size', '35');
        text.setAttribute('font-weight', '900');
        text.setAttribute('pointer-events', 'none');
        text.style.fill = i === 0 ? 'var(--neutral-nine)' : 'var(--neutral-two-dark)';
        text.textContent = icons[i];
        svg.appendChild(text);
        textEls.push(text);
    }

    chartEl.appendChild(svg);
    placeholder.style.display = 'none';

    function highlightSection(idx) {
        polys.forEach(function (poly, j) {
            poly.style.opacity = (idx === -1 || j === idx) ? '1' : '0.15';
        });
        textEls.forEach(function (text, j) {
            text.style.opacity = (idx === -1 || j === idx) ? '1' : '0.15';
        });
        var slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            var itemIdx = parseInt(item.getAttribute('data-series-index'));
            if (item.tagName !== 'DETAILS') {
                item.setAttribute('aria-pressed', String(idx !== -1 && itemIdx === idx));
            }
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = (idx === -1 || itemIdx === idx) ? '1' : '0.4';
        });
    }

    function restoreLabel(idx) {
        var t = textEls[idx];
        t.setAttribute('font-family', '"Font Awesome 7 Free"');
        t.setAttribute('font-size', '35');
        t.setAttribute('font-weight', '900');
        t.textContent = icons[idx];
        t.style.fill = idx === 0 ? 'var(--neutral-nine)' : 'var(--neutral-two-dark)';
        t.setAttribute('text-anchor', idx === 0 ? 'start' : 'middle');
        t.setAttribute('x', String(idx === 0 ? cx + halfAt(sH) + 8 : cx));
    }

    function handleClick(idx) {
        var wasSelected = (lockedIndex === idx);

        if (selectedIndex !== -1 && selectedIndex !== idx) {
            restoreLabel(selectedIndex);
        }

        if (wasSelected) {
            if (selectedIndex === idx) restoreLabel(idx);
            selectedIndex = -1;
            lockedIndex = -1;
            highlightSection(-1);
        } else {
            selectedIndex = idx;
            lockedIndex = idx;

            var t = textEls[idx];
            var origX = t.getAttribute('x');
            t.setAttribute('font-family', '"Space Grotesk", sans-serif');
            t.style.fill = idx === 0 ? 'var(--neutral-nine)' : 'var(--neutral-two-dark)';
            t.setAttribute('text-anchor', idx === 0 ? 'start' : 'middle');

            var line1 = Math.round(series1[idx] / total * 100) + '%';
            t.innerHTML = '<tspan x="' + origX + '" dy="0.3em" font-size="35">' + line1 + '</tspan>';
            highlightSection(idx);
        }

        var slide = chartEl.closest('.card');
        if (slide) {
            suppressToggle = true;
            slide.querySelectorAll('details[data-series-index]').forEach(function (item) {
                var itemIdx = parseInt(item.getAttribute('data-series-index'));
                item.open = !wasSelected && itemIdx === idx;
            });
            setTimeout(function () { suppressToggle = false; }, 0);
        }
    }

    polys.forEach(function (poly, i) {
        poly.addEventListener('click', function () { handleClick(i); });
        poly.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(i); }
        });
    });

    function setupChartInteraction() {
        var slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            var idx = parseInt(item.getAttribute('data-series-index'));
            if (item.tagName === 'DETAILS') {
                item.addEventListener('toggle', function () {
                    if (suppressToggle) return;
                    if (item.open) { lockedIndex = idx; highlightSection(idx); }
                    else {
                        var anyOpen = Array.from(slide.querySelectorAll('details[data-series-index]'))
                            .some(function (d) { return d.open; });
                        if (!anyOpen) { lockedIndex = -1; highlightSection(-1); }
                    }
                });
            } else {
                item.addEventListener('click', function () { handleClick(idx); });
                item.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(idx); }
                });
            }
        });
    }

    setupChartInteraction();
}

function vennChart(icons, series1, labels, chartEl, placeholder, colors, selectedIndex, seriesPositions, scaleFactor) {
    if (!chartEl) return;
    var svgNS = 'http://www.w3.org/2000/svg';
    var positions = seriesPositions;
    var VW = 500, VH = 500;
    var allVals = series1.reduce(function (a, g) { return a.concat(g); }, []);
    var kScale = scaleFactor / Math.sqrt(Math.max.apply(null, allVals));
    var minR = 25;

    function getR(v) { return Math.max(minR, Math.sqrt(v) * kScale); }

    var circleData = [];

    series1.forEach(function (group, gi) {
        group.forEach(function (value, ci) {
            circleData.push({
                gi: gi,
                ci: ci,
                cx: positions[gi][ci].cx,
                cy: positions[gi][ci].cy,
                r: getR(value),
                color: colors[gi][ci] !== undefined ? colors[gi][ci] : colors[gi][0],
                iconArr: gi === 0 ? [icons[gi][ci]] : icons[gi][ci],
                value: value,
                stroke: 'var(--neutral-nine)',
                strokeWidth: '2'
            });
        });
    });

    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
    svg.setAttribute('width', '483');
    svg.setAttribute('height', '483');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';

    var layerBottom = document.createElementNS(svgNS, 'g');
    var layerMiddle = document.createElementNS(svgNS, 'g');
    var layerTop = document.createElementNS(svgNS, 'g');

    svg.appendChild(layerBottom);
    svg.appendChild(layerMiddle);
    svg.appendChild(layerTop);

    var lockedGroup = "-1";
    var suppressToggle = false;
    var groupEls = [];

    function setIconAttr(t, x, y, fontSize) {
        t.setAttribute('x', x);
        t.setAttribute('y', y);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dominant-baseline', 'central');
        t.setAttribute('font-family', '"Font Awesome 7 Free"');
        t.setAttribute('font-size', '30');
        t.setAttribute('font-weight', '900');
        t.setAttribute('pointer-events', 'none');
        t.style.fill = 'var(--neutral-two-dark)';
    }

    function drawIconsInto(parent, iconArr, cx, cy, r) {
        var n = iconArr.length;

        if (n === 1) {
            var t = document.createElementNS(svgNS, 'text');
            setIconAttr(t, cx, cy);
            t.textContent = iconArr[0];
            parent.appendChild(t);
        } else if (n === 2) {
            var gap = 16;
            [cx - gap, cx + gap].forEach(function (x, i) {
                var t = document.createElementNS(svgNS, 'text');
                setIconAttr(t, x, cy);
                t.textContent = iconArr[i];
                parent.appendChild(t);
            });
        } else {
            [{ x: cx, y: cy - 11 }, { x: cx - 11, y: cy + 10 }, { x: cx + 11, y: cy + 10 }]
                .forEach(function (p, i) {
                    var t = document.createElementNS(svgNS, 'text');
                    setIconAttr(t, p.x, p.y);
                    t.textContent = iconArr[i];
                    parent.appendChild(t);
                });
        }
    }

    function clearTexts(g) {
        Array.from(g.querySelectorAll('text')).forEach(function (t) {
            t.parentNode.removeChild(t);
        });
    }

    function showPercent(g, d) {
        clearTexts(g);
        var t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', d.cx);
        t.setAttribute('y', d.cy);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dominant-baseline', 'central');
        t.setAttribute('font-family', '"Space Grotesk", sans-serif');
        t.setAttribute('font-size', "35px");
        t.setAttribute('font-weight', '700');
        t.setAttribute('pointer-events', 'none');
        t.style.fill = 'var(--neutral-two-dark)';
        t.textContent = d.value + '%';
        g.appendChild(t);
    }

    function restoreIcons(g, d) {
        clearTexts(g);
        drawIconsInto(g, d.iconArr, d.cx, d.cy, d.r);
    }

    function highlightGroup(gi) {
        circleData.forEach(function (d, idx) {
            groupEls[idx].style.transition = 'opacity 0.3s ease';
            groupEls[idx].style.opacity = (gi === -1 || gi === "-1" || d.gi === gi) ? '1' : '0.15';

            if (gi !== "-1" && d.gi === gi) {
                groupEls[idx].setAttribute('data-active', 'true');
            } else {
                groupEls[idx].removeAttribute('data-active');
            }
        });

        var slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            var itemGi = parseInt(item.getAttribute('data-series-index'));
            if (item.tagName !== 'DETAILS') {
                item.setAttribute('aria-pressed', String(gi !== -1 && gi !== "-1" && itemGi === gi));
            }
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = (gi === -1 || gi === "-1" || itemGi === gi) ? '1' : '0.4';
        });
    }

    function syncAccordions(gi, isOpen) {
        var slide = chartEl.closest('.card');
        if (!slide) return;
        suppressToggle = true;
        slide.querySelectorAll('details[data-series-index]').forEach(function (item) {
            item.open = isOpen && parseInt(item.getAttribute('data-series-index')) === gi;
        });
        setTimeout(function () {
            suppressToggle = false;
        }, 0);
    }

    function handleClick(gi) {
        var wasSelected = lockedGroup === gi;
        if (lockedGroup !== "-1") {
            circleData.forEach(function (d, idx) {
                if (d.gi === lockedGroup) restoreIcons(groupEls[idx], d);
            });
        }
        if (wasSelected) {
            lockedGroup = "-1";
            highlightGroup(-1);
            syncAccordions(gi, false);
        } else {
            lockedGroup = gi;
            circleData.forEach(function (d, idx) {
                if (d.gi === gi) {
                    showPercent(groupEls[idx], d);
                }
            });
            highlightGroup(gi);
            syncAccordions(gi, true);
        }
    }

    circleData.forEach(function (d, idx) {
        var g = document.createElementNS(svgNS, 'g');
        g.style.cursor = 'pointer';
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        g.setAttribute('aria-label', labels[d.gi] + ': ' + d.value + '%');

        var circ = document.createElementNS(svgNS, 'circle');
        circ.setAttribute('cx', d.cx);
        circ.setAttribute('cy', d.cy);
        circ.setAttribute('r', d.r);
        circ.style.fill = d.color;
        circ.setAttribute('stroke', d.stroke);
        circ.setAttribute('stroke-width', d.strokeWidth);
        g.appendChild(circ);

        drawIconsInto(g, d.iconArr, d.cx, d.cy, d.r);

        g.addEventListener('click', function () {
            handleClick(d.gi);
        });
        g.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(d.gi);
            }
        });

        if (d.gi === 0) {
            layerTop.appendChild(g);
        } else if (d.gi === 1) {
            layerMiddle.appendChild(g);
        } else {
            layerBottom.appendChild(g);
        }

        groupEls.push(g);
    });

    chartEl.appendChild(svg);
    placeholder.style.display = 'none';

    var slide = chartEl.closest('.card');
    if (!slide) return;

    slide.querySelectorAll('details[data-series-index]').forEach(function (item) {
        var gi = parseInt(item.getAttribute('data-series-index'));
        item.addEventListener('toggle', function () {
            if (suppressToggle) return;
            if (item.open) {
                if (lockedGroup !== "-1" && lockedGroup !== gi) {
                    circleData.forEach(function (d, idx) {
                        if (d.gi === lockedGroup) restoreIcons(groupEls[idx], d);
                    });
                }
                lockedGroup = gi;
                circleData.forEach(function (d, idx) {
                    if (d.gi === gi) {
                        showPercent(groupEls[idx], d);
                    }
                });
                highlightGroup(gi);
                syncAccordions(gi, true);
            } else {
                var anyOpen = Array.from(slide.querySelectorAll('details[data-series-index]'))
                    .some(function (dd) { return dd.open; });
                if (!anyOpen) {
                    if (lockedGroup !== "-1") {
                        circleData.forEach(function (d, idx) {
                            if (d.gi === lockedGroup) restoreIcons(groupEls[idx], d);
                        });
                        lockedGroup = "-1";
                    }
                    highlightGroup(-1);
                }
            }
        });
    });
}


piechart(icons1a, series1a, labels1a, chart1a, placeholder1a, colors1a, selectedIndex1a);
piechart(icons1b, series1b, labels1b, chart1b, placeholder1b, colors1b, selectedIndex1b);
barChart(series1c, categories1c, chart1c, placeholder1c, colors1c, groupRanges1c);
vennChart(icons1d, series1d, labels1d, chart1d, placeholder1d, colors1d, selectedIndex1d, positions1d, scaleFactor1d);
vennChart(icons1e, series1e, labels1e, chart1e, placeholder1e, colors1e, selectedIndex1e, positions1e, scaleFactor1e);
pyramidChart(icons1f, series1f, labels1f, chart1f, placeholder1f, colors1f, selectedIndex1f);
pyramidChart(icons1g, series1g, labels1g, chart1g, placeholder1g, colors1g, selectedIndex1g);
piechart(icons2a, series2a, labels2a, chart2a, placeholder2a, colors2a, selectedIndex2a);
piechart(icons2b, series2b, labels2b, chart2b, placeholder2b, colors2b, selectedIndex2b);
piechart(icons2c, series2c, labels2c, chart2c, placeholder2c, colors2c, selectedIndex2c);
piechart(icons2d, series2d, labels2d, chart2d, placeholder2d, colors2d, selectedIndex2d);
lineChart(series3a, dash3a, categories3a, chart3a, placeholder3a, colors3a);
piechart(icons4a, series4a, labels4a, chart4a, placeholder4a, colors4a, selectedIndex4a);
piechart(icons4b, series4b, labels4b, chart4b, placeholder4b, colors4b, selectedIndex4b);