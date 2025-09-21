-- Insert sample users
INSERT INTO users (email, name, role, department) VALUES
('john.doe@company.com', 'John Doe', 'employee', 'Engineering'),
('jane.smith@company.com', 'Jane Smith', 'employee', 'Support'),
('admin@company.com', 'Admin User', 'admin', 'IT'),
('alice.johnson@customer.com', 'Alice Johnson', 'customer', NULL),
('bob.smith@customer.com', 'Bob Smith', 'customer', NULL);

-- Insert sample tickets
INSERT INTO tickets (title, description, status, priority, category, assigned_to, customer_id) 
SELECT 
  'Login Issues',
  'Unable to access account after password reset',
  'in_progress',
  'high',
  'Technical',
  (SELECT id FROM users WHERE email = 'john.doe@company.com'),
  (SELECT id FROM users WHERE email = 'alice.johnson@customer.com');

INSERT INTO tickets (title, description, status, priority, category, assigned_to, customer_id)
SELECT
  'Email Configuration',
  'Need help setting up email forwarding',
  'resolved',
  'medium',
  'Configuration',
  (SELECT id FROM users WHERE email = 'john.doe@company.com'),
  (SELECT id FROM users WHERE email = 'bob.smith@customer.com');

-- Insert sample mood entries
INSERT INTO mood_entries (user_id, mood_value, sentiment)
SELECT 
  (SELECT id FROM users WHERE email = 'john.doe@company.com'),
  7,
  'positive';

INSERT INTO mood_entries (user_id, mood_value, sentiment)
SELECT 
  (SELECT id FROM users WHERE email = 'jane.smith@company.com'),
  8,
  'positive';
