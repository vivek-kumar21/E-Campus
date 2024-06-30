# E-Campus

Welcome to the E-Campus! This website is a comprehensive platform providing various resources for engineering students, including educational content, career guidance, internship opportunities, and coding practice. Below you'll find all the information you need about the project.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Strong authentication with options to change username, email, and password using OTP verification.
- **Career Roadmaps**: Explore different career options with detailed roadmaps.
- **Internship Portal**: Apply for internships directly through the portal.
- **Coding Arena**: Practice coding with an interactive coding environment.
- **Blog Section**: Read interview experiences and find resources for campus placements.
- **AI ChatBot**: Talk with AI chatbot and ask it for information.
- **YouTube Channel and Notes**: Access educational videos and notes tailored for engineering courses.

## Technologies Used
- **Frontend**: 
  - React
  - Tailwind CSS
- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - MongoDB

## Installation
### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Steps
1. Clone the repository
    ```sh
    git clone https://github.com/your-username/engineering-student-resource-hub.git
    ```
2. Navigate to the project directory
    ```sh
    cd engineering-student-resource-hub
    ```
3. Install backend dependencies
    ```sh
    cd backend
    npm install
    ```
4. Install frontend dependencies
    ```sh
    cd ../frontend
    npm install
    ```
5. Create a `.env` file in the `backend` directory with the following content:
    ```env
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    ```

## Usage
### Running the Backend Server
1. Navigate to the backend directory
    ```sh
    cd backend
    ```
2. Start the backend server
    ```sh
    npm run dev
    ```

### Running the Frontend Server
1. Navigate to the frontend directory
    ```sh
    cd frontend
    ```
2. Start the frontend server
    ```sh
    npm start
    ```

The frontend will typically run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code of conduct.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

---

Thank you for visiting! If you have any questions or suggestions, feel free to open an issue or contact me.
