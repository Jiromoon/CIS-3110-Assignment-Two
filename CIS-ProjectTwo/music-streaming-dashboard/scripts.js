// scripts.js

// Run dashboard once the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  initDashboard();
});

async function initDashboard() {
  try {
    await Promise.all([
      buildStreamsOverTimeChart(),
      buildStreamsByGenreChart(),
      buildStreamsByDeviceChart(),
      buildStreamsByArtistChart(),
      buildDurationVsStreamsChart()
    ]);
  } catch (error) {
    console.error("Error initializing dashboard:", error);
  }
}

/* -------------------- Data Getter / CSV Parser -------------------- */

// Generic CSV loader
async function loadCsv(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load CSV: ${path}`);
  }
  const text = await response.text();
  return parseCsv(text);
}

// Parse CSV into array of objects
function parseCsv(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(",");
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ? values[index].trim() : "";
    });
    return row;
  });
}

/* -------------------- Chart 1: Streams Over Time (Line) -------------------- */

async function buildStreamsOverTimeChart() {
  const rows = await loadCsv("data/streams_over_time.csv");

  const labels = rows.map(row => row.date);
  const data = rows.map(row => Number(row.total_streams));

  const ctx = document
    .getElementById("streamsOverTimeChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total Streams",
          data,
          fill: false,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date"
          }
        },
        y: {
          title: {
            display: true,
            text: "Total Streams"
          },
          beginAtZero: true
        }
      }
    }
  });
}

/* -------------------- Chart 2: Streams by Genre (Bar) -------------------- */

async function buildStreamsByGenreChart() {
  const rows = await loadCsv("data/streams_by_genre.csv");

  const labels = rows.map(row => row.genre);
  const data = rows.map(row => Number(row.total_streams));

  const ctx = document
    .getElementById("streamsByGenreChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Total Streams by Genre",
          data
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Genre"
          }
        },
        y: {
          title: {
            display: true,
            text: "Total Streams"
          },
          beginAtZero: true
        }
      }
    }
  });
}

/* -------------------- Chart 3: Streams by Device (Doughnut) -------------------- */

async function buildStreamsByDeviceChart() {
  const rows = await loadCsv("data/streams_by_device.csv");

  const labels = rows.map(row => row.device_type);
  const data = rows.map(row => Number(row.total_streams));

  const canvas = document.getElementById("streamsByDeviceChart");
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          label: "Streams by Device Type",
          data
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

/* -------------------- Chart 4: Streams by Artist (Area / Filled Line) -------------------- */

async function buildStreamsByArtistChart() {
  const rows = await loadCsv("data/streams_by_artist.csv");

  const labels = rows.map(row => row.artist_name);
  const data = rows.map(row => Number(row.total_streams));

  const ctx = document
    .getElementById("streamsByArtistChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "line", // area style via fill: true
    data: {
      labels,
      datasets: [
        {
          label: "Total Streams by Artist",
          data,
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Artist"
          }
        },
        y: {
          title: {
            display: true,
            text: "Total Streams"
          },
          beginAtZero: true
        }
      }
    }
  });
}

/* -------------------- Chart 5: Duration vs Streams (Scatter) -------------------- */

async function buildDurationVsStreamsChart() {
  try {
    const rows = await loadCsv("data/durations_vs_streams.csv");
    console.log("Duration CSV rows:", rows);

    const points = rows.map((row, index) => {
      const x = Number(row.song_duration_s);
      const y = Number(row.total_streams);
      console.log(`row ${index}:`, row, "->", x, y);
      return { x, y };
    });

    const canvas = document.getElementById("durationVsStreamsChart");
    const ctx = canvas && canvas.getContext("2d");

    if (!ctx) {
      console.error("Could not get 2D context for durationVsStreamsChart");
      return;
    }

    new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Streams vs Song Duration",
            data: points
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Song Duration (seconds)"
            }
          },
          y: {
            title: {
              display: true,
              text: "Total Streams"
            },
            beginAtZero: true
          }
        }
      }
    });
  } catch (err) {
    console.error("Error in buildDurationVsStreamsChart:", err);
  }
}
