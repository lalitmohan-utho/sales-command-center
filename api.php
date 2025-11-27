<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$module = isset($_GET['module']) ? $_GET['module'] : 'sales';

switch($module) {
    case 'sales':
        echo json_encode(getSalesData($_GET));
        break;
    case 'leads':
        echo json_encode(getLeadsData($_GET));
        break;
    case 'accounts':
        echo json_encode(getAccountsData($_GET));
        break;
    case 'support':
        echo json_encode(getSupportData($_GET));
        break;
    default:
        echo json_encode(['error' => 'Invalid module']);
}

function getSalesData($params) {
    $period = isset($params['period']) ? $params['period'] : 'month';
    
    $data = [
        'kpis' => [
            ['label' => 'Total Revenue', 'value' => '₹45.2L', 'trend' => 12.5],
            ['label' => 'Deals Closed', 'value' => '127', 'trend' => 8.3],
            ['label' => 'Avg Deal Size', 'value' => '₹35.6K', 'trend' => 4.2],
            ['label' => 'Conversion Rate', 'value' => '24.8%', 'trend' => -2.1]
        ],
        'salesTrend' => [
            'labels' => ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            'revenue' => [892000, 1025000, 1156000, 1325000]
        ],
        'pipeline' => [
            'labels' => ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'],
            'values' => [45, 32, 28, 18, 127]
        ],
        'topPerformers' => [
            ['name' => 'Rajesh Kumar', 'dealsClose' => 23, 'revenue' => 892000, 'conversionRate' => 28.5, 'performance' => 95],
            ['name' => 'Priya Sharma', 'dealsClose' => 19, 'revenue' => 734000, 'conversionRate' => 25.2, 'performance' => 88],
            ['name' => 'Amit Patel', 'dealsClose' => 17, 'revenue' => 658000, 'conversionRate' => 23.8, 'performance' => 82],
            ['name' => 'Neha Verma', 'dealsClose' => 15, 'revenue' => 589000, 'conversionRate' => 22.1, 'performance' => 78]
        ]
    ];
    
    return $data;
}

function getLeadsData($params) {
    $team = isset($params['team']) ? $params['team'] : 'inbound';
    
    $data = [
        'kpis' => [
            ['label' => 'Total Leads', 'value' => '1,247', 'trend' => 15.3],
            ['label' => 'Qualified Leads', 'value' => '342', 'trend' => 8.7],
            ['label' => 'Meetings Scheduled', 'value' => '89', 'trend' => 12.1],
            ['label' => 'Conversion Rate', 'value' => '27.4%', 'trend' => -3.2]
        ],
        'statusDistribution' => [
            'labels' => ['Not Called', 'Called - No Answer', 'Meeting Scheduled', 'Follow-up Required', 'Not Interested'],
            'values' => [245, 189, 89, 156, 234]
        ],
        'qualityBreakdown' => [
            'labels' => ['High Quality', 'Medium Quality', 'Low Quality'],
            'values' => [342, 489, 416]
        ],
        'leads' => []
    ];
    
    if ($team == 'inbound') {
        $data['leads'] = [
            ['company' => 'TechCorp Solutions', 'contact' => 'Rahul Mehta', 'source' => 'Website Signup', 'status' => 'Meeting Scheduled', 'statusClass' => 'success', 'quality' => 'High - 92%', 'qualityClass' => 'success', 'assignedTo' => 'Priya S.', 'lastActivity' => '2 hours ago'],
            ['company' => 'CloudFast Inc', 'contact' => 'Anjali Kumar', 'source' => 'Demo Request', 'status' => 'Follow-up Required', 'statusClass' => 'warning', 'quality' => 'High - 88%', 'qualityClass' => 'success', 'assignedTo' => 'Amit P.', 'lastActivity' => '4 hours ago'],
            ['company' => 'DataSys Ltd', 'contact' => 'Vikram Singh', 'source' => 'Webinar', 'status' => 'Called - No Answer', 'statusClass' => 'secondary', 'quality' => 'Medium - 65%', 'qualityClass' => 'warning', 'assignedTo' => 'Neha V.', 'lastActivity' => '1 day ago']
        ];
    } else {
        $data['leads'] = [
            ['company' => 'Enterprise Systems', 'contact' => 'Suresh Reddy', 'source' => 'Apollo.io', 'status' => 'Not Called', 'statusClass' => 'secondary', 'quality' => 'High - 85%', 'qualityClass' => 'success', 'assignedTo' => 'Rajesh K.', 'lastActivity' => '30 min ago'],
            ['company' => 'Digital Ventures', 'contact' => 'Meera Patel', 'source' => 'Cold Email', 'status' => 'Called - No Answer', 'statusClass' => 'secondary', 'quality' => 'Medium - 72%', 'qualityClass' => 'warning', 'assignedTo' => 'Vikram S.', 'lastActivity' => '3 hours ago']
        ];
    }
    
    return $data;
}

function getAccountsData($params) {
    $period = isset($params['period']) ? $params['period'] : 'month';
    
    $data = [
        'kpis' => [
            ['label' => 'Total ARR', 'value' => '₹2.4Cr', 'trend' => 18.5],
            ['label' => 'Active Accounts', 'value' => '247', 'trend' => 12.3],
            ['label' => 'Churn Rate', 'value' => '3.2%', 'trend' => -5.8],
            ['label' => 'Avg Health Score', 'value' => '78', 'trend' => 6.4]
        ],
        'revenueTrend' => [
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'mrr' => [1850000, 1920000, 1995000, 2050000, 2145000, 2240000]
        ],
        'healthDistribution' => [
            'labels' => ['Healthy', 'At Risk', 'Critical'],
            'values' => [156, 62, 29]
        ],
        'accounts' => [
            ['name' => 'Enterprise Cloud Ltd', 'healthScore' => 45, 'healthClass' => 'low', 'arr' => 1250000, 'renewalDate' => '15 Jan 2026', 'csm' => 'Priya Sharma', 'riskLevel' => 'At Risk', 'riskClass' => 'warning'],
            ['name' => 'DataFlow Systems', 'healthScore' => 38, 'healthClass' => 'low', 'arr' => 890000, 'renewalDate' => '28 Jan 2026', 'csm' => 'Rajesh Kumar', 'riskLevel' => 'At Risk', 'riskClass' => 'warning'],
            ['name' => 'TechVision Inc', 'healthScore' => 62, 'healthClass' => 'medium', 'arr' => 650000, 'renewalDate' => '10 Feb 2026', 'csm' => 'Amit Patel', 'riskLevel' => 'Upcoming', 'riskClass' => 'info'],
            ['name' => 'CloudBase Solutions', 'healthScore' => 85, 'healthClass' => 'high', 'arr' => 1500000, 'renewalDate' => '22 Mar 2026', 'csm' => 'Neha Verma', 'riskLevel' => 'Safe', 'riskClass' => 'success']
        ]
    ];
    
    return $data;
}

function getSupportData($params) {
    $view = isset($params['view']) ? $params['view'] : 'manager';
    
    $data = [
        'kpis' => [
            ['label' => 'Open Tickets', 'value' => '87', 'subtitle' => '12 new today'],
            ['label' => 'Avg First Response', 'value' => '8 min', 'subtitle' => 'Target: <10 min'],
            ['label' => 'SLA Compliance', 'value' => '94.2%', 'subtitle' => '+2.1% vs last week'],
            ['label' => 'CSAT Score', 'value' => '4.6/5', 'subtitle' => 'From 234 responses']
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
            ['id' => 'TKT-10234', 'subject' => 'VM instance not starting', 'customer' => 'TechCorp Solutions', 'status' => 'In Progress', 'statusClass' => 'info', 'priority' => 'High', 'priorityClass' => 'warning', 'agent' => 'Rajesh K.', 'age' => '2h 15m'],
            ['id' => 'TKT-10235', 'subject' => 'Database connection timeout', 'customer' => 'CloudFast Inc', 'status' => 'Open', 'statusClass' => 'warning', 'priority' => 'Critical', 'priorityClass' => 'danger', 'agent' => 'Priya S.', 'age' => '45m'],
            ['id' => 'TKT-10236', 'subject' => 'Billing inquiry', 'customer' => 'DataSys Ltd', 'status' => 'Resolved', 'statusClass' => 'success', 'priority' => 'Low', 'priorityClass' => 'secondary', 'agent' => 'Amit P.', 'age' => '3h 30m']
        ]
    ];
    
    return $data;
}
?>