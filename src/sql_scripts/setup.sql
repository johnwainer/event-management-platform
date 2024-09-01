-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data if the table is empty
INSERT INTO Events (name, date, location, description) 
SELECT * FROM (SELECT 'Event ' || RAND(), NOW() + INTERVAL (FLOOR(RAND() * 365)) DAY, 
                       CONCAT('Location ', FLOOR(RAND() * 100)), 
                       CONCAT('Description for event ', FLOOR(RAND() * 100))) AS tmp 
WHERE NOT EXISTS (SELECT 1 FROM Events) LIMIT 50;

-- Iser sample data one by one
INSERT INTO Events (name, description, date, location) VALUES
('Event 1', 'Description for event 1', '2024-09-01', 'Parque Lleras, Medellín'),
('Event 2', 'Description for event 2', '2024-09-02', 'Plaza Botero, Medellín'),
('Event 3', 'Description for event 3', '2024-09-03', 'Jardín Botánico, Medellín'),
('Event 4', 'Description for event 4', '2024-09-04', 'Pueblito Paisa, Medellín'),
('Event 5', 'Description for event 5', '2024-09-05', 'Museo de Antioquia, Medellín'),
('Event 6', 'Description for event 6', '2024-09-06', 'Centro Comercial Santafé, Medellín'),
('Event 7', 'Description for event 7', '2024-09-07', 'Parque Explora, Medellín'),
('Event 8', 'Description for event 8', '2024-09-08', 'Estadio Atanasio Girardot, Medellín'),
('Event 9', 'Description for event 9', '2024-09-09', 'Comuna 13, Medellín'),
('Event 10', 'Description for event 10', '2024-09-10', 'Avenida El Poblado, Medellín'),
('Event 11', 'Description for event 11', '2024-09-11', 'Parque de los Deseos, Medellín'),
('Event 12', 'Description for event 12', '2024-09-12', 'Plaza Mayor, Medellín'),
('Event 13', 'Description for event 13', '2024-09-13', 'Zona Rosa, Medellín'),
('Event 14', 'Description for event 14', '2024-09-14', 'Universidad de Medellín, Medellín'),
('Event 15', 'Description for event 15', '2024-09-15', 'Parque del Río, Medellín'),
('Event 16', 'Description for event 16', '2024-09-16', 'Centro Comercial Oviedo, Medellín'),
('Event 17', 'Description for event 17', '2024-09-17', 'La 70, Medellín'),
('Event 18', 'Description for event 18', '2024-09-18', 'Parque de los Pies Descalzos, Medellín'),
('Event 19', 'Description for event 19', '2024-09-19', 'Museo del Oro, Medellín'),
('Event 20', 'Description for event 20', '2024-09-20', 'La Presidenta, Medellín');

-- Create Attendees table
CREATE TABLE Attendees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    eventId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (eventId) REFERENCES Events(id)
);

-- Insert attendees
INSERT INTO Attendees (name, email, eventId) VALUES
('John Doe', 'john.doe@example.com', 1),
('Jane Smith', 'jane.smith@example.com', 1),
('Robert Brown', 'robert.brown@example.com', 2),
('Emily Davis', 'emily.davis@example.com', 2),
('Michael Wilson', 'michael.wilson@example.com', 3),
('Sarah Johnson', 'sarah.johnson@example.com', 3),
('James Lee', 'james.lee@example.com', 4),
('Linda Martinez', 'linda.martinez@example.com', 4),
('William Anderson', 'william.anderson@example.com', 5),
('Elizabeth Taylor', 'elizabeth.taylor@example.com', 5);
