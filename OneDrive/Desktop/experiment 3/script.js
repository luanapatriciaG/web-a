document.addEventListener('DOMContentLoaded', () => {
    const datasets = {
        sales_orders: {
            title: 'Monthly Performance Dataset',
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            primaryLabel: 'Sales Volume ($K)',
            secondaryLabel: 'Total Orders',
            primaryData: [120, 150, 180, 170, 210, 240],
            secondaryData: [50, 60, 75, 68, 85, 95],
            categories: ['Electronics', 'SaaS Subscriptions', 'Hardware Systems', 'Cloud Compute', 'AI APIs', 'Consulting'],
            categoryData: [340, 290, 185, 240, 310, 195],
            kpi1: '1,070 $K',
            kpi1Sub: '14.8% vs last cycle',
            kpi2: '433 units',
            kpi2Sub: 'Average 72.2 / period',
            kpi3: 'Jun (240 $K)',
            kpi3Sub: 'Peak monthly sales',
            kpi4: '94.2%',
            kpi4Sub: 'High operational efficiency',
            field1Label: 'Sales ($K)',
            field2Label: 'Orders'
        },
        ai_metrics: {
            title: 'AI Model Training Dynamics Dataset',
            labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5', 'Epoch 6'],
            primaryLabel: 'Training Accuracy (%)',
            secondaryLabel: 'Validation Loss (x100)',
            primaryData: [72, 81, 88, 92, 95, 97],
            secondaryData: [85, 58, 38, 24, 15, 9],
            categories: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'AUC-ROC', 'Top-5 Match'],
            categoryData: [97, 94, 92, 93, 98, 99],
            kpi1: '97.2%',
            kpi1Sub: 'Final Model Accuracy',
            kpi2: '0.09 Loss',
            kpi2Sub: 'Cross-Entropy Error',
            kpi3: 'Epoch 6',
            kpi3Sub: 'Optimal Convergence',
            kpi4: '98.5%',
            kpi4Sub: 'State-of-the-art AUC',
            field1Label: 'Accuracy (%)',
            field2Label: 'Loss (x100)'
        }
    };

    let currentKey = 'sales_orders';
    let activeData = JSON.parse(JSON.stringify(datasets[currentKey]));
    let lineChart, barChart;

    const ctxLine = document.getElementById('lineChartCanvas').getContext('2d');
    const ctxBar = document.getElementById('barChartCanvas').getContext('2d');

    const datasetSelect = document.getElementById('datasetSelect');
    const btnResetData = document.getElementById('btnResetData');
    const btnToggleAnim = document.getElementById('btnToggleAnim');
    const btnAddPoint = document.getElementById('btnAddPoint');
    const inputLabel = document.getElementById('inputLabel');
    const inputValue1 = document.getElementById('inputValue1');
    const inputValue2 = document.getElementById('inputValue2');
    const lblInputValue1 = document.getElementById('lblInputValue1');
    const lblInputValue2 = document.getElementById('lblInputValue2');
    const toast = document.getElementById('toast');

    const kpiVal1 = document.getElementById('kpiVal1');
    const kpiVal2 = document.getElementById('kpiVal2');
    const kpiVal3 = document.getElementById('kpiVal3');
    const kpiVal4 = document.getElementById('kpiVal4');
    const kpiSub1 = document.getElementById('kpiSub1');
    const kpiSub2 = document.getElementById('kpiSub2');
    const kpiSub3 = document.getElementById('kpiSub3');
    const kpiSub4 = document.getElementById('kpiSub4');

    function initCharts() {
        lineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: activeData.labels,
                datasets: [
                    {
                        label: activeData.primaryLabel,
                        data: activeData.primaryData,
                        borderColor: '#ff572e',
                        backgroundColor: 'rgba(255, 87, 46, 0.12)',
                        borderWidth: 2.5,
                        fill: true,
                        tension: 0.35,
                        pointBackgroundColor: '#ff572e',
                        pointRadius: 4,
                        pointHoverRadius: 7
                    },
                    {
                        label: activeData.secondaryLabel,
                        data: activeData.secondaryData,
                        borderColor: '#38bdf8',
                        backgroundColor: 'rgba(56, 189, 248, 0.08)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.3,
                        pointBackgroundColor: '#38bdf8',
                        pointRadius: 4,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: { family: "'Space Grotesk', sans-serif", size: 12 },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        padding: 12,
                        titleFont: { family: "'Space Grotesk', sans-serif", size: 13 },
                        bodyFont: { family: "'DM Mono', monospace", size: 12 }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(21, 21, 21, 0.06)' },
                        ticks: { font: { family: "'DM Mono', monospace", size: 11 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(21, 21, 21, 0.06)' },
                        ticks: { font: { family: "'DM Mono', monospace", size: 11 } }
                    }
                }
            }
        });

        barChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: activeData.categories,
                datasets: [{
                    label: 'Performance Score',
                    data: activeData.categoryData,
                    backgroundColor: ['#ff572e', '#d8ff54', '#38bdf8', '#c084fc', '#facc15', '#4ade80'],
                    borderColor: '#151515',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        padding: 12,
                        titleFont: { family: "'Space Grotesk', sans-serif", size: 13 },
                        bodyFont: { family: "'DM Mono', monospace", size: 12 }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: "'DM Mono', monospace", size: 10 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(21, 21, 21, 0.06)' },
                        ticks: { font: { family: "'DM Mono', monospace", size: 11 } }
                    }
                }
            }
        });

        updateKPIs();
    }

    function updateKPIs() {
        kpiVal1.textContent = activeData.kpi1;
        kpiSub1.textContent = activeData.kpi1Sub;
        kpiVal2.textContent = activeData.kpi2;
        kpiSub2.textContent = activeData.kpi2Sub;
        kpiVal3.textContent = activeData.kpi3;
        kpiSub3.textContent = activeData.kpi3Sub;
        kpiVal4.textContent = activeData.kpi4;
        kpiSub4.textContent = activeData.kpi4Sub;

        lblInputValue1.textContent = `Primary: ${activeData.field1Label}`;
        lblInputValue2.textContent = `Secondary: ${activeData.field2Label}`;
    }

    function switchDataset(key) {
        currentKey = key;
        activeData = JSON.parse(JSON.stringify(datasets[key]));

        lineChart.data.labels = activeData.labels;
        lineChart.data.datasets[0].label = activeData.primaryLabel;
        lineChart.data.datasets[0].data = activeData.primaryData;
        lineChart.data.datasets[1].label = activeData.secondaryLabel;
        lineChart.data.datasets[1].data = activeData.secondaryData;
        lineChart.update();

        barChart.data.labels = activeData.categories;
        barChart.data.datasets[0].data = activeData.categoryData;
        barChart.update();

        updateKPIs();
        showToast(`Switched to: ${activeData.title}`);
    }

    datasetSelect.addEventListener('change', (e) => {
        switchDataset(e.target.value);
    });

    btnResetData.addEventListener('click', () => {
        switchDataset(currentKey);
        showToast('Reset dataset to initial state.');
    });

    let animEnabled = true;
    btnToggleAnim.addEventListener('click', () => {
        animEnabled = !animEnabled;
        const duration = animEnabled ? 800 : 0;
        lineChart.options.animation.duration = duration;
        barChart.options.animation.duration = duration;
        lineChart.update();
        barChart.update();
        showToast(`Chart animations ${animEnabled ? 'Enabled' : 'Disabled'}`);
    });

    btnAddPoint.addEventListener('click', () => {
        const label = inputLabel.value.trim();
        const val1 = parseFloat(inputValue1.value);
        const val2 = parseFloat(inputValue2.value);

        if (!label || isNaN(val1) || isNaN(val2)) {
            showToast('Please fill in all fields with valid numbers.');
            return;
        }

        activeData.labels.push(label);
        activeData.primaryData.push(val1);
        activeData.secondaryData.push(val2);

        lineChart.data.labels = activeData.labels;
        lineChart.data.datasets[0].data = activeData.primaryData;
        lineChart.data.datasets[1].data = activeData.secondaryData;
        lineChart.update();

        activeData.categories.push(label);
        activeData.categoryData.push(val1);
        barChart.data.labels = activeData.categories;
        barChart.data.datasets[0].data = activeData.categoryData;
        barChart.update();

        const sum1 = activeData.primaryData.reduce((a, b) => a + b, 0);
        const sum2 = activeData.secondaryData.reduce((a, b) => a + b, 0);
        activeData.kpi1 = `${sum1.toLocaleString()} ${currentKey === 'sales_orders' ? '$K' : '%'}`;
        activeData.kpi2 = `${sum2.toLocaleString()}`;
        activeData.kpi3 = `${label} (${val1})`;

        updateKPIs();

        inputLabel.value = '';
        inputValue1.value = '';
        inputValue2.value = '';

        showToast(`Added point '${label}' to dashboard!`);
    });

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2400);
    }

    initCharts();
});