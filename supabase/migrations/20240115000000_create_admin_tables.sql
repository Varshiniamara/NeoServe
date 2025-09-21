-- Create AI configurations table
CREATE TABLE IF NOT EXISTS ai_configurations (
    id BIGINT PRIMARY KEY,
    automation_threshold INTEGER NOT NULL DEFAULT 80,
    confidence_threshold INTEGER NOT NULL DEFAULT 90,
    response_time_target INTEGER NOT NULL DEFAULT 2,
    cost_limit INTEGER NOT NULL DEFAULT 1000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    api_key TEXT NOT NULL,
    webhook_url TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE ai_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_configurations
CREATE POLICY "Allow admins to manage AI configurations"
    ON ai_configurations
    FOR ALL
    TO authenticated
    USING (auth.role() = 'admin');

-- Create policies for integrations
CREATE POLICY "Allow admins to manage integrations"
    ON integrations
    FOR ALL
    TO authenticated
    USING (auth.role() = 'admin');

-- Insert default AI configuration
INSERT INTO ai_configurations (id, automation_threshold, confidence_threshold, response_time_target, cost_limit)
VALUES (1, 80, 90, 2, 1000)
ON CONFLICT (id) DO NOTHING; 