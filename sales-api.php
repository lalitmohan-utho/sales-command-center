<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Mock data for Sales & Leads Dashboard
$dashboardData = [
    'kpis' => [
        'totalBusiness' => 68019,
        'activeMRR' => 22850,
        'newBusiness' => 45220,
        'funnelSize' => 380000,
        'totalLeads' => 1248,
        'convertedLeads' => 186,
        'conversionRate' => 14.9,
        'activeContacts' => 842,
        'urgentContacts' => 28
    ],
    
    'quarterTarget' => [
        'target' => 2500000,
        'achieved' => 2087500,
        'achievementPercent' => 83.5
    ],
    
    'monthlyPerformance' => [
        ['month' => 'Oct', 'target' => 800000, 'achieved' => 720000],
        ['month' => 'Nov', 'target' => 850000, 'achieved' => 765000],
        ['month' => 'Dec', 'target' => 850000, 'achieved' => 602500]
    ],
    
    'followUpTasks' => [
        'today' => [
            [
                'id' => 1,
                'priority' => 'High',
                'contact' => 'Rohan Sharma',
                'company' => 'TechCorp India',
                'activityType' => 'Call',
                'dueDateTime' => 'Today 3:30 PM',
                'status' => 'Open'
            ],
            [
                'id' => 2,
                'priority' => 'Medium',
                'contact' => 'Ananya Gupta',
                'company' => 'CloudSolutions Pvt Ltd',
                'activityType' => 'Email',
                'dueDateTime' => 'Today 4:00 PM',
                'status' => 'Open'
            ],
            [
                'id' => 3,
                'priority' => 'High',
                'contact' => 'Vikram Singh',
                'company' => 'StartupXYZ',
                'activityType' => 'Meeting',
                'dueDateTime' => 'Today 5:00 PM',
                'status' => 'Scheduled'
            ],
            [
                'id' => 4,
                'priority' => 'Low',
                'contact' => 'Priya Desai',
                'company' => 'Enterprise Corp',
                'activityType' => 'Call',
                'dueDateTime' => 'Today 6:00 PM',
                'status' => 'Open'
            ],
            [
                'id' => 5,
                'priority' => 'Medium',
                'contact' => 'Amit Patel',
                'company' => 'Digital Innovations',
                'activityType' => 'Email',
                'dueDateTime' => 'Today 6:30 PM',
                'status' => 'Open'
            ],
            [
                'id' => 6,
                'priority' => 'High',
                'contact' => 'Sneha Kumar',
                'company' => 'Global Tech',
                'activityType' => 'Call',
                'dueDateTime' => 'Today 7:00 PM',
                'status' => 'In Progress'
            ],
            [
                'id' => 7,
                'priority' => 'Medium',
                'contact' => 'Rahul Verma',
                'company' => 'CloudHost Pro',
                'activityType' => 'Meeting',
                'dueDateTime' => 'Today 7:30 PM',
                'status' => 'Open'
            ],
            [
                'id' => 8,
                'priority' => 'Low',
                'contact' => 'Neha Joshi',
                'company' => 'Web Solutions Inc',
                'activityType' => 'Email',
                'dueDateTime' => 'Today 8:00 PM',
                'status' => 'Open'
            ]
        ],
        'overdue' => [],
        'next7days' => [],
        'next30days' => []
    ],
    
    'leadStatus' => [
        'newLeads' => 342,
        'activeContacts' => 842,
        'notContacted' => 156,
        'contacted' => 686,
        'urgentContacts' => 28,
        'retargetingContacts' => 94,
        'junkLeads' => 87,
        'lostCustomers' => 43
    ],
    
    'leadSource' => [
        'Website' => 428,
        'Email Campaign' => 312,
        'LinkedIn' => 186,
        'Referral' => 154,
        'Events' => 98,
        'Others' => 70
    ],
    
    'leadStages' => [
        'New' => 342,
        'Contacted' => 268,
        'Qualified' => 186,
        'Proposal' => 124,
        'Negotiation' => 98,
        'Won' => 156,
        'Lost' => 74
    ],
    
    'pipeline' => [
        'New' => [
            ['name' => 'Cloud Migration Project', 'company' => 'TechCorp', 'amount' => 250000, 'expectedClose' => '15 Dec'],
            ['name' => 'VM Infrastructure', 'company' => 'StartupXYZ', 'amount' => 120000, 'expectedClose' => '20 Dec'],
            ['name' => 'Kubernetes Setup', 'company' => 'Enterprise Corp', 'amount' => 180000, 'expectedClose' => '22 Dec']
        ],
        'Contacted' => [
            ['name' => 'Database Hosting', 'company' => 'Digital Innovations', 'amount' => 95000, 'expectedClose' => '18 Dec'],
            ['name' => 'Object Storage', 'company' => 'CloudSolutions', 'amount' => 75000, 'expectedClose' => '25 Dec']
        ],
        'Qualified' => [
            ['name' => 'Load Balancer Setup', 'company' => 'Global Tech', 'amount' => 145000, 'expectedClose' => '28 Dec'],
            ['name' => 'DR & Backup Solution', 'company' => 'Web Solutions', 'amount' => 220000, 'expectedClose' => '30 Dec']
        ],
        'Proposal' => [
            ['name' => 'Multi-Cloud Strategy', 'company' => 'CloudHost Pro', 'amount' => 350000, 'expectedClose' => '5 Jan'],
            ['name' => 'VM + Storage Bundle', 'company' => 'Tech Startups', 'amount' => 185000, 'expectedClose' => '10 Jan']
        ],
        'Negotiation' => [
            ['name' => 'Enterprise Cloud Package', 'company' => 'MegaCorp Ltd', 'amount' => 450000, 'expectedClose' => '12 Jan']
        ],
        'Won' => [
            ['name' => 'Kubernetes Cluster', 'company' => 'InnovateTech', 'amount' => 280000, 'expectedClose' => 'Closed'],
            ['name' => 'Database Migration', 'company' => 'DataCorp', 'amount' => 195000, 'expectedClose' => 'Closed']
        ],
        'Lost' => [
            ['name' => 'Basic VM Setup', 'company' => 'Budget Corp', 'amount' => 45000, 'expectedClose' => 'Lost']
        ]
    ],
    
    'recentActivity' => [
        [
            'type' => 'call',
            'description' => '<strong>Lalit</strong> called <strong>Rohan Sharma</strong> (TechCorp India) – Outcome: Interested, follow-up scheduled for tomorrow.',
            'timestamp' => '2 hours ago',
            'owner' => 'Lalit Kumar'
        ],
        [
            'type' => 'deal',
            'description' => '<strong>Nikhil</strong> moved Deal <strong>"XYZ Cloud Migration"</strong> to Negotiation stage – Deal value: ₹2,50,000.',
            'timestamp' => '3 hours ago',
            'owner' => 'Nikhil Verma'
        ],
        [
            'type' => 'email',
            'description' => '<strong>Ananya</strong> sent proposal email to <strong>Vikram Singh</strong> – Proposal for Kubernetes setup worth ₹1,80,000.',
            'timestamp' => '4 hours ago',
            'owner' => 'Ananya Gupta'
        ],
        [
            'type' => 'meeting',
            'description' => '<strong>Lalit</strong> completed meeting with <strong>Priya Desai</strong> (Enterprise Corp) – Next steps: Send technical documentation.',
            'timestamp' => '5 hours ago',
            'owner' => 'Lalit Kumar'
        ],
        [
            'type' => 'deal',
            'description' => '<strong>Rohan</strong> won Deal <strong>"Database Hosting Package"</strong> – Deal value: ₹1,95,000. Customer signed contract.',
            'timestamp' => '6 hours ago',
            'owner' => 'Rohan Sharma'
        ],
        [
            'type' => 'call',
            'description' => '<strong>Nikhil</strong> called <strong>Amit Patel</strong> (Digital Innovations) – Left voicemail, will retry tomorrow.',
            'timestamp' => '7 hours ago',
            'owner' => 'Nikhil Verma'
        ],
        [
            'type' => 'note',
            'description' => '<strong>Ananya</strong> added note to lead <strong>"Cloud Migration Project"</strong> – Customer concerned about pricing, needs competitive analysis.',
            'timestamp' => '8 hours ago',
            'owner' => 'Ananya Gupta'
        ],
        [
            'type' => 'email',
            'description' => '<strong>Lalit</strong> sent follow-up email to <strong>Sneha Kumar</strong> – Shared case studies and ROI calculator.',
            'timestamp' => '9 hours ago',
            'owner' => 'Lalit Kumar'
        ]
    ],
    
    'monthlyTargets' => [
        [
            'year' => 2025,
            'quarter' => 'Q1',
            'month' => 'January',
            'targetBusiness' => 850000,
            'achievedBusiness' => 720000,
            'targetMRR' => 280000,
            'achievedMRR' => 245000
        ],
        [
            'year' => 2024,
            'quarter' => 'Q4',
            'month' => 'December',
            'targetBusiness' => 850000,
            'achievedBusiness' => 602500,
            'targetMRR' => 270000,
            'achievedMRR' => 238000
        ],
        [
            'year' => 2024,
            'quarter' => 'Q4',
            'month' => 'November',
            'targetBusiness' => 850000,
            'achievedBusiness' => 765000,
            'targetMRR' => 265000,
            'achievedMRR' => 252000
        ],
        [
            'year' => 2024,
            'quarter' => 'Q4',
            'month' => 'October',
            'targetBusiness' => 800000,
            'achievedBusiness' => 720000,
            'targetMRR' => 260000,
            'achievedMRR' => 248000
        ],
        [
            'year' => 2024,
            'quarter' => 'Q3',
            'month' => 'September',
            'targetBusiness' => 750000,
            'achievedBusiness' => 695000,
            'targetMRR' => 250000,
            'achievedMRR' => 235000
        ],
        [
            'year' => 2024,
            'quarter' => 'Q3',
            'month' => 'August',
            'targetBusiness' => 750000,
            'achievedBusiness' => 680000,
            'targetMRR' => 245000,
            'achievedMRR' => 228000
        ]
    ]
];

echo json_encode($dashboardData);
?>