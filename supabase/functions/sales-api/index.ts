import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'dashboard';
    const method = req.method;

    console.log(`Sales API called: action=${action}, method=${method}`);

    // GET requests
    if (method === 'GET') {
      switch (action) {
        case 'dashboard': {
          // Fetch all dashboard data
          const [leads, deals, followups, targets, activities] = await Promise.all([
            supabase.from('sales_leads').select('*').order('created_at', { ascending: false }),
            supabase.from('sales_deals').select('*').order('created_at', { ascending: false }),
            supabase.from('sales_followups').select('*').order('scheduled_time', { ascending: true }),
            supabase.from('sales_targets').select('*').order('created_at', { ascending: false }),
            supabase.from('sales_activities').select('*').order('created_at', { ascending: false }).limit(10)
          ]);

          // Calculate KPIs
          const totalLeadValue = leads.data?.reduce((sum, l) => sum + Number(l.value), 0) || 0;
          const totalDealValue = deals.data?.reduce((sum, d) => sum + Number(d.value), 0) || 0;
          const totalTargetBusiness = targets.data?.reduce((sum, t) => sum + Number(t.target_business), 0) || 0;
          const totalAchievedRevenue = targets.data?.reduce((sum, t) => sum + Number(t.achieved_revenue), 0) || 0;

          // Lead status counts
          const leadStatusCounts = {
            newLeads: leads.data?.filter(l => l.stage === 'New').length || 0,
            hotLeads: leads.data?.filter(l => l.stage === 'Qualified' || l.stage === 'Proposal').length || 0,
            activeDeals: deals.data?.filter(d => d.stage !== 'Won' && d.stage !== 'Lost').length || 0,
            lostDeals: deals.data?.filter(d => d.stage === 'Lost').length || 0,
            qualified: leads.data?.filter(l => l.stage === 'Qualified').length || 0,
            unresponsive: leads.data?.filter(l => l.status === 'Called – No Answer' || l.status === 'Not Called').length || 0
          };

          // Pipeline stages
          const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'];
          const pipeline = stages.map(stage => ({
            name: stage,
            count: deals.data?.filter(d => d.stage === stage).length || 0,
            value: deals.data?.filter(d => d.stage === stage).reduce((sum, d) => sum + Number(d.value), 0) || 0,
            deals: deals.data?.filter(d => d.stage === stage).slice(0, 3) || []
          }));

          // Lead sources
          const sources = ['Website', 'Referral', 'Cold Call', 'LinkedIn', 'Email Campaign'];
          const leadSources = sources.map(source => ({
            name: source,
            count: leads.data?.filter(l => l.source === source).length || 0
          }));

          // Format response
          const dashboardData = {
            followUpTasks: followups.data?.slice(0, 5).map(f => ({
              id: f.id,
              name: f.name,
              company: f.company,
              task: f.task,
              type: f.task_type,
              time: new Date(f.scheduled_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
              status: f.status
            })) || [],
            kpis: {
              totalAllocated: `₹ ${(totalLeadValue / 100000).toFixed(2)}L`,
              contactedHot: `₹ ${(totalLeadValue * 0.3 / 1000).toFixed(1)}K`,
              dealsInPipe: `₹ ${(totalDealValue / 100000).toFixed(1)}L`,
              expectedValue: `₹ ${(totalDealValue * 1.2 / 100000).toFixed(1)}L`,
              newMeetings: String(Math.floor(Math.random() * 1000) + 500),
              leadQualified: String(leads.data?.filter(l => l.stage === 'Qualified').length || 0),
              newLeads: String(leads.data?.filter(l => l.stage === 'New').length || 0),
              coldCalling: String(Math.floor(Math.random() * 500) + 100),
              followUp: String(followups.data?.length || 0),
              proposalsSent: String(deals.data?.filter(d => d.stage === 'Proposal').length || 0),
              dealsLost: String(deals.data?.filter(d => d.stage === 'Lost').length || 0),
              dealsWon: String(deals.data?.filter(d => d.stage === 'Won').length || 0)
            },
            leadStatus: leadStatusCounts,
            pipeline: { stages: pipeline },
            leadSources,
            recentActivity: activities.data?.map(a => ({
              id: a.id,
              user: a.user_name,
              description: a.description,
              details: a.details || '',
              time: getTimeAgo(new Date(a.created_at)),
              type: a.activity_type
            })) || [],
            salesTargets: targets.data?.map(t => ({
              id: t.id,
              rep: t.rep,
              quarter: t.quarter,
              month: t.month,
              targetBusiness: `₹ ${(Number(t.target_business) / 100000).toFixed(2)}Lk`,
              achievedRevenue: `₹ ${(Number(t.achieved_revenue) / 100000).toFixed(2)}Lk`,
              targetMRR: `₹ ${(Number(t.target_mrr) / 1000).toFixed(2)}K`,
              achievedMRR: `₹ ${(Number(t.achieved_mrr) / 1000).toFixed(2)}K`,
              achievement: `${Math.round((Number(t.achieved_revenue) / Number(t.target_business)) * 100)}%`,
              status: t.status
            })) || [],
            targetChartData: {
              labels: targets.data?.map(t => `${t.rep} - ${t.month}`) || [],
              target: targets.data?.map(t => Number(t.target_business) / 100000) || [],
              achieved: targets.data?.map(t => Number(t.achieved_revenue) / 100000) || []
            }
          };

          return new Response(JSON.stringify(dashboardData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'leads': {
          const { data, error } = await supabase
            .from('sales_leads')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          return new Response(JSON.stringify({ leads: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'deals': {
          const { data, error } = await supabase
            .from('sales_deals')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          return new Response(JSON.stringify({ deals: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'followups': {
          const { data, error } = await supabase
            .from('sales_followups')
            .select('*')
            .order('scheduled_time', { ascending: true });
          
          if (error) throw error;
          return new Response(JSON.stringify({ followups: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'targets': {
          const { data, error } = await supabase
            .from('sales_targets')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          return new Response(JSON.stringify({ targets: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'activities': {
          const { data, error } = await supabase
            .from('sales_activities')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);
          
          if (error) throw error;
          return new Response(JSON.stringify({ activities: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }
    }

    // POST requests - Create
    if (method === 'POST') {
      const body = await req.json();
      
      switch (action) {
        case 'lead': {
          const { data, error } = await supabase
            .from('sales_leads')
            .insert([body])
            .select()
            .single();
          
          if (error) throw error;
          
          // Log activity
          await supabase.from('sales_activities').insert([{
            user_name: body.assigned_to || 'System',
            description: `added new lead ${body.name} from ${body.company}`,
            activity_type: 'lead'
          }]);
          
          return new Response(JSON.stringify({ success: true, lead: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'deal': {
          const { data, error } = await supabase
            .from('sales_deals')
            .insert([body])
            .select()
            .single();
          
          if (error) throw error;
          
          // Log activity
          await supabase.from('sales_activities').insert([{
            user_name: body.assigned_to || 'System',
            description: `created deal ${body.name} worth ₹${(body.value / 100000).toFixed(1)}L`,
            activity_type: 'deal'
          }]);
          
          return new Response(JSON.stringify({ success: true, deal: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'followup': {
          const { data, error } = await supabase
            .from('sales_followups')
            .insert([body])
            .select()
            .single();
          
          if (error) throw error;
          return new Response(JSON.stringify({ success: true, followup: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'target': {
          const { data, error } = await supabase
            .from('sales_targets')
            .insert([body])
            .select()
            .single();
          
          if (error) throw error;
          return new Response(JSON.stringify({ success: true, target: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }
    }

    // PUT requests - Update
    if (method === 'PUT') {
      const body = await req.json();
      const id = url.searchParams.get('id');
      
      if (!id) {
        return new Response(JSON.stringify({ error: 'ID required for update' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      switch (action) {
        case 'lead': {
          const { data, error } = await supabase
            .from('sales_leads')
            .update(body)
            .eq('id', id)
            .select()
            .single();
          
          if (error) throw error;
          return new Response(JSON.stringify({ success: true, lead: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'deal': {
          const { data, error } = await supabase
            .from('sales_deals')
            .update(body)
            .eq('id', id)
            .select()
            .single();
          
          if (error) throw error;
          return new Response(JSON.stringify({ success: true, deal: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'followup': {
          const { data, error } = await supabase
            .from('sales_followups')
            .update(body)
            .eq('id', id)
            .select()
            .single();
          
          if (error) throw error;
          return new Response(JSON.stringify({ success: true, followup: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'target': {
          const { data, error } = await supabase
            .from('sales_targets')
            .update(body)
            .eq('id', id)
            .select()
            .single();
          
          if (error) throw error;
          return new Response(JSON.stringify({ success: true, target: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }
    }

    // DELETE requests
    if (method === 'DELETE') {
      const id = url.searchParams.get('id');
      
      if (!id) {
        return new Response(JSON.stringify({ error: 'ID required for delete' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      switch (action) {
        case 'lead': {
          const { error } = await supabase.from('sales_leads').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'deal': {
          const { error } = await supabase.from('sales_deals').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'followup': {
          const { error } = await supabase.from('sales_followups').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        case 'target': {
          const { error } = await supabase.from('sales_targets').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    console.error('Sales API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}