-- Create sales leads table
CREATE TABLE public.sales_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT DEFAULT 'Website',
  stage TEXT DEFAULT 'New',
  status TEXT DEFAULT 'Not Called',
  value DECIMAL(15,2) DEFAULT 0,
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sales deals table
CREATE TABLE public.sales_deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.sales_leads(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  value DECIMAL(15,2) NOT NULL DEFAULT 0,
  stage TEXT DEFAULT 'New',
  probability INTEGER DEFAULT 10,
  expected_close_date DATE,
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create follow-up tasks table
CREATE TABLE public.sales_followups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.sales_leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.sales_deals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  task TEXT NOT NULL,
  task_type TEXT DEFAULT 'Call',
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'Pending',
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sales targets table
CREATE TABLE public.sales_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rep TEXT NOT NULL,
  quarter TEXT NOT NULL,
  month TEXT NOT NULL,
  target_business DECIMAL(15,2) NOT NULL DEFAULT 0,
  achieved_revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
  target_mrr DECIMAL(15,2) NOT NULL DEFAULT 0,
  achieved_mrr DECIMAL(15,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'On Track',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activity log table
CREATE TABLE public.sales_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  activity_type TEXT DEFAULT 'general',
  lead_id UUID REFERENCES public.sales_leads(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES public.sales_deals(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sales_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_activities ENABLE ROW LEVEL SECURITY;

-- Create public read policies (for dashboard access without auth)
CREATE POLICY "Allow public read on sales_leads" ON public.sales_leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sales_leads" ON public.sales_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on sales_leads" ON public.sales_leads FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on sales_leads" ON public.sales_leads FOR DELETE USING (true);

CREATE POLICY "Allow public read on sales_deals" ON public.sales_deals FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sales_deals" ON public.sales_deals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on sales_deals" ON public.sales_deals FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on sales_deals" ON public.sales_deals FOR DELETE USING (true);

CREATE POLICY "Allow public read on sales_followups" ON public.sales_followups FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sales_followups" ON public.sales_followups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on sales_followups" ON public.sales_followups FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on sales_followups" ON public.sales_followups FOR DELETE USING (true);

CREATE POLICY "Allow public read on sales_targets" ON public.sales_targets FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sales_targets" ON public.sales_targets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on sales_targets" ON public.sales_targets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on sales_targets" ON public.sales_targets FOR DELETE USING (true);

CREATE POLICY "Allow public read on sales_activities" ON public.sales_activities FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sales_activities" ON public.sales_activities FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_sales_leads_updated_at BEFORE UPDATE ON public.sales_leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sales_deals_updated_at BEFORE UPDATE ON public.sales_deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sales_followups_updated_at BEFORE UPDATE ON public.sales_followups FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sales_targets_updated_at BEFORE UPDATE ON public.sales_targets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for leads
INSERT INTO public.sales_leads (name, company, email, phone, source, stage, status, value, assigned_to) VALUES
('Rohan Sharma', 'Cloud Ventures', 'rohan@cloudventures.com', '+91 98765 43210', 'Website', 'Qualified', 'Meeting Scheduled', 250000, 'TRM'),
('Priya Patel', 'Tech Innovations', 'priya@techinnovations.com', '+91 87654 32109', 'Referral', 'Proposal', 'Follow-up Required', 180000, 'ZRM'),
('Amit Kumar', 'Digital Dynamics', 'amit@digitaldynamics.com', '+91 76543 21098', 'Cold Call', 'New', 'Not Called', 120000, 'TRM'),
('Sneha Reddy', 'CloudTechies', 'sneha@cloudtechies.com', '+91 65432 10987', 'LinkedIn', 'Contacted', 'Called – No Answer', 180000, 'ZRM'),
('Vikram Singh', 'GreenTech Solutions', 'vikram@greentech.com', '+91 54321 09876', 'Website', 'New', 'Not Called', 100000, 'TRM'),
('Meera Gupta', 'Syntech Systems', 'meera@syntech.com', '+91 43210 98765', 'Email Campaign', 'Contacted', 'Sent Information – Awaiting Response', 220000, 'ZRM'),
('Rahul Verma', 'WebStudio Pro', 'rahul@webstudio.com', '+91 32109 87654', 'Referral', 'Qualified', 'Meeting Scheduled', 300000, 'TRM'),
('Anita Joshi', 'SalesInc Corp', 'anita@salesinc.com', '+91 21098 76543', 'Website', 'Proposal', 'Follow-up Required', 400000, 'ZRM'),
('Karan Malhotra', 'AppWorks Digital', 'karan@appworks.com', '+91 10987 65432', 'Cold Call', 'Qualified', 'Callback Requested', 440000, 'TRM'),
('Deepika Nair', 'BotFactory AI', 'deepika@botfactory.com', '+91 09876 54321', 'LinkedIn', 'Proposal', 'Meeting Scheduled', 600000, 'ZRM');

-- Insert sample data for deals
INSERT INTO public.sales_deals (name, company, value, stage, probability, expected_close_date, assigned_to) VALUES
('Cloud Migration', 'CloudTechies', 180000, 'New', 10, '2024-02-15', 'TRM'),
('AWS Implementation', 'GreenTech', 100000, 'New', 10, '2024-02-20', 'ZRM'),
('ERP System', 'Syntech', 220000, 'Contacted', 25, '2024-02-25', 'TRM'),
('Website Redesign', 'WebStudio', 300000, 'Contacted', 25, '2024-03-01', 'ZRM'),
('ICRM Solutions', 'SalesInc', 400000, 'Qualified', 50, '2024-03-10', 'TRM'),
('Mobile App', 'AppWorks', 440000, 'Qualified', 50, '2024-03-15', 'ZRM'),
('AI Chatbots', 'BotFactory', 600000, 'Proposal', 75, '2024-03-20', 'TRM'),
('Cybersecurity', 'SecureIT', 650000, 'Proposal', 75, '2024-03-25', 'ZRM'),
('Cloud Infrastructure', 'Enterprise Corp', 1000000, 'Negotiation', 90, '2024-04-01', 'TRM'),
('Data Analytics', 'DataViz', 820000, 'Negotiation', 90, '2024-04-05', 'ZRM');

-- Insert sample data for follow-ups
INSERT INTO public.sales_followups (name, company, task, task_type, scheduled_time, status, assigned_to) VALUES
('Rohan Sharma', 'Cloud Ventures', 'Cloud Migration Discussion', 'Call', now() + interval '2 hours', 'Done', 'TRM'),
('Priya Patel', 'Tech Innovations', 'VDI Requirements Call', 'Meeting', now() + interval '4 hours', 'Done', 'ZRM'),
('Amit Kumar', 'Digital Dynamics', 'Product Introduction', 'Email', now() - interval '2 hours', 'Contacted', 'TRM'),
('Sneha Reddy', 'CloudTechies', 'Follow-up on Proposal', 'Call', now() + interval '1 day', 'Pending', 'ZRM'),
('Vikram Singh', 'GreenTech Solutions', 'Initial Contact', 'Call', now() + interval '3 hours', 'Pending', 'TRM');

-- Insert sample data for targets
INSERT INTO public.sales_targets (rep, quarter, month, target_business, achieved_revenue, target_mrr, achieved_mrr, status) VALUES
('TRM', 'Q4', 'October', 716000, 623000, 4400, 3530, 'On Track'),
('ZRM', 'Q4', 'November', 866000, 802000, 7800, 9300, 'On Track'),
('ZRM', 'Q4', 'December', 966000, 760000, 9600, 4830, 'At Risk'),
('TRM', 'Q4', 'December', 850000, 720000, 8500, 7200, 'On Track');

-- Insert sample activities
INSERT INTO public.sales_activities (user_name, description, details, activity_type) VALUES
('Latif', 'added EMC Corp deal worth ₹2.5L to the pipeline from lead source', '', 'deal'),
('Neelam', 'scheduled a meeting with XYZ Corp for negotiation', '', 'meeting'),
('Aravind', 'sent a help sheet lead about cloud services', '', 'email'),
('VR', 'updated meeting with Apex Digital Agency', '', 'meeting'),
('Lead call from', 'S Wariya Pillage Gura', '', 'call'),
('Aravind', 'sent Khvistika Reddy on cold outreach list', '', 'email');