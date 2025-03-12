// Main JavaScript file for Object Detection Evolution article

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the timeline
    initTimeline();
    
    // Initialize interactive demos once the page is loaded
    initInteractiveDemos();
    
    // Handle smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Handle active states for TOC links
    initTOCHighlighting();
});

// Create the timeline of object detection evolution
function initTimeline() {
    const timeline = document.getElementById('detection-timeline');
    if (!timeline) return;
    
    // Timeline data - major object detection algorithms and their years
    const timelineData = [
        { year: 2001, name: "Viola-Jones", description: "Face detection using Haar features and cascade classifiers" },
        { year: 2005, name: "HOG + SVM", description: "Histogram of Oriented Gradients with Support Vector Machines" },
        { year: 2008, name: "DPM", description: "Deformable Parts Models for handling object deformation" },
        { year: 2014, name: "R-CNN", description: "Region-CNN, the deep learning breakthrough for object detection" },
        { year: 2015, name: "Fast R-CNN", description: "Streamlined detection with RoI pooling mechanism" },
        { year: 2015, name: "Faster R-CNN", description: "End-to-end detection with Region Proposal Network" },
        { year: 2016, name: "SSD", description: "Single Shot MultiBox Detector for real-time performance" },
        { year: 2016, name: "YOLO v1", description: "You Only Look Once, original grid-based approach" },
        { year: 2017, name: "YOLO v2", description: "Improved YOLO with anchor boxes" },
        { year: 2017, name: "FPN", description: "Feature Pyramid Networks for multi-scale feature representation" },
        { year: 2017, name: "RetinaNet", description: "Focal Loss to address class imbalance problem" },
        { year: 2017, name: "Mask R-CNN", description: "Instance segmentation with parallel mask and box prediction" },
        { year: 2018, name: "YOLOv3", description: "Multi-scale predictions and better feature extraction" },
        { year: 2019, name: "CornerNet", description: "Keypoint-based detection without anchors" },
        { year: 2019, name: "CenterNet", description: "Objects as points for efficient detection" },
        { year: 2019, name: "FCOS", description: "Fully Convolutional One-Stage anchor-free detector" },
        { year: 2020, name: "DETR", description: "DEtection TRansformer with set-based predictions" },
        { year: 2020, name: "YOLOv4", description: "Optimized for practical applications" },
        { year: 2021, name: "Swin Transformer", description: "Hierarchical vision transformer for detection" },
        { year: 2022, name: "YOLOv7", description: "State-of-the-art real-time object detection" },
        { year: 2023, name: "RT-DETR", description: "Real-Time Detection Transformer" }
    ];
    
    // Calculate timeline dimensions
    const minYear = 2000;
    const maxYear = 2024;
    const timelineWidth = timeline.clientWidth;
    const yearWidth = timelineWidth / (maxYear - minYear);
    
    // Create timeline axis
    const axis = document.createElement('div');
    axis.className = 'timeline-axis';
    axis.style.position = 'absolute';
    axis.style.bottom = '0';
    axis.style.left = '0';
    axis.style.width = '100%';
    axis.style.height = '2px';
    axis.style.backgroundColor = '#ccc';
    timeline.appendChild(axis);
    
    // Add year markers
    for (let year = minYear; year <= maxYear; year += 2) {
        const yearMarker = document.createElement('div');
        yearMarker.className = 'timeline-year-marker';
        yearMarker.style.position = 'absolute';
        yearMarker.style.bottom = '0';
        yearMarker.style.left = `${(year - minYear) * yearWidth}px`;
        yearMarker.style.transform = 'translateX(-50%)';
        
        const yearLine = document.createElement('div');
        yearLine.style.width = '1px';
        yearLine.style.height = '10px';
        yearLine.style.backgroundColor = '#ccc';
        yearLine.style.margin = '0 auto';
        yearMarker.appendChild(yearLine);
        
        const yearLabel = document.createElement('div');
        yearLabel.textContent = year;
        yearLabel.style.fontSize = '12px';
        yearLabel.style.color = '#666';
        yearLabel.style.marginTop = '5px';
        yearMarker.appendChild(yearLabel);
        
        timeline.appendChild(yearMarker);
    }
    
    // Add algorithm events
    timelineData.forEach(item => {
        const event = document.createElement('div');
        event.className = 'timeline-event';
        event.style.left = `${(item.year - minYear) * yearWidth}px`;
        event.style.top = '50%';
        
        const eventLabel = document.createElement('div');
        eventLabel.textContent = item.name;
        eventLabel.style.fontSize = '12px';
        eventLabel.style.textAlign = 'center';
        event.appendChild(eventLabel);
        
        const eventContent = document.createElement('div');
        eventContent.className = 'timeline-event-content';
        eventContent.innerHTML = `
            <h4>${item.name} (${item.year})</h4>
            <p>${item.description}</p>
        `;
        event.appendChild(eventContent);
        
        timeline.appendChild(event);
    });
}

// Initialize the interactive demos
function initInteractiveDemos() {
    // This will be populated as we add interactive demos
    // Each demo will have its own initialization function
}

// Handle smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
                
                // Update active state in TOC
                updateActiveTOCLink(targetId);
            }
        });
    });
}

// Handle active states for TOC links
function initTOCHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.toc a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        updateActiveTOCLink(current);
    });
}

// Update the active state of TOC links
function updateActiveTOCLink(currentId) {
    const navLinks = document.querySelectorAll('.toc a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentId) {
            link.classList.add('active');
        }
    });
} 