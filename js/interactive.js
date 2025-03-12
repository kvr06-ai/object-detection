// Interactive elements for Object Detection Evolution article

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the interactive elements
    initAnchorBoxDemo();
    initIoUDemo();
    initModelSelection();
    initRoiPoolingDemo();
});

// Interactive Anchor Box Demonstration
function initAnchorBoxDemo() {
    const anchorDemo = document.getElementById('anchor-box-demo');
    if (!anchorDemo) return;
    
    const canvas = document.getElementById('anchor-box-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const imageWidth = canvas.width;
    const imageHeight = canvas.height;
    
    // Default anchor parameters
    let gridSize = 4;
    let scaleCount = 3;
    let aspectRatios = [0.5, 1, 2];
    
    // Get sliders
    const gridSlider = document.getElementById('grid-size-slider');
    const scaleSlider = document.getElementById('scale-count-slider');
    
    // Update anchor box visualization
    function updateAnchorBoxes() {
        // Clear canvas
        ctx.clearRect(0, 0, imageWidth, imageHeight);
        
        // Draw placeholder image background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, imageWidth, imageHeight);
        
        // Draw grid
        const cellWidth = imageWidth / gridSize;
        const cellHeight = imageHeight / gridSize;
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 1; i < gridSize; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i * cellWidth, 0);
            ctx.lineTo(i * cellWidth, imageHeight);
            ctx.stroke();
            
            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i * cellHeight);
            ctx.lineTo(imageWidth, i * cellHeight);
            ctx.stroke();
        }
        
        // Draw anchor boxes for one cell as an example
        const centerX = imageWidth / 2;
        const centerY = imageHeight / 2;
        
        // Draw center point
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw anchor boxes with different scales and aspect ratios
        const colors = ['rgba(52, 152, 219, 0.5)', 'rgba(46, 204, 113, 0.5)', 'rgba(155, 89, 182, 0.5)'];
        
        for (let s = 0; s < scaleCount; s++) {
            const scale = 0.3 + (s * 0.2); // Scale factors: 0.3, 0.5, 0.7, etc.
            
            aspectRatios.forEach((ratio, i) => {
                const width = cellWidth * scale * Math.sqrt(ratio);
                const height = cellHeight * scale / Math.sqrt(ratio);
                
                ctx.strokeStyle = colors[i % colors.length];
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(centerX - width/2, centerY - height/2, width, height);
                ctx.stroke();
            });
        }
    }
    
    // Set up event listeners
    if (gridSlider) {
        gridSlider.addEventListener('input', function() {
            gridSize = parseInt(this.value);
            document.getElementById('grid-size-value').textContent = gridSize;
            updateAnchorBoxes();
        });
    }
    
    if (scaleSlider) {
        scaleSlider.addEventListener('input', function() {
            scaleCount = parseInt(this.value);
            document.getElementById('scale-count-value').textContent = scaleCount;
            updateAnchorBoxes();
        });
    }
    
    // Initialize visualization
    updateAnchorBoxes();
}

// Interactive IoU (Intersection over Union) Demonstration
function initIoUDemo() {
    const iouDemo = document.getElementById('iou-demo');
    if (!iouDemo) return;
    
    const canvas = document.getElementById('iou-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Default box positions
    let box1 = { x: 50, y: 50, width: 150, height: 100 };
    let box2 = { x: 100, y: 70, width: 120, height: 120 };
    let activeBox = null;
    let activeHandle = null;
    let dragStart = { x: 0, y: 0 };
    
    // Calculate IoU between two boxes
    function calculateIoU(boxA, boxB) {
        const xA = Math.max(boxA.x, boxB.x);
        const yA = Math.max(boxA.y, boxB.y);
        const xB = Math.min(boxA.x + boxA.width, boxB.x + boxB.width);
        const yB = Math.min(boxA.y + boxA.height, boxB.y + boxB.height);
        
        // Area of intersection
        const interArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
        
        // Area of both boxes
        const boxAArea = boxA.width * boxA.height;
        const boxBArea = boxB.width * boxB.height;
        
        // Calculate IoU
        const unionArea = boxAArea + boxBArea - interArea;
        return interArea / unionArea;
    }
    
    // Draw boxes and IoU value
    function drawBoxes() {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw box 1 (ground truth)
        ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
        ctx.fillRect(box1.x, box1.y, box1.width, box1.height);
        ctx.strokeStyle = 'rgb(46, 204, 113)';
        ctx.lineWidth = 2;
        ctx.strokeRect(box1.x, box1.y, box1.width, box1.height);
        
        // Draw box 2 (prediction)
        ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
        ctx.fillRect(box2.x, box2.y, box2.width, box2.height);
        ctx.strokeStyle = 'rgb(52, 152, 219)';
        ctx.lineWidth = 2;
        ctx.strokeRect(box2.x, box2.y, box2.width, box2.height);
        
        // Draw intersection area
        const xA = Math.max(box1.x, box2.x);
        const yA = Math.max(box1.y, box2.y);
        const xB = Math.min(box1.x + box1.width, box2.x + box2.width);
        const yB = Math.min(box1.y + box1.height, box2.y + box2.height);
        
        if (xB > xA && yB > yA) {
            ctx.fillStyle = 'rgba(155, 89, 182, 0.5)';
            ctx.fillRect(xA, yA, xB - xA, yB - yA);
        }
        
        // Draw resize handles for both boxes
        drawResizeHandles(box1, 'rgb(46, 204, 113)');
        drawResizeHandles(box2, 'rgb(52, 152, 219)');
        
        // Calculate and display IoU
        const iou = calculateIoU(box1, box2);
        document.getElementById('iou-value').textContent = (iou * 100).toFixed(2) + '%';
        
        // Update IoU threshold visualization
        updateIoUThreshold(iou);
    }
    
    // Draw resize handles for a box
    function drawResizeHandles(box, color) {
        const handleSize = 8;
        ctx.fillStyle = color;
        
        // Corner handles
        ctx.fillRect(box.x - handleSize/2, box.y - handleSize/2, handleSize, handleSize);
        ctx.fillRect(box.x + box.width - handleSize/2, box.y - handleSize/2, handleSize, handleSize);
        ctx.fillRect(box.x - handleSize/2, box.y + box.height - handleSize/2, handleSize, handleSize);
        ctx.fillRect(box.x + box.width - handleSize/2, box.y + box.height - handleSize/2, handleSize, handleSize);
    }
    
    // Update IoU threshold visualization
    function updateIoUThreshold(iou) {
        const thresholdSlider = document.getElementById('iou-threshold-slider');
        if (!thresholdSlider) return;
        
        const threshold = parseFloat(thresholdSlider.value);
        document.getElementById('iou-threshold-value').textContent = (threshold * 100).toFixed(0) + '%';
        
        const result = document.getElementById('iou-threshold-result');
        if (result) {
            if (iou >= threshold) {
                result.textContent = 'Positive Detection (IoU ≥ threshold)';
                result.className = 'positive-detection';
            } else {
                result.textContent = 'Negative Detection (IoU < threshold)';
                result.className = 'negative-detection';
            }
        }
    }
    
    // Find if a point is within a resize handle
    function getHandleAt(x, y) {
        const handleSize = 8;
        const boxes = [box1, box2];
        const boxNames = ['box1', 'box2'];
        
        for (let b = 0; b < boxes.length; b++) {
            const box = boxes[b];
            const boxName = boxNames[b];
            
            // Check top-left handle
            if (Math.abs(x - box.x) <= handleSize/2 && Math.abs(y - box.y) <= handleSize/2) {
                return { box: boxName, handle: 'tl' };
            }
            
            // Check top-right handle
            if (Math.abs(x - (box.x + box.width)) <= handleSize/2 && Math.abs(y - box.y) <= handleSize/2) {
                return { box: boxName, handle: 'tr' };
            }
            
            // Check bottom-left handle
            if (Math.abs(x - box.x) <= handleSize/2 && Math.abs(y - (box.y + box.height)) <= handleSize/2) {
                return { box: boxName, handle: 'bl' };
            }
            
            // Check bottom-right handle
            if (Math.abs(x - (box.x + box.width)) <= handleSize/2 && Math.abs(y - (box.y + box.height)) <= handleSize/2) {
                return { box: boxName, handle: 'br' };
            }
            
            // Check if inside the box (for moving)
            if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                return { box: boxName, handle: 'move' };
            }
        }
        
        return null;
    }
    
    // Set up event listeners for canvas
    if (canvas) {
        // Mouse down event
        canvas.addEventListener('mousedown', function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const hit = getHandleAt(x, y);
            if (hit) {
                activeBox = hit.box;
                activeHandle = hit.handle;
                dragStart = { x, y };
                canvas.style.cursor = 'grabbing';
            }
        });
        
        // Mouse move event
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // If dragging
            if (activeBox && activeHandle) {
                const box = activeBox === 'box1' ? box1 : box2;
                const dx = x - dragStart.x;
                const dy = y - dragStart.y;
                
                if (activeHandle === 'move') {
                    // Move the entire box
                    box.x += dx;
                    box.y += dy;
                } else {
                    // Resize the box
                    if (activeHandle.includes('t')) {
                        box.y += dy;
                        box.height -= dy;
                    }
                    if (activeHandle.includes('b')) {
                        box.height += dy;
                    }
                    if (activeHandle.includes('l')) {
                        box.x += dx;
                        box.width -= dx;
                    }
                    if (activeHandle.includes('r')) {
                        box.width += dx;
                    }
                    
                    // Ensure minimum dimensions
                    if (box.width < 20) box.width = 20;
                    if (box.height < 20) box.height = 20;
                }
                
                dragStart = { x, y };
                drawBoxes();
            } else {
                // Update cursor based on what's under it
                const hit = getHandleAt(x, y);
                if (hit) {
                    if (hit.handle === 'move') {
                        canvas.style.cursor = 'grab';
                    } else if (hit.handle === 'tl' || hit.handle === 'br') {
                        canvas.style.cursor = 'nwse-resize';
                    } else {
                        canvas.style.cursor = 'nesw-resize';
                    }
                } else {
                    canvas.style.cursor = 'default';
                }
            }
        });
        
        // Mouse up event
        canvas.addEventListener('mouseup', function() {
            activeBox = null;
            activeHandle = null;
            canvas.style.cursor = 'default';
        });
        
        // Mouse leave event
        canvas.addEventListener('mouseleave', function() {
            activeBox = null;
            activeHandle = null;
            canvas.style.cursor = 'default';
        });
    }
    
    // Set up IoU threshold slider
    const thresholdSlider = document.getElementById('iou-threshold-slider');
    if (thresholdSlider) {
        thresholdSlider.addEventListener('input', function() {
            const iou = calculateIoU(box1, box2);
            updateIoUThreshold(iou);
        });
    }
    
    // Initialize the visualization
    drawBoxes();
}

// Interactive ROI Pooling Demonstration
function initRoiPoolingDemo() {
    const roiDemo = document.getElementById('roi-pooling-demo');
    if (!roiDemo) return;
    
    const canvas = document.getElementById('roi-pooling-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Default feature map size
    let featureMapSize = 8;
    let poolSize = 2;
    
    // Selected region
    let roi = { x: 2, y: 2, width: 3, height: 3 };
    
    // Generate random feature map values
    let featureMap = [];
    function generateFeatureMap() {
        featureMap = [];
        for (let i = 0; i < featureMapSize; i++) {
            const row = [];
            for (let j = 0; j < featureMapSize; j++) {
                row.push(Math.random());
            }
            featureMap.push(row);
        }
    }
    
    // Draw feature map and ROI pooling
    function drawRoiPooling() {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Calculate cell size
        const cellSize = canvasWidth / featureMapSize;
        
        // Draw feature map
        for (let i = 0; i < featureMapSize; i++) {
            for (let j = 0; j < featureMapSize; j++) {
                const value = featureMap[i][j];
                const intensity = Math.floor(value * 255);
                ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                
                // Draw cell borders
                ctx.strokeStyle = '#888';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
                
                // Draw value
                ctx.fillStyle = value > 0.5 ? 'black' : 'white';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(value.toFixed(2), j * cellSize + cellSize/2, i * cellSize + cellSize/2);
            }
        }
        
        // Draw ROI
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(roi.x * cellSize, roi.y * cellSize, roi.width * cellSize, roi.height * cellSize);
        
        // Perform ROI pooling
        const pooled = performRoiPooling();
        
        // Draw pooled result
        const resultOffset = canvasWidth + 20;
        const resultCellSize = 50;
        
        // Draw pooled cells
        for (let i = 0; i < poolSize; i++) {
            for (let j = 0; j < poolSize; j++) {
                const value = pooled[i][j];
                const intensity = Math.floor(value * 255);
                ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
                ctx.fillRect(resultOffset + j * resultCellSize, i * resultCellSize, resultCellSize, resultCellSize);
                
                // Draw cell borders
                ctx.strokeStyle = '#888';
                ctx.lineWidth = 1;
                ctx.strokeRect(resultOffset + j * resultCellSize, i * resultCellSize, resultCellSize, resultCellSize);
                
                // Draw value
                ctx.fillStyle = value > 0.5 ? 'black' : 'white';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(value.toFixed(2), resultOffset + j * resultCellSize + resultCellSize/2, i * resultCellSize + resultCellSize/2);
            }
        }
    }
    
    // Perform ROI pooling operation
    function performRoiPooling() {
        const result = [];
        
        // Calculate bin size
        const binWidth = roi.width / poolSize;
        const binHeight = roi.height / poolSize;
        
        for (let i = 0; i < poolSize; i++) {
            const row = [];
            for (let j = 0; j < poolSize; j++) {
                // Calculate bin boundaries
                const startX = Math.floor(roi.x + j * binWidth);
                const startY = Math.floor(roi.y + i * binHeight);
                const endX = Math.floor(roi.x + (j + 1) * binWidth);
                const endY = Math.floor(roi.y + (i + 1) * binHeight);
                
                // Ensure boundaries are within feature map
                const safeStartX = Math.max(0, startX);
                const safeStartY = Math.max(0, startY);
                const safeEndX = Math.min(featureMapSize - 1, endX);
                const safeEndY = Math.min(featureMapSize - 1, endY);
                
                // Perform max pooling
                let maxValue = 0;
                for (let y = safeStartY; y <= safeEndY; y++) {
                    for (let x = safeStartX; x <= safeEndX; x++) {
                        maxValue = Math.max(maxValue, featureMap[y][x]);
                    }
                }
                
                row.push(maxValue);
            }
            result.push(row);
        }
        
        return result;
    }
    
    // Set up ROI controls
    const roiXSlider = document.getElementById('roi-x-slider');
    const roiYSlider = document.getElementById('roi-y-slider');
    const roiWidthSlider = document.getElementById('roi-width-slider');
    const roiHeightSlider = document.getElementById('roi-height-slider');
    
    if (roiXSlider) {
        roiXSlider.max = featureMapSize - 1;
        roiXSlider.addEventListener('input', function() {
            roi.x = parseInt(this.value);
            document.getElementById('roi-x-value').textContent = roi.x;
            
            // Ensure ROI stays within bounds
            if (roi.x + roi.width > featureMapSize) {
                roi.width = featureMapSize - roi.x;
                roiWidthSlider.value = roi.width;
                document.getElementById('roi-width-value').textContent = roi.width;
            }
            
            drawRoiPooling();
        });
    }
    
    if (roiYSlider) {
        roiYSlider.max = featureMapSize - 1;
        roiYSlider.addEventListener('input', function() {
            roi.y = parseInt(this.value);
            document.getElementById('roi-y-value').textContent = roi.y;
            
            // Ensure ROI stays within bounds
            if (roi.y + roi.height > featureMapSize) {
                roi.height = featureMapSize - roi.y;
                roiHeightSlider.value = roi.height;
                document.getElementById('roi-height-value').textContent = roi.height;
            }
            
            drawRoiPooling();
        });
    }
    
    if (roiWidthSlider) {
        roiWidthSlider.max = featureMapSize;
        roiWidthSlider.addEventListener('input', function() {
            roi.width = parseInt(this.value);
            document.getElementById('roi-width-value').textContent = roi.width;
            
            // Ensure ROI stays within bounds
            if (roi.x + roi.width > featureMapSize) {
                roi.width = featureMapSize - roi.x;
                this.value = roi.width;
                document.getElementById('roi-width-value').textContent = roi.width;
            }
            
            drawRoiPooling();
        });
    }
    
    if (roiHeightSlider) {
        roiHeightSlider.max = featureMapSize;
        roiHeightSlider.addEventListener('input', function() {
            roi.height = parseInt(this.value);
            document.getElementById('roi-height-value').textContent = roi.height;
            
            // Ensure ROI stays within bounds
            if (roi.y + roi.height > featureMapSize) {
                roi.height = featureMapSize - roi.y;
                this.value = roi.height;
                document.getElementById('roi-height-value').textContent = roi.height;
            }
            
            drawRoiPooling();
        });
    }
    
    // Pool size control
    const poolSizeSlider = document.getElementById('pool-size-slider');
    if (poolSizeSlider) {
        poolSizeSlider.addEventListener('input', function() {
            poolSize = parseInt(this.value);
            document.getElementById('pool-size-value').textContent = poolSize;
            drawRoiPooling();
        });
    }
    
    // Regenerate button
    const regenerateBtn = document.getElementById('regenerate-feature-map');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', function() {
            generateFeatureMap();
            drawRoiPooling();
        });
    }
    
    // Initialize feature map and visualization
    generateFeatureMap();
    drawRoiPooling();
}

// Model Selection Interactive Demo
function initModelSelection() {
    const modelSelector = document.getElementById('model-selection-demo');
    if (!modelSelector) return;
    
    // Get reference to selectors and output
    const taskSelect = document.getElementById('task-select');
    const speedSelect = document.getElementById('speed-select');
    const accuracySelect = document.getElementById('accuracy-select');
    const modelOutput = document.getElementById('recommended-model');
    
    // Model recommendation logic
    function updateRecommendation() {
        if (!taskSelect || !speedSelect || !accuracySelect || !modelOutput) return;
        
        const task = taskSelect.value;
        const speed = speedSelect.value;
        const accuracy = accuracySelect.value;
        
        let recommendedModel = '';
        let explanation = '';
        
        // Basic decision tree for model recommendation
        if (task === 'general') {
            if (speed === 'real-time' && accuracy === 'high') {
                recommendedModel = 'YOLOv7';
                explanation = 'Offers an excellent balance of speed and accuracy for general object detection.';
            } else if (speed === 'real-time' && accuracy === 'medium') {
                recommendedModel = 'YOLOv5';
                explanation = 'Faster than YOLOv7 with good accuracy for most general applications.';
            } else if (speed === 'batch' && accuracy === 'high') {
                recommendedModel = 'Faster R-CNN with FPN';
                explanation = 'Higher accuracy at the cost of speed, suitable for offline processing.';
            } else {
                recommendedModel = 'SSD';
                explanation = 'Good balance for offline processing with medium accuracy requirements.';
            }
        } else if (task === 'small-objects') {
            if (accuracy === 'high') {
                recommendedModel = 'Faster R-CNN with FPN';
                explanation = 'Excellent for small object detection due to its feature pyramid approach.';
            } else {
                recommendedModel = 'YOLOv7 with small anchor scales';
                explanation = 'Can be tuned for small objects while maintaining reasonable speed.';
            }
        } else if (task === 'instance-segmentation') {
            if (speed === 'real-time') {
                recommendedModel = 'YOLACT';
                explanation = 'Real-time instance segmentation with good accuracy.';
            } else {
                recommendedModel = 'Mask R-CNN';
                explanation = 'The gold standard for high-quality instance segmentation.';
            }
        } else if (task === 'pose-estimation') {
            recommendedModel = 'MoveNet or Detectron2';
            explanation = 'Specialized models for human pose estimation with good performance.';
        }
        
        // Update the output
        modelOutput.innerHTML = `
            <div class="recommended-model">
                <h3>${recommendedModel}</h3>
                <p>${explanation}</p>
                <div class="model-specs">
                    <div class="spec">
                        <span class="spec-label">Task:</span>
                        <span class="spec-value">${task.replace('-', ' ')}</span>
                    </div>
                    <div class="spec">
                        <span class="spec-label">Speed Priority:</span>
                        <span class="spec-value">${speed}</span>
                    </div>
                    <div class="spec">
                        <span class="spec-label">Accuracy Priority:</span>
                        <span class="spec-value">${accuracy}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Set up event listeners
    if (taskSelect && speedSelect && accuracySelect) {
        taskSelect.addEventListener('change', updateRecommendation);
        speedSelect.addEventListener('change', updateRecommendation);
        accuracySelect.addEventListener('change', updateRecommendation);
        
        // Initialize with default values
        updateRecommendation();
    }
} 