# Random Quote Generator - Docker Demo

A simple web application that displays random inspirational quotes, built with FastAPI and containerized with Docker. This project is designed as a hands-on demonstration of Docker basics.

## Project Overview

This application serves as a practical example to learn Docker fundamentals:
- Creating Docker images from a Dockerfile
- Running containers
- Understanding port mapping
- Managing container lifecycle

## Tech Stack

- **Backend**: FastAPI (Python web framework)
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: Bootstrap 5
- **Containerization**: Docker
- **Web Server**: Uvicorn

## Prerequisites

- Docker installed on your system
- (Optional) Python 3.11+ for local development without Docker

## Project Structure

```
docker-demo/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── quotes.json          # Quote data (JSON file)
│   └── static/
│       ├── css/
│       │   └── style.css     # Custom CSS styles
│       └── js/
│           └── app.js        # Frontend JavaScript
├── templates/
│   └── index.html           # Main HTML template
├── Dockerfile               # Docker image configuration
├── .dockerignore           # Files to exclude from Docker build
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Local Development (Without Docker)

If you want to run the application locally without Docker:

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
uvicorn app.main:app --reload
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Docker Commands

### Build the Docker Image

Build a Docker image from the Dockerfile:

```bash
docker build -t quote-generator .
```

This command:
- Creates a Docker image named `quote-generator`
- Reads the `Dockerfile` in the current directory
- Installs dependencies and copies application files

### Run the Container

Start a container from the image:

```bash
docker run --name quote-generator -p 8000:8000 quote-generator
```

This command:
- Runs a container from the `quote-generator` image
- Names the container `quote-generator` (`--name quote-generator`) for easier identification
- Maps port 8000 from the container to port 8000 on your host (`-p 8000:8000`)
- The application will be accessible at `http://localhost:8000`

### Run Container in Background

To run the container in detached mode (background):

```bash
docker run -d --name quote-generator -p 8000:8000 quote-generator
```

### View Running Containers

List all running containers:

```bash
docker ps
```

To see all containers (including stopped ones):

```bash
docker ps -a
```

### View Container Logs

View logs from a running container:

```bash
docker logs quote-generator
```

Or use the container ID:

```bash
docker logs <container-id>
```

To follow logs in real-time:

```bash
docker logs -f quote-generator
```

### Stop a Container

Stop a running container:

```bash
docker stop quote-generator
```

Or use the container ID:

```bash
docker stop <container-id>
```

### Start a Stopped Container

Start a previously stopped container:

```bash
docker start quote-generator
```

Or use the container ID:

```bash
docker start <container-id>
```

### Remove a Container

Remove a stopped container:

```bash
docker rm quote-generator
```

Or use the container ID:

```bash
docker rm <container-id>
```

**Note**: If you want to remove a running container, use the `-f` flag:
```bash
docker rm -f quote-generator
```

### Remove an Image

Remove a Docker image:

```bash
docker rmi quote-generator
```

## Understanding the Dockerfile

Let's break down what each line in the Dockerfile does:

```dockerfile
FROM python:3.11-slim
```
- Uses Python 3.11 slim base image (smaller size)

```dockerfile
WORKDIR /app
```
- Sets the working directory inside the container

```dockerfile
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
```
- Copies requirements file and installs Python dependencies

```dockerfile
COPY . .
```
- Copies all application files to the container

```dockerfile
EXPOSE 8000
```
- Documents that the application uses port 8000

```dockerfile
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```
- Runs the FastAPI application when the container starts

## API Endpoints

- `GET /` - Serves the main HTML page
- `GET /api/quote` - Returns a random quote as JSON

Example API response:
```json
{
  "text": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs"
}
```

## Key Docker Concepts Demonstrated

1. **Dockerfile**: Instructions for building a Docker image
2. **Image**: A read-only template for creating containers
3. **Container**: A running instance of an image
4. **Port Mapping**: Connecting container ports to host ports
5. **Isolation**: Containers run in isolated environments

## Next Steps

- Try modifying the quotes in `app/quotes.json` and rebuilding the image
- Experiment with different port mappings
- Explore Docker Compose for multi-container applications
- Learn about Docker volumes for persistent data storage

## Troubleshooting

**Port already in use**: If port 8000 is already in use, change the port mapping:
```bash
docker run --name quote-generator -p 8080:8000 quote-generator
```
Then access the app at `http://localhost:8080`

**Container name already exists**: If you get an error about the name already being in use, remove the old container first:
```bash
docker rm -f quote-generator
```

**Container won't start**: Check logs with:
```bash
docker logs quote-generator
```

**Changes not reflected**: Remember to rebuild the image after making code changes:
```bash
docker build -t quote-generator .
```

