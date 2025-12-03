<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dashboardData = [
    'followUpTasks' => [
        [
            'name' => 'Rohan Sharma',
            'company' => 'Cloud Ventures',
            'task' => 'Cloud Migration',
            'type' => 'Call',
            'time' => '2:45 PM',
            'status' => 'Done'
        ],
        [
            'name' => 'Priya Patel',
            'company' => 'Tech Innovations',
            'task' => 'VDI Requirements Call',
            'type' => 'Meeting',
            'time' => '3:45 PM',
            'status' => 'Done'
        ],
        [
            'name' => 'Amit Kumar',
            'company' => 'Digital Dynamics',
            'task' => 'Product Introduction',
            'type' => 'Email',
            'time' => '11:00 AM',
            'status' => 'Contacted'
        ]
    ],
    'kpis' => [
        'total_business' => '₹ 68.02L',
        'active_mrr' => '₹ 45.3K',
        'new_business' => '₹ 32.5L',
        'funnel_size' => '₹ 125.8L',
        'total_leads' => '₹ 125.8L',
        'converted_leads' => '₹ 125.8L',
        'newMeetings' => '1,247',
        'leadQualified' => '342',
        'newLeads' => '89',
        'coldCalling' => '523',
        'followUp' => '156',
        'proposalsSent' => '78',
        'dealsLost' => '23',
        'dealsWon' => '45'
    ],
    'leadStatus' => [
        'newLeads' => 89,
        'hotLeads' => 523,
        'activeDeals' => 234,
        'lostDeals' => 83,
        'qualified' => 234,
        'unresponsive' => 156
    ],
    'pipeline' => [
        'stages' => [
            [
                'name' => 'New',
                'count' => 7,
                'value' => '₹ 2.8L',
                'deals' => [
                    [
                        'name' => 'Cloud Migration',
                        'company' => 'CloudTechies',
                        'value' => '₹ 1.8Lk',
                        'stage' => 'New'
                    ],
                    [
                        'name' => 'AWS Implementation',
                        'company' => 'GreenTech',
                        'value' => '₹ 1Lk',
                        'stage' => 'New'
                    ]
                ]
            ],
            [
                'name' => 'Contacted',
                'count' => 12,
                'value' => '₹ 5.2L',
                'deals' => [
                    [
                        'name' => 'ERP System',
                        'company' => 'Syntech',
                        'value' => '₹ 2.2Lk',
                        'stage' => 'Contacted'
                    ],
                    [
                        'name' => 'Website Redesign',
                        'company' => 'WebStudio',
                        'value' => '₹ 3Lk',
                        'stage' => 'Contacted'
                    ]
                ]
            ],
            [
                'name' => 'Qualified',
                'count' => 10,
                'value' => '₹ 8.4L',
                'deals' => [
                    [
                        'name' => 'ICRM Solutions',
                        'company' => 'SalesInc',
                        'value' => '₹ 4Lk',
                        'stage' => 'Qualified'
                    ],
                    [
                        'name' => 'Mobile App',
                        'company' => 'AppWorks',
                        'value' => '₹ 4.4Lk',
                        'stage' => 'Qualified'
                    ]
                ]
            ],
            [
                'name' => 'Proposal',
                'count' => 15,
                'value' => '₹ 12.5L',
                'deals' => [
                    [
                        'name' => 'AI Chatbots',
                        'company' => 'BotFactory',
                        'value' => '₹ 6Lk',
                        'stage' => 'Proposal'
                    ],
                    [
                        'name' => 'Cybersecurity',
                        'company' => 'SecureIT',
                        'value' => '₹ 6.5Lk',
                        'stage' => 'Proposal'
                    ]
                ]
            ],
            [
                'name' => 'Negotiation',
                'count' => 9,
                'value' => '₹ 18.2L',
                'deals' => [
                    [
                        'name' => 'Cloud Infrastructure',
                        'company' => 'Enterprise Corp',
                        'value' => '₹ 10Lk',
                        'stage' => 'Negotiation'
                    ],
                    [
                        'name' => 'Data Analytics',
                        'company' => 'DataViz',
                        'value' => '₹ 8.2Lk',
                        'stage' => 'Negotiation'
                    ]
                ]
            ]
        ]
    ],
    'recentActivity' => [
        [
            'user' => 'Latif just',
            'description' => 'added EMC Corp',
            'details' => 'deal worth ₹2.5L to the pipeline from lead source',
            'time' => '3 hours ago',
            'type' => 'deal'
        ],
        [
            'user' => 'Neelam Has',
            'description' => 'scheduled a meeting with XYZ Corp for negotiation',
            'details' => '',
            'time' => '5 hours ago',
            'type' => 'meeting'
        ],
        [
            'user' => 'Aravind sent',
            'description' => 'a help sheet lead about',
            'details' => '',
            'time' => '6 hours ago',
            'type' => 'email'
        ],
        [
            'user' => 'VR with updated',
            'description' => 'meeting with Apex Digital Agency',
            'details' => '',
            'time' => 'Yesterday',
            'type' => 'meeting'
        ],
        [
            'user' => 'Lead call from',
            'description' => 'S Wariya Pillage Gura',
            'details' => '',
            'time' => 'Yesterday',
            'type' => 'call'
        ],
        [
            'user' => 'Aravind sent',
            'description' => 'Khvistika Reddy on cold outreach list',
            'details' => '',
            'time' => 'Yesterday',
            'type' => 'email'
        ]
    ],
    'salesTargets' => [
        [
            'id' => 'target-001',
            'rep' => 'TRM',
            'quarter' => 'Q4',
            'wholeTotalTarget' => '₹ 7.16Lk',
            'wholeMonth1' => '₹ 2.30Lk',
            'wholeMonth2' => '₹ 2.40Lk',
            'wholeMonth3' => '₹ 2.46Lk',
            'mrrMonth1' => '₹ 1.40K',
            'mrrMonth2' => '₹ 1.50K',
            'mrrMonth3' => '₹ 1.53K',
            'achievedRevenue' => '₹ 6.23Lk',
            'targetMRR' => '₹ 4.40K',
            'achievedMRR' => '₹ 3.53K',
            'achievement' => '88%',
            'status' => 'On Track'
        ],
        [
            'id' => 'target-002',
            'rep' => 'ZRM',
            'quarter' => 'Q4',
            'wholeTotalTarget' => '₹ 8.66Lk',
            'wholeMonth1' => '₹ 2.80Lk',
            'wholeMonth2' => '₹ 2.90Lk',
            'wholeMonth3' => '₹ 2.96Lk',
            'mrrMonth1' => '₹ 2.40K',
            'mrrMonth2' => '₹ 2.60K',
            'mrrMonth3' => '₹ 2.80K',
            'achievedRevenue' => '₹ 8.02Lk',
            'targetMRR' => '₹ 7.80K',
            'achievedMRR' => '₹ 9.3K',
            'achievement' => '106%',
            'status' => 'On Track'
        ],
        [
            'id' => 'target-003',
            'rep' => 'ZRM',
            'quarter' => 'Q4',
            'wholeTotalTarget' => '₹ 9.66Lk',
            'wholeMonth1' => '₹ 3.10Lk',
            'wholeMonth2' => '₹ 3.20Lk',
            'wholeMonth3' => '₹ 3.36Lk',
            'mrrMonth1' => '₹ 3.20K',
            'mrrMonth2' => '₹ 3.10K',
            'mrrMonth3' => '₹ 3.30K',
            'achievedRevenue' => '₹ 7.60Lk',
            'targetMRR' => '₹ 9.60K',
            'achievedMRR' => '₹ 4.83K',
            'achievement' => '67%',
            'status' => 'At Risk'
        ]
    ]

];

echo json_encode($dashboardData);
?>