# CourtSync - Tennis Live Scores Platform

CourtSync is a platform for managing and displaying live scores for tennis matches in amateur tournaments. The application is designed to address the common issue of schedule delays in tennis tournaments by providing real-time updates on match progress, helping players and organizers better manage their time.

## Overview

During a tennis tournament, matches often last longer than their scheduled time slot, causing frustration for waiting players. CourtSync aims to solve this problem by providing live score tracking for all ongoing matches, allowing players to better estimate their wait times and tournament organizers to efficiently manage court usage.

The platform consists of three main components:

- **Web Application**: Displays live scores and manages tournaments, players, courts, and matches
- **Mobile Application**: Enables score input and connects to mechanical scoreboards
- **Hardware Client**: Captures scores from mechanical scoreboards found on tennis courts

## Features

### Dashboard

- Real-time overview of all ongoing matches
- Match filtering and searching capabilities
- Visual indicators for match status (upcoming, ongoing, completed)

### Match Management

- Create, edit, and delete tennis matches
- Track scores in real-time using sets and games
- Complete match history and statistics
- Share match links for spectators

### Tournament Management

- Create and manage tennis tournaments
- Track all matches within a tournament
- Tournament brackets visualization
- Tournament status tracking (upcoming, ongoing, completed)

### Player Management

- Player profiles with personal information
- Match history and statistics for each player
- Player search and filtering

### Court Management

- Real-time court availability tracking
- Court occupation status updates
- Indoor/outdoor court designation

### Club Management

- Club profiles with player rosters
- Club-hosted tournament management
- Player assignment to clubs

### Real-time Updates

- WebSocket connections for instant updates
- Live score broadcasting
- Court availability notifications

## Technology Stack

### Backend

- **ASP.NET Core 8.0**: Web framework
- **EF Core 8.0**: ORM for database access
- **PostgreSQL**: Database
- **WebSockets**: Real-time communication

### Frontend

- **Blazor**: Server-side components with interactivity
- **Bootstrap**: UI framework
- **JavaScript**: Custom client-side functionality

## System Requirements

- **.NET SDK 8.0** or higher
- **PostgreSQL** database
- **Docker** (optional, for containerization)

## Installation and Setup

### Prerequisites

- Install [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
- Install [PostgreSQL](https://www.postgresql.org/download/)

### Database Setup

The application uses PostgreSQL. You can run it locally or using Docker:

```bash
# Using Docker
docker-compose up -d
```

### Application Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd TennisApp
```

2. Restore dependencies:

```bash
dotnet restore
```

3. Update database connection string in `appsettings.json` if necessary:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=tennisappdb;Username=postgres;Password=password"
}
```

4. Run database migrations:

```bash
dotnet ef database update
```

5. Run the application:

```bash
dotnet run
```

The application will be available at `http://localhost:5020`

## Usage Guide

### Creating a Match

1. Navigate to the "Matches" page
2. Click "Create New Match"
3. Fill in match details:
   - Select Court
   - Select Players
   - Set Match Date/Time
   - Assign Scoreboard
   - Optionally assign to a Tournament
4. Click "Create"

### Updating Match Scores

1. Navigate to the "Matches" page
2. Find the match and click "Details"
3. Use the score controls to update sets and games
4. Scores will update in real-time for all viewers

### Creating a Tournament

1. Navigate to the "Tournaments" page
2. Click "Create New Tournament"
3. Fill in tournament details:
   - Name
   - Start/End Dates
   - Host Club
   - Tournament Type
   - Maximum Participants
4. Click "Create Tournament"

### Managing Courts

1. Navigate to the "Courts" page
2. View court status (available/occupied)
3. Create new courts or edit existing ones
4. Toggle court availability as needed

## API Endpoints

The application provides several RESTful API endpoints for integration with other systems, including the mobile application:

### Matches

- `GET /api/matches`: Get all matches
- `GET /api/matches/{id}`: Get specific match
- `POST /api/matches`: Create a new match
- `PUT /api/matches/{id}`: Update match
- `DELETE /api/matches/{id}`: Delete match

### Tournaments

- `GET /api/tournament`: Get all tournaments
- `GET /api/tournament/{id}`: Get specific tournament
- `POST /api/tournament`: Create a new tournament
- `PUT /api/tournament/{id}`: Update tournament
- `DELETE /api/tournament/{id}`: Delete tournament

### Courts

- `GET /api/courts`: Get all courts
- `GET /api/courts/{id}`: Get specific court
- `PUT /api/courts/{id}`: Update court
- `PATCH /api/courts/{id}/toggleOccupation`: Toggle court occupation status

### Players

- `GET /api/players`: Get all players

### Scoreboards

- `GET /api/scoreboards`: Get all scoreboards

## WebSocket Integration

The application uses WebSockets for real-time updates. Clients can connect to:

```text
ws://<host>/ws
```

And subscribe to topics:

- `court_availability`: Real-time court status updates
- `live_score`: Live match score updates

## Development Notes

### Project Structure

- `TennisApp/Models`: Data models
- `TennisApp/Controllers`: API endpoints
- `TennisApp/Components`: Blazor components
- `TennisApp/Data`: Database context
- `TennisApp/WebSockets`: WebSocket handlers
- `TennisApp/DTOs`: Data transfer objects

### Database Migrations
To generate a new migration:

```bash
dotnet ef migrations add <MigrationName>
```

To apply migrations:

```bash
dotnet ef database update
```

## Mobile Application Integration

The web application provides API endpoints for integration with the mobile application. The mobile app can:

1. Connect to WebSockets for real-time updates
2. Use REST APIs to manage matches, tournaments, etc.
3. Connect to mechanical scoreboards via Bluetooth Low Energy
4. Send score updates to the server

## Hardware Integration

The system supports integration with mechanical scoreboards through the mobile application. Key considerations:

- Bluetooth Low Energy connectivity
- Battery optimization (hardware client runs on battery)
- Score detection mechanisms
- Data transmission protocol

## Contributors

- Dominik Ötvös - Software Developer
- Luka Ojdanić - Software Developer
- Ngoc Duy Lâm - Software Developer

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*This project was developed as part of the lab course at KdG (Karel de Grote Hogeschool).*
