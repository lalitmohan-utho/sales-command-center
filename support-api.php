<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$view = isset($_GET['view']) ? $_GET['view'] : 'manager';

function generateSupportData($view) {
    $data = [
        'kpis' => [
            ['label' => 'Open Tickets', 'value' => '87', 'status' => 'warning', 'icon' => 'inbox', 'subtitle' => '12 new today'],
            ['label' => 'Avg First Response', 'value' => '8 min', 'status' => 'success', 'icon' => 'check-circle', 'subtitle' => 'Target: <10 min'],
            ['label' => 'SLA Compliance', 'value' => '94.2%', 'status' => 'success', 'icon' => 'graph-up', 'subtitle' => '+2.1% vs last week'],
            ['label' => 'CSAT Score', 'value' => '4.6/5', 'status' => 'success', 'icon' => 'star-fill', 'subtitle' => 'From 234 responses']
        ],
        'slaData' => [
            'labels' => ['First Response', 'Resolution Time', 'Update Frequency'],
            'met' => [342, 289, 315],
            'breached' => [23, 56, 30]
        ],
        'ticketStatus' => [
            'labels' => ['Open', 'In Progress', 'Resolved', 'Reopened'],
            'values' => [87, 145, 523, 18]
        ],
        'tickets' => [
            [
                'id' => 'TKT-10234',
                'subject' => 'VM instance not starting',
                'customer' => 'TechCorp Solutions',
                'status' => 'In Progress',
                'statusClass' => 'in-progress',
                'priority' => 'High',
                'priorityClass' => 'danger',
                'agent' => 'Rajesh K.',
                'age' => '2h 15m'
            ],
            [
                'id' => 'TKT-10235',
                'subject' => 'Database connection timeout',
                'customer' => 'CloudFast Inc',
                'status' => 'Open',
                'statusClass' => 'open',
                'priority' => 'Critical',
                'priorityClass' => 'dark',
                'agent' => 'Priya S.',
                'age' => '45m'
            ],
            [
                'id' => 'TKT-10236',
                'subject' => 'Billing inquiry',
                'customer' => 'DataSys Ltd',
                'status' => 'Resolved',
                'statusClass' => 'resolved',
                'priority' => 'Low',
                'priorityClass' => 'secondary',
                'agent' => 'Amit P.',
                'age' => '3h 30m'
            ]
        ]
    ];

    if ($view === 'manager') {
        $data['agentScorecards'] = [
            [
                'id' => 1,
                'name' => 'Rajesh Kumar',
                'score' => 89,
                'scoreClass' => 'excellent',
                'avgAllocationTime' => '8 min',
                'allocationStatus' => 'success',
                'allocationIcon' => 'arrow-down',
                'allocationPercent' => 80,
                'avgFirstResponse' => '6 min',
                'responseStatus' => 'success',
                'responseIcon' => 'check-circle',
                'avgResolutionTime' => '2.4 hrs',
                'resolutionStatus' => 'success',
                'resolutionIcon' => 'check-circle',
                'warnings' => []
            ],
            [
                'id' => 2,
                'name' => 'Priya Sharma',
                'score' => 72,
                'scoreClass' => 'good',
                'avgAllocationTime' => '15 min',
                'allocationStatus' => 'warning',
                'allocationIcon' => 'arrow-up',
                'allocationPercent' => 50,
                'avgFirstResponse' => '12 min',
                'responseStatus' => 'warning',
                'responseIcon' => 'exclamation-triangle',
                'avgResolutionTime' => '3.8 hrs',
                'resolutionStatus' => 'warning',
                'resolutionIcon' => 'exclamation-triangle',
                'warnings' => ['Slow first response']
            ],
            [
                'id' => 3,
                'name' => 'Amit Patel',
                'score' => 55,
                'scoreClass' => 'poor',
                'avgAllocationTime' => '22 min',
                'allocationStatus' => 'danger',
                'allocationIcon' => 'arrow-up',
                'allocationPercent' => 30,
                'avgFirstResponse' => '18 min',
                'responseStatus' => 'danger',
                'responseIcon' => 'x-circle',
                'avgResolutionTime' => '5.2 hrs',
                'resolutionStatus' => 'danger',
                'resolutionIcon' => 'x-circle',
                'warnings' => ['High reopen rate', 'Needs coaching']
            ]
        ];
    } else {
        $data['personalScorecard'] = [
            'score' => 89,
            'scoreClass' => 'excellent',
            'ticketsHandled' => '127',
            'avgResolutionTime' => '2.4 hrs',
            'csatScore' => '4.7/5',
            'reopenRate' => '3.2%'
        ];
    }

    return $data;
}

echo json_encode(generateSupportData($view));
?>