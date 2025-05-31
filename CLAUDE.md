# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a build-less static site that visualizes and compares Microsoft 365 PowerShell modules. It uses React, HTM (for JSX-like syntax without build tools), and Tailwind CSS - all loaded from CDNs.

## Project Structure

- `index.html` - Entry point that loads all CDN dependencies
- `app.js` - Main application logic with the ModuleComparison component
- No build process required - just serve the files with any static web server

## How to Run

Simply open `index.html` in a web browser or serve the directory with any static file server:
- Python: `python -m http.server 8000`
- Node.js: `npx serve`
- Or just double-click `index.html` to open in browser

## Code Architecture

The application uses:
- **React 18** from unpkg CDN for component logic
- **HTM** for JSX-like syntax without transpilation
- **Tailwind CSS** from CDN for styling
- Vanilla JavaScript (no TypeScript)
- ES modules for script loading

The `ModuleComparison` component:
- Displays capability comparisons across 9 different Microsoft 365 PowerShell modules
- Shows PowerShell version compatibility (PS5/PS7)
- Indicates Azure app registration requirements
- Provides visual scoring and recommendations for module selection

## Module Data Structure

Each module in the comparison contains:
- `name`: Module name
- `azureAppReq`: Boolean indicating if Azure app registration is required
- `ps5`/`ps7`: PowerShell version compatibility
- `capabilities`: Object with boolean flags for various services (SharePoint, Teams, Power Platform, etc.)
- `notes`: Usage notes and limitations