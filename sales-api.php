<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dashboardData = [
    'followUpTasks' => [
        [
            'id' => '12345',
            'type' => 'Call',
            'status' => 'Pending',
            'followup_time' => '2025-01-15 10:30',
            'reference' => 'Nitin Sharma',
            'last_message' => 'Follow up on cloud migration proposal',
            'assigned_to' => 'Nitin',
            'department' => 'Sales',
            'refrence' => 'Client',
            'entrytime' => '2025-01-10',
            'completed' => '-',
            'category' => 'overdue'
        ],
        [
            'id' => '12346',
            'type' => 'Email',
            'status' => 'Completed',
            'followup_time' => '2025-01-14 14:00',
            'reference' => 'Priya Patel',
            'last_message' => 'Send pricing details for VM instances',
            'assigned_to' => 'Aravind',
            'department' => 'Pre-Sales',
            'refrence' => 'Lead',
            'entrytime' => '2025-01-08',
            'completed' => '2025-01-14',
            'category' => 'today'
        ],
        [
            'id' => '12347',
            'type' => 'Meeting',
            'status' => 'Overdue',
            'followup_time' => '2025-01-12 11:00',
            'reference' => 'Rajesh Kumar',
            'last_message' => 'Demo scheduled for Kubernetes solution',
            'assigned_to' => 'Latif',
            'department' => 'Technical',
            'refrence' => 'Prospect',
            'entrytime' => '2025-01-05',
            'completed' => '-',
            'category' => 'overdue'
        ],
        [
            'id' => '12348',
            'type' => 'Call',
            'status' => 'Pending',
            'followup_time' => '2025-01-16 09:00',
            'reference' => 'Suresh Reddy',
            'last_message' => 'Discuss backup solution requirements',
            'assigned_to' => 'Neelam',
            'department' => 'Support',
            'refrence' => 'Client',
            'entrytime' => '2025-01-11',
            'completed' => '-',
            'category' => 'today'
        ],
        [
            'id' => '12349',
            'type' => 'Email',
            'status' => 'Pending',
            'followup_time' => '2025-01-17 15:30',
            'reference' => 'Amit Joshi',
            'last_message' => 'Contract renewal discussion',
            'assigned_to' => 'Nitin',
            'department' => 'Sales',
            'refrence' => 'Client',
            'entrytime' => '2025-01-09',
            'completed' => '-',
            'category' => 'week'
        ],
        [
            'id' => '12350',
            'type' => 'Meeting',
            'status' => 'Completed',
            'followup_time' => '2025-01-13 16:00',
            'reference' => 'Meera Singh',
            'last_message' => 'POC completed successfully',
            'assigned_to' => 'Aravind',
            'department' => 'Technical',
            'refrence' => 'Prospect',
            'entrytime' => '2025-01-07',
            'completed' => '2025-01-13',
            'category' => 'week'
        ],
        [
            'id' => '12351',
            'type' => 'Call',
            'status' => 'Overdue',
            'followup_time' => '2025-01-10 10:00',
            'reference' => 'Vikram Mehta',
            'last_message' => 'Follow up on storage quote',
            'assigned_to' => 'Latif',
            'department' => 'Sales',
            'refrence' => 'Lead',
            'entrytime' => '2025-01-03',
            'completed' => '-',
            'category' => 'overdue'
        ],
        [
            'id' => '12352',
            'type' => 'Email',
            'status' => 'Pending',
            'followup_time' => '2025-01-18 11:30',
            'reference' => 'Deepak Verma',
            'last_message' => 'Send case study documents',
            'assigned_to' => 'Neelam',
            'department' => 'Marketing',
            'refrence' => 'Lead',
            'entrytime' => '2025-01-12',
            'completed' => '-',
            'category' => 'next30'
        ],
        [
            'id' => '12353',
            'type' => 'Meeting',
            'status' => 'Pending',
            'followup_time' => '2025-01-19 14:00',
            'reference' => 'Anita Gupta',
            'last_message' => 'Final negotiation meeting',
            'assigned_to' => 'Nitin',
            'department' => 'Sales',
            'refrence' => 'Prospect',
            'entrytime' => '2025-01-14',
            'completed' => '-',
            'category' => 'next30'
        ],
        [
            'id' => '12354',
            'type' => 'Call',
            'status' => 'Completed',
            'followup_time' => '2025-01-11 13:00',
            'reference' => 'Kiran Rao',
            'last_message' => 'Technical requirements gathered',
            'assigned_to' => 'Aravind',
            'department' => 'Technical',
            'refrence' => 'Client',
            'entrytime' => '2025-01-06',
            'completed' => '2025-01-11',
            'category' => 'next30'
        ],
        [
            'id' => '12355',
            'type' => 'Call',
            'status' => 'Pending',
            'followup_time' => '2025-01-20 10:00',
            'reference' => 'Rahul Kapoor',
            'last_message' => 'DR solution demo follow up',
            'assigned_to' => 'Latif',
            'department' => 'Sales',
            'refrence' => 'Lead',
            'entrytime' => '2025-01-15',
            'completed' => '-',
            'category' => 'next30'
        ],
        [
            'id' => '12356',
            'type' => 'Email',
            'status' => 'Pending',
            'followup_time' => '2025-01-21 14:30',
            'reference' => 'Sanjay Nair',
            'last_message' => 'Object storage pricing inquiry',
            'assigned_to' => 'Neelam',
            'department' => 'Pre-Sales',
            'refrence' => 'Prospect',
            'entrytime' => '2025-01-16',
            'completed' => '-',
            'category' => 'next30'
        ],
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
    ],
    'total_funnel_value' => [
        'deals_lost' => '₹ 68.02L',
        'deals_won' => '₹ 45.3K',
        'aspects_added' => '₹ 32.5L',
        'funnel_value' => '₹ 125.8L',
        'deals_lost_reason' => '',
        'deals_won_type' => '',
    ],
    'dealsLostReasons' => [
        'High Quote',
        'Budget Constraints',
        'Support Quality',
        'Scalability Concerns',
        'Limited Trial Period',
        'Lack of Awareness',
        'Migration Concerns',
        'Integration Challenges',
        'Change Resistance',
        'Internal Approval Delays',
        'Non-Serviceable',
        'Product Unavailability',
        'Feature Unavailability',
        'Lack of Paperwork',
        'Unresponsive'
    ],
    'dealsWonTypes' => [
        '3Years',
        'Annual',
        'Hourly',
        'MRR',
        'Quarterly'
    ],
    'leadStatus' => [
        'newLeads' => 89,
        'hotLeads' => 523,
        'activeDeals' => 234,
        'lostDeals' => 83,
        'qualified' => 234,
        'unresponsive' => 156
    ],
    'headerList' => [
        'overdue_followups' => 89,
        'today_due_followups' => 523,
        'this_week_due_followups' => 234,
        'next_30_days_due' => 83
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
            'quarter' => 'Q4 (Oct-Dec)',
            'wholeTotalTarget' => '₹ 7.16Lk',
            'targetMRR' => '₹ 2.36Lk',
            'wholeMonth1' => '₹ 2.30Lk',
            'wholeMonth2' => '₹ 2.40Lk',
            'wholeMonth3' => '₹ 2.46Lk',
            'mrrMonth1' => '₹ 1.40K',
            'mrrMonth2' => '₹ 1.50K',
            'mrrMonth3' => '₹ 1.53K',
            'achievedRevenue' => '₹ 6.23Lk',
            'achievedMRR' => '₹ 3.53K',
            'achievement' => '88%',
            'status' => 'On Track'
        ],
        [
            'id' => 'target-002',
            'rep' => 'ZRM',
            'quarter' => 'Q4 (Oct-Dec)',
            'wholeTotalTarget' => '₹ 8.66Lk',
            'targetMRR' => '₹ 7.80K',
            'wholeMonth1' => '₹ 2.80Lk',
            'wholeMonth2' => '₹ 2.90Lk',
            'wholeMonth3' => '₹ 2.96Lk',
            'mrrMonth1' => '₹ 2.40K',
            'mrrMonth2' => '₹ 2.60K',
            'mrrMonth3' => '₹ 2.80K',
            'achievedRevenue' => '₹ 8.02Lk',
            'achievedMRR' => '₹ 9.3K',
            'achievement' => '106%',
            'status' => 'On Track'
        ],
        [
            'id' => 'target-003',
            'rep' => 'ZRM',
            'quarter' => 'Q4 (Oct-Dec)',
            'wholeTotalTarget' => '₹ 9.66Lk',
            'targetMRR' => '₹ 9.60K',
            'wholeMonth1' => '₹ 3.10Lk',
            'wholeMonth2' => '₹ 3.20Lk',
            'wholeMonth3' => '₹ 3.36Lk',
            'mrrMonth1' => '₹ 3.20K',
            'mrrMonth2' => '₹ 3.10K',
            'mrrMonth3' => '₹ 3.30K',
            'achievedRevenue' => '₹ 7.60Lk',
            'achievedMRR' => '₹ 4.83K',
            'achievement' => '67%',
            'status' => 'At Risk'
        ]
    ]

];

echo json_encode($dashboardData);
?>
