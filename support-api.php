<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$view = isset($_GET['view']) ? $_GET['view'] : 'manager';

function generateSupportData($view) {
    $data = [];
    
    if ($view === 'manager') {
        // Global KPIs for Manager
        $data['kpis'] = [
            [
                'label' => 'Open Tickets',
                'value' => '87',
                'subtitle' => 'Current backlog',
                'icon' => 'inbox',
                'iconClass' => 'warning',
                'trend' => -5
            ],
            [
                'label' => 'New Tickets (24h)',
                'value' => '23',
                'subtitle' => 'New inflow',
                'icon' => 'plus-circle',
                'iconClass' => 'info',
                'trend' => 12
            ],
            [
                'label' => 'Resolved Tickets',
                'value' => '156',
                'subtitle' => 'Last 30 days',
                'icon' => 'check-circle',
                'iconClass' => 'success',
                'trend' => 8
            ],
            [
                'label' => 'Reopened Tickets',
                'value' => '12',
                'subtitle' => '7.7% reopen rate',
                'icon' => 'arrow-repeat',
                'iconClass' => 'danger',
                'trend' => -3
            ],
            [
                'label' => 'SLA Breaches',
                'value' => '9',
                'subtitle' => '5.8% breach rate',
                'icon' => 'exclamation-triangle',
                'iconClass' => 'danger',
                'trend' => -15
            ],
            [
                'label' => 'Avg First Response',
                'value' => '8 min',
                'subtitle' => 'Target: <10 min',
                'icon' => 'stopwatch',
                'iconClass' => 'success',
                'trend' => -10
            ],
            [
                'label' => 'Avg Resolution Time',
                'value' => '2.4 hrs',
                'subtitle' => 'Target: <3 hrs',
                'icon' => 'clock-history',
                'iconClass' => 'success',
                'trend' => -8
            ],
            [
                'label' => 'CSAT Score',
                'value' => '4.6/5',
                'subtitle' => 'From 234 responses',
                'icon' => 'star-fill',
                'iconClass' => 'success',
                'trend' => 5
            ],
            [
                'label' => 'Unassigned Tickets',
                'value' => '5',
                'subtitle' => 'Need assignment',
                'icon' => 'person-x',
                'iconClass' => 'warning',
                'trend' => null
            ]
        ];

        // Status Distribution
        $data['statusDistribution'] = [
            'labels' => ['New', 'In Progress', 'Pending Customer', 'Pending Internal', 'Resolved', 'Closed', 'Reopened'],
            'values' => [15, 32, 18, 12, 28, 45, 8]
        ];

        // Severity vs SLA Matrix
        $data['severitySLA'] = [
            ['severity' => 'Critical', 'withinSLA' => 8, 'atRisk' => 2, 'breached' => 1, 'total' => 11],
            ['severity' => 'High', 'withinSLA' => 24, 'atRisk' => 5, 'breached' => 3, 'total' => 32],
            ['severity' => 'Medium', 'withinSLA' => 38, 'atRisk' => 7, 'breached' => 4, 'total' => 49],
            ['severity' => 'Low', 'withinSLA' => 52, 'atRisk' => 3, 'breached' => 1, 'total' => 56]
        ];

        // Agent Scorecards
        $data['agentScorecards'] = [
            [
                'id' => 1,
                'name' => 'Rajesh Kumar',
                'role' => 'L2 Support',
                'score' => 89,
                'avgFRT' => '6 min',
                'avgResolution' => '2.1 hrs',
                'csat' => '4.7/5',
                'openTickets' => 12,
                'resolved' => 45,
                'reopened' => 2,
                'warnings' => []
            ],
            [
                'id' => 2,
                'name' => 'Priya Sharma',
                'role' => 'L1 Support',
                'score' => 72,
                'avgFRT' => '12 min',
                'avgResolution' => '3.2 hrs',
                'csat' => '4.3/5',
                'openTickets' => 18,
                'resolved' => 38,
                'reopened' => 5,
                'warnings' => ['Slow first response']
            ],
            [
                'id' => 3,
                'name' => 'Amit Patel',
                'role' => 'L1 Support',
                'score' => 55,
                'avgFRT' => '18 min',
                'avgResolution' => '4.8 hrs',
                'csat' => '3.9/5',
                'openTickets' => 22,
                'resolved' => 28,
                'reopened' => 8,
                'warnings' => ['High reopen rate', 'Needs coaching']
            ],
            [
                'id' => 4,
                'name' => 'Sneha Verma',
                'role' => 'L2 Support',
                'score' => 85,
                'avgFRT' => '7 min',
                'avgResolution' => '2.3 hrs',
                'csat' => '4.6/5',
                'openTickets' => 14,
                'resolved' => 42,
                'reopened' => 3,
                'warnings' => []
            ]
        ];

        // Team Performance
        $data['teamPerformance'] = [
            [
                'name' => 'Rajesh Kumar',
                'role' => 'L2',
                'openTickets' => 12,
                'resolved' => 45,
                'reopened' => 2,
                'reopenRate' => 4.4,
                'avgFRT' => '6 min',
                'avgResolution' => '2.1 hrs',
                'slaBreaches' => 1,
                'csat' => '4.7/5',
                'status' => 'Active'
            ],
            [
                'name' => 'Priya Sharma',
                'role' => 'L1',
                'openTickets' => 18,
                'resolved' => 38,
                'reopened' => 5,
                'reopenRate' => 13.2,
                'avgFRT' => '12 min',
                'avgResolution' => '3.2 hrs',
                'slaBreaches' => 4,
                'csat' => '4.3/5',
                'status' => 'Active'
            ],
            [
                'name' => 'Amit Patel',
                'role' => 'L1',
                'openTickets' => 22,
                'resolved' => 28,
                'reopened' => 8,
                'reopenRate' => 28.6,
                'avgFRT' => '18 min',
                'avgResolution' => '4.8 hrs',
                'slaBreaches' => 7,
                'csat' => '3.9/5',
                'status' => 'Active'
            ],
            [
                'name' => 'Sneha Verma',
                'role' => 'L2',
                'openTickets' => 14,
                'resolved' => 42,
                'reopened' => 3,
                'reopenRate' => 7.1,
                'avgFRT' => '7 min',
                'avgResolution' => '2.3 hrs',
                'slaBreaches' => 2,
                'csat' => '4.6/5',
                'status' => 'Active'
            ],
            [
                'name' => 'Vikram Singh',
                'role' => 'L1',
                'openTickets' => 9,
                'resolved' => 35,
                'reopened' => 4,
                'reopenRate' => 11.4,
                'avgFRT' => '10 min',
                'avgResolution' => '2.9 hrs',
                'slaBreaches' => 3,
                'csat' => '4.4/5',
                'status' => 'On Leave'
            ]
        ];

        // Reopen Analysis
        $data['reopenAnalysis'] = [
            'totalReopened' => 12,
            'reopenRate' => 7.7,
            'reasonBreakdown' => [
                'labels' => ['Incomplete Fix', 'Root Cause Not Addressed', 'Bad Communication', 'Customer Misconfig', 'Monitoring Alert'],
                'values' => [5, 3, 2, 1, 1]
            ],
            'topReopenedTickets' => [
                [
                    'id' => 'TKT-10189',
                    'customer' => 'TechCorp Solutions',
                    'product' => 'Kubernetes',
                    'resolver' => 'Amit Patel',
                    'reopenCount' => 3,
                    'primaryReason' => 'Incomplete fix',
                    'lastReopened' => '2024-03-10'
                ],
                [
                    'id' => 'TKT-10201',
                    'customer' => 'CloudFast Inc',
                    'product' => 'VM',
                    'resolver' => 'Priya Sharma',
                    'reopenCount' => 2,
                    'primaryReason' => 'Root cause not addressed',
                    'lastReopened' => '2024-03-12'
                ],
                [
                    'id' => 'TKT-10215',
                    'customer' => 'DataSys Ltd',
                    'product' => 'Database',
                    'resolver' => 'Amit Patel',
                    'reopenCount' => 2,
                    'primaryReason' => 'Bad communication',
                    'lastReopened' => '2024-03-14'
                ]
            ]
        ];

        // SLA Metrics
        $data['slaMetrics'] = [
            'dates' => ['Mar 1', 'Mar 3', 'Mar 5', 'Mar 7', 'Mar 9', 'Mar 11', 'Mar 13', 'Mar 15'],
            'frtTrend' => [10, 9, 8, 7, 8, 9, 7, 8],
            'resolutionTrend' => [3.2, 2.9, 2.7, 2.5, 2.4, 2.6, 2.3, 2.4],
            'slaCompliance' => [92, 93, 94, 95, 94, 93, 95, 94],
            'backlogTrend' => [95, 92, 88, 85, 87, 89, 85, 87]
        ];

        // Handover Data
        $data['handover'] = [
            [
                'id' => 'TKT-10245',
                'currentOwner' => 'Priya Sharma',
                'status' => 'In Progress',
                'severity' => 'High',
                'nextAction' => 'Follow up with DevOps',
                'handoverNotes' => 'Waiting for DB restoration confirmation'
            ],
            [
                'id' => 'TKT-10246',
                'currentOwner' => 'Amit Patel',
                'status' => 'Pending Customer',
                'severity' => 'Medium',
                'nextAction' => 'Customer to provide logs',
                'handoverNotes' => 'Sent instructions via email'
            ],
            [
                'id' => 'TKT-10247',
                'currentOwner' => 'Rajesh Kumar',
                'status' => 'In Progress',
                'severity' => 'Critical',
                'nextAction' => 'Deploy hotfix',
                'handoverNotes' => 'Patch ready, needs approval'
            ]
        ];

        // Customer Experience
        $data['customerExperience'] = [
            'avgCSAT' => '4.6/5',
            'totalResponses' => 234,
            'csatDistribution' => [5, 12, 28, 89, 100],
            'lowRatedTickets' => [
                [
                    'id' => 'TKT-10198',
                    'customer' => 'TechCorp Solutions',
                    'rating' => 2,
                    'feedback' => 'Issue not fully resolved, had to reach out multiple times',
                    'agent' => 'Amit Patel',
                    'date' => '2024-03-10',
                    'followUpPlanned' => false
                ],
                [
                    'id' => 'TKT-10205',
                    'customer' => 'CloudFast Inc',
                    'rating' => 2,
                    'feedback' => 'Response was slow, explanation was unclear',
                    'agent' => 'Priya Sharma',
                    'date' => '2024-03-11',
                    'followUpPlanned' => true
                ],
                [
                    'id' => 'TKT-10212',
                    'customer' => 'DataSys Ltd',
                    'rating' => 1,
                    'feedback' => 'Very poor service, took too long to resolve',
                    'agent' => 'Amit Patel',
                    'date' => '2024-03-13',
                    'followUpPlanned' => true
                ]
            ]
        ];

        // Complete Tickets List
        $data['tickets'] = [
            [
                'id' => 'TKT-10234',
                'subject' => 'VM instance not starting after reboot',
                'customer' => 'TechCorp Solutions',
                'severity' => 'High',
                'status' => 'In Progress',
                'slaState' => 'Within SLA',
                'agent' => 'Rajesh Kumar',
                'queue' => 'Technical',
                'created' => '2024-03-15 10:30',
                'age' => '2h 15m'
            ],
            [
                'id' => 'TKT-10235',
                'subject' => 'Database connection timeout errors',
                'customer' => 'CloudFast Inc',
                'severity' => 'Critical',
                'status' => 'New',
                'slaState' => 'At Risk',
                'agent' => 'Priya Sharma',
                'queue' => 'Technical',
                'created' => '2024-03-15 11:00',
                'age' => '1h 45m'
            ],
            [
                'id' => 'TKT-10236',
                'subject' => 'Billing inquiry - invoice discrepancy',
                'customer' => 'DataSys Ltd',
                'severity' => 'Low',
                'status' => 'Resolved',
                'slaState' => 'Within SLA',
                'agent' => 'Amit Patel',
                'queue' => 'Billing',
                'created' => '2024-03-15 09:15',
                'age' => '3h 30m'
            ],
            [
                'id' => 'TKT-10237',
                'subject' => 'Kubernetes cluster scale-up not working',
                'customer' => 'TechFlow Systems',
                'severity' => 'High',
                'status' => 'In Progress',
                'slaState' => 'Within SLA',
                'agent' => 'Sneha Verma',
                'queue' => 'Technical',
                'created' => '2024-03-15 08:45',
                'age' => '4h 00m'
            ],
            [
                'id' => 'TKT-10238',
                'subject' => 'Storage volume full - need expansion',
                'customer' => 'CloudBase Ltd',
                'severity' => 'Medium',
                'status' => 'Pending Customer',
                'slaState' => 'Within SLA',
                'agent' => 'Rajesh Kumar',
                'queue' => 'Technical',
                'created' => '2024-03-14 16:20',
                'age' => '20h 25m'
            ],
            [
                'id' => 'TKT-10239',
                'subject' => 'Network latency issues from EU region',
                'customer' => 'DataSync Pro',
                'severity' => 'High',
                'status' => 'Reopened',
                'slaState' => 'Breached',
                'agent' => 'Amit Patel',
                'queue' => 'Network',
                'created' => '2024-03-14 14:10',
                'age' => '22h 35m'
            ],
            [
                'id' => 'TKT-10240',
                'subject' => 'Request for account upgrade',
                'customer' => 'TechCorp Solutions',
                'severity' => 'Low',
                'status' => 'In Progress',
                'slaState' => 'Within SLA',
                'agent' => 'Priya Sharma',
                'queue' => 'Onboarding',
                'created' => '2024-03-14 12:00',
                'age' => '1d 45m'
            ],
            [
                'id' => 'TKT-10241',
                'subject' => 'SSL certificate expiring soon',
                'customer' => 'SecureCloud Inc',
                'severity' => 'Medium',
                'status' => 'Resolved',
                'slaState' => 'Within SLA',
                'agent' => 'Sneha Verma',
                'queue' => 'Security',
                'created' => '2024-03-14 10:30',
                'age' => '1d 2h 15m'
            ]
        ];

    } else {
        // Agent View Data
        $data['personalKPIs'] = [
            [
                'label' => 'My Open Tickets',
                'value' => '12',
                'subtitle' => 'Current workload',
                'icon' => 'inbox',
                'iconClass' => 'warning'
            ],
            [
                'label' => 'New Today',
                'value' => '5',
                'subtitle' => 'Assigned today',
                'icon' => 'plus-circle',
                'iconClass' => 'info'
            ],
            [
                'label' => 'Due Soon',
                'value' => '3',
                'subtitle' => 'Within 2 hours',
                'icon' => 'exclamation-triangle',
                'iconClass' => 'danger'
            ],
            [
                'label' => 'Resolved Today',
                'value' => '8',
                'subtitle' => 'Today\'s progress',
                'icon' => 'check-circle',
                'iconClass' => 'success'
            ],
            [
                'label' => 'My Reopened',
                'value' => '2',
                'subtitle' => 'Last 7 days',
                'icon' => 'arrow-repeat',
                'iconClass' => 'warning'
            ],
            [
                'label' => 'My Avg FRT',
                'value' => '6 min',
                'subtitle' => 'Last 30 days',
                'icon' => 'stopwatch',
                'iconClass' => 'success'
            ],
            [
                'label' => 'My Avg Resolution',
                'value' => '2.1 hrs',
                'subtitle' => 'Last 30 days',
                'icon' => 'clock-history',
                'iconClass' => 'success'
            ],
            [
                'label' => 'My CSAT',
                'value' => '4.7/5',
                'subtitle' => 'From 45 responses',
                'icon' => 'star-fill',
                'iconClass' => 'success'
            ]
        ];

        // Kanban Board Data
        $data['kanbanTickets'] = [
            'New' => [
                [
                    'id' => 'TKT-10250',
                    'title' => 'VM not starting after maintenance',
                    'customer' => 'TechCorp',
                    'severity' => 'High',
                    'slaTime' => '1h 45m left',
                    'slaClass' => 'sla-safe'
                ],
                [
                    'id' => 'TKT-10251',
                    'title' => 'Database backup failed',
                    'customer' => 'CloudFast',
                    'severity' => 'Medium',
                    'slaTime' => '3h 20m left',
                    'slaClass' => 'sla-safe'
                ]
            ],
            'In Progress' => [
                [
                    'id' => 'TKT-10248',
                    'title' => 'K8s pod crash loop',
                    'customer' => 'DataSys',
                    'severity' => 'Critical',
                    'slaTime' => '25m left',
                    'slaClass' => 'sla-warning'
                ],
                [
                    'id' => 'TKT-10249',
                    'title' => 'Storage mount issue',
                    'customer' => 'TechFlow',
                    'severity' => 'High',
                    'slaTime' => '1h 10m left',
                    'slaClass' => 'sla-safe'
                ],
                [
                    'id' => 'TKT-10252',
                    'title' => 'Network latency spikes',
                    'customer' => 'CloudBase',
                    'severity' => 'Medium',
                    'slaTime' => '2h 40m left',
                    'slaClass' => 'sla-safe'
                ]
            ],
            'Pending Customer' => [
                [
                    'id' => 'TKT-10245',
                    'title' => 'Need DB credentials',
                    'customer' => 'SecureCloud',
                    'severity' => 'Low',
                    'slaTime' => 'Waiting',
                    'slaClass' => 'sla-safe'
                ],
                [
                    'id' => 'TKT-10246',
                    'title' => 'Awaiting log files',
                    'customer' => 'DataSync',
                    'severity' => 'Medium',
                    'slaTime' => 'Waiting',
                    'slaClass' => 'sla-safe'
                ]
            ],
            'Ready to Close' => [
                [
                    'id' => 'TKT-10243',
                    'title' => 'VM resize completed',
                    'customer' => 'TechCorp',
                    'severity' => 'Low',
                    'slaTime' => 'Resolved',
                    'slaClass' => 'sla-safe'
                ]
            ]
        ];

        // Agent's Ticket List
        $data['myTickets'] = [
            [
                'id' => 'TKT-10248',
                'subject' => 'Kubernetes pod in crash loop',
                'customer' => 'DataSys Ltd',
                'severity' => 'Critical',
                'status' => 'In Progress',
                'slaTime' => '25m left',
                'slaClass' => 'sla-warning',
                'lastUpdate' => '10 mins ago'
            ],
            [
                'id' => 'TKT-10249',
                'subject' => 'Storage volume mount issue',
                'customer' => 'TechFlow Systems',
                'severity' => 'High',
                'status' => 'In Progress',
                'slaTime' => '1h 10m left',
                'slaClass' => 'sla-safe',
                'lastUpdate' => '25 mins ago'
            ],
            [
                'id' => 'TKT-10250',
                'subject' => 'VM not starting after maintenance',
                'customer' => 'TechCorp Solutions',
                'severity' => 'High',
                'status' => 'New',
                'slaTime' => '1h 45m left',
                'slaClass' => 'sla-safe',
                'lastUpdate' => 'Just now'
            ],
            [
                'id' => 'TKT-10251',
                'subject' => 'Database backup failed',
                'customer' => 'CloudFast Inc',
                'severity' => 'Medium',
                'status' => 'New',
                'slaTime' => '3h 20m left',
                'slaClass' => 'sla-safe',
                'lastUpdate' => '5 mins ago'
            ],
            [
                'id' => 'TKT-10252',
                'subject' => 'Network latency spikes in EU region',
                'customer' => 'CloudBase Ltd',
                'severity' => 'Medium',
                'status' => 'In Progress',
                'slaTime' => '2h 40m left',
                'slaClass' => 'sla-safe',
                'lastUpdate' => '1 hour ago'
            ],
            [
                'id' => 'TKT-10245',
                'subject' => 'Need database credentials for migration',
                'customer' => 'SecureCloud Inc',
                'severity' => 'Low',
                'status' => 'Pending Customer',
                'slaTime' => 'Waiting',
                'slaClass' => 'sla-safe',
                'lastUpdate' => '3 hours ago'
            ],
            [
                'id' => 'TKT-10246',
                'subject' => 'Awaiting log files for investigation',
                'customer' => 'DataSync Pro',
                'severity' => 'Medium',
                'status' => 'Pending Customer',
                'slaTime' => 'Waiting',
                'slaClass' => 'sla-safe',
                'lastUpdate' => '5 hours ago'
            ],
            [
                'id' => 'TKT-10243',
                'subject' => 'VM resize operation completed',
                'customer' => 'TechCorp Solutions',
                'severity' => 'Low',
                'status' => 'Resolved',
                'slaTime' => 'Resolved',
                'slaClass' => 'sla-safe',
                'lastUpdate' => '2 hours ago'
            ]
        ];
    }

    return $data;
}

echo json_encode(generateSupportData($view));
?>