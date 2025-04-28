# Project Setup

This guide provides the basic steps to get the project running locally.

## Prerequisites

- Node.js (v22.14.0 or later recommended)
- Docker
- Docker Compose

## Getting Started

1.  **Install Dependencies:**
    Open your terminal in the project root directory and run:

    ```bash
    npm install
    ```

2.  **Start Docker Containers:**
    Ensure Docker is running on your machine. Then, run the following command to start the necessary services (e.g., database):

    ```bash
    docker compose up -d
    ```

    The `-d` flag runs the containers in detached mode (in the background).

3.  **Run the Development Server:**
    Start the application in development mode:
    ```bash
    npm run dev
    ```

After these steps, the application should be accessible (usually at `http://localhost:3000` or a similar address, depending on the project configuration).
