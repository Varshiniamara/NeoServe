-- Function to calculate ticket metrics
CREATE OR REPLACE FUNCTION get_ticket_metrics(
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  dept_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  total_tickets BIGINT,
  resolved_tickets BIGINT,
  avg_resolution_time INTERVAL,
  high_priority_count BIGINT,
  by_category JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH ticket_stats AS (
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
      AVG(CASE WHEN status = 'resolved' THEN updated_at - created_at END) as avg_time,
      COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority,
      jsonb_object_agg(category, COUNT(*)) as categories
    FROM tickets t
    LEFT JOIN users u ON t.assigned_to = u.id
    WHERE t.created_at BETWEEN start_date AND end_date
    AND (dept_filter IS NULL OR u.department = dept_filter)
  )
  SELECT 
    total::BIGINT,
    resolved::BIGINT,
    avg_time,
    high_priority::BIGINT,
    categories
  FROM ticket_stats;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate SLA compliance
CREATE OR REPLACE FUNCTION calculate_sla_compliance(
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE (
  current_sla DECIMAL,
  target_sla DECIMAL,
  compliant_tickets BIGINT,
  total_tickets BIGINT
) AS $$
DECLARE
  sla_threshold INTERVAL := '4 hours';
BEGIN
  RETURN QUERY
  WITH sla_stats AS (
    SELECT 
      COUNT(CASE WHEN (updated_at - created_at) <= sla_threshold THEN 1 END) as compliant,
      COUNT(*) as total
    FROM tickets
    WHERE status = 'resolved'
    AND created_at BETWEEN start_date AND end_date
  )
  SELECT 
    ROUND((compliant::DECIMAL / NULLIF(total, 0)) * 100, 2) as current_sla,
    95.0 as target_sla,
    compliant,
    total
  FROM sla_stats;
END;
$$ LANGUAGE plpgsql;

-- Create feedback table for CSAT tracking
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES tickets(id),
  customer_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table for real-time alerts
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
