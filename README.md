# Portfolio Project

This is a static portfolio website built with HTML, CSS, and JavaScript. Since it consists entirely of static assets, it does not require complex build steps or a Node.js `package.json` setup to run.

## How to Run the Project Locally

You can run this project using any local static file server. Here are a few simple ways to serve the project depending on what you have installed on your system:

### Option 1: Using Python (Recommended)
If you have Python installed, you can start a simple HTTP server. Open your terminal in the project directory and run:

```bash
python3 -m http.server 8000
```
Then, open your browser and navigate to: `http://localhost:8000`

### Option 2: Using Node.js / npx
If you have Node.js and `npm` installed, you can use the `serve` package without needing to install it globally:

```bash
npx serve
```
This will automatically provide you with a local URL (usually `http://localhost:3000`) that you can open in your browser.

### Option 3: Using VS Code (Live Server)
If you are using Visual Studio Code:
1. Install the **Live Server** extension by Ritwick Dey.
2. Open the project folder in VS Code.
3. Right-click on `index.html` and select **Open with Live Server** (or click the "Go Live" button in the bottom right corner of the VS Code window).

## Project Structure
- `index.html`: The main HTML file containing the content and layout.
- `style.css`: The stylesheet for the project's design.
- `script.js`: Any interactivity and JavaScript logic.
- `img/`: Directory containing project images and profile pictures.
