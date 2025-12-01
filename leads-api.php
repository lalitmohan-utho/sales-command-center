<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$period = isset($_GET['period']) ? $_GET['period'] : 'month';
$team = isset($_GET['team']) ? $_GET['team'] : 'all';

function generateLeadsData($period, $team) {
    return [
        'globalKpis' => [
            'totalLeads' => 2847,
            'totalCalled' => 2048,
            'totalConnected' => 1476,
            'meetingsScheduled' => 124,
            'meetingsAttended' => 98,
            'qualifiedLeads' => 487,
            'disqualified' => 682,
            'followupRequired' => 267,
            'urgentCalls' => 87
        ],
        'inbound' => [
            'totalSignups' => 1247,
            'verifiedLeads' => 1087,
            'reachedByPhone' => 892,
            'reachedByEmail' => 1024,
            'meetingScheduled' => 78,
            'trialStarted' => 42,
            'converted' => 28,
            'avgTimeToContact' => 2.1
        ],
        'outbound' => [
            'totalDataAssigned' => 1600,
            'coldCalls' => 1156,
            'emailsSent' => 1284,
            'whatsappSent' => 876,
            'firstContactMade' => 584,
            'conversationStarted' => 342,
            'meetingScheduled' => 46,
            'qualifiedProspects' => 200,
            'notInterested' => 594,
            'warmLeads' => 178,
            'callbackRequested' => 142
        ],
        'statusDistribution' => [
            ['status' => 'Not Called', 'count' => 482, 'percentage' => 16.9],
            ['status' => 'Invalid Number', 'count' => 128, 'percentage' => 4.5],
            ['status' => 'Called – No Answer', 'count' => 356, 'percentage' => 12.5],
            ['status' => 'Called – Not Interested', 'count' => 594, 'percentage' => 20.9],
            ['status' => 'Meeting Scheduled', 'count' => 124, 'percentage' => 4.4],
            ['status' => 'Follow-up Required', 'count' => 267, 'percentage' => 9.4],
            ['status' => 'Do Not Call', 'count' => 87, 'percentage' => 3.1],
            ['status' => 'Callback Requested', 'count' => 142, 'percentage' => 5.0],
            ['status' => 'No Longer at Company', 'count' => 94, 'percentage' => 3.3],
            ['status' => 'Sent Information – Awaiting', 'count' => 178, 'percentage' => 6.3],
            ['status' => 'In Lock-In', 'count' => 62, 'percentage' => 2.2],
            ['status' => 'Wrong Details', 'count' => 156, 'percentage' => 5.5],
            ['status' => 'Disconnect', 'count' => 177, 'percentage' => 6.2]
        ],
        'teamPerformance' => [
            ['name' => 'Priya Singh', 'team' => 'Inbound', 'assigned' => 287, 'calls' => 312, 'connected' => 252, 'meetings' => 24, 'qualified' => 68, 'conversion' => 8.4],
            ['name' => 'Amit Patel', 'team' => 'Outbound', 'assigned' => 420, 'calls' => 687, 'connected' => 245, 'meetings' => 12, 'qualified' => 38, 'conversion' => 2.9]
        ],
        'leadQuality' => [
            'highQuality' => 182,
            'mediumQuality' => 305,
            'lowQuality' => 128
        ]
    ];
}

echo json_encode(generateLeadsData($period, $team));
?>