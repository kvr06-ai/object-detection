// Visualizations and interactive demos for Object Detection Evolution article

document.addEventListener('DOMContentLoaded', () => {
    // Initialize visualizations once the content is loaded
    initHOGDemo();
    initPerformanceComparison();
    initYOLOConfidenceDemo();
    initNetworkArchitectureViz();
    initAlgorithmComparisonChart();
    generateHaarFeatureVisual();
    generateDPMVisualization();
    generateRCNNArchitectureVisual();
    generateMaskRCNNArchitectureVisual();
    generateSSDArchitectureVisual();
    generateFPNArchitectureVisual();
    generateCornerNetArchitectureVisual();
    generateCenterNetArchitectureVisual();
    generateDETRArchitectureVisual();
    
});

// Function to generate quiz detection images
function generateQuizDetectionImages() {
    // Generate Faster R-CNN detection image
    generateFasterRCNNDetectionImage();
    
    // Generate YOLO detection image
    generateYOLODetectionImage();
    
    // Generate DETR detection image
    generateDETRDetectionImage();
}

// Generate Faster R-CNN detection image
function generateFasterRCNNDetectionImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw background (street scene)
    ctx.fillStyle = '#87CEEB'; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground/road
    ctx.fillStyle = '#555555'; // Dark gray for road
    ctx.fillRect(0, 250, canvas.width, 150);
    
    // Draw buildings/background objects
    ctx.fillStyle = '#8B4513'; // Building color
    ctx.fillRect(50, 100, 120, 150);
    ctx.fillRect(200, 80, 150, 170);
    ctx.fillRect(400, 120, 100, 130);
    
    // Draw cars
    drawRectWithLabel(ctx, 80, 280, 100, 50, 'Car: 98%', '#FF0000');
    drawRectWithLabel(ctx, 250, 270, 120, 60, 'Car: 99%', '#FF0000');
    drawRectWithLabel(ctx, 430, 260, 90, 55, 'Car: 96%', '#FF0000');
    
    // Draw people
    drawRectWithLabel(ctx, 180, 220, 25, 50, 'Person: 95%', '#00FF00');
    drawRectWithLabel(ctx, 350, 200, 30, 70, 'Person: 97%', '#00FF00');
    
    // Add Faster R-CNN style info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 230, 30);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Faster R-CNN Detection', 10, 20);
    
    // Save as image
    saveCanvasAsImage(canvas, 'img/quiz/faster-rcnn-detection.jpg');
}

// Generate YOLO detection image
function generateYOLODetectionImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw background (urban scene)
    ctx.fillStyle = '#87CEEB'; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground/road
    ctx.fillStyle = '#555555'; // Dark gray for road
    ctx.fillRect(0, 280, canvas.width, 120);
    
    // Draw buildings/background objects
    ctx.fillStyle = '#8B4513'; // Building color
    ctx.fillRect(20, 100, 140, 180);
    ctx.fillRect(220, 80, 130, 200);
    ctx.fillRect(420, 120, 160, 160);
    
    // CHARACTERISTIC FEATURE 1: YOLO grid overlay
    // Draw more prominent grid lines to emphasize YOLO's grid-based approach
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw grid cells (YOLO divides image into grid cells)
    const gridSize = 100;
    
    // Draw vertical grid lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // CHARACTERISTIC FEATURE 2: Simple format labels with lower confidence values
    // Draw cars (YOLO style - simpler labels, no ":" format)
    drawRectWithLabel(ctx, 75, 290, 110, 60, 'car 0.92', '#FF0000');
    drawRectWithLabel(ctx, 240, 280, 130, 65, 'car 0.88', '#FF0000');
    drawRectWithLabel(ctx, 420, 270, 100, 70, 'car 0.79', '#FF0000');
    
    // Draw people (YOLO style)
    drawRectWithLabel(ctx, 170, 230, 30, 60, 'person 0.85', '#00FF00');
    drawRectWithLabel(ctx, 360, 210, 35, 80, 'person 0.82', '#00FF00');
    
    // Draw a traffic sign
    drawRectWithLabel(ctx, 290, 150, 40, 40, 'sign 0.76', '#0000FF');
    
    // Add YOLO style info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 180, 30);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('YOLO Detection', 10, 20);
    
    // Save as image
    saveCanvasAsImage(canvas, 'img/quiz/yolo-detection.jpg');
}

// Generate DETR detection image
function generateDETRDetectionImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw background (urban scene)
    ctx.fillStyle = '#87CEEB'; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground/road
    ctx.fillStyle = '#555555'; // Dark gray for road
    ctx.fillRect(0, 260, canvas.width, 140);
    
    // Draw buildings/background objects
    ctx.fillStyle = '#8B4513'; // Building color
    ctx.fillRect(30, 90, 120, 170);
    ctx.fillRect(210, 70, 140, 190);
    ctx.fillRect(410, 110, 150, 150);
    
    // CHARACTERISTIC FEATURE 1: Transformer Attention Visualization
    // Object attention points (yellow dots at the center of detected objects)
    const attentionPoints = [
        {x: 130, y: 300}, {x: 260, y: 290}, {x: 420, y: 280}, // Cars
        {x: 180, y: 220}, {x: 350, y: 200},                  // People
        {x: 500, y: 180}                                     // Traffic light
    ];
    
    // Central query point (representing transformer query)
    const queryX = 300;
    const queryY = 200;
    
    // Draw central query point (larger, different color)
    ctx.fillStyle = 'rgba(255, 165, 0, 0.7)'; // Orange for query
    ctx.beginPath();
    ctx.arc(queryX, queryY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw connections from query to attention points
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.4)';
    ctx.lineWidth = 2;
    
    attentionPoints.forEach(point => {
        // Draw connecting line (attention)
        ctx.beginPath();
        ctx.moveTo(queryX, queryY);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        
        // Draw attention point (yellow dot)
        ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // CHARACTERISTIC FEATURE 2: Rounded bounding boxes with parentheses notation
    // Draw cars with rounded bounding boxes
    drawRectWithLabel(ctx, 80, 285, 100, 50, 'car (0.97)', '#FF0000', true);
    drawRectWithLabel(ctx, 250, 275, 120, 60, 'car (0.98)', '#FF0000', true);
    drawRectWithLabel(ctx, 430, 265, 90, 55, 'car (0.94)', '#FF0000', true);
    
    // Draw people with rounded bounding boxes
    drawRectWithLabel(ctx, 180, 220, 25, 50, 'person (0.96)', '#00FF00', true);
    drawRectWithLabel(ctx, 350, 200, 30, 70, 'person (0.95)', '#00FF00', true);
    
    // Draw traffic light with rounded box
    drawRectWithLabel(ctx, 500, 180, 15, 30, 'traffic light (0.89)', '#0000FF', true);
    
    // Add DETR style info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 180, 30);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('DETR Detection', 10, 20);
    
    return canvas;
}

// Helper function to draw rectangle with label
function drawRectWithLabel(ctx, x, y, width, height, label, color, isRounded = false) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    
    if (isRounded) {
        // DETR style rounded rectangles
        const radius = 8;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.stroke();
    } else {
        // Standard rectangle
        ctx.strokeRect(x, y, width, height);
    }
    
    // Draw label background
    const labelWidth = ctx.measureText(label).width + 10;
    ctx.fillStyle = color;
    ctx.fillRect(x, y - 20, labelWidth, 20);
    
    // Draw label text
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText(label, x + 5, y - 5);
}

// Demo for Histogram of Oriented Gradients
function initHOGDemo() {
    const hogDemo = document.getElementById('hog-demo');
    if (!hogDemo) return;
    
    // HOG parameters
    let cellSize = 8;
    let blockSize = 2;
    let bins = 9;
    
    // Get references to sliders and display
    const cellSizeSlider = document.getElementById('cell-size-slider');
    const blockSizeSlider = document.getElementById('block-size-slider');
    const binsSlider = document.getElementById('bins-slider');
    const hogVisualization = document.getElementById('hog-visualization');
    
    // Update HOG visualization based on parameters
    function updateHOGVisualization() {
        // In a real implementation, this would compute HOG features
        // For demo purposes, we'll use a placeholder visualization
        
        hogVisualization.innerHTML = `
            <div class="hog-placeholder">
                <div class="hog-grid" style="grid-template-columns: repeat(${Math.floor(128/cellSize)}, 1fr);">
                    ${Array(Math.floor(128/cellSize) * Math.floor(128/cellSize)).fill().map((_, i) => {
                        const angle = (i % bins) * (Math.PI / bins);
                        return `<div class="hog-cell">
                            <div class="hog-gradient" style="transform: rotate(${angle}rad); height: ${5 + Math.random() * 15}px;"></div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    // Set up event listeners for sliders
    if (cellSizeSlider) {
        cellSizeSlider.addEventListener('input', function() {
            cellSize = parseInt(this.value);
            document.getElementById('cell-size-value').textContent = cellSize;
            updateHOGVisualization();
        });
    }
    
    if (blockSizeSlider) {
        blockSizeSlider.addEventListener('input', function() {
            blockSize = parseInt(this.value);
            document.getElementById('block-size-value').textContent = blockSize;
            updateHOGVisualization();
        });
    }
    
    if (binsSlider) {
        binsSlider.addEventListener('input', function() {
            bins = parseInt(this.value);
            document.getElementById('bins-value').textContent = bins;
            updateHOGVisualization();
        });
    }
    
    // Initialize visualization
    updateHOGVisualization();
}

// Performance comparison chart for different algorithms
function initPerformanceComparison() {
    const performanceChart = document.getElementById('performance-chart');
    if (!performanceChart || !window.Chart) return;
    
    // Performance data for different algorithms
    const data = {
        labels: ['Viola-Jones', 'HOG+SVM', 'DPM', 'R-CNN', 'Fast R-CNN', 'Faster R-CNN', 'SSD', 'YOLOv1', 'YOLOv2', 'YOLOv3', 'DETR'],
        datasets: [
            {
                label: 'Accuracy (mAP%)',
                data: [15, 25, 35, 53, 66, 73, 74, 63, 75, 80, 83],
                backgroundColor: 'rgba(52, 152, 219, 0.5)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-1',
            },
            {
                label: 'Speed (FPS)',
                data: [7, 0.5, 0.1, 0.07, 0.5, 5, 46, 45, 67, 30, 25],
                backgroundColor: 'rgba(231, 76, 60, 0.5)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-2',
            }
        ]
    };
    
    // Create chart
    const ctx = performanceChart.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Performance Comparison of Object Detection Algorithms'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        scaleLabel: {
                            display: true,
                            labelString: 'Accuracy (mAP%)'
                        }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnChartArea: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Speed (FPS)'
                        }
                    }
                ]
            }
        }
    });
}

// YOLO confidence threshold interactive demo
function initYOLOConfidenceDemo() {
    const yoloDemo = document.getElementById('yolo-confidence-demo');
    if (!yoloDemo) return;
    
    // Get reference to confidence slider and output
    const confidenceSlider = document.getElementById('confidence-threshold');
    const confidenceValue = document.getElementById('confidence-value');
    const detectionOutput = document.getElementById('detection-output');
    
    // Sample detection data with 5 unique classes (no duplicates) spread across the image
    const detections = [
        // Higher confidence detections (>50%)
        { class: 'building', confidence: 0.92, box: [10, 50, 90, 175], color: '#e74c3c' },
        { class: 'road', confidence: 0.87, box: [0, 175, 500, 275], color: '#3498db' },
        { class: 'tree', confidence: 0.78, box: [330, 85, 365, 175], color: '#2ecc71' },
        { class: 'window', confidence: 0.64, box: [220, 95, 240, 115], color: '#f39c12' },
        
        // Lower confidence detection (<50%)
        { class: 'sky', confidence: 0.45, box: [0, 0, 500, 60], color: '#9b59b6' }
    ];
    
    // Background image URL for the detection demo
    const backgroundImageUrl = 'img/street_scene.jpg';
    
    // Update detections based on confidence threshold
    function updateDetections(threshold) {
        if (!detectionOutput) return;
        
        // Filter detections by confidence threshold
        const visibleDetections = detections.filter(d => d.confidence >= threshold);
        
        // Update visualization
        detectionOutput.innerHTML = `
            <div class="detection-image-container">
                <div class="detection-image" style="background-image: url('${backgroundImageUrl}'); background-size: cover; background-position: center;">
                    ${visibleDetections.map(d => {
                        const [x, y, width, height] = d.box;
                        return `<div class="detection-box" style="left: ${x}px; top: ${y}px; width: ${width - x}px; height: ${height - y}px; border-color: ${d.color}; background-color: ${d.color}33;">
                            <div class="detection-label" style="background-color: ${d.color};">${d.class} (${Math.round(d.confidence * 100)}%)</div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
            <div class="detection-stats">
                <p>Displaying ${visibleDetections.length} of ${detections.length} detected objects.</p>
                <table class="detection-table">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${visibleDetections.map(d => `
                            <tr>
                                <td><span style="display: inline-block; width: 12px; height: 12px; background-color: ${d.color}; border-radius: 2px; margin-right: 5px;"></span>${d.class}</td>
                                <td>${Math.round(d.confidence * 100)}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Set up event listener for confidence slider
    if (confidenceSlider) {
        confidenceSlider.addEventListener('input', function() {
            const threshold = parseFloat(this.value);
            if (confidenceValue) {
                confidenceValue.textContent = Math.round(threshold * 100) + '%';
            }
            updateDetections(threshold);
        });
        
        // Initialize with default value
        updateDetections(parseFloat(confidenceSlider.value));
    }
}

// Network architecture visualization
function initNetworkArchitectureViz() {
    const architectureViz = document.getElementById('network-architecture-viz');
    if (!architectureViz || !window.d3) return;
    
    // This would be a more complex D3.js visualization in a real implementation
    // For simplicity, we'll use a placeholder approach
    
    const architectures = {
        'rcnn': `
            <div class="architecture-diagram">
                <div class="arch-layer" data-layer="input">Input Image</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="selective-search">Selective Search Region Proposals</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="cnn">CNN Feature Extraction (per region)</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="svm">SVM Classifiers</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="bbox">Bounding Box Regression</div>
            </div>
        `,
        'fast-rcnn': `
            <div class="architecture-diagram">
                <div class="arch-layer" data-layer="input">Input Image</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="cnn">CNN Feature Map (whole image)</div>
                <div class="arch-split">
                    <div class="arch-branch">
                        <div class="arch-arrow">↓</div>
                        <div class="arch-layer" data-layer="selective-search">Selective Search Region Proposals</div>
                    </div>
                </div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="roi-pooling">RoI Pooling</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="fc">Fully Connected Layers</div>
                <div class="arch-split">
                    <div class="arch-branch">
                        <div class="arch-arrow">↓</div>
                        <div class="arch-layer" data-layer="cls">Classification</div>
                    </div>
                    <div class="arch-branch">
                        <div class="arch-arrow">↓</div>
                        <div class="arch-layer" data-layer="bbox">Bounding Box Regression</div>
                    </div>
                </div>
            </div>
        `,
        'faster-rcnn': `
            <div class="architecture-diagram">
                <div class="arch-layer" data-layer="input">Input Image</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="cnn">CNN Feature Map</div>
                <div class="arch-split">
                    <div class="arch-branch">
                        <div class="arch-arrow">↓</div>
                        <div class="arch-layer" data-layer="rpn">Region Proposal Network</div>
                        <div class="arch-arrow">↓</div>
                        <div class="arch-layer" data-layer="proposals">Region Proposals</div>
                    </div>
                </div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="roi-pooling">RoI Pooling</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="fc">Fully Connected Layers</div>
                <div class="arch-split">
                    <div class="arch-branch">
                        <div class="arch-arrow">↓</div>
                        <div class="arch-layer" data-layer="cls">Classification</div>
                    </div>
                    <div class="arch-branch">
                        <div class="arch-arrow">↓</div>
                        <div class="arch-layer" data-layer="bbox">Bounding Box Regression</div>
                    </div>
                </div>
            </div>
        `,
        'yolo': `
            <div class="architecture-diagram">
                <div class="arch-layer" data-layer="input">Input Image</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="cnn">Convolutional Neural Network</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="grid">S×S Grid Prediction</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="output">Bounding Boxes + Class Probabilities</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="nms">Non-Maximum Suppression</div>
            </div>
        `,
        'detr': `
            <div class="architecture-diagram">
                <div class="arch-layer" data-layer="input">Input Image</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="cnn">CNN Backbone</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="transformer-encoder">Transformer Encoder</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="transformer-decoder">Transformer Decoder</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="output">Fixed set of N predictions</div>
                <div class="arch-arrow">↓</div>
                <div class="arch-layer" data-layer="bipartite">Bipartite Matching Loss</div>
            </div>
        `
    };
    
    // Set up architecture selector
    const architectureSelector = document.getElementById('architecture-selector');
    if (architectureSelector) {
        architectureSelector.addEventListener('change', function() {
            const selected = this.value;
            if (architectures[selected]) {
                architectureViz.innerHTML = architectures[selected];
            }
        });
        
        // Initialize with default value
        if (architectureSelector.value && architectures[architectureSelector.value]) {
            architectureViz.innerHTML = architectures[architectureSelector.value];
        }
    }
}

// Algorithm comparison radar chart
function initAlgorithmComparisonChart() {
    const comparisonChart = document.getElementById('algorithm-comparison-chart');
    if (!comparisonChart || !window.Chart) return;
    
    // Data for algorithm comparison on various dimensions
    const data = {
        labels: ['Speed', 'Accuracy', 'Small Object Detection', 'Ease of Training', 'Inference Cost', 'Real-time Capability'],
        datasets: [
            {
                label: 'Faster R-CNN',
                data: [50, 80, 85, 60, 40, 45],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            },
            {
                label: 'YOLO v3',
                data: [85, 75, 55, 75, 80, 90],
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: 'rgba(46, 204, 113, 1)',
                pointBackgroundColor: 'rgba(46, 204, 113, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(46, 204, 113, 1)'
            },
            {
                label: 'DETR',
                data: [60, 85, 80, 65, 50, 55],
                backgroundColor: 'rgba(155, 89, 182, 0.2)',
                borderColor: 'rgba(155, 89, 182, 1)',
                pointBackgroundColor: 'rgba(155, 89, 182, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(155, 89, 182, 1)'
            }
        ]
    };
    
    // Create radar chart
    const ctx = comparisonChart.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.value + '%';
                    }
                }
            }
        }
    });
    
    // Add algorithm selector
    const algorithmSelector = document.getElementById('algorithm-selector');
    if (algorithmSelector) {
        const algorithms = {
            'faster-rcnn': 0,
            'yolo-v3': 1,
            'detr': 2
        };
        
        algorithmSelector.addEventListener('change', function() {
            const selected = this.value;
            
            // Show/hide datasets based on selection
            chart.data.datasets.forEach((dataset, index) => {
                const meta = chart.getDatasetMeta(index);
                meta.hidden = !(selected === 'all' || algorithms[selected] === index);
            });
            
            chart.update();
        });
    }
}

// Interactive detector challenge
function initDetectorChallenge() {
    const challenge = document.getElementById('detector-challenge');
    if (!challenge) return;
    
    // Create canvases for the visualizations
    const fasterRCNNCanvas = createFasterRCNNDetectionImage();
    const yoloCanvas = createYOLODetectionImage();
    const detrCanvas = createDETRDetectionImage();
    
    // Sample detector outputs with correct detector type labels
    const detectorOutputs = [
        {
            id: 1,
            canvas: fasterRCNNCanvas,
            detector: 'Faster R-CNN',
            difficulty: 'medium',
            description: 'Precise bounding boxes with high confidence percentages and class labels.'
        },
        {
            id: 2,
            canvas: yoloCanvas,
            detector: 'YOLO',
            difficulty: 'easy',
            description: 'Grid-based detection with simplified confidence values and class names.'
        },
        {
            id: 3,
            canvas: detrCanvas,
            detector: 'DETR',
            difficulty: 'hard',
            description: 'Transformer approach with attention visualization and rounded bounding boxes.'
        }
    ];
    
    // Generate challenge cards
    let challengeHTML = '';
    
    detectorOutputs.forEach(output => {
        // Convert canvas to data URL
        const imageDataUrl = output.canvas.toDataURL('image/png');
        
        challengeHTML += `
            <div class="challenge-card" data-id="${output.id}">
                <div class="challenge-image">
                    <img src="${imageDataUrl}" alt="Detection output ${output.id}">
                </div>
                <div class="challenge-options">
                    <p>Which detector produced this output?</p>
                    <div class="challenge-buttons">
                        <button class="btn detector-option" data-detector="Faster R-CNN">Faster R-CNN</button>
                        <button class="btn detector-option" data-detector="YOLO">YOLO</button>
                        <button class="btn detector-option" data-detector="DETR">DETR</button>
                    </div>
                    <div class="challenge-result"></div>
                </div>
            </div>
        `;
    });
    
    challenge.innerHTML = challengeHTML;
    
    // Add styles for the challenge
    const style = document.createElement('style');
    style.textContent = `
        .challenge-card {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 500px;
            margin: 0 auto 20px auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            background-color: white;
        }
        .challenge-image {
            width: 100%;
            max-height: 300px;
            overflow: hidden;
        }
        .challenge-image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .challenge-options {
            padding: 1rem;
        }
        .challenge-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0;
        }
        .detector-option {
            padding: 0.5rem 1rem;
            background-color: #f0f0f0;
            color: #333;
        }
        .detector-option:hover {
            background-color: #e0e0e0;
        }
        .detector-option.correct {
            background-color: #27ae60;
            color: white;
        }
        .detector-option.incorrect {
            background-color: #e74c3c;
            color: white;
        }
        .challenge-result {
            min-height: 40px;
            padding: 0.5rem;
            border-radius: 4px;
            font-weight: bold;
        }
        .challenge-result.correct {
            background-color: rgba(39, 174, 96, 0.1);
            color: #27ae60;
        }
        .challenge-result.incorrect {
            background-color: rgba(231, 76, 60, 0.1);
            color: #e74c3c;
        }
    `;
    document.head.appendChild(style);
    
    // Set up event handlers
    document.querySelectorAll('.detector-option').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.challenge-card');
            const cardId = card.getAttribute('data-id');
            const selectedDetector = this.getAttribute('data-detector');
            const correctDetector = detectorOutputs.find(output => output.id == cardId).detector;
            const resultElement = card.querySelector('.challenge-result');
            
            // Reset all buttons in this card
            card.querySelectorAll('.detector-option').forEach(btn => {
                btn.classList.remove('correct', 'incorrect');
            });
            
            // Check if answer is correct
            if (selectedDetector === correctDetector) {
                this.classList.add('correct');
                resultElement.textContent = 'Correct! This is indeed a ' + correctDetector + ' detection.';
                resultElement.className = 'challenge-result correct';
            } else {
                this.classList.add('incorrect');
                resultElement.textContent = 'Incorrect. This is actually a ' + correctDetector + ' detection.';
                resultElement.className = 'challenge-result incorrect';
            }
        });
    });
}

// Generate Haar feature visualization for Viola-Jones section
function generateHaarFeatureVisual() {
    const visualContainer = document.querySelector('.haar-features-container');
    if (!visualContainer) return;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 300;
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    visualContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Draw a face outline to provide context
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw a light gray face outline in the background
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.ellipse(300, 150, 120, 160, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Function to draw a Haar feature
    function drawHaarFeature(x, y, width, height, featureType, label) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        
        // Based on the feature type, draw the appropriate pattern
        if (featureType === 'edge') {
            // Edge feature (two rectangles side by side)
            const halfWidth = width / 2;
            
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, halfWidth, height);
            
            ctx.fillStyle = 'rgba(52, 152, 219, 0.7)'; // Blue
            ctx.fillRect(x + halfWidth, y, halfWidth, height);
            
        } else if (featureType === 'line') {
            // Line feature (three rectangles)
            const thirdWidth = width / 3;
            
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, thirdWidth, height);
            
            ctx.fillStyle = 'rgba(52, 152, 219, 0.7)'; // Blue
            ctx.fillRect(x + thirdWidth, y, thirdWidth, height);
            
            ctx.fillStyle = 'white';
            ctx.fillRect(x + 2 * thirdWidth, y, thirdWidth, height);
            
        } else if (featureType === 'center-surround') {
            // Center-surround feature (four rectangles in a 2x2 grid)
            const halfWidth = width / 2;
            const halfHeight = height / 2;
            
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, halfWidth, halfHeight);
            
            ctx.fillStyle = 'rgba(52, 152, 219, 0.7)'; // Blue
            ctx.fillRect(x + halfWidth, y, halfWidth, halfHeight);
            
            ctx.fillStyle = 'rgba(52, 152, 219, 0.7)'; // Blue
            ctx.fillRect(x, y + halfHeight, halfWidth, halfHeight);
            
            ctx.fillStyle = 'white';
            ctx.fillRect(x + halfWidth, y + halfHeight, halfWidth, halfHeight);
        }
        
        // Add label if provided
        if (label) {
            ctx.font = '14px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.fillText(label, x + width/2, y + height + 20);
        }
    }
    
    // Draw example Haar features
    // Eyes
    drawHaarFeature(220, 80, 80, 30, 'edge', 'Eye Feature');
    drawHaarFeature(300, 80, 80, 30, 'edge', '');
    
    // Nose
    drawHaarFeature(275, 130, 50, 70, 'line', 'Nose Feature');
    
    // Mouth
    drawHaarFeature(240, 200, 120, 30, 'edge', 'Mouth Feature');
    
    // Center-surround features for cheeks
    drawHaarFeature(180, 150, 60, 60, 'center-surround', 'Center-Surround');
    drawHaarFeature(360, 150, 60, 60, 'center-surround', '');
    
    // Add title and description
    const title = document.createElement('h4');
    title.textContent = 'Haar-like Features';
    title.style.textAlign = 'center';
    title.style.marginTop = '1rem';
    
    const description = document.createElement('p');
    description.textContent = 'Different types of Haar features detect edges, lines, and center-surround patterns. The Viola-Jones detector uses thousands of these features to identify faces.';
    description.style.fontSize = '0.9rem';
    description.style.textAlign = 'center';
    description.style.margin = '0.5rem 0';
    
    // Add elements to DOM
    visualContainer.appendChild(title);
    visualContainer.appendChild(description);
}

// Generate DPM visualization
function generateDPMVisualization() {
    const container = document.getElementById('dpm-visualization');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 350;
    canvas.style.maxWidth = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the root filter (entire person)
    const rootX = 100;
    const rootY = 50;
    const rootWidth = 150;
    const rootHeight = 250;
    
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 3;
    ctx.strokeRect(rootX, rootY, rootWidth, rootHeight);
    ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
    ctx.fillRect(rootX, rootY, rootWidth, rootHeight);
    
    // Add root filter label
    ctx.font = '16px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('Root Filter', rootX + rootWidth/2, rootY + rootHeight + 25);
    
    // Draw part filters (head, torso, limbs)
    const parts = [
        { x: rootX + 50, y: rootY + 20, width: 50, height: 50, name: 'Head' },
        { x: rootX + 40, y: rootY + 80, width: 70, height: 70, name: 'Torso' },
        { x: rootX + 20, y: rootY + 130, width: 40, height: 80, name: 'Left Leg' },
        { x: rootX + 90, y: rootY + 130, width: 40, height: 80, name: 'Right Leg' },
        { x: rootX + 10, y: rootY + 80, width: 30, height: 70, name: 'Left Arm' },
        { x: rootX + 110, y: rootY + 80, width: 30, height: 70, name: 'Right Arm' }
    ];
    
    // Draw parts
    parts.forEach(part => {
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.strokeRect(part.x, part.y, part.width, part.height);
        ctx.fillStyle = 'rgba(231, 76, 60, 0.2)';
        ctx.fillRect(part.x, part.y, part.width, part.height);
    });
    
    // Draw spring connections (deformation costs)
    ctx.strokeStyle = 'rgba(44, 62, 80, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 3]);
    parts.forEach(part => {
        ctx.beginPath();
        ctx.moveTo(rootX + rootWidth/2, rootY + rootHeight/2);
        ctx.lineTo(part.x + part.width/2, part.y + part.height/2);
        ctx.stroke();
    });
    ctx.setLineDash([]);
    
    // Draw deformation visualization on the right
    const deformX = 350;
    const deformY = 70;
    const deformWidth = 150;
    const deformHeight = 200;
    
    // Original position
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.strokeRect(deformX, deformY, 60, 60);
    ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
    ctx.fillRect(deformX, deformY, 60, 60);
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('Original Position', deformX + 30, deformY + 80);
    
    // Deformed position
    const shift = 40;
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.strokeRect(deformX + shift, deformY + shift, 60, 60);
    ctx.fillStyle = 'rgba(231, 76, 60, 0.2)';
    ctx.fillRect(deformX + shift, deformY + shift, 60, 60);
    ctx.fillStyle = '#e74c3c';
    ctx.fillText('Deformed Position', deformX + shift + 30, deformY + shift + 80);
    
    // Draw spring
    ctx.strokeStyle = 'rgba(44, 62, 80, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(deformX + 30, deformY + 30);
    ctx.lineTo(deformX + shift + 30, deformY + shift + 30);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Arrow pointing to deformation cost
    ctx.fillStyle = '#2c3e50';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Deformation Cost', deformX + shift/2 + 30, deformY + shift/2 + 10);
    
    // Title and explanation
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('Deformable Parts Model (DPM)', canvas.width/2, 30);
    
    // Save as an image file
    saveCanvasAsImage(canvas, 'dpm_model.png');
}

// Helper function to save canvas as image file
function saveCanvasAsImage(canvas, filename) {
    // In a real implementation, this would save the canvas to a file
    // For our demo purposes, we'll just output to the console
    console.log(`Visualization generated for ${filename}`);
    
    // In production, you might use:
    // const dataUrl = canvas.toDataURL('image/png');
    // And then save this data URL to a file or display it
}

// Generate R-CNN architecture visualization
function generateRCNNArchitectureVisual() {
    const container = document.getElementById('rcnn-architecture');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 300;
    canvas.style.maxWidth = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Define colors
    const colors = {
        input: '#3498db', // blue
        selective: '#2ecc71', // green 
        cnn: '#9b59b6', // purple
        svm: '#e74c3c', // red
        bbox: '#f39c12', // orange
        text: '#2c3e50' // dark blue
    };
    
    // Define the architecture components and layout
    const boxHeight = 60;
    const boxWidth = 100;
    const spacing = 100;
    const startX = 50;
    const midY = canvas.height / 2;
    
    // Draw the input image
    drawComponent(startX, midY, boxWidth, boxHeight, colors.input, 'Input Image');
    
    // Draw arrow
    drawArrow(startX + boxWidth, midY, startX + boxWidth + spacing/2, midY);
    
    // Draw Selective Search
    const ssX = startX + boxWidth + spacing;
    drawComponent(ssX, midY, boxWidth, boxHeight, colors.selective, 'Selective Search');
    drawDescription(ssX, midY + boxHeight/2 + 40, 'Generate ~2000 region proposals', colors.text);
    
    // Draw multiple regions with arrows pointing to CNNs
    const regions = 3; // Number of region examples to show
    const regionSpacing = 20;
    const regionHeight = 30;
    
    for (let i = 0; i < regions; i++) {
        const regionY = midY - boxHeight/2 - (regions-1) * regionSpacing/2 + i * regionSpacing;
        
        // Draw region proposal
        ctx.strokeStyle = colors.selective;
        ctx.lineWidth = 2;
        ctx.strokeRect(ssX + boxWidth + 20, regionY, regionHeight, regionHeight);
        
        // Draw arrow to CNN
        drawArrow(ssX + boxWidth + 20 + regionHeight, regionY + regionHeight/2, 
                  ssX + boxWidth + spacing - 10, regionY + regionHeight/2);
    }
    
    // Draw CNN for feature extraction
    const cnnX = ssX + boxWidth + spacing;
    drawComponent(cnnX, midY, boxWidth, boxHeight, colors.cnn, 'CNN');
    drawDescription(cnnX, midY + boxHeight/2 + 40, 'Extract features from each region', colors.text);
    
    // Draw feature vectors
    const featureX = cnnX + boxWidth + 20;
    
    for (let i = 0; i < regions; i++) {
        const featureY = midY - boxHeight/2 - (regions-1) * regionSpacing/2 + i * regionSpacing;
        
        // Draw feature vector (as a small histogram-like representation)
        ctx.fillStyle = colors.cnn;
        for (let j = 0; j < 10; j++) {
            const barHeight = 5 + Math.random() * 15;
            ctx.fillRect(featureX + j*5, featureY + regionHeight/2 - barHeight/2, 3, barHeight);
        }
        
        // Draw arrow to SVM
        drawArrow(featureX + 55, featureY + regionHeight/2, 
                  cnnX + boxWidth + spacing - 10, featureY + regionHeight/2);
    }
    
    // Draw SVM classifier
    const svmX = cnnX + boxWidth + spacing;
    drawComponent(svmX, midY, boxWidth, boxHeight, colors.svm, 'SVM Classifiers');
    drawDescription(svmX, midY + boxHeight/2 + 40, 'Classify each region & refine bounding boxes', colors.text);
    
    // Draw output
    const outputX = svmX + boxWidth + spacing;
    drawComponent(outputX, midY, boxWidth, boxHeight, colors.bbox, 'Detection Results');
    drawArrow(svmX + boxWidth, midY, outputX, midY);
    
    // Add title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('R-CNN Architecture', canvas.width/2, 30);
    
    // Helper function to draw a component box with text
    function drawComponent(x, y, width, height, color, text) {
        // Draw box
        ctx.fillStyle = color;
        ctx.fillRect(x, y - height/2, width, height);
        
        // Draw border
        ctx.strokeStyle = darkenColor(color);
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - height/2, width, height);
        
        // Draw text
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + width/2, y);
    }
    
    // Helper function to draw an arrow
    function drawArrow(fromX, fromY, toX, toY) {
        const headSize = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headSize * Math.cos(angle - Math.PI/6), toY - headSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(toX - headSize * Math.cos(angle + Math.PI/6), toY - headSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = colors.text;
        ctx.fill();
    }
    
    // Helper function to draw description text
    function drawDescription(x, y, text, color) {
        ctx.font = '12px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x + boxWidth/2, y);
    }
    
    // Helper function to darken a color for borders
    function darkenColor(color) {
        // Simple darkening for example purposes
        return color;
    }
}

// Generate Mask R-CNN architecture visualization
function generateMaskRCNNArchitectureVisual() {
    const container = document.getElementById('mask-rcnn-architecture');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1200;  // Increased width further to ensure entire architecture is visible
    canvas.height = 400;  // Maintaining height for better spacing
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';  // Ensure aspect ratio is maintained
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Define colors
    const colors = {
        input: '#3498db',    // blue
        backbone: '#2ecc71', // green 
        rpn: '#9b59b6',      // purple
        roi: '#e74c3c',      // red
        fcn: '#f39c12',      // orange
        bbox: '#1abc9c',     // turquoise
        mask: '#8e44ad',     // dark purple
        text: '#2c3e50'      // dark blue
    };
    
    // Define the architecture components and layout with adjusted spacing
    const boxHeight = 60;
    const boxWidth = 110;    // Slightly reduced width of each box
    const spacing = 65;      // Slightly reduced spacing between components
    const startX = 30;
    const midY = canvas.height / 2;
    
    // Draw title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Mask R-CNN Architecture', canvas.width/2, 30);
    
    // Add note about extension of Faster R-CNN
    ctx.font = 'italic 14px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Extends Faster R-CNN with a parallel mask prediction branch', canvas.width/2, 60);
    
    // Draw the input image
    drawComponent(startX, midY, boxWidth, boxHeight, colors.input, 'Input Image');
    
    // Draw arrow
    drawArrow(startX + boxWidth, midY, startX + boxWidth + spacing/2, midY);
    
    // Draw CNN backbone
    const backboneX = startX + boxWidth + spacing;
    drawComponent(backboneX, midY, boxWidth, boxHeight, colors.backbone, 'CNN Backbone');
    drawDescription(backboneX, midY + boxHeight/2 + 40, 'Feature extraction', colors.text);
    
    // Draw arrow to RPN
    drawArrow(backboneX + boxWidth, midY, backboneX + boxWidth + spacing/2, midY);
    
    // Draw RPN
    const rpnX = backboneX + boxWidth + spacing;
    drawComponent(rpnX, midY, boxWidth, boxHeight, colors.rpn, 'Region Proposal Network');
    drawDescription(rpnX, midY + boxHeight/2 + 40, 'Generate proposals', colors.text);
    
    // Draw arrow to ROI Align
    drawArrow(rpnX + boxWidth, midY, rpnX + boxWidth + spacing/2, midY);
    
    // Draw ROI Align
    const roiX = rpnX + boxWidth + spacing;
    drawComponent(roiX, midY, boxWidth, boxHeight, colors.roi, 'ROI Align');
    drawDescription(roiX, midY + boxHeight/2 + 40, 'Extract features per region', colors.text);
    
    // Split into two paths: box prediction and mask prediction
    const splitX = roiX + boxWidth + spacing;
    const splitY1 = midY - 80;  // Upper branch (increased separation)
    const splitY2 = midY + 80;  // Lower branch (increased separation)
    
    // Draw arrows from ROI to both branches
    drawArrow(roiX + boxWidth, midY, splitX - spacing/2, midY);
    drawArrow(splitX - spacing/2, midY, splitX, splitY1);
    drawArrow(splitX - spacing/2, midY, splitX, splitY2);
    
    // Draw bbox branch
    drawComponent(splitX, splitY1, boxWidth, boxHeight, colors.bbox, 'Box Head');
    drawArrow(splitX + boxWidth, splitY1, splitX + boxWidth + spacing, splitY1);
    
    const bboxOutputX = splitX + boxWidth + spacing;
    drawComponent(bboxOutputX, splitY1, boxWidth, boxHeight, colors.bbox, 'Object Detection');
    drawDescription(bboxOutputX, splitY1 + boxHeight/2 + 30, 'Class & box regression', colors.text);
    
    // Draw mask branch
    drawComponent(splitX, splitY2, boxWidth, boxHeight, colors.mask, 'Mask Head');
    drawArrow(splitX + boxWidth, splitY2, splitX + boxWidth + spacing, splitY2);
    
    const maskOutputX = splitX + boxWidth + spacing;
    drawComponent(maskOutputX, splitY2, boxWidth, boxHeight, colors.mask, 'Instance Segmentation');
    drawDescription(maskOutputX, splitY2 + boxHeight/2 + 30, 'Per-class binary masks', colors.text);
    
    // Add mask example visualization - position adjusted to ensure visibility
    const maskExampleX = maskOutputX + boxWidth + 20;
    const maskExampleY = splitY2;
    const maskSize = 50;
    
    // Draw object shape with mask
    ctx.beginPath();
    ctx.ellipse(maskExampleX + maskSize/2, maskExampleY, maskSize/3, maskSize/2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(142, 68, 173, 0.3)'; // Transparent mask color
    ctx.fill();
    ctx.strokeStyle = colors.mask;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Label for mask example
    ctx.font = '12px Arial';
    ctx.fillStyle = colors.mask;
    ctx.textAlign = 'center';
    ctx.fillText('Pixel Mask', maskExampleX + maskSize/2, maskExampleY + maskSize/2 + 20);
    
    // Add bounding box example
    const bboxExampleX = bboxOutputX + boxWidth + 20;
    const bboxExampleY = splitY1;
    
    ctx.strokeStyle = colors.bbox;
    ctx.lineWidth = 2;
    ctx.strokeRect(bboxExampleX, bboxExampleY - maskSize/2, maskSize, maskSize);
    
    // Add label for box example
    ctx.fillStyle = colors.bbox;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Class: Person (0.98)', bboxExampleX + maskSize/2, bboxExampleY - maskSize/2 - 5);
    ctx.fillText('Bounding Box', bboxExampleX + maskSize/2, bboxExampleY + maskSize/2 + 20);
    
    // Helper function to draw a component box with text
    function drawComponent(x, y, width, height, color, text) {
        // Draw box
        ctx.fillStyle = color;
        ctx.fillRect(x, y - height/2, width, height);
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - height/2, width, height);
        
        // Draw text
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Handle multiline text
        const words = text.split(' ');
        if (words.length > 2) {
            const line1 = words.slice(0, 2).join(' ');
            const line2 = words.slice(2).join(' ');
            ctx.fillText(line1, x + width/2, y - 10);
            ctx.fillText(line2, x + width/2, y + 10);
        } else {
            ctx.fillText(text, x + width/2, y);
        }
    }
    
    // Helper function to draw an arrow
    function drawArrow(fromX, fromY, toX, toY) {
        const headSize = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headSize * Math.cos(angle - Math.PI/6), toY - headSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(toX - headSize * Math.cos(angle + Math.PI/6), toY - headSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = colors.text;
        ctx.fill();
    }
    
    // Helper function to draw description text
    function drawDescription(x, y, text, color) {
        ctx.font = '12px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x + boxWidth/2, y);
    }
}

// Generate SSD architecture visualization
function generateSSDArchitectureVisual() {
    const container = document.getElementById('ssd-architecture');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 950;  // Increased width further to ensure Detection Results is fully visible
    canvas.height = 350; // Maintaining height for better spacing
    canvas.style.maxWidth = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Define colors
    const colors = {
        input: '#3498db',      // blue
        backbone: '#2ecc71',   // green
        featureMap: '#9b59b6', // purple
        detection: '#e74c3c',  // red
        output: '#f39c12',     // orange
        text: '#2c3e50'        // dark blue
    };
    
    // Define components
    const boxHeight = 60;
    const boxWidth = 100;
    const startX = 50;
    const midY = canvas.height / 2;
    
    // Draw title - positioned higher to avoid overlap
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('SSD: Single Shot MultiBox Detector', canvas.width/2, 40);
    
    // Draw input image
    drawComponent(startX, midY, boxWidth, boxHeight, colors.input, 'Input Image');
    
    // Draw VGG or backbone network
    const backboneX = startX + boxWidth + 50;
    drawComponent(backboneX, midY, boxWidth, boxHeight, colors.backbone, 'VGG Backbone');
    drawArrow(startX + boxWidth, midY, backboneX, midY);
    
    // Draw feature maps at different scales
    const featureMapsStartX = backboneX + boxWidth + 80;
    const featureMapsWidth = 350;  // Increased width for feature maps area
    
    // Draw feature pyramid box
    ctx.fillStyle = 'rgba(52, 152, 219, 0.1)'; // Light blue background
    ctx.fillRect(featureMapsStartX, midY - 120, featureMapsWidth, 240);
    ctx.strokeStyle = colors.backbone;
    ctx.lineWidth = 2;
    ctx.strokeRect(featureMapsStartX, midY - 120, featureMapsWidth, 240);
    
    // Draw feature maps
    const numFeatureMaps = 5;
    const featureMapHeight = [25, 35, 45, 55, 65]; // Different sizes to show scale
    const featureMapSpacing = featureMapsWidth / (numFeatureMaps + 1);
    
    for (let i = 0; i < numFeatureMaps; i++) {
        const fmX = featureMapsStartX + (i + 1) * featureMapSpacing - featureMapHeight[i]/2;
        const fmY = midY - featureMapHeight[i]/2;
        const fmSize = featureMapHeight[i];
        
        // Draw feature map as grid
        ctx.fillStyle = colors.featureMap;
        ctx.globalAlpha = 0.8 - (i * 0.1); // Decreasing opacity for deeper layers
        ctx.fillRect(fmX, fmY, fmSize, fmSize);
        ctx.globalAlpha = 1.0;
        
        // Grid lines
        const gridSize = i + 2; // More cells for earlier (higher resolution) feature maps
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 0.5;
        
        // Draw grid
        for (let j = 1; j < gridSize; j++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(fmX + (fmSize / gridSize) * j, fmY);
            ctx.lineTo(fmX + (fmSize / gridSize) * j, fmY + fmSize);
            ctx.stroke();
            
            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(fmX, fmY + (fmSize / gridSize) * j);
            ctx.lineTo(fmX + fmSize, fmY + (fmSize / gridSize) * j);
            ctx.stroke();
        }
        
        // Add label for grid size
        ctx.font = '12px Arial';
        ctx.fillStyle = colors.text;
        ctx.textAlign = 'center';
        ctx.fillText(`${(6-i)}×${(6-i)}`, fmX + fmSize/2, fmY + fmSize + 18);
    }
    
    // Draw example default boxes more clearly
    // 1. Draw default boxes at a cell in feature map 1 (higher resolution)
    const fm1X = featureMapsStartX + featureMapSpacing - featureMapHeight[0]/2;
    const fm1Y = midY - featureMapHeight[0]/2;
    const fm1CellSize = featureMapHeight[0] / 2;
    
    // Highlight a cell
    ctx.fillStyle = 'rgba(231, 76, 60, 0.3)'; // Light red
    ctx.fillRect(fm1X + fm1CellSize/2, fm1Y + fm1CellSize/2, fm1CellSize, fm1CellSize);
    
    // Draw default boxes connected to the cell
    drawDefaultBoxes(fm1X + fm1CellSize, fm1Y + fm1CellSize, 45, colors.detection, 2, "Default Boxes");
    
    // 2. Draw default boxes at a cell in feature map 4 (lower resolution)
    const fm4X = featureMapsStartX + 4 * featureMapSpacing - featureMapHeight[3]/2;
    const fm4Y = midY - featureMapHeight[3]/2;
    const fm4CellSize = featureMapHeight[3] / 3;
    
    // Highlight a cell
    ctx.fillStyle = 'rgba(231, 76, 60, 0.3)'; // Light red
    ctx.fillRect(fm4X + fm4CellSize, fm4Y + fm4CellSize, fm4CellSize, fm4CellSize);
    
    // Draw default boxes connected to the cell
    drawDefaultBoxes(fm4X + fm4CellSize*1.5, fm4Y + fm4CellSize*1.5, 65, colors.detection, 3, "Default Boxes");
    
    // Draw arrow to output
    const outputX = featureMapsStartX + featureMapsWidth + 80;
    drawArrow(featureMapsStartX + featureMapsWidth, midY, outputX - 30, midY);
    
    // Draw output - making it clearly visible and ensuring it fits
    drawComponent(outputX, midY, boxWidth + 20, boxHeight, colors.output, 'Detection Results');
    
    // Draw example output
    const exampleX = outputX + boxWidth + 40;
    const exampleY = midY;
    const exampleSize = 80;
    
    // Draw example image with detections
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(exampleX, exampleY - exampleSize/2, exampleSize, exampleSize);
    
    // Draw detection boxes of different sizes
    ctx.strokeStyle = colors.detection;
    ctx.lineWidth = 2;
    ctx.strokeRect(exampleX + 10, exampleY - 30, 25, 25); // Small object
    ctx.font = '10px Arial';
    ctx.fillStyle = colors.detection;
    ctx.textAlign = 'center';
    ctx.fillText('Car: 0.92', exampleX + 22, exampleY - 35);
    
    ctx.strokeRect(exampleX + 20, exampleY - 10, 50, 30); // Larger object
    ctx.fillText('Person: 0.87', exampleX + 45, exampleY - 15);
    
    // Add explanation text as footer instead of overlapping
    ctx.font = 'italic 16px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Predicts detections at multiple scales from different feature maps in a single forward pass', 
                 canvas.width/2, canvas.height - 20);
    
    // Helper function to draw default boxes
    function drawDefaultBoxes(x, y, radius, color, count, label) {
        const aspectRatios = [1, 0.6, 1.6]; // Square, tall, wide
        
        for (let i = 0; i < count; i++) {
            const arIndex = i % aspectRatios.length;
            const ar = aspectRatios[arIndex];
            const width = radius * Math.sqrt(ar);
            const height = radius / Math.sqrt(ar);
            
            // Draw boxes with different sizes and aspect ratios
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(x - width/2, y - height/2, width, height);
        }
        
        // Add small connection line
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 40, y - 25);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add label
        ctx.font = '12px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.fillText(label, x + 45, y - 25);
    }
    
    // Helper function to draw a component box with text
    function drawComponent(x, y, width, height, color, text) {
        // Draw box
        ctx.fillStyle = color;
        ctx.fillRect(x, y - height/2, width, height);
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - height/2, width, height);
        
        // Draw text
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Handle multi-line text
        const words = text.split(' ');
        if (words.length > 2) {
            const line1 = words.slice(0, words.length/2).join(' ');
            const line2 = words.slice(words.length/2).join(' ');
            ctx.fillText(line1, x + width/2, y - 10);
            ctx.fillText(line2, x + width/2, y + 10);
        } else {
            ctx.fillText(text, x + width/2, y);
        }
    }
    
    // Helper function to draw an arrow
    function drawArrow(fromX, fromY, toX, toY) {
        const headSize = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        drawArrowhead(toX, toY, angle, colors.text);
    }
    
    // Helper function to draw arrowhead
    function drawArrowhead(x, y, angle, color) {
        const headSize = 8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - headSize * Math.cos(angle - Math.PI/6), y - headSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(x - headSize * Math.cos(angle + Math.PI/6), y - headSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// Generate Feature Pyramid Network architecture visualization
function generateFPNArchitectureVisual() {
    const container = document.getElementById('fpn-architecture');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 950;  // Further increase width to ensure Detection Heads is fully visible
    canvas.height = 400; // Height for comfortable spacing
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto'; // Ensure aspect ratio is maintained
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Define colors
    const colors = {
        input: '#3498db',     // blue
        backbone: '#2ecc71',  // green 
        topDown: '#9b59b6',   // purple
        lateral: '#e74c3c',   // red
        output: '#f39c12',    // orange
        text: '#2c3e50'       // dark blue
    };
    
    // Define components with adjusted spacing
    const boxHeight = 50;
    const boxWidth = 100;
    const startX = 40;  // Keep start position
    const midY = canvas.height / 2;
    
    // Draw title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Feature Pyramid Network (FPN) Architecture', canvas.width/2, 40);
    
    // Draw input image
    drawComponent(startX, midY, boxWidth, boxHeight, colors.input, 'Input Image');
    
    // Draw CNN backbone (vertically) - slightly reduce spacing
    const backboneX = startX + boxWidth + 60;
    const backboneWidth = 120;
    const backboneHeight = 220;
    
    // Backbone network box
    ctx.fillStyle = 'rgba(46, 204, 113, 0.1)'; // Light green
    ctx.fillRect(backboneX, midY - backboneHeight/2, backboneWidth, backboneHeight);
    ctx.strokeStyle = colors.backbone;
    ctx.lineWidth = 2;
    ctx.strokeRect(backboneX, midY - backboneHeight/2, backboneWidth, backboneHeight);
    
    // Backbone network label
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = colors.backbone;
    ctx.textAlign = 'center';
    ctx.fillText('CNN Backbone', backboneX + backboneWidth/2, midY - backboneHeight/2 - 15);
    
    // Draw arrow from input to backbone
    drawArrow(startX + boxWidth, midY, backboneX, midY);
    
    // Draw feature maps in backbone (C1-C5)
    const featureLevels = 5;
    const levelHeight = backboneHeight / featureLevels;
    const featureMapSize = [60, 50, 40, 30, 20]; // Decreasing sizes for higher levels
    
    for (let i = 0; i < featureLevels; i++) {
        const fmY = midY - backboneHeight/2 + i * levelHeight + levelHeight/2;
        const fmX = backboneX + backboneWidth/2;
        const fmSize = featureMapSize[i];
        
        // Feature map block
        ctx.fillStyle = colors.backbone;
        ctx.fillRect(fmX - fmSize/2, fmY - fmSize/4, fmSize, fmSize/2);
        
        // Feature map label
        ctx.font = '14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`C${i+1}`, fmX, fmY);
    }
    
    // Draw lateral connections and top-down pathway - slightly reduce width
    const pyramidX = backboneX + backboneWidth + 90;
    const pyramidWidth = 280;
    
    // Draw pyramid framework
    ctx.fillStyle = 'rgba(155, 89, 182, 0.1)'; // Light purple
    ctx.fillRect(pyramidX, midY - backboneHeight/2, pyramidWidth, backboneHeight);
    ctx.strokeStyle = colors.topDown;
    ctx.lineWidth = 2;
    ctx.strokeRect(pyramidX, midY - backboneHeight/2, pyramidWidth, backboneHeight);
    
    // Draw pyramid label
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = colors.topDown;
    ctx.textAlign = 'center';
    ctx.fillText('Feature Pyramid', pyramidX + pyramidWidth/2, midY - backboneHeight/2 - 15);
    
    // Draw the feature pyramid (P levels)
    const pyramidLevels = 5;
    const featureColors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db'];
    
    for (let i = 0; i < pyramidLevels; i++) {
        const fmY = midY - backboneHeight/2 + i * levelHeight + levelHeight/2;
        const fmX = pyramidX + pyramidWidth - 80;
        const fmSize = featureMapSize[i];
        
        // Feature map in pyramid
        ctx.fillStyle = featureColors[i];
        ctx.fillRect(fmX - fmSize/2, fmY - fmSize/4, fmSize, fmSize/2);
        
        // Feature map label
        ctx.font = '14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`P${i+1}`, fmX, fmY);
        
        // Draw arrow from backbone to pyramid
        if (i < 4) { // C5-C2 get lateral connections
            // Lateral connection arrow
            ctx.setLineDash([5, 3]);
            ctx.strokeStyle = colors.lateral;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(backboneX + backboneWidth, fmY);
            ctx.lineTo(fmX - fmSize/2, fmY);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Lateral connection label
            if (i === 1) {
                ctx.font = '12px Arial';
                ctx.fillStyle = colors.lateral;
                ctx.textAlign = 'center';
                ctx.fillText('Lateral Connections', backboneX + backboneWidth + 60, fmY - 15);
            }
        }
        
        // Draw top-down connections
        if (i > 0) {
            const prevY = midY - backboneHeight/2 + (i-1) * levelHeight + levelHeight/2;
            const prevSize = featureMapSize[i-1];
            
            // Top-down arrow
            ctx.strokeStyle = colors.topDown;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(fmX, prevY + prevSize/4);
            ctx.lineTo(fmX, fmY - fmSize/4);
            ctx.stroke();
            
            // Add arrowhead
            drawArrowhead(fmX, fmY - fmSize/4, Math.PI/2, colors.topDown);
            
            // Top-down connection label
            if (i === 1) {
                ctx.font = '12px Arial';
                ctx.fillStyle = colors.topDown;
                ctx.textAlign = 'center';
                ctx.fillText('Top-down Pathway', fmX + 70, prevY + levelHeight/2);
            }
        }
    }
    
    // Draw output and detection stage - ensure it's fully visible
    const outputX = pyramidX + pyramidWidth + 70;
    const outputWidth = 120;
    const outputY = midY;
    drawComponent(outputX, outputY, outputWidth, boxHeight, colors.output, 'Detection Heads');
    drawArrow(pyramidX + pyramidWidth, midY, outputX, midY);
    
    // Add explanation text at the bottom
    ctx.font = 'italic 16px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('FPN creates a feature pyramid with semantically strong features at all levels', 
                 canvas.width/2, canvas.height - 30);
    
    // Helper function to draw a component box with text
    function drawComponent(x, y, width, height, color, text) {
        // Draw box
        ctx.fillStyle = color;
        ctx.fillRect(x, y - height/2, width, height);
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - height/2, width, height);
        
        // Draw text
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Handle multi-line text
        const words = text.split(' ');
        if (words.length > 2) {
            const line1 = words.slice(0, words.length/2).join(' ');
            const line2 = words.slice(words.length/2).join(' ');
            ctx.fillText(line1, x + width/2, y - 10);
            ctx.fillText(line2, x + width/2, y + 10);
        } else {
            ctx.fillText(text, x + width/2, y);
        }
    }
    
    // Helper function to draw an arrow
    function drawArrow(fromX, fromY, toX, toY) {
        const headSize = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        drawArrowhead(toX, toY, angle, colors.text);
    }
    
    // Helper function to draw arrowhead
    function drawArrowhead(x, y, angle, color) {
        const headSize = 8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - headSize * Math.cos(angle - Math.PI/6), y - headSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(x - headSize * Math.cos(angle + Math.PI/6), y - headSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
} 

// Generate CornerNet architecture visualization
function generateCornerNetArchitectureVisual() {
    const container = document.getElementById('cornernet-architecture');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1200;  // Increased width from 1000px to 1200px to ensure all components fit
    canvas.height = 450;  // Maintaining the height
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';  // Ensure aspect ratio is maintained
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Define colors
    const colors = {
        input: '#3498db',    // blue
        backbone: '#2ecc71', // green 
        tl: '#9b59b6',       // purple for top-left corner
        br: '#e74c3c',       // red for bottom-right corner
        heatmap: '#f39c12',  // orange
        embedding: '#1abc9c',// turquoise
        output: '#8e44ad',   // dark purple
        text: '#2c3e50'      // dark blue
    };
    
    // Define the architecture components and layout
    const boxHeight = 60;
    const boxWidth = 110;
    const spacing = 55;      // Slightly reduced spacing to fit everything
    const startX = 40;
    const midY = canvas.height / 2;
    
    // Draw title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('CornerNet Architecture', canvas.width/2, 30);
    
    // Add subtitle
    ctx.font = 'italic 14px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Predicts object corners (top-left and bottom-right) without anchors', canvas.width/2, 60);
    
    // Draw the input image
    drawComponent(startX, midY, boxWidth, boxHeight, colors.input, 'Input Image');
    
    // Draw arrow to backbone
    drawArrow(startX + boxWidth, midY, startX + boxWidth + spacing, midY);
    
    // Draw CNN backbone
    const backboneX = startX + boxWidth + spacing;
    const backboneWidth = boxWidth * 1.2;
    const backboneHeight = boxHeight * 1.5;
    
    ctx.fillStyle = colors.backbone;
    ctx.fillRect(backboneX, midY - backboneHeight/2, backboneWidth, backboneHeight);
    ctx.strokeStyle = darkenColor(colors.backbone);
    ctx.lineWidth = 2;
    ctx.strokeRect(backboneX, midY - backboneHeight/2, backboneWidth, backboneHeight);
    
    // Backbone label
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Hourglass', backboneX + backboneWidth/2, midY - 15);
    ctx.fillText('Backbone', backboneX + backboneWidth/2, midY + 15);
    
    // Description
    drawDescription(backboneX + backboneWidth/2, midY + backboneHeight/2 + 25, 'Feature extraction', colors.text);
    
    // Draw feature map output from backbone
    const featureMapX = backboneX + backboneWidth + spacing;
    
    // Draw feature map
    drawComponent(featureMapX, midY, boxWidth, boxHeight, colors.backbone, 'Feature Maps');
    drawArrow(backboneX + backboneWidth, midY, featureMapX, midY);
    
    // Split into two branches: top-left and bottom-right
    const splitX = featureMapX + boxWidth + spacing;
    const splitY1 = midY - 100;  // Top branch for top-left corner
    const splitY2 = midY + 100;  // Bottom branch for bottom-right corner
    
    // Draw arrows from feature map to both branches
    drawArrow(featureMapX + boxWidth, midY, splitX - spacing/2, midY);
    drawArrow(splitX - spacing/2, midY, splitX, splitY1);
    drawArrow(splitX - spacing/2, midY, splitX, splitY2);
    
    // Draw top-left branch
    drawComponent(splitX, splitY1, boxWidth, boxHeight, colors.tl, 'Top-Left Corner Detection');
    drawArrow(splitX + boxWidth, splitY1, splitX + boxWidth + spacing, splitY1);
    
    // Draw bottom-right branch  
    drawComponent(splitX, splitY2, boxWidth, boxHeight, colors.br, 'Bottom-Right Corner Detection');
    drawArrow(splitX + boxWidth, splitY2, splitX + boxWidth + spacing, splitY2);
    
    // Draw outputs for each branch (heatmap, embedding, offset)
    const outputsX = splitX + boxWidth + spacing;
    const outputWidth = boxWidth * 0.8;
    const outputHeight = boxHeight * 0.8;
    const outputSpacing = 30;
    
    // Top-left branch outputs
    drawComponent(outputsX, splitY1 - outputSpacing, outputWidth, outputHeight, colors.heatmap, 'Corner Heatmap');
    drawComponent(outputsX, splitY1, outputWidth, outputHeight, colors.embedding, 'Embedding Vector');
    drawComponent(outputsX, splitY1 + outputSpacing, outputWidth, outputHeight, colors.tl, 'Offset Prediction');
    
    // Bottom-right branch outputs
    drawComponent(outputsX, splitY2 - outputSpacing, outputWidth, outputHeight, colors.heatmap, 'Corner Heatmap');
    drawComponent(outputsX, splitY2, outputWidth, outputHeight, colors.embedding, 'Embedding Vector');
    drawComponent(outputsX, splitY2 + outputSpacing, outputWidth, outputHeight, colors.br, 'Offset Prediction');
    
    // Draw arrows to corner pairing - increased spacing to ensure visibility
    const pairingX = outputsX + outputWidth + spacing * 1.5;
    const pairingY = midY;
    
    // Draw arrows from outputs to pairing
    drawArrow(outputsX + outputWidth, splitY1, pairingX - spacing/2, splitY1);
    drawArrow(pairingX - spacing/2, splitY1, pairingX, pairingY);
    drawArrow(outputsX + outputWidth, splitY2, pairingX - spacing/2, splitY2);
    drawArrow(pairingX - spacing/2, splitY2, pairingX, pairingY);
    
    // Draw corner pairing
    drawComponent(pairingX, pairingY, boxWidth, boxHeight, colors.output, 'Corner Pairing');
    drawDescription(pairingX + boxWidth/2, pairingY + boxHeight/2 + 15, 'Group corners by embedding similarity', colors.text);
    
    // Draw final output - detection results with increased spacing
    const resultX = pairingX + boxWidth + spacing;
    drawComponent(resultX, pairingY, boxWidth, boxHeight, colors.output, 'Bounding Boxes');
    drawArrow(pairingX + boxWidth, pairingY, resultX, pairingY);
    
    // Draw example output
    const exampleX = resultX + boxWidth + 30;
    const exampleY = pairingY;
    const exampleSize = 70;
    
    // Draw example image with TL and BR corners
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(exampleX, exampleY - exampleSize/2, exampleSize, exampleSize);
    
    // Draw TL and BR corners with a bounding box
    ctx.fillStyle = colors.tl;
    ctx.beginPath();
    ctx.arc(exampleX + 10, exampleY - exampleSize/2 + 10, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = colors.br;
    ctx.beginPath();
    ctx.arc(exampleX + exampleSize - 10, exampleY + exampleSize/2 - 10, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw bounding box
    ctx.strokeStyle = colors.output;
    ctx.lineWidth = 2;
    ctx.strokeRect(exampleX + 10, exampleY - exampleSize/2 + 10, exampleSize - 20, exampleSize - 20);
    
    // Helper function to draw a component box with text
    function drawComponent(x, y, width, height, color, text) {
        // Draw box
        ctx.fillStyle = color;
        ctx.fillRect(x, y - height/2, width, height);
        
        // Draw border
        ctx.strokeStyle = darkenColor(color);
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - height/2, width, height);
        
        // Draw text
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Handle multiline text
        const words = text.split(' ');
        if (words.length > 2) {
            const line1 = words.slice(0, Math.ceil(words.length/2)).join(' ');
            const line2 = words.slice(Math.ceil(words.length/2)).join(' ');
            ctx.fillText(line1, x + width/2, y - 10);
            ctx.fillText(line2, x + width/2, y + 10);
        } else {
            ctx.fillText(text, x + width/2, y);
        }
    }
    
    // Helper function to draw an arrow
    function drawArrow(fromX, fromY, toX, toY) {
        const headSize = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headSize * Math.cos(angle - Math.PI/6), toY - headSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(toX - headSize * Math.cos(angle + Math.PI/6), toY - headSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = colors.text;
        ctx.fill();
    }
    
    // Helper function to draw description text
    function drawDescription(x, y, text, color) {
        ctx.font = '12px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    }
    
    // Helper function to darken a color for borders
    function darkenColor(color) {
        // Simple darkening for example purposes
        return color;
    }
} 

// Generate CenterNet architecture visualization
function generateCenterNetArchitectureVisual() {
    const container = document.getElementById('centernet-architecture');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1000;  // Wide canvas to prevent trimming
    canvas.height = 400;
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';  // Ensure aspect ratio is maintained
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Define colors
    const colors = {
        input: '#3498db',    // blue
        backbone: '#2ecc71', // green 
        heatmap: '#9b59b6',  // purple
        size: '#e74c3c',     // red
        offset: '#f39c12',   // orange
        detection: '#8e44ad',// dark purple
        text: '#2c3e50'      // dark blue
    };
    
    // Define the architecture components and layout
    const boxHeight = 60;
    const boxWidth = 120;
    const spacing = 80;
    const startX = 60;
    const midY = canvas.height / 2;
    
    // Draw title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('CenterNet Architecture', canvas.width/2, 30);
    
    // Add subtitle
    ctx.font = 'italic 14px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Anchor-free detector that predicts object centers and sizes', canvas.width/2, 60);
    
    // Draw the input image
    drawComponent(startX, midY, boxWidth, boxHeight, colors.input, 'Input Image');
    
    // Draw arrow to backbone
    drawArrow(startX + boxWidth, midY, startX + boxWidth + spacing, midY);
    
    // Draw backbone
    const backboneX = startX + boxWidth + spacing;
    drawComponent(backboneX, midY, boxWidth, boxHeight, colors.backbone, 'Backbone CNN');
    drawDescription(backboneX + boxWidth/2, midY + boxHeight/2 + 20, 'Feature extraction', colors.text);
    
    // Draw arrow to feature map
    drawArrow(backboneX + boxWidth, midY, backboneX + boxWidth + spacing, midY);
    
    // Draw feature map output
    const featureMapX = backboneX + boxWidth + spacing;
    drawComponent(featureMapX, midY, boxWidth, boxHeight, colors.backbone, 'Feature Maps');
    
    // Split into three branches
    const branchesX = featureMapX + boxWidth + spacing;
    const branchY1 = midY - 100;  // Heatmap branch
    const branchY2 = midY;        // Size branch
    const branchY3 = midY + 100;  // Offset branch
    
    // Draw arrows from feature map to branches
    drawArrow(featureMapX + boxWidth, midY, branchesX - spacing/2, midY);
    drawArrow(branchesX - spacing/2, midY, branchesX, branchY1);
    drawArrow(branchesX - spacing/2, midY, branchesX, branchY2);
    drawArrow(branchesX - spacing/2, midY, branchesX, branchY3);
    
    // Draw branches
    drawComponent(branchesX, branchY1, boxWidth, boxHeight, colors.heatmap, 'Center Heatmap');
    drawDescription(branchesX + boxWidth/2, branchY1 + boxHeight/2 + 20, 'Predicts object centers', colors.text);
    
    drawComponent(branchesX, branchY2, boxWidth, boxHeight, colors.size, 'Size Prediction');
    drawDescription(branchesX + boxWidth/2, branchY2 + boxHeight/2 + 20, 'Width and height', colors.text);
    
    drawComponent(branchesX, branchY3, boxWidth, boxHeight, colors.offset, 'Offset Prediction');
    drawDescription(branchesX + boxWidth/2, branchY3 + boxHeight/2 + 20, 'Fine position adjustment', colors.text);
    
    // Draw arrows to detection output
    const detectionX = branchesX + boxWidth + spacing;
    drawArrow(branchesX + boxWidth, branchY1, detectionX - spacing/2, branchY1);
    drawArrow(branchesX + boxWidth, branchY2, detectionX - spacing/2, branchY2);
    drawArrow(branchesX + boxWidth, branchY3, detectionX - spacing/2, branchY3);
    
    // Converge arrows
    drawArrow(detectionX - spacing/2, branchY1, detectionX, midY);
    drawArrow(detectionX - spacing/2, branchY2, detectionX, midY);
    drawArrow(detectionX - spacing/2, branchY3, detectionX, midY);
    
    // Draw detection output
    drawComponent(detectionX, midY, boxWidth, boxHeight, colors.detection, 'Object Detections');
    
    // Draw example detection
    const exampleX = detectionX + boxWidth + 70;
    const exampleY = midY;
    const exampleSize = 100;
    
    // Draw example image
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(exampleX, exampleY - exampleSize/2, exampleSize, exampleSize);
    
    // Draw center point
    ctx.fillStyle = colors.heatmap;
    ctx.beginPath();
    ctx.arc(exampleX + exampleSize/2, exampleY, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw bounding box from center
    ctx.strokeStyle = colors.detection;
    ctx.lineWidth = 2;
    ctx.strokeRect(exampleX + exampleSize/4, exampleY - exampleSize/4, exampleSize/2, exampleSize/2);
    
    // Add label
    ctx.font = '12px Arial';
    ctx.fillStyle = colors.detection;
    ctx.textAlign = 'center';
    ctx.fillText('Person: 0.94', exampleX + exampleSize/2, exampleY - exampleSize/4 - 5);
    
    // Helper function to draw a component box with text
    function drawComponent(x, y, width, height, color, text) {
        // Draw box
        ctx.fillStyle = color;
        ctx.fillRect(x, y - height/2, width, height);
        
        // Draw border
        ctx.strokeStyle = darkenColor(color);
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - height/2, width, height);
        
        // Draw text
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Handle multiline text
        const words = text.split(' ');
        if (words.length > 2) {
            const line1 = words.slice(0, Math.ceil(words.length/2)).join(' ');
            const line2 = words.slice(Math.ceil(words.length/2)).join(' ');
            ctx.fillText(line1, x + width/2, y - 10);
            ctx.fillText(line2, x + width/2, y + 10);
        } else {
            ctx.fillText(text, x + width/2, y);
        }
    }
    
    // Helper function to draw an arrow
    function drawArrow(fromX, fromY, toX, toY) {
        const headSize = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headSize * Math.cos(angle - Math.PI/6), toY - headSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(toX - headSize * Math.cos(angle + Math.PI/6), toY - headSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = colors.text;
        ctx.fill();
    }
    
    // Helper function to draw description text
    function drawDescription(x, y, text, color) {
        ctx.font = '12px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    }
    
    // Helper function to darken a color for borders
    function darkenColor(color) {
        // Simple darkening for example purposes
        return color;
    }
} 

// Generate DETR architecture visualization
function generateDETRArchitectureVisual() {
    const container = document.getElementById('detr-architecture');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1400;  // Increased width to prevent diagram from being cut off
    canvas.height = 480;
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';  // Ensure aspect ratio is maintained
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Define colors
    const colors = {
        input: '#3498db',      // blue
        backbone: '#2ecc71',   // green
        encoder: '#9b59b6',    // purple
        decoder: '#e74c3c',    // red
        query: '#f39c12',      // orange
        output: '#8e44ad',     // dark purple
        text: '#2c3e50',       // dark blue
        attention: '#34495e',  // dark gray
        matching: '#16a085'    // teal
    };
    
    // Define the architecture components and layout - with adjusted spacing
    const componentHeight = 60;
    const componentWidth = 110;
    const longComponentWidth = 160;
    const spacing = 60;       // Reduced spacing for better fit
    const startX = 60;
    const midY = canvas.height / 2;
    
    // Draw title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('DETR Architecture: End-to-End Object Detection with Transformers', canvas.width/2, 40);
    
    // Add subtitle
    ctx.font = 'italic 14px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Direct set prediction approach using a CNN backbone and Transformer encoder-decoder', canvas.width/2, 70);
    
    // Draw image input
    drawComponent(startX, midY, componentWidth, componentHeight, colors.input, 'Input Image');
    
    // Draw arrow to CNN backbone
    drawArrow(startX + componentWidth, midY, startX + componentWidth + spacing, midY);
    
    // Draw CNN backbone
    const backboneX = startX + componentWidth + spacing;
    drawComponent(backboneX, midY, componentWidth, componentHeight, colors.backbone, 'CNN Backbone');
    drawDescription(backboneX + componentWidth/2, midY + componentHeight/2 + 20, 'ResNet-50 or similar', colors.text);
    
    // Draw arrow to transformer encoder
    drawArrow(backboneX + componentWidth, midY, backboneX + componentWidth + spacing, midY);
    
    // Draw transformer encoder
    const encoderX = backboneX + componentWidth + spacing;
    drawComponent(encoderX, midY, longComponentWidth, componentHeight, colors.encoder, 'Transformer Encoder');
    drawDescription(encoderX + longComponentWidth/2, midY + componentHeight/2 + 20, 'Self-attention on feature maps', colors.text);
    
    // Draw attention visualization for encoder
    drawAttentionPattern(encoderX + longComponentWidth/2, midY - componentHeight/2 - 30, colors.encoder);
    
    // Object queries input - adjusted position
    const decoderX = encoderX + longComponentWidth + spacing * 1.5;
    const queriesX = decoderX - spacing;
    const queriesY = midY - 100;
    
    drawComponent(queriesX, queriesY, componentWidth, componentHeight, colors.query, 'Object Queries');
    drawDescription(queriesX + componentWidth/2, queriesY + componentHeight/2 + 20, 'Learned position embeddings', colors.text);
    
    // Draw arrow from Transformer Encoder to Transformer Decoder
    drawArrow(encoderX + longComponentWidth, midY, decoderX, midY);
    
    // Draw arrow from Object Queries to Transformer Decoder
    drawArrow(queriesX + componentWidth, queriesY, decoderX + longComponentWidth/2, queriesY + 60);
    
    // Draw transformer decoder
    drawComponent(decoderX, midY, longComponentWidth, componentHeight, colors.decoder, 'Transformer Decoder');
    drawDescription(decoderX + longComponentWidth/2, midY + componentHeight/2 + 20, 'Cross-attention mechanism', colors.text);
    
    // Draw attention visualization for decoder
    drawAttentionPattern(decoderX + longComponentWidth/2, midY - componentHeight/2 - 30, colors.decoder);
    
    // Draw arrow to outputs - adjusted spacing
    const outputsX = decoderX + longComponentWidth + spacing;
    drawArrow(decoderX + longComponentWidth, midY, outputsX, midY);
    
    // Split output into class and box predictions
    const classesY = midY - 50;
    const boxesY = midY + 50;
    
    // Draw arrows to split outputs
    drawArrow(outputsX, midY, outputsX + spacing/2, midY);
    drawArrow(outputsX + spacing/2, midY, outputsX + spacing, classesY);
    drawArrow(outputsX + spacing/2, midY, outputsX + spacing, boxesY);
    
    // Draw class predictions output
    drawComponent(outputsX + spacing, classesY, componentWidth, componentHeight, colors.output, 'Class Predictions');
    
    // Draw box predictions output
    drawComponent(outputsX + spacing, boxesY, componentWidth, componentHeight, colors.output, 'Box Predictions');
    
    // Draw bipartite matching between predictions and ground truth - adjusted position
    const matchingX = outputsX + spacing * 2 + componentWidth;
    drawComponent(matchingX, midY, componentWidth, componentHeight*1.5, colors.matching, 'Bipartite Matching Loss');
    drawDescription(matchingX + componentWidth/2, midY + componentHeight*1.5/2 + 20, 'One-to-one assignment', colors.text);
    
    // Draw arrow from class predictions to matching
    drawArrow(outputsX + spacing + componentWidth, classesY, matchingX, midY - componentHeight*1.5/4);
    
    // Draw arrow from box predictions to matching
    drawArrow(outputsX + spacing + componentWidth, boxesY, matchingX, midY + componentHeight*1.5/4);
    
    // Draw final output example - ensure this is visible
    const exampleX = matchingX + componentWidth + spacing;
    const exampleY = midY;
    const exampleSize = 120;
    
    // Draw example detection image
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(exampleX, exampleY - exampleSize/2, exampleSize, exampleSize);
    
    // Draw example objects in the detection
    ctx.strokeStyle = colors.output;
    ctx.lineWidth = 2;
    
    // Draw person detection
    ctx.strokeRect(exampleX + 20, exampleY - 40, 30, 70);
    ctx.font = '10px Arial';
    ctx.fillStyle = colors.output;
    ctx.textAlign = 'center';
    ctx.fillText('Person', exampleX + 35, exampleY - 45);
    
    // Draw car detection
    ctx.strokeRect(exampleX + 60, exampleY, 40, 25);
    ctx.fillText('Car', exampleX + 80, exampleY - 5);
    
    // Add a label to show this is the final output
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Final Detections', exampleX + exampleSize/2, exampleY + exampleSize/2 + 20);
    
    // Draw arrow from matching to final output
    drawArrow(matchingX + componentWidth, midY, exampleX, midY);
    
    // Helper function to draw attention pattern
    function drawAttentionPattern(x, y, color) {
        // Draw multiple circles with decreasing opacity to simulate attention heatmap
        for(let i = 4; i > 0; i--) {
            ctx.beginPath();
            ctx.arc(x, y, i * 5, 0, Math.PI * 2);
            ctx.fillStyle = `${color}${40 - i * 10}`;
            ctx.fill();
        }
    }
    
    // Helper function to draw a component box with text
    function drawComponent(x, y, width, height, color, text) {
        // Draw box
        ctx.fillStyle = color;
        ctx.fillRect(x, y - height/2, width, height);
        
        // Draw border
        ctx.strokeStyle = darkenColor(color);
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - height/2, width, height);
        
        // Draw text
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Handle multiline text
        const words = text.split(' ');
        if (words.length > 2) {
            const line1 = words.slice(0, Math.ceil(words.length/2)).join(' ');
            const line2 = words.slice(Math.ceil(words.length/2)).join(' ');
            ctx.fillText(line1, x + width/2, y - 10);
            ctx.fillText(line2, x + width/2, y + 10);
        } else {
            ctx.fillText(text, x + width/2, y);
        }
    }
    
    // Helper function to draw an arrow
    function drawArrow(fromX, fromY, toX, toY) {
        const headSize = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headSize * Math.cos(angle - Math.PI/6), toY - headSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(toX - headSize * Math.cos(angle + Math.PI/6), toY - headSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = colors.text;
        ctx.fill();
    }
    
    // Helper function to draw description text
    function drawDescription(x, y, text, color) {
        ctx.font = '12px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    }
    
    // Helper function to darken a color for borders
    function darkenColor(color) {
        // Simple darkening for example purposes
        return color;
    }
} 

// Create Faster R-CNN detection image
function createFasterRCNNDetectionImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw background (street scene)
    ctx.fillStyle = '#87CEEB'; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground/road
    ctx.fillStyle = '#555555'; // Dark gray for road
    ctx.fillRect(0, 250, canvas.width, 150);
    
    // Draw buildings/background objects
    ctx.fillStyle = '#8B4513'; // Building color
    ctx.fillRect(50, 100, 120, 150);
    ctx.fillRect(200, 80, 150, 170);
    ctx.fillRect(400, 120, 100, 130);
    
    // CHARACTERISTIC FEATURE 1: Precise bounding boxes with high confidence percentages
    // Draw cars with precise bounding boxes and high confidence
    drawRectWithLabel(ctx, 80, 280, 100, 50, 'Car: 98%', '#FF0000');
    drawRectWithLabel(ctx, 250, 270, 120, 60, 'Car: 99%', '#FF0000');
    drawRectWithLabel(ctx, 430, 260, 90, 55, 'Car: 96%', '#FF0000');
    
    // Draw people with precise bounding boxes and high confidence
    drawRectWithLabel(ctx, 180, 220, 25, 50, 'Person: 95%', '#00FF00');
    drawRectWithLabel(ctx, 350, 200, 30, 70, 'Person: 97%', '#00FF00');
    
    // CHARACTERISTIC FEATURE 2: Region Proposal Network visualization (simplified)
    // Draw a few example region proposals (semi-transparent)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    // Car proposals
    ctx.strokeRect(75, 275, 110, 60);
    ctx.strokeRect(245, 265, 130, 70);
    ctx.strokeRect(425, 255, 100, 65);
    // Person proposals
    ctx.strokeRect(175, 215, 35, 60);
    ctx.strokeRect(345, 195, 40, 80);
    
    // Add Faster R-CNN style info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 230, 30);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Faster R-CNN Detection', 10, 20);
    
    return canvas;
}

// Create YOLO detection image
function createYOLODetectionImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw background (urban scene)
    ctx.fillStyle = '#87CEEB'; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground/road
    ctx.fillStyle = '#555555'; // Dark gray for road
    ctx.fillRect(0, 280, canvas.width, 120);
    
    // Draw buildings/background objects
    ctx.fillStyle = '#8B4513'; // Building color
    ctx.fillRect(20, 100, 140, 180);
    ctx.fillRect(220, 80, 130, 200);
    ctx.fillRect(420, 120, 160, 160);
    
    // CHARACTERISTIC FEATURE 1: YOLO grid overlay
    // Draw more prominent grid lines to emphasize YOLO's grid-based approach
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw grid cells (YOLO divides image into grid cells)
    const gridSize = 100;
    
    // Draw vertical grid lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // CHARACTERISTIC FEATURE 2: Simple format labels with lower confidence values
    // Draw cars (YOLO style - simpler labels, no ":" format)
    drawRectWithLabel(ctx, 75, 290, 110, 60, 'car 0.92', '#FF0000');
    drawRectWithLabel(ctx, 240, 280, 130, 65, 'car 0.88', '#FF0000');
    drawRectWithLabel(ctx, 420, 270, 100, 70, 'car 0.79', '#FF0000');
    
    // Draw people (YOLO style)
    drawRectWithLabel(ctx, 170, 230, 30, 60, 'person 0.85', '#00FF00');
    drawRectWithLabel(ctx, 360, 210, 35, 80, 'person 0.82', '#00FF00');
    
    // Draw a traffic sign
    drawRectWithLabel(ctx, 290, 150, 40, 40, 'sign 0.76', '#0000FF');
    
    // Add YOLO style info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 180, 30);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('YOLO Detection', 10, 20);
    
    return canvas;
}

// Create DETR detection image
function createDETRDetectionImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw background (urban scene)
    ctx.fillStyle = '#87CEEB'; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground/road
    ctx.fillStyle = '#555555'; // Dark gray for road
    ctx.fillRect(0, 260, canvas.width, 140);
    
    // Draw buildings/background objects
    ctx.fillStyle = '#8B4513'; // Building color
    ctx.fillRect(30, 90, 120, 170);
    ctx.fillRect(210, 70, 140, 190);
    ctx.fillRect(410, 110, 150, 150);
    
    // Draw dot attention for transformer approach
    const attentionPoints = [
        {x: 130, y: 300}, {x: 260, y: 290}, {x: 420, y: 280}, // Cars
        {x: 180, y: 220}, {x: 350, y: 200},                  // People
        {x: 500, y: 180}                                     // Traffic light
    ];
    
    // Draw attention dots
    ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
    attentionPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw query connections (transformer attention visualization)
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.3)';
    ctx.lineWidth = 2;
    
    // Central query point
    const queryX = 300;
    const queryY = 200;
    
    // Draw connections from query to attention points
    attentionPoints.forEach(point => {
        ctx.beginPath();
        ctx.moveTo(queryX, queryY);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    });
    
    // Draw cars
    drawRectWithLabel(ctx, 80, 285, 100, 50, 'car (0.97)', '#FF0000', true);
    drawRectWithLabel(ctx, 250, 275, 120, 60, 'car (0.98)', '#FF0000', true);
    drawRectWithLabel(ctx, 430, 265, 90, 55, 'car (0.94)', '#FF0000', true);
    
    // Draw people
    drawRectWithLabel(ctx, 180, 220, 25, 50, 'person (0.96)', '#00FF00', true);
    drawRectWithLabel(ctx, 350, 200, 30, 70, 'person (0.95)', '#00FF00', true);
    
    // Add traffic light
    drawRectWithLabel(ctx, 500, 180, 15, 30, 'traffic light (0.89)', '#0000FF', true);
    
    // Add DETR style info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 180, 30);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('DETR Detection', 10, 20);
    
    return canvas;
}