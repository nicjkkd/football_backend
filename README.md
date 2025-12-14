# Football Backend Application

This is the backend server for the Football Management application. It is built using **TypeScript**, **Express**, and **Bun**, leveraging **Prisma** for database management and native **Bun WebSockets** for real-time features.

## 🚀 Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: MySQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Real-time**: Bun Native WebSockets

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **[Bun](https://bun.sh/docs/installation)** (v1.0 or later)
- **MySQL** Database

## 🛠️ Installation & Setup

1.  **Clone the repository** (if not already done):

    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install dependencies**:

    ```bash
    bun install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the root directory by copying the example or defining the following variables:

    ```env
    # Server Ports
    HTTP_SERVER_PORT=3000
    WS_SERVER_PORT=8080

    # Database Connection
    # Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
    DATABASE_URL="mysql://root:password@localhost:3306/football_db"
    ```

4.  **Database Setup**:
    Run the Prisma migrations to set up your database schema:

    ```bash
    bun run prisma:migrate
    ```

    Generate the Prisma Client (and Zod schemas):

    ```bash
    bun run prisma:generate
    ```

## ▶️ Running the Application

### Development Mode

To run the server in development mode with hot-reloading:

```bash
bun run dev
```

### Production Build

To build and run the production version:

```bash
bun run build
bun start
```

## 📡 API Endpoints

The HTTP server runs on port `3000` (default) and exposes the following RESTful resources:

- **Health Check**: `GET /health`

### Resources

- **/players**: Manage player entities.
- **/teams**: Manage team entities.
- **/leagues**: Manage league entities.

## 🔌 WebSockets

The application hosts a WebSocket server on port `8080` (default) for real-time updates.

- **URL**: `ws://localhost:8080`
- **Behavior**: Clients can connect to receive broadcast updates. Messages sent to the WebSocket server are broadcasted to all connected clients.

## 📂 Project Structure

```
backend/
├── prisma/              # Prisma schema and migrations
├── src/
│   ├── routers/         # Express route definitions (Players, Teams, Leagues)
│   ├── app.ts           # Application entry point & Server setup
│   ├── models.ts        # Shared data models
│   ├── utils.ts         # Utility functions
│   └── worker.ts        # Worker threads (CPU-intensive tasks)
├── .env                 # Environment variables
├── package.json         # Project scripts and dependencies
└── tsconfig.json        # TypeScript configuration
```

## 📜 Scripts

| Script | Description |
|Args| |
| `bun run start` | Application entry point |
| `bun run dev` | Runs the app in watch mode |
| `bun run build` | Compiles the app to `dist` |
| `bun run prisma:migrate` | Runs database migrations |
| `bun run prisma:generate` | Generates Prisma Client & Zod schemas |
