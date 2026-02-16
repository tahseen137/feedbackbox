-- FeedbackBox Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (handled by Supabase Auth)
-- We'll reference auth.users(id)

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'praise')),
  message TEXT NOT NULL,
  email TEXT,
  votes INT DEFAULT 0 NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'planned', 'in-progress', 'completed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Votes table (track who voted)
CREATE TABLE feedback_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feedback_id UUID REFERENCES feedback(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(feedback_id, user_email)
);

-- Comments table
CREATE TABLE feedback_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feedback_id UUID REFERENCES feedback(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  comment TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Project settings table
CREATE TABLE project_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email_notifications BOOLEAN DEFAULT TRUE NOT NULL,
  public_roadmap BOOLEAN DEFAULT FALSE NOT NULL,
  custom_branding JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_feedback_project ON feedback(project_id);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_created ON feedback(created_at DESC);
CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_comments_feedback ON feedback_comments(feedback_id);
CREATE INDEX idx_votes_feedback ON feedback_votes(feedback_id);

-- Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_settings ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for feedback (public can submit, owners can manage)
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Project owners can view feedback"
  ON feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = feedback.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Project owners can update feedback"
  ON feedback FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = feedback.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Project owners can delete feedback"
  ON feedback FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = feedback.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Policies for votes (anyone can vote)
CREATE POLICY "Anyone can vote"
  ON feedback_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view votes"
  ON feedback_votes FOR SELECT
  USING (true);

-- Policies for comments
CREATE POLICY "Anyone can view comments"
  ON feedback_comments FOR SELECT
  USING (true);

CREATE POLICY "Users can create comments"
  ON feedback_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Project owners can manage comments"
  ON feedback_comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM feedback f
      JOIN projects p ON p.id = f.project_id
      WHERE f.id = feedback_comments.feedback_id
      AND p.user_id = auth.uid()
    )
  );

-- Policies for project settings
CREATE POLICY "Users can view their project settings"
  ON project_settings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_settings.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their project settings"
  ON project_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_settings.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_settings_updated_at BEFORE UPDATE ON project_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
