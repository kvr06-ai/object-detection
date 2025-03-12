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
    const timelineData = [
        { year: 2001, name: "Viola-Jones", description: "First real-time face detector using Haar features and AdaBoost. Revolutionary for enabling practical face detection in consumer cameras." },
        { year: 2005, name: "HOG Detector", description: "Histogram of Oriented Gradients with SVM classifier. Dalal and Triggs presented this influential method that became the foundation for many object detectors." },
        { year: 2008, name: "DPM", description: "Deformable Parts Model by Felzenszwalb et al. Extended HOG to handle object deformation, winning multiple PASCAL VOC challenges." },
        { year: 2012, name: "AlexNet", description: "While primarily for classification, AlexNet's success in ImageNet sparked the deep learning revolution that transformed object detection." },
        { year: 2014, name: "R-CNN", description: "Region-based CNN by Girshick et al. First major CNN-based detector using region proposals and deep features." },
        { year: 2015, name: "Fast R-CNN", description: "Improved R-CNN with shared feature computation and ROI pooling, significantly speeding up detection." },
        { year: 2016, name: "YOLO", description: "You Only Look Once by Redmon et al. First one-stage detector providing real-time performance by treating detection as a regression problem." },
        { year: 2017, name: "Mask R-CNN", description: "Extended Faster R-CNN to perform instance segmentation, predicting object masks alongside bounding boxes." },
        { year: 2019, name: "EfficientDet", description: "Combined EfficientNet backbones with advanced feature fusion for state-of-the-art performance balanced with efficiency." },
        { year: 2022, name: "DINO", description: "DETR with Improved deNoising anchOr boxes. Transformer-based detector with improved training and convergence." }
    ];

    const timelineContainer = document.getElementById('detection-timeline');
    if (!timelineContainer) return;
    
    // Clear any existing content
    timelineContainer.innerHTML = '';
    
    // Calculate timeline dimensions
    const timelineWidth = timelineContainer.offsetWidth;
    const timelineHeight = 250; // Increased height for better spacing
    
    // Create timeline axis
    const axis = document.createElement('div');
    axis.className = 'timeline-axis';
    timelineContainer.appendChild(axis);
    
    // Find min and max years for scaling
    const years = timelineData.map(item => item.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const yearSpan = maxYear - minYear;
    
    // Add year markers
    const yearMarkerInterval = yearSpan <= 10 ? 2 : 5;
    for (let year = Math.ceil(minYear / yearMarkerInterval) * yearMarkerInterval; year <= maxYear; year += yearMarkerInterval) {
        const marker = document.createElement('div');
        marker.className = 'timeline-year-marker';
        marker.textContent = year;
        
        // Position marker
        const xPos = ((year - minYear) / yearSpan) * (timelineWidth - 100) + 50;
        marker.style.left = `${xPos}px`;
        marker.style.marginTop = '10px';
        
        timelineContainer.appendChild(marker);
    }
    
    // Colors for dots (use a color palette that's visually appealing and accessible)
    const dotColors = ['#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'];
    
    // Create three tiers for positioning (top, center, bottom)
    // We'll use these to stagger the dots more effectively
    const tierPositions = [
        { cssClass: 'tier-top', yOffset: -40 },     // Top tier (further from timeline)
        { cssClass: 'tier-middle-top', yOffset: -20 },  // Middle top tier (closer to timeline)
        { cssClass: 'tier-middle-bottom', yOffset: 20 },   // Middle bottom tier (closer to timeline)
        { cssClass: 'tier-bottom', yOffset: 40 }     // Bottom tier (further from timeline)
    ];
    
    // Distribute items based on timeline density
    // We'll use a smart algorithm to position dots in different tiers based on proximity
    
    // First, sort by year to ensure proper temporal ordering
    const sortedData = [...timelineData].sort((a, b) => a.year - b.year);
    
    // Calculate x-positions first
    const itemsWithPos = sortedData.map((item, index) => {
        const xPosition = ((item.year - minYear) / yearSpan) * (timelineWidth - 100) + 50;
        return { 
            ...item, 
            xPosition, 
            index,
            // Initially no tier assigned
            tier: null
        };
    });
    
    // Assign tiers to reduce overlapping
    // First, calculate "density" or proximity between timeline items
    const thresholdForClose = 80; // Defines what's considered "close" in pixels
    
    // Assign initial tiers alternating between top and bottom halves
    itemsWithPos.forEach((item, i) => {
        // Start with a basic alternating pattern
        item.tier = i % 2 === 0 ? 0 : 3;
    });
    
    // Then look for close items and adjust their tiers to avoid overlaps
    for (let i = 0; i < itemsWithPos.length - 1; i++) {
        const current = itemsWithPos[i];
        const next = itemsWithPos[i + 1];
        
        // If items are close to each other
        if (Math.abs(current.xPosition - next.xPosition) < thresholdForClose) {
            // Check if they're on the same side (both top or both bottom)
            const currentSide = current.tier < 2 ? 'top' : 'bottom';
            const nextSide = next.tier < 2 ? 'top' : 'bottom';
            
            if (currentSide === nextSide) {
                // If they're on the same side, move the next item to the opposite side
                next.tier = currentSide === 'top' ? 3 : 0;
            }
            
            // If they're still too close, stagger them further by using middle tiers
            if (Math.abs(current.xPosition - next.xPosition) < thresholdForClose / 1.5) {
                if (current.tier === 0) current.tier = 1;
                else if (current.tier === 3) current.tier = 2;
            }
        }
    }
    
    // Special handling for the potentially dense area (2014-2017)
    // Find items in the dense period and ensure they have maximum separation
    const denseYearStart = 2014;
    const denseYearEnd = 2017;
    const denseItems = itemsWithPos.filter(item => 
        item.year >= denseYearStart && item.year <= denseYearEnd);
    
    if (denseItems.length >= 3) {
        // Explicitly assign different tiers to these items
        denseItems.forEach((item, i) => {
            // Forced tier assignment for dense areas
            item.tier = i % 4; // Distribute across all 4 tiers
        });
    }
    
    // Create timeline dots with assigned tiers
    itemsWithPos.forEach((item, index) => {
        // Get the tier information
        const tierInfo = tierPositions[item.tier];
        const colorIndex = index % dotColors.length;
        
        // Create the timeline dot with appropriate tier
        createTimelineDot(
            timelineContainer,
            item.xPosition,
            tierInfo.yOffset,
            item.name,
            item.year,
            item.description,
            dotColors[colorIndex],
            tierInfo.cssClass
        );
    });
}

function createTimelineDot(container, xPosition, yOffset, name, year, description, color, tierClass) {
    const milestone = document.createElement('div');
    milestone.className = 'timeline-milestone ' + tierClass;
    milestone.style.left = `${xPosition}px`;
    
    // Set position relative to timeline axis
    milestone.style.top = '50%';
    milestone.style.transform = `translateY(${yOffset}px)`;
    
    // Create dot
    const dot = document.createElement('div');
    dot.className = 'milestone-dot';
    dot.style.backgroundColor = color;
    milestone.appendChild(dot);
    
    // Create connecting line to axis
    const line = document.createElement('div');
    line.className = 'connecting-line';
    // Set line height based on yOffset (absolute value)
    line.style.height = `${Math.abs(yOffset) - 8}px`;
    // Position line based on whether dot is above or below axis
    if (yOffset < 0) {
        line.style.top = '50%';
    } else {
        line.style.bottom = '50%';
    }
    milestone.appendChild(line);
    
    // Create label
    const label = document.createElement('div');
    label.className = 'milestone-label';
    
    // Position label based on tier
    if (yOffset < 0) {
        label.style.bottom = '100%';
        label.style.marginBottom = '8px';
    } else {
        label.style.top = '100%';
        label.style.marginTop = '8px';
    }
    
    const labelText = document.createElement('div');
    labelText.textContent = `${name} (${year})`;
    // Use same color as dot for label text
    labelText.style.borderLeft = `3px solid ${color}`;
    label.appendChild(labelText);
    milestone.appendChild(label);
    
    // Add hover effect to show detailed description
    milestone.addEventListener('mouseenter', function(e) {
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'timeline-event-content';
        
        // Add content to tooltip
        const header = document.createElement('h4');
        header.textContent = `${name} (${year})`;
        // Use dot color as header color
        header.style.color = color;
        tooltip.appendChild(header);
        
        const desc = document.createElement('p');
        desc.textContent = description;
        tooltip.appendChild(desc);
        
        // Position tooltip based on tier
        if (yOffset < 0) {
            tooltip.style.bottom = '100%';
            tooltip.style.marginBottom = '15px';
        } else {
            tooltip.style.top = '100%';
            tooltip.style.marginTop = '15px';
        }
        
        // Initial positioning
        tooltip.style.left = '0';
        
        // Add tooltip to DOM
        milestone.appendChild(tooltip);
        
        // Adjust tooltip position if it goes off-screen
        setTimeout(() => {
            const rect = tooltip.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            if (rect.right > containerRect.right) {
                tooltip.style.left = 'auto';
                tooltip.style.right = '0';
            }
            
            if (rect.left < containerRect.left) {
                tooltip.style.left = '0';
                tooltip.style.right = 'auto';
            }
        }, 0);
    });
    
    milestone.addEventListener('mouseleave', function() {
        const tooltip = milestone.querySelector('.timeline-event-content');
        if (tooltip) {
            milestone.removeChild(tooltip);
        }
    });
    
    container.appendChild(milestone);
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