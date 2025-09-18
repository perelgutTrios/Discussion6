
# Discussion Board

A full-stack web application for discussion threads with user authentication, built with React (frontend), Express (backend), Java microservice (business logic), and MongoDB (database).
<img width="3403" height="3840" alt="Untitled diagram _ Mermaid Chart-2025-09-18-120340" src="https://github.com/user-attachments/assets/2f3e4fe4-8131-4533-a54b-d788d2049631" />


## Structure
- `client/` - React frontend (HTML, CSS, JS)
- `server/` - Express backend (Node.js, API, MongoDB, OAuth)
- `java-service/` - Java microservice for business logic

## Features
- User registration & login (OAuth, password encryption, validation)
- Discussion subjects (title, description, author, timestamp)
- Comments (text, author, timestamp, subject link)
- MongoDB for users, subjects, comments

## Setup (Development)

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Java (for `java-service`, JDK 11+)
- MongoDB (local or Atlas cluster)

### 1. Clone the repository
```
git clone https://github.com/perelgutTrios/Discussion6.git
cd Discussion6
```

### 2. Configure environment variables
- Copy `.env.example` to `.env` in the `server/` directory and fill in your MongoDB URI and OAuth credentials.

### 3. Install dependencies
- **Server:**
	```
	cd server
	npm install
	```
- **Client:**
	```
	cd ../client
	npm install
	```
- **Java Service:**
	Build using Maven or Gradle as described in `java-service/README.md`.

### 4. Run the application
- **Start MongoDB** (if running locally)
- **Start Java Service**
	- See `java-service/README.md` for build and run instructions.
- **Start Express Server**
	```
	cd server
	npm start
	```
- **Start React Client**
	```
	cd client
	npm start
	```

The client will run on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:5000](http://localhost:5000) by default.

## Deployment

### Local
Follow the setup steps above. Ensure all services (MongoDB, Java, Express, React) are running.

### Production
- Set environment variables for production in `server/.env`.
- Build the React app:
	```
	cd client
	npm run build
	```
- Serve the static files from the Express backend or a static host.
- Deploy the Java service to your production environment.
- Use a managed MongoDB service (e.g., MongoDB Atlas).

## Documentation
- See `client/README.md`, `server/README.md`, and `java-service/README.md` for details on each part.

---
For questions or issues, open an issue on the repository.
