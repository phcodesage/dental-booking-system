# 🦷 Dental Office Booking System

![Dental Booking System](https://via.placeholder.com/800x200?text=Dental+Booking+System)

## Table of Contents
- [🌟 Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration](#️-configuration)
- [📊 Database Setup](#-database-setup)
- [🐳 Docker Deployment](#-docker-deployment)
- [☁️ AWS Deployment](#️-aws-deployment)
- [🧪 Testing](#-testing)
- [📘 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Features

- 👤 User Authentication & Authorization
- 📅 Appointment Scheduling & Management
- 👨‍⚕️ Dentist Profile Management
- 🏥 Office Information Management
- 📧 Email Notifications for Appointments
- 📁 File Upload Functionality
- 🔒 Rate Limiting for API Security
- 🐳 Dockerized for Easy Deployment
- ☁️ AWS-ready for Scalable Cloud Hosting

## 🛠️ Technologies Used

- **Frontend**: React.js with modern UI components
- **Backend**: Node.js & Express.js RESTful API
- **Database**: MongoDB for flexible data storage
- **Authentication**: JWT for secure user sessions
- **Email Service**: Nodemailer for appointment notifications
- **File Handling**: Express-fileupload for document management
- **Containerization**: Docker for consistent deployment
- **Cloud-Ready**: Configured for AWS Elastic Container Registry

## 🚀 Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/dental-office-booking-system.git
   cd dental-office-booking-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables (see [Configuration](#️-configuration) section).

4. Start the development server:
   ```
   npm run dev
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_EMAIL=your_smtp_email
SMTP_PASSWORD=your_smtp_password
FROM_NAME=DentistBooking
FROM_EMAIL=noreply@yourdomain.com
FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOAD=5000000
DOCKER_IMAGE_URI=your.ecr.uri/repository-name
```

## 📊 Database Setup

To populate your database with dummy dentist data:

1. Ensure your MongoDB connection string is correctly set in your `.env` file.

2. Run the dummy data script:
   ```
   node addDummyDentists.js
   ```

This script will add 10 dentists with realistic names, specializations, and available time slots. It also handles avatar images, using a default if specific images are not found.

## 🐳 Docker Deployment

1. Build the Docker image:
   ```
   docker build -t dental-office-booking-system .
   ```

2. Run the container:
   ```
   docker run -p 5000:5000 --env-file .env dental-office-booking-system
   ```

## ☁️ AWS Deployment

Follow the steps in the [AWS Deployment section of our full documentation](#) for detailed instructions on deploying to Amazon Web Services.

## 🧪 Testing

Run the test suite with:

```
npm test
```

## 📘 API Documentation

Detailed API documentation can be found in the [API Docs](./docs/api.md) file.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for details.

---

Made with ❤️ by [Your Name/Company]