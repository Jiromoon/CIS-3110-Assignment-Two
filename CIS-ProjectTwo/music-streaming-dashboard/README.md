# Music Streaming Analytics Dashboard

This project is an interactive analytics dashboard for a fictional music streaming platform. It uses synthetic, yet realistic data to explore how users listen to music across time, genres, devices, and artists.

## Overview

The dashboard answers five core questions:

1. **How do total streams change over time?**  
   → Line chart of total daily streams.

2. **Which music genres are streamed the most?**  
   → Bar chart comparing total streams by genre.

3. **What percentage of total streams come from different device types?**  
   → Doughnut chart showing streams from mobile, desktop, tablet, and smart speakers.

4. **Which artists receive the highest number of streams?**  
   → Filled line (area) chart of total streams by artist.

5. **What is the relationship between song duration and total streams?**  
   → Scatter plot of song duration (seconds) vs total streams.

## Data

All data is synthetic and was generated using the Gemini AI model.

Main dataset (created in Gemini, then aggregated):

- `main_streaming_data.csv` (optional internal source)

From that, I derived five smallern datasets for the charts:

- `streams_over_time.csv` – `date, total_streams`
- `streams_by_genre.csv` – `genre, total_streams`
- `streams_by_device.csv` – `device_type, total_streams`
- `streams_by_artist.csv` – `artist_name, total_streams`
- `duration_vs_streams.csv` – `song_duration_s, total_streams`

Each chart uses one of these CSV files as its data source.

## Implementation Details

### Front-End

- **HTML & CSS** for the structure and basic styling
- **Bootstrap 5** for the responsive grid layout (rows/columns and cards)
- **Chart.js** for all data visualizations
- **Vanilla JavaScript** in `scripts.js`

### Layout

The dashboard uses multiple rows with different column configurations to reflect chart importance:

- **Row 1:**  
  - `col-md-8` – Total Streams Over Time (line chart, primary metric)  
  - `col-md-4` – Streams by Device Type (supporting metric)

- **Row 2:**  
  - `col-md-4` – Streams by Genre (category comparison)  
  - `col-md-8` – Top Artists by Streams (large area chart)

- **Row 3:**  
  - `col-md-12` – Song Duration vs Total Streams (full-width scatter plot)

### Data Getter

All charts use a shared data loading and parsing approach in `scripts.js`:

- `loadCsv(path)` – fetches a CSV file using `fetch()`  
- `parseCsv(csvText)` – converts CSV text to an array of objects  

Each chart function calls `loadCsv()` with its own CSV file and then maps the data into the format expected by Chart.js.

## How to Run

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Install the **Live Server** extension (if you don’t have it).
4. Right-click on `index.html` → **“Open with Live Server”**.
5. The dashboard should open in your browser at `http://127.0.0.1:5500/music-streaming-dashboard/index.html`.

## Video Walkthrough

[Watch the dashboard walkthrough on YouTube](https://www.loom.com/share/ebd4e31d9a4f48eb855a67a1243139f2)

In the video, I explain:

- The industry context (music streaming)
- The five main questions the dashboard answers
- Each chart and what it shows
- How the layout and chart sizes reflect importance
- How the data was generated (synthetic, via Gemini)

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Chart.js
- Gemini (for data generation)
