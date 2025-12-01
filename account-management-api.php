<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$period = isset($_GET['period']) ? $_GET['period'] : 'month';

function generateAccountData($period) {
    $data = [
        'kpis' => [
            ['label' => 'Total MRR', 'value' => '₹42.8L', 'trend' => 8.5, 'subtitle' => 'Monthly Recurring Revenue'],
            ['label' => 'Net Revenue Change', 'value' => '₹3.2L', 'trend' => 0, 'subtitle' => 'Expansion - Contraction - Churn'],
            ['label' => 'Churn Rate', 'value' => '2.4%', 'trend' => 0, 'subtitle' => 'Last 90 days'],
            ['label' => 'At-Risk Accounts', 'value' => '12', 'trend' => 0, 'subtitle' => 'Based on health score'],
            ['label' => 'Active Advocates', 'value' => '34', 'trend' => 5, 'subtitle' => 'Referral & testimonial ready'],
            ['label' => 'Avg Health Score', 'value' => '78/100', 'trend' => 0, 'subtitle' => 'Weighted average']
        ],
        'healthDistribution' => [
            'labels' => ['Healthy', 'Watchlist', 'At Risk', 'Critical'],
            'values' => [85, 34, 19, 9]
        ],
        'atRiskAccounts' => [
            [
                'name' => 'TechStart Solutions',
                'mrr' => 320000,
                'arr' => 3840000,
                'healthScore' => 32,
                'tags' => ['Low usage', 'High tickets'],
                'lastContact' => '15 days ago',
                'renewalDate' => 'Jan 15, 2025'
            ],
            [
                'name' => 'Digital Innovation Pvt Ltd',
                'mrr' => 120000,
                'arr' => 1440000,
                'healthScore' => 45,
                'tags' => ['Payment delays', 'No engagement'],
                'lastContact' => 'Never',
                'renewalDate' => 'Feb 8, 2025'
            ],
            [
                'name' => 'CloudFirst Systems',
                'mrr' => 800000,
                'arr' => 9600000,
                'healthScore' => 51,
                'tags' => ['Critical tickets', 'Low adoption'],
                'lastContact' => '7 days ago',
                'renewalDate' => 'Feb 10, 2025'
            ]
        ],
        'renewals' => [
            [
                'date' => 'Feb 15, 2025',
                'account' => 'Acme Corp',
                'manager' => 'Priya Sharma',
                'mrr' => 250000,
                'status' => 'Prepared Lost',
                'statusClass' => 'danger'
            ],
            [
                'date' => 'Feb 22, 2025',
                'account' => 'Beta Solutions',
                'manager' => 'Buying FMCG SAAS',
                'mrr' => 350000,
                'status' => 'Renewed',
                'statusClass' => 'success'
            ],
            [
                'date' => 'Mar 3, 2025',
                'account' => 'Gamma Tech',
                'manager' => 'In Process',
                'mrr' => 500000,
                'status' => 'In Process',
                'statusClass' => 'warning'
            ],
            [
                'date' => 'Mar 12, 2025',
                'account' => 'Delta Platforms',
                'manager' => 'Getting Offer',
                'mrr' => 85000,
                'status' => 'Closed',
                'statusClass' => 'danger'
            ]
        ],
        'mrrTrend' => [
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'existingMrr' => [38, 39, 40, 41, 42, 42.8],
            'collectionMrr' => [36, 37, 38, 39, 40, 41],
            'churnMrr' => [1.2, 1.5, 1.3, 1.6, 1.4, 1.6],
            'netGrowth' => 13.2
        ],
        'products' => [
            ['name' => 'Cloud Instances', 'accounts' => 145, 'adoption' => '87%'],
            ['name' => 'Kubernetes', 'accounts' => 89, 'adoption' => '65%'],
            ['name' => 'Databases', 'accounts' => 94, 'adoption' => 'Medium'],
            ['name' => 'Object Storage', 'accounts' => 76, 'adoption' => '59%'],
            ['name' => 'Load Balancers', 'accounts' => 42, 'adoption' => 'Medium'],
            ['name' => 'Other Services', 'accounts' => 34, 'adoption' => 'Low']
        ],
        'usageInsights' => [
            [
                'account' => 'Maya Solutions',
                'usage' => '+ 55% MoM | 438 GB',
                'utilization' => 'Overpaid usage',
                'action' => 'Schedule expansion call'
            ],
            [
                'account' => 'Sapthagiri Cloud Co',
                'usage' => '49 VMs | 826 GB | 21 TB',
                'utilization' => 'Over-utilized',
                'action' => 'Recommend upgrade to higher-tier'
            ],
            [
                'account' => 'Sterling Labs',
                'usage' => '5 VMs | 324 GB | 1.3 TB',
                'utilization' => 'Healthy',
                'action' => 'All good'
            ],
            [
                'account' => 'Tool Integrators',
                'usage' => '1 VM | 185 GB | 0.4 TB',
                'utilization' => 'Low usage',
                'action' => '< $25 / $ 600 over 99c months'
            ]
        ],
        'tasks' => [
            [
                'priority' => 'HIGH',
                'customer' => 'Acme Corp',
                'type' => 'Renewal QBR',
                'description' => 'Discuss Q4 contract renewal + check on 2 critical tickets',
                'time' => 'Today - 11:00 AM',
                'tag' => 'HIGH'
            ],
            [
                'priority' => 'MEDIUM',
                'customer' => 'Beta Solutions',
                'type' => 'Jira closed',
                'description' => 'Review closed tickets + send followup to see if it\'s resolved',
                'time' => 'Today - 3:00 PM',
                'tag' => 'In 35 min'
            ]
        ],
        'referralStats' => [
            'referrals' => 28,
            'testimonials' => 12,
            'potentialMrr' => '₹8.4L'
        ],
        'referralPipeline' => [
            ['referrer' => 'Acme Corp', 'referred' => 'NewTech Solutions', 'status' => 'Interested', 'mrr' => 150000],
            ['referrer' => 'Beta Solutions', 'referred' => 'Gamma Tech', 'status' => 'In contact', 'mrr' => 90000],
            ['referrer' => 'Gamma Tech', 'referred' => 'Epsilon Ltd', 'status' => 'New', 'mrr' => 150000]
        ],
        'advocacyCandidates' => [
            ['name' => 'Acme Corp', 'contact' => 'Priya Sharma', 'quote' => '"Wow, AI with Multicloud"', 'note' => '"Good for next case study"', 'score' => 98],
            ['name' => 'Beta Solutions', 'contact' => 'Rajesh Malhotra', 'quote' => '"Really satisfied"', 'note' => '"Good on next support visit"', 'score' => 98],
            ['name' => 'Epsilon Inc', 'contact' => 'Sanaa Mehra', 'quote' => '"Partner of choice"', 'note' => '"Ready to refer again"', 'score' => 94]
        ],
        'supportStats' => [
            'openTickets' => 45,
            'escalated' => 5,
            'avgResponseTime' => '4.2h',
            'csat' => '4.3/5'
        ],
        'priorityDistribution' => [
            'labels' => ['Critical', 'High', 'Medium', 'Low'],
            'values' => [5, 9, 22, 14]
        ],
        'criticalTickets' => [
            ['ticket' => 'N7876768', 'description' => 'VM resource increased', 'account' => 'Acme Corp', 'priority' => 'Critical', 'age' => '2d'],
            ['ticket' => 'N7876857', 'description' => 'DB backup assessment', 'account' => 'Beta Solutions', 'priority' => 'High', 'age' => '1d'],
            ['ticket' => 'N7867838', 'description' => 'Domain help', 'account' => 'Gamma Tech', 'priority' => 'Medium', 'age' => '5h']
        ],
        'portfolio' => [
            [
                'account' => 'Acme Corp',
                'email' => 'Acme@utho.in',
                'segment' => 'Enterprise',
                'mrr' => 250000,
                'health' => 85,
                'products' => ['Cloud', 'K8s', 'DB', 'Storage'],
                'renewal' => 'Apr 15, 2025',
                'growth' => 'Expanded'
            ],
            [
                'account' => 'Beta Solutions',
                'email' => 'connect@beta.in',
                'segment' => 'Mid-Market',
                'mrr' => 150000,
                'health' => 32,
                'products' => ['Cloud', 'DB'],
                'renewal' => 'Apr 7, 2025',
                'growth' => 'Stable'
            ],
            [
                'account' => 'Gamma Tech',
                'email' => 'PHPTeamtech',
                'segment' => 'SMB',
                'mrr' => 65000,
                'health' => 68,
                'products' => ['Cloud'],
                'renewal' => 'Jun 10, 2025',
                'growth' => 'Expanded'
            ],
            [
                'account' => 'Delta Platforms',
                'email' => 'OPTeam@delta',
                'segment' => 'Enterprise',
                'mrr' => 280000,
                'health' => 92,
                'products' => ['Cloud', 'K8s', 'DB', 'Storage', 'LB'],
                'renewal' => 'Jul 20, 2025',
                'growth' => 'Expanded'
            ]
        ],
        'recentActivity' => [
            ['type' => 'renewal', 'title' => 'Renewal closed: ACME', 'description' => 'Acme Corp a new Kubernetes add-on for 12M+K/E/P', 'time' => '2 minutes ago', 'owner' => 'Priya'],
            ['type' => 'qbr', 'title' => 'QBR completed', 'description' => 'Beta Solutions reviewed all goals and KPIs', 'time' => '9 minutes ago', 'owner' => 'You'],
            ['type' => 'upsell', 'title' => 'Upsell achieved', 'description' => 'Deals with a double their K8s unit + 5 DB add-on', 'time' => '5 minutes ago', 'owner' => 'Amit Patel'],
            ['type' => 'churn', 'title' => 'Churn alert: 3Q50(SL) - Reason: Budget cuts', 'description' => 'Epsilon Infotech did not move renewal + opted ARR+K', 'time' => '1 day ago', 'owner' => 'Rajesh Kr', 'badge' => 'Lost'],
            ['type' => 'call', 'title' => 'Customer call', 'description' => 'Weekly touchbase with TechVision about integration', 'time' => '2 days ago', 'owner' => 'You'],
            ['type' => 'email', 'title' => 'Follow-up sent', 'description' => 'Sent renewal proposal + pricing to CloudBase SO', 'time' => '2 days ago', 'owner' => 'Neha M']
        ]
    ];

    return $data;
}

echo json_encode(generateAccountData($period));
?>