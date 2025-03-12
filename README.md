# Object Detection Evolution: Interactive Article

This project contains an interactive web article that explores the evolution of object detection algorithms from HOG to YOLO to DETR. The article includes interactive demonstrations, visualizations, and technical explanations of various object detection methodologies.

## Features

- **Interactive Timeline**: A visual timeline of object detection algorithm development
- **Interactive Demonstrations**: Hands-on demos of key concepts like:
  - HOG feature visualization with adjustable parameters
  - Anchor box visualization
  - IoU (Intersection over Union) interactive calculation
  - RoI (Region of Interest) pooling visualization
  - YOLO confidence threshold adjustment
- **Performance Comparisons**: Visual charts comparing different algorithms
- **Network Architecture Visualizations**: Interactive diagrams of model architectures
- **Model Selection Tool**: Interactive tool to help select the right model for different use cases

## Requirements

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- [Node.js](https://nodejs.org/) (optional, for serving the content locally)

## How to View the Article

### Option 1: Opening the HTML File Directly

You can simply open the `index.html` file in your web browser:

```bash
# Open the index.html file in your default browser
open index.html  # On macOS
# or
start index.html  # On Windows
# or
xdg-open index.html  # On Linux
```

### Option 2: Using a Local Server (Recommended)

For the best experience, especially with the interactive components, we recommend using a local server:

1. If you have Node.js installed:

```bash
# Install http-server globally if you don't have it already
npm install -g http-server

# Navigate to the project directory and start the server
cd path/to/object-detection
http-server -p 8080
```

2. If you have Python installed:

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

3. Then open your browser and navigate to:

```
http://localhost:8080
```

### Option 3: Using the included Node.js server

This project includes a simple Node.js server that you can use:

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Then open your browser and navigate to:

```
http://localhost:3000
```

## Project Structure

```
object-detection/
├── index.html          # Main HTML file
├── css/                # Stylesheets
│   └── styles.css      # Main CSS file
├── js/                 # JavaScript files
│   ├── main.js         # Main JavaScript file
│   ├── visualizations.js # Visualization code
│   └── interactive.js  # Interactive demos code
├── img/                # Image assets (will be populated when you add images)
├── server.js           # Simple Node.js server
├── package.json        # Node.js package configuration
└── README.md           # This file
```

## Contributing

Contributions to improve the demonstrations or expand the content are welcome. Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 