<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$period = isset($_GET['period']) ? $_GET['period'] : 'month';

$data = [
    'globalKpis' => [
        'totalLeads' => 2847,
        'qualifiedLeads' => 487,
        'meetingsScheduled' => 124,
        'conversionRate' => 17.1
    ],
    'inbound' => [
        'totalLeads' => 1247,
        'qualified' => 287,
        'meetings' => 78
    ],
    'outbound' => [
        'totalLeads' => 1600,
        'qualified' => 200,
        'meetings' => 46
    ]
];

echo json_encode($data);
?>