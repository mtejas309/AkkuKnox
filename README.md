# Dynamic Dashboard Builder (React + Vite)

This project is built with **React + Vite**.  
It allows users to build dashboards dynamically from a JSON structure of categories and widgets.


## 🚀 Features

- **Dynamic categories & widgets:**  
  Dashboard layout is driven by a JSON object.  
  Each category can contain multiple widgets.
- **Add & remove widgets:**  
  Users can add new widgets (name + text) to a category or remove existing ones with a single click.
- **Search functionality:**  
  Quickly search widgets across all categories by name.
- **Vite + React setup:**  
  Fast development with Hot Module Replacement (HMR).
-  **Centralized State Management:**
  Used Redux Toolkit to manage the entire dashboard layout (categories and widgets) as a single, predictable state object.
## Installation & Running Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/mtejas309/AkkuKnox.git
cd AkkuKnox
npm install
npm run dev
