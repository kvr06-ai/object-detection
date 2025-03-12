// Visualizations and interactive demos for Object Detection Evolution article

document.addEventListener('DOMContentLoaded', () => {
    // Initialize visualizations once the content is loaded
    initHOGDemo();
    initPerformanceComparison();
    initYOLOConfidenceDemo();
    initNetworkArchitectureViz();
    initAlgorithmComparisonChart();
    initDETRAttentionDemo();
    initDetectorChallenge();
});

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
    
    // Sample detection data (would come from a real model in production)
    const detections = [
        { class: 'person', confidence: 0.92, box: [50, 30, 100, 200] },
        { class: 'car', confidence: 0.85, box: [150, 100, 250, 180] },
        { class: 'bicycle', confidence: 0.76, box: [300, 150, 400, 220] },
        { class: 'dog', confidence: 0.67, box: [250, 250, 320, 320] },
        { class: 'cat', confidence: 0.55, box: [400, 200, 450, 250] },
        { class: 'bird', confidence: 0.42, box: [350, 50, 380, 80] },
        { class: 'chair', confidence: 0.38, box: [100, 280, 180, 350] },
        { class: 'bottle', confidence: 0.25, box: [420, 300, 440, 350] }
    ];
    
    // Update detections based on confidence threshold
    function updateDetections(threshold) {
        if (!detectionOutput) return;
        
        // Filter detections by confidence threshold
        const visibleDetections = detections.filter(d => d.confidence >= threshold);
        
        // Update visualization
        detectionOutput.innerHTML = `
            <div class="detection-image-container">
                <div class="detection-image">
                    ${visibleDetections.map(d => {
                        const [x, y, width, height] = d.box;
                        return `<div class="detection-box" style="left: ${x}px; top: ${y}px; width: ${width - x}px; height: ${height - y}px;">
                            <div class="detection-label">${d.class} (${Math.round(d.confidence * 100)}%)</div>
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
                                <td>${d.class}</td>
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

// DETR Attention visualization demo
function initDETRAttentionDemo() {
    const detrDemo = document.getElementById('detr-attention-demo');
    if (!detrDemo) return;
    
    const detrVisualization = document.getElementById('detr-visualization');
    if (!detrVisualization) return;
    
    // Sample image and detections
    detrVisualization.innerHTML = `
        <div class="detr-demo">
            <p>Select an object to visualize DETR's attention mechanism.</p>
            <div class="detr-image-container">
                <img src="https://source.unsplash.com/random/600x400/?street" alt="Sample image for DETR attention" class="detr-image">
                <div class="detr-detection" data-id="1" style="left: 50px; top: 100px; width: 100px; height: 150px;">
                    <div class="detr-label">Person (92%)</div>
                </div>
                <div class="detr-detection" data-id="2" style="left: 200px; top: 150px; width: 120px; height: 80px;">
                    <div class="detr-label">Car (89%)</div>
                </div>
                <div class="detr-detection" data-id="3" style="left: 350px; top: 50px; width: 80px; height: 60px;">
                    <div class="detr-label">Traffic Sign (76%)</div>
                </div>
                <div class="detr-attention-map" id="attention-map"></div>
            </div>
            <div class="detr-controls">
                <button class="btn" id="attention-toggle">Toggle Attention Map</button>
                <div class="detr-info">
                    <p>DETR uses a Transformer architecture where each object query attends to different parts of the image. The attention map shows which parts of the image the model focused on for each detection.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for the DETR demo
    const style = document.createElement('style');
    style.textContent = `
        .detr-demo {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .detr-image-container {
            position: relative;
            margin: 1rem 0;
        }
        .detr-image {
            max-width: 100%;
            display: block;
        }
        .detr-detection {
            position: absolute;
            border: 2px solid #3498db;
            background-color: rgba(52, 152, 219, 0.1);
            cursor: pointer;
            transition: all 0.3s;
        }
        .detr-detection:hover {
            background-color: rgba(52, 152, 219, 0.3);
        }
        .detr-detection.active {
            border-color: #e74c3c;
            background-color: rgba(231, 76, 60, 0.2);
        }
        .detr-label {
            position: absolute;
            top: -25px;
            left: 0;
            background-color: #3498db;
            color: white;
            padding: 2px 6px;
            font-size: 12px;
            border-radius: 4px;
        }
        .detr-detection.active .detr-label {
            background-color: #e74c3c;
        }
        .detr-attention-map {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        .detr-attention-map.visible {
            opacity: 0.7;
        }
        .detr-controls {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        .detr-info {
            max-width: 600px;
            text-align: center;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
    
    // Set up event handlers
    const detections = document.querySelectorAll('.detr-detection');
    const attentionMap = document.getElementById('attention-map');
    const attentionToggle = document.getElementById('attention-toggle');
    
    let isAttentionVisible = false;
    let activeDetection = null;
    
    // Simulated attention maps (in a real implementation, these would come from the model)
    const attentionMaps = {
        '1': 'https://miro.medium.com/max/700/1*TRZrTcCCnuA5yTNO705f5g.jpeg',
        '2': 'https://miro.medium.com/max/700/1*QQCm4r-V2StupIsRmA3d1A.jpeg',
        '3': 'https://miro.medium.com/max/700/1*vvfRrNV2EiEH9iCl7_Vhgw.jpeg'
    };
    
    detections.forEach(detection => {
        detection.addEventListener('click', function() {
            if (activeDetection) {
                activeDetection.classList.remove('active');
            }
            
            this.classList.add('active');
            activeDetection = this;
            
            const detectionId = this.getAttribute('data-id');
            attentionMap.style.backgroundImage = `url(${attentionMaps[detectionId]})`;
            
            if (!isAttentionVisible) {
                attentionMap.classList.add('visible');
                isAttentionVisible = true;
                attentionToggle.textContent = 'Hide Attention Map';
            }
        });
    });
    
    if (attentionToggle) {
        attentionToggle.addEventListener('click', function() {
            if (isAttentionVisible) {
                attentionMap.classList.remove('visible');
                this.textContent = 'Show Attention Map';
            } else {
                attentionMap.classList.add('visible');
                this.textContent = 'Hide Attention Map';
            }
            isAttentionVisible = !isAttentionVisible;
        });
    }
}

// Interactive detector challenge
function initDetectorChallenge() {
    const challenge = document.getElementById('detector-challenge');
    if (!challenge) return;
    
    // Sample detector outputs
    const detectorOutputs = [
        {
            id: 1,
            image: 'https://production-media.paperswithcode.com/methods/teaser_ICCVW_2019.jpg',
            detector: 'Faster R-CNN',
            difficulty: 'medium'
        },
        {
            id: 2,
            image: 'https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-27_at_2.44.42_PM.png',
            detector: 'YOLO',
            difficulty: 'easy'
        },
        {
            id: 3,
            image: 'https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-23_at_4.49.40_PM_c7jyRxJ.png',
            detector: 'DETR',
            difficulty: 'hard'
        }
    ];
    
    // Generate challenge cards
    let challengeHTML = '';
    
    detectorOutputs.forEach(output => {
        challengeHTML += `
            <div class="challenge-card" data-id="${output.id}">
                <div class="challenge-image">
                    <img src="${output.image}" alt="Detection output ${output.id}">
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
            max-width: 400px;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            background-color: white;
        }
        .challenge-image {
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        .challenge-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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