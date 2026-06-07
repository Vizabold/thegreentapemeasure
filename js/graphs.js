/* Graph-1a Variables */
const type1a = 'pie';
const series1a = [38, 21, 17, 14, 10];
const labels1a = ['hotel', 'assembly', 'schools', 'hospital', 'factory'];
const chart1a = document.getElementById('pie-chart-1a');
const placeholder1a = document.getElementById('pie-chart-1a-placeholder');
const colors1a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)'];
let selectedIndex1a = -1;

/* Graph-1b Variables */
const type1b = 'pie';
const series1b = [52, 19, 12, 11, 6];
const labels1b = ['assembly', 'hotel', 'schools', 'hospital', 'factory'];
const chart1b = document.getElementById('pie-chart-1b');
const placeholder1b = document.getElementById('pie-chart-1b-placeholder');
const colors1b = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)'];
let selectedIndex1b = -1;

/* Graph-1c Variables */
const type1c = 'bar';
const series1c = [946, 226, 282, 34, 1010, 247, 135, 214, 264, 112, 100, 49, 17];
const labels1c = ['1900s', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
const chart1c = document.getElementById('bar-chart-1c');
const placeholder1c = document.getElementById('bar-chart-1c-placeholder');
const colors1c = ['var(--primary-two)'];
let selectedIndex1c = -1;

/* Graph-1d Variables */
const type1d = 'venn';
const series1d = [[19, 7, 7], [26, 24, 12], [5]];
const labels1d = ['one reason', 'two reasons', 'all three'];
const chart1d = document.getElementById('venn-chart-1d');
const placeholder1d = document.getElementById('venn-chart-1d-placeholder');
const colors1d = [
    ['var(--primary-two)', 'var(--primary-two)', 'var(--primary-two)'],
    ['var(--primary-three)', 'var(--primary-three)', 'var(--primary-three)'],
    ['var(--neutral-seven-light)']
];
let selectedIndex1d = -1;

/* Graph-1e Variables */
const type1e = 'venn';
const series1e = [[14, 5, 2], [47, 19, 6], [7]];
const labels1e = ['one reason', 'two reasons', 'all three'];
const chart1e = document.getElementById('venn-chart-1e');
const placeholder1e = document.getElementById('venn-chart-1e-placeholder');
const colors1e = [
    ['var(--primary-two)', 'var(--primary-two)', 'var(--primary-two)'],
    ['var(--primary-three)', 'var(--primary-three)', 'var(--primary-three)'],
    ['var(--neutral-seven-light)']
];
let selectedIndex1e = -1;

/* Graph-1f Variables */
const type1f = 'pyramid';
const series1f = [2, 48, 50];
const labels1f = ['architect', 'codes', 'enforcement'];
const chart1f = document.getElementById('pyramid-chart-1f');
const placeholder1f = document.getElementById('pyramid-chart-1f-placeholder');
const colors1f = ['var(--primary-three)', 'var(--primary-two)', 'var(--primary-one)'];
let selectedIndex1f = -1;

/* Graph-1g Variables */
const type1g = 'pyramid';
const series1g = [1, 32, 67];
const labels1g = ['architect', 'codes', 'enforcement'];
const chart1g = document.getElementById('pyramid-chart-1g');
const placeholder1g = document.getElementById('pyramid-chart-1g-placeholder');
const colors1g = ['var(--primary-three)', 'var(--primary-two)', 'var(--primary-one)'];
let selectedIndex1g = -1;

/* Graph-2a Variables */
const type2a = 'pie';
const series2a = [25, 22, 19, 17, 9, 8];
const labels2a = ['fundamentals', 'systems', 'commercial', 'graphics', 'residential', 'practice'];
const chart2a = document.getElementById('pie-chart-2a');
const placeholder2a = document.getElementById('pie-chart-2a-placeholder');
const colors2a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)', 'var(--neutral-eight-light)'];
let selectedIndex2a = -1;

/* Graph-2b Variables */
const type2b = 'pie';
const series2b = [37, 23, 16, 10, 8, 6];
const labels2b = ['projects', 'fundamentals', 'systems', 'practice', 'shared', 'graphics'];
const chart2b = document.getElementById('pie-chart-2b');
const placeholder2b = document.getElementById('pie-chart-2b-placeholder');
const colors2b = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)', 'var(--neutral-seven-light)', 'var(--neutral-eight-light)'];
let selectedIndex2b = -1;

/* Graph-2c Variables */
const type2c = 'pie';
const series2c = [78, 16, 6];
const labels2c = ['design', 'management', 'practice'];
const chart2c = document.getElementById('pie-chart-2c');
const placeholder2c = document.getElementById('pie-chart-2c-placeholder');
const colors2c = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)'];
let selectedIndex2c = -1;

/* Graph-2d Variables */
const type2d = 'pie';
const series2d = [33, 28, 27, 12];
const labels2d = ['management', 'design', 'shared', 'practice'];
const chart2d = document.getElementById('pie-chart-2d');
const placeholder2d = document.getElementById('pie-chart-2d-placeholder');
const colors2d = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)', 'var(--primary-four)'];
let selectedIndex2d = -1;

/* Graph-3a Variables */
const type3a = 'line';
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
const labels3a = ['1980s', '1990s', '2000s', '2010s', '2020s'];
const chart3a = document.getElementById('line-chart-3a');
const placeholder3a = document.getElementById('line-chart-3a-placeholder');
const colors3a = ['var(--primary-one)', 'var(--primary-one)', 'var(--neutral-seven)', 'var(--neutral-seven)'];
let selectedIndex3a = -1;

/* Graph-4a Variables */
const type4a = 'pie';
const series4a = [60, 20, 20];
const labels4a = ['interiors', 'architecture', 'business'];
const chart4a = document.getElementById('pie-chart-4a');
const placeholder4a = document.getElementById('pie-chart-4a-placeholder');
const colors4a = ['var(--primary-one)', 'var(--primary-two)', 'var(--primary-three)'];
let selectedIndex4a = -1;

/* Graph-4b Variables */
const type4b = 'pie';
const series4b = [56, 44];
const labels4b = ['interiors', 'business'];
const chart4b = document.getElementById('pie-chart-4b');
const placeholder4b = document.getElementById('pie-chart-4b-placeholder');
const colors4b = ['var(--primary-one)', 'var(--primary-two)'];
let selectedIndex4b = -1;

function renderChart(type, series, labels, chartEl, placeholder, colors, selectedIndex, dialog) {
    if (!chartEl) {
        console.log('chart did not render');
        return;
    }

    chartEl.innerHTML = '';

    const graphController = new AbortController();
    const { signal } = graphController;

    const svgNS = 'http://www.w3.org/2000/svg';
    const VW = 500, VH = 500;
    let lockedIndex = -1;
    const svg = document.createElementNS(svgNS, 'svg');
    const els = [], textEls = [];
    let suppressToggle = false;
    let total;
    let cX;
    let cY;
    let cW
    let cH;
    let n;
    let icons;
    let positions;
    let groupRanges;
    let range;
    let scaleFactor;
    let pts;
    if (type === 'pyramid' || type === 'pie') {
        total = series.reduce(function (a, b) { return a + b; }, 0);
    }
    if (type === 'bar' || type === 'pie' || type === 'pyramid') {
        n = series.length;
    }


    svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
    svg.setAttribute('width', '483');
    svg.setAttribute('height', '483');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    svg.style.cursor = 'pointer';

    /* Pie Chart Variables */
    if (type === 'pie') {
        if (chartEl.id === 'pie-chart-1a') {
            icons = ['', '', '', '\u{e3b2}', ''];
        }
        if (chartEl.id === 'pie-chart-1b') {
            icons = ['', '', '', '\u{e3b2}', ''];
        }
        if (chartEl.id === 'pie-chart-2a') {
            icons = ['\u{f1b3}', '\u{f013}', '\u{f1ad}', '\u{e163}', '\u{e3af}', '\u{f508}'];
        }
        if (chartEl.id === 'pie-chart-2b') {
            icons = ['\u{f1ad}', '\u{f1b3}', '\u{f013}', '\u{f508}', '\u{f1e0}', '\u{e163}'];
        }
        if (chartEl.id === 'pie-chart-2c') {
            icons = ['\u{f568}', '\u{f0ae}', '\u{f508}'];
        }
        if (chartEl.id === 'pie-chart-2d') {
            icons = ['\u{f0ae}', '\u{f568}', '\u{f1e0}', '\u{f508}'];
        }
        if (chartEl.id === 'pie-chart-4a') {
            icons = ['\u{e54f}', '\u{e3af}', '\u{f0b1}'];
        }
        if (chartEl.id === 'pie-chart-4b') {
            icons = ['\u{e54f}', '\u{f0b1}'];
        }
        cX = 250;
        cY = 250
    }
    const outerR = 210, labelR = 130;
    const startAngles = [], endAngles = [], midAngles = [];
    let cur = -Math.PI / 2;
    for (var i = 0; i < n; i++) {
        const sweep = (series[i] / total) * 2 * Math.PI;
        startAngles.push(cur);
        endAngles.push(cur + sweep);
        midAngles.push(cur + sweep / 2);
        cur += sweep;
    }

    /* Bar Chart Variables */
    const barXs = [];
    const maxVal = 1200;
    const barGap = 3, groupGap = 14;
    let barW;
    if (type === 'bar') {
        if (chartEl.id === 'bar-chart-1c') {
            groupRanges = [[0, 3], [4, 7], [8, 12]];
            range = [0, 200, 400, 600, 800, 1000, 1200];
        }
        const ml = 48, mr = 8, mt = 8, mb = 8;
        cX = ml, cY = mt, cW = VW - ml - mr, cH = VH - mt - mb;
        barW = (cW - (n - 1) * barGap - (groupRanges.length - 1) * groupGap) / n;
        let runX = cX;
        for (var i = 0; i < n; i++) {
            barXs.push(runX);
            if (i < n - 1) {
                runX += barW + barGap;
                const curGi = groupRanges.findIndex(function (r) { return i >= r[0] && i <= r[1]; });
                const nxtGi = groupRanges.findIndex(function (r) { return (i + 1) >= r[0] && (i + 1) <= r[1]; });
                if (curGi !== nxtGi) runX += groupGap;
            }
        }
    }

    /* Venn Chart Variables */
    if (type === 'venn') {
        if (chartEl.id === 'venn-chart-1d') {
            icons = [
                ['\u{f52b}', '\u{f5aa}', '\u{f0f3}'], [['\u{f5aa}', '\u{f0f3}'], ['\u{f52b}', '\u{f5aa}'], ['\u{f52b}', '\u{f0f3}']], [['\u{f52b}', '\u{f0f3}', '\u{f5aa}']]
            ];
            positions = [
                [{ cx: 116, cy: 155 }, { cx: 240, cy: 330 }, { cx: 340, cy: 175 }],
                [{ cx: 367, cy: 350 }, { cx: 130, cy: 375 }, { cx: 240, cy: 90 }],
                [{ cx: 245, cy: 225 }]
            ];
            scaleFactor = 120;
        }
        if (chartEl.id === 'venn-chart-1e') {
            icons = [
                ['\u{f52b}', '\u{f5aa}', '\u{f0f3}'],
                [['\u{f52b}', '\u{f5aa}'], ['\u{f5aa}', '\u{f0f3}'], ['\u{f52b}', '\u{f0f3}']],
                [['\u{f52b}', '\u{f0f3}', '\u{f5aa}']]
            ];
            positions = [
                [{ cx: 120, cy: 115 }, { cx: 290, cy: 250 }, { cx: 300, cy: 115 }],
                [{ cx: 155, cy: 338 }, { cx: 390, cy: 200 }, { cx: 240, cy: 65 }],
                [{ cx: 240, cy: 160 }]
            ]
            scaleFactor = 150;
        }
    }
    const allVals = series.reduce(function (a, g) { return a.concat(g); }, []);
    const kScale = scaleFactor / Math.sqrt(Math.max.apply(null, allVals));
    const minR = 25;
    const groupEls = [];
    const layerBottom = document.createElementNS(svgNS, 'g');
    const layerMiddle = document.createElementNS(svgNS, 'g');
    const layerTop = document.createElementNS(svgNS, 'g');

    /* Pyramid Chart Variables */
    if (type === 'pyramid') {
        if (chartEl.id === 'pyramid-chart-1f') {
            icons = ['\u{f568}', '\u{e4d8}', '\u{f0e3}'];
        }
        if (chartEl.id === 'pyramid-chart-1g') {
            icons = ['\u{f568}', '\u{e4d8}', '\u{f0e3}'];
        }
        cX = VW / 2;
    }
    const sH = VH / n;

    /* Line Chart Variables */
    const yMin = 0, yMax = 35;
    const nCats = labels.length;
    const dash = [0, 8, 0, 8];
    const markerGroups = [];
    if (type === 'line') {
        range = [0, 5, 10, 15, 20, 25, 30, 35];
        const ml = 60, mr = 15, mt = 15, mb = 42;
        cX = ml, cY = mt, cW = VW - ml - mr, cH = VH - mt - mb;
        pts = series.map(function (s) {
            return s.data.map(function (v, xi) {
                return {
                    x: cX + (xi / (nCats - 1)) * cW,
                    y: cY + cH - ((v - yMin) / (yMax - yMin)) * cH
                };
            });
        });
    }


    /*------------------------- Functions ----------------------------*/
    /* Create pie slices */
    function slicePath(i) {
        const sa = startAngles[i], ea = endAngles[i], sw = ea - sa;
        const x1 = cX + outerR * Math.cos(sa), y1 = cY + outerR * Math.sin(sa);
        const ea2 = sw >= 2 * Math.PI - 0.001 ? ea - 0.001 : ea;
        const x2 = cX + outerR * Math.cos(ea2), y2 = cY + outerR * Math.sin(ea2);
        return 'M ' + cX + ' ' + cY + ' L ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
            ' A ' + outerR + ' ' + outerR + ' 0 ' + (sw > Math.PI ? 1 : 0) + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + ' Z';
    }

    /* Determine points for each pyramid section */
    function halfAt(y) { return cX * (y / VH); }

    /* Add points to a line chart */
    function makeD(points) {
        return points.map(function (p, i) {
            return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1);
        }).join(' ');
    }

    /* Determine Bar Height */
    function valY(v) { return cY + cH - (v / maxVal) * cH; }

    /* Determine Venn Circle Radius */
    function getR(v) { return Math.max(minR, Math.sqrt(v) * kScale); }

    /* Add Venn Diagram Icons Styles */
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

    /* Add Venn Diagram Icons to Circles */
    function drawIconsInto(parent, iconArr, cx, cy, r) {
        n = iconArr.length;
        if (n === 1) {
            const t = document.createElementNS(svgNS, 'text');
            setIconAttr(t, cx, cy);
            t.textContent = iconArr[0];
            parent.appendChild(t);
        } else if (n === 2) {
            const gap = 16;
            [cx - gap, cx + gap].forEach(function (x, i) {
                const t = document.createElementNS(svgNS, 'text');
                setIconAttr(t, x, cy);
                t.textContent = iconArr[i];
                parent.appendChild(t);
            });
        } else {
            [{ x: cx, y: cy - 11 }, { x: cx - 11, y: cy + 10 }, { x: cx + 11, y: cy + 10 }]
                .forEach(function (p, i) {
                    const t = document.createElementNS(svgNS, 'text');
                    setIconAttr(t, p.x, p.y);
                    t.textContent = iconArr[i];
                    parent.appendChild(t);
                });
        }
    }

    /* Create a Grid Line */
    function gridLine(x1, y1, x2, y2) {
        const el = document.createElementNS(svgNS, 'line');
        el.setAttribute('x1', x1); el.setAttribute('y1', y1);
        el.setAttribute('x2', x2); el.setAttribute('y2', y2);
        el.style.stroke = 'var(--neutral-six)';
        el.style.strokeWidth = '1';
        el.setAttribute('pointer-events', 'none');
        return el;
    }

    /* Highlight part of chart clicked/tapped */
    function highlight(idx) {
        els.forEach(function (el, i) {
            if (type === 'venn') {
                groupEls[i].style.opacity = (idx === -1 || idx === "-1" || el.gi === idx) ? '1' : '0.15';
                if (idx !== "-1" && el.gi === idx) {
                    groupEls[i].setAttribute('data-active', 'true');
                } else {
                    groupEls[i].removeAttribute('data-active');
                }
            } else if (type === 'bar') {
                el.el.style.opacity = (idx === -1 || el.gi === idx) ? '1' : '0.15';
            } else {
                el.style.opacity = (idx === -1 || i === idx) ? '1' : '0.15';
            }
        });
        if (type === 'pie' || type === 'pyramid') {
            textEls.forEach(function (el, i) {
                el.style.opacity = (idx === -1 || i === idx) ? '1' : '0.15';
            });
        }
        if (type === 'line') {
            markerGroups.forEach(function (g, i) {
                g.style.opacity = (idx === -1 || i === idx) ? '1' : '0.15';
            });
        }
        const slide = chartEl.closest('.card');
        if (!slide) return;
        slide.querySelectorAll('[data-series-index]').forEach(function (item) {
            const itemIdx = parseInt(item.getAttribute('data-series-index'));
            item.setAttribute('aria-pressed', String(idx !== -1 && itemIdx === idx));
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = (idx === -1 || itemIdx === idx) ? '1' : '0.4';
        });
    }

    /* Restore Icons */
    function restoreLabel(idx) {
        const t = textEls[idx];
        t.setAttribute('font-family', '"Font Awesome 7 Free"');
        t.setAttribute('font-size', '35');
        t.setAttribute('font-weight', '900');
        t.textContent = icons[idx];
        t.style.fill = 'var(--neutral-two-dark)';
        if (type === 'pyramid') {
            t.setAttribute('text-anchor', 'middle');
            t.setAttribute('x', cX);
        }
    }

    /* Restore Venn Icons */
    function clearTexts(g) {
        Array.from(g.querySelectorAll('text')).forEach(function (t) {
            t.parentNode.removeChild(t);
        });
    }

    function restoreIcons(g, d) {
        clearTexts(g);
        drawIconsInto(g, d.iconArr, d.cx, d.cy, d.r);
    }

    /* Show Percentage */
    function applyLabel(idx) {
        const t = textEls[idx];
        const lx = t.getAttribute('x');
        t.setAttribute('font-family', '"Space Grotesk", sans-serif');
        t.setAttribute('font-weight', '700');
        if (type === 'pyramid') {
            t.style.fill = 'var(--neutral-two-dark)';
            t.setAttribute('text-anchor', 'middle');
        }
        const line1 = Math.round(series[idx] / total * 100) + '%';
        t.innerHTML = '<tspan x="' + lx + '" dy="0.3em" font-size="35">' + line1 + '</tspan>';
    }

    /* Add text attributes */
    function addTextAttr(t, el, isIcon = false) {
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dominant-baseline', 'central');
        t.setAttribute('font-family', isIcon ? '"Font Awesome 7 Free"' : '"Space Grotesk", sans-serif');
        t.setAttribute('font-size', '35');
        t.setAttribute('font-weight', isIcon ? '900' : '700');
        t.setAttribute('pointer-events', 'none');
        t.style.fill = 'var(--neutral-two-dark)';
        if (type === 'venn') {
            el.appendChild(t);
        }
        if (type === 'pyramid' || type === 'pie') {
            svg.appendChild(t);
            textEls.push(t);
        }
    }

    function setAxisLabels(t) {
        t.setAttribute('dominant-baseline', 'middle');
        t.setAttribute('font-family', 'Inter, sans-serif');
        t.setAttribute('font-size', '15');
        t.setAttribute('fill', 'var(--neutral-nine)');
        t.setAttribute('pointer-events', 'none');
        svg.appendChild(t);
    }

    /* Add styling to chart shapes */
    function addShapeAttr(s, i) {
        s.style.fill = colors[i];
        s.style.stroke = 'var(--neutral-nine)';
        s.style.strokeWidth = '2';
        s.style.cursor = 'pointer';
        s.style.transition = 'opacity 0.3s ease';
        s.setAttribute('tabindex', '0');
        s.setAttribute('role', 'button');
        s.setAttribute('aria-label', labels[i] + ': ' + Math.round(series[i] / total * 100) + '%');
        svg.appendChild(s);
        els.push(s);
    }

    /* Show Percentages on Venn Diagram */
    function showPercent(g, d) {
        clearTexts(g);
        const t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', d.cx);
        t.setAttribute('y', d.cy);
        t.textContent = d.value + '%';
        addTextAttr(t, g);
    }

    /* Open Corresponding Legend Item, Close All Others */
    function syncAccordions(idx, isOpen) {
        const slide = chartEl.closest('.card');
        if (!slide) return;
        suppressToggle = true;
        slide.querySelectorAll('details[data-series-index]').forEach(function (item) {
            item.open = isOpen && parseInt(item.getAttribute('data-series-index')) === idx;
        });
        setTimeout(function () { suppressToggle = false; }, 0);
    }

    /* Determine Graph State and Corresponding Function to Run */
    function handleClick(idx) {
        const wasSelected = lockedIndex === idx;
        if (type === 'venn' && lockedIndex !== -1) {
            els.forEach(function (el, i) {
                if (el.gi === lockedIndex) restoreIcons(groupEls[i], el);
            });
        }
        if (type === 'pie' || type === 'pyramid') {
            if (lockedIndex !== -1) restoreLabel(lockedIndex);
        }
        if (wasSelected) {
            lockedIndex = -1;
            selectedIndex = -1;
            highlight(-1);
            syncAccordions(idx, false);
        } else {
            lockedIndex = idx;
            selectedIndex = idx;
            if (type === 'venn') {
                els.forEach(function (el, i) {
                    if (el.gi === idx) {
                        showPercent(groupEls[i], el);
                    }
                });
            }
            if (type === 'pie' || type === 'pyramid') {
                applyLabel(idx);
            }
            highlight(idx);
            syncAccordions(idx, true);
        }
    }

    function addlisteners(el, i) {
        el.addEventListener('mouseenter', function () { if (lockedIndex === -1) highlight(i); }, { signal });
        el.addEventListener('mouseleave', function () { if (lockedIndex === -1) highlight(-1); }, { signal });
        el.addEventListener('click', function () {
            handleClick(i);
        }, { signal });
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(i);
            }
        }, { signal });
    }

    /*------------------------- Attributes ----------------------------*/

    /* Add x- and y-axis labels */
    if (type === 'line' || type === 'bar') {
        range.forEach(function (v) {
            let y;
            if (type === 'line') {
                y = cY + cH - ((v - yMin) / (yMax - yMin)) * cH;
            }
            if (type === 'bar') {
                y = valY(v);
            }
            svg.appendChild(gridLine(cX, y, cX + cW, y));
            const t = document.createElementNS(svgNS, 'text');
            t.setAttribute('x', cX - 6);
            t.setAttribute('y', y);
            t.textContent = v;
            t.setAttribute('text-anchor', 'end');
            setAxisLabels(t);
        });
    }

    /* Venn Chart attributes */
    if (type === 'venn') {
        series.forEach(function (val, idx) {
            val.forEach(function (value, ci) {
                els.push({
                    gi: idx,
                    ci: ci,
                    cx: positions[idx][ci].cx,
                    cy: positions[idx][ci].cy,
                    r: getR(value),
                    color: colors[idx][ci] !== undefined ? colors[idx][ci] : colors[idx][0],
                    iconArr: idx === 0 ? [icons[idx][ci]] : icons[idx][ci],
                    value: value,
                    stroke: 'var(--neutral-nine)',
                    strokeWidth: '2'
                });
            });
        });

        svg.appendChild(layerBottom);
        svg.appendChild(layerMiddle);
        svg.appendChild(layerTop);

        els.forEach(function (el, i) {
            const g = document.createElementNS(svgNS, 'g');
            g.style.cursor = 'pointer';
            g.setAttribute('tabindex', '0');
            g.setAttribute('role', 'button');
            g.setAttribute('aria-label', labels[el.gi] + ': ' + el.value + '%');

            const circ = document.createElementNS(svgNS, 'circle');
            circ.setAttribute('cx', el.cx);
            circ.setAttribute('cy', el.cy);
            circ.setAttribute('r', el.r);
            circ.style.fill = el.color;
            circ.setAttribute('stroke', el.stroke);
            circ.setAttribute('stroke-width', el.strokeWidth);
            g.appendChild(circ);

            drawIconsInto(g, el.iconArr, el.cx, el.cy, el.r);

            addlisteners(g, el.gi);

            if (el.gi === 0) {
                layerTop.appendChild(g);
            } else if (el.gi === 1) {
                layerMiddle.appendChild(g);
            } else {
                layerBottom.appendChild(g);
            }

            groupEls.push(g);
        })
    }

    /* Pyramid Chart attributes */
    if (type === 'pyramid') {
        for (var i = 0; i < n; i++) {
            const y1 = i * sH;
            const y2 = (i + 1) * sH;

            pts = (cX - halfAt(y1)) + ',' + y1 + ' ' +
                (cX + halfAt(y1)) + ',' + y1 + ' ' +
                (cX + halfAt(y2)) + ',' + y2 + ' ' +
                (cX - halfAt(y2)) + ',' + y2;

            const poly = document.createElementNS(svgNS, 'polygon');
            poly.setAttribute('points', pts);
            addShapeAttr(poly, i);
            const t = document.createElementNS(svgNS, 'text');
            const lx = cX;
            const ly = (y1 + y2) / 2;
            t.setAttribute('x', String(lx));
            t.setAttribute('y', String(ly));
            t.textContent = icons[i];
            addTextAttr(t, null, true);
        }

    }

    /* Bar Chart attributes */
    if (type === 'bar') {
        svg.appendChild(gridLine(cX, cY, cX, cY + cH));
        groupRanges.forEach(function (range, idx) {
            if (idx < groupRanges.length - 1) {
                const sepX = (barXs[range[1]] + barW + barXs[range[1] + 1]) / 2;
                svg.appendChild(gridLine(sepX, cY, sepX, cY + cH));
            }
        });
        series.forEach(function (val, idx) {
            const gi = groupRanges.findIndex(function (r) { return idx >= r[0] && idx <= r[1]; });
            const rect = document.createElementNS(svgNS, 'rect');
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
            rect.setAttribute('aria-label', labels[idx] + ': ' + val + ' deaths');
            svg.appendChild(rect);
            els.push({ el: rect, gi: gi });
        });
    }

    /* Line Chart attributes */
    if (type === 'line') {
        const yMid = cY + cH / 2;
        const yTitle = document.createElementNS(svgNS, 'text');
        yTitle.setAttribute('x', 14);
        yTitle.setAttribute('y', yMid);
        yTitle.setAttribute('text-anchor', 'middle');
        yTitle.setAttribute('transform', 'rotate(-90 14 ' + yMid + ')');
        yTitle.textContent = 'States';
        setAxisLabels(yTitle);
        svg.appendChild(gridLine(cX, cY, cX, cY + cH));
        svg.appendChild(gridLine(cX, cY + cH, cX + cW, cY + cH));

        series.forEach(function (s, si) {
            const color = colors[si];
            const dashVal = dash[si];
            const d = makeD(pts[si]);

            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', d);
            path.style.fill = 'none';
            path.style.stroke = color;
            path.style.strokeWidth = '4';
            if (dashVal) path.style.strokeDasharray = dashVal + ' ' + dashVal;
            path.style.transition = 'opacity 0.3s ease';
            path.setAttribute('pointer-events', 'none');
            svg.appendChild(path);
            els.push(path);

            const mg = document.createElementNS(svgNS, 'g');
            mg.style.transition = 'opacity 0.3s ease';
            mg.setAttribute('pointer-events', 'none');
            pts[si].forEach(function (p) {
                const c = document.createElementNS(svgNS, 'circle');
                c.setAttribute('cx', p.x);
                c.setAttribute('cy', p.y);
                c.setAttribute('r', '5');
                c.style.fill = color;
                mg.appendChild(c);
            });
            svg.appendChild(mg);
            markerGroups.push(mg);

            const hit = document.createElementNS(svgNS, 'path');
            hit.setAttribute('d', d);
            hit.style.fill = 'none';
            hit.style.stroke = 'transparent';
            hit.style.strokeWidth = '20';
            hit.setAttribute('tabindex', '0');
            hit.setAttribute('role', 'button');
            hit.setAttribute('aria-label', s.name);
            addlisteners(hit, si);
            svg.appendChild(hit);
        });
    }

    if (type === 'pie') {
        for (var i = 0; i < n; i++) {
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', slicePath(i));
            addShapeAttr(path, i);
            const lx = (cX + labelR * Math.cos(midAngles[i])).toFixed(2);
            const ly = (cY + labelR * Math.sin(midAngles[i])).toFixed(2);
            const t = document.createElementNS(svgNS, 'text');
            t.setAttribute('x', lx);
            t.setAttribute('y', ly);
            t.textContent = icons[i];
            addTextAttr(t, null, true);
        }
    }

    chartEl.appendChild(svg);
    placeholder.style.display = 'none';

    /*------------------------- Event Listeners ----------------------------*/
    if (type === 'bar') {
        els.forEach(function (el, i) {
            addlisteners(el.el, el.gi);
        });
    }

    if (type === 'pie' || type === 'pyramid') {
        els.forEach(function (el, i) {
            addlisteners(el, i);
        });
    }

    const slide = chartEl.closest('.card');
    if (!slide) return;

    slide.querySelectorAll('[data-series-index]').forEach(function (item) {
        const idx = parseInt(item.getAttribute('data-series-index'));
        item.addEventListener('toggle', function () {
            if (suppressToggle) return;
            if (item.open) {
                if (lockedIndex !== -1 && (type === 'pie' || type === 'pyramid')) restoreLabel(lockedIndex);
                if (type === 'venn' && (lockedIndex !== "-1" && lockedIndex !== idx)) {
                    els.forEach(function (el, i) {
                        if (el.gi === lockedIndex) restoreIcons(groupEls[i], el);
                    });
                }
                lockedIndex = idx;
                selectedIndex = idx;
                if (type === 'pie' || type === 'pyramid') applyLabel(idx);
                if (type === 'venn') {
                    els.forEach(function (el, i) {
                        if (el.gi === idx) {
                            showPercent(groupEls[i], el);
                        }
                    });
                }
                highlight(idx);
                syncAccordions(idx, true);
            } else {
                const anyOpen = Array.from(slide.querySelectorAll('details[data-series-index]'))
                    .some(function (d) { return d.open; });
                if (!anyOpen) {
                    if (lockedIndex !== -1 && type === 'pie') restoreLabel(lockedIndex);
                    if (lockedIndex !== -1 && type === 'venn') {
                        els.forEach(function (el, i) {
                            if (el.gi === lockedIndex) restoreIcons(groupEls[i], el);
                        });
                    }
                    lockedIndex = -1;
                    selectedIndex = -1;
                    highlight(-1);
                }
            }
        }, { signal });
    });

    dialog.addEventListener('toggle', (event) => {
        if (event.newState === 'closed') {
            if (graphController) {
                graphController.abort();
            }
        }
    })
}

const dialogs = document.querySelectorAll('.analysis-dialog');

dialogs.forEach(dialog => {
    dialog.addEventListener('toggle', (e) => {
        if (e.newState === 'open') {
            dialog.querySelectorAll('details').forEach(details => {
                details.open = false;
            });

            if (dialog.id === 'analysis-one') {
                selectedIndex1a = -1;
                selectedIndex1b = -1;
                selectedIndex1c = -1;
                selectedIndex1d = -1;
                selectedIndex1e = -1;
                selectedIndex1f = -1;
                selectedIndex1g = -1;

                renderChart(type1a, series1a, labels1a, chart1a, placeholder1a, colors1a, selectedIndex1a, dialog);
                renderChart(type1b, series1b, labels1b, chart1b, placeholder1b, colors1b, selectedIndex1b, dialog);
                renderChart(type1c, series1c, labels1c, chart1c, placeholder1c, colors1c, selectedIndex1c, dialog);
                renderChart(type1d, series1d, labels1d, chart1d, placeholder1d, colors1d, selectedIndex1d, dialog);
                renderChart(type1e, series1e, labels1e, chart1e, placeholder1e, colors1e, selectedIndex1e, dialog);
                renderChart(type1f, series1f, labels1f, chart1f, placeholder1f, colors1f, selectedIndex1f, dialog);
                renderChart(type1g, series1g, labels1g, chart1g, placeholder1g, colors1g, selectedIndex1g, dialog);
            }

            if (dialog.id === 'analysis-two') {
                selectedIndex2a = -1;
                selectedIndex2b = -1;
                selectedIndex2c = -1;
                selectedIndex2d = -1;

                renderChart(type2a, series2a, labels2a, chart2a, placeholder2a, colors2a, selectedIndex2a, dialog);
                renderChart(type2a, series2b, labels2b, chart2b, placeholder2b, colors2b, selectedIndex2b, dialog);
                renderChart(type2c, series2c, labels2c, chart2c, placeholder2c, colors2c, selectedIndex2c, dialog);
                renderChart(type2d, series2d, labels2d, chart2d, placeholder2d, colors2d, selectedIndex2d, dialog);
            }

            if (dialog.id === 'analysis-three') {
                selectedIndex3a = -1;
                renderChart(type3a, series3a, labels3a, chart3a, placeholder3a, colors3a, selectedIndex3a, dialog);
            }

            if (dialog.id === 'analysis-four') {
                selectedIndex4a = -1;
                selectedIndex4b = -1;

                renderChart(type4a, series4a, labels4a, chart4a, placeholder4a, colors4a, selectedIndex4a, dialog);
                renderChart(type4b, series4b, labels4b, chart4b, placeholder4b, colors4b, selectedIndex4b, dialog);
            }
        }
    })
})

