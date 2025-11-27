<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$team = isset($_GET['team']) ? $_GET['team'] : 'inbound';

function generateLeadsData($team) {
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
            [
                'company' => 'TechCorp Solutions',
                'contact' => 'Rahul Mehta',
                'source' => 'Website Signup',
                'status' => 'Meeting Scheduled',
                'statusClass' => 'meeting-scheduled',
                'quality' => 'High - 92%',
                'qualityClass' => 'high',
                'assignedTo' => 'Priya S.',
                'lastActivity' => '2 hours ago'
            ],
            [
                'company' => 'CloudFast Inc',
                'contact' => 'Anjali Kumar',
                'source' => 'Demo Request',
                'status' => 'Follow-up Required',
                'statusClass' => 'follow-up',
                'quality' => 'High - 88%',
                'qualityClass' => 'high',
                'assignedTo' => 'Amit P.',
                'lastActivity' => '4 hours ago'
            ],
            [
                'company' => 'DataSys Ltd',
                'contact' => 'Vikram Singh',
                'source' => 'Webinar',
                'status' => 'Called - No Answer',
                'statusClass' => 'called-no-answer',
                'quality' => 'Medium - 65%',
                'qualityClass' => 'medium',
                'assignedTo' => 'Neha V.',
                'lastActivity' => '1 day ago'
            ]
        ];
    } else {
        $data['leads'] = [
            [
                'company' => 'Enterprise Systems',
                'contact' => 'Suresh Reddy',
                'source' => 'Apollo.io',
                'status' => 'Not Called',
                'statusClass' => 'not-called',
                'quality' => 'High - 85%',
                'qualityClass' => 'high',
                'assignedTo' => 'Rajesh K.',
                'lastActivity' => '30 min ago'
            ],
            [
                'company' => 'Digital Ventures',
                'contact' => 'Meera Patel',
                'source' => 'Cold Email',
                'status' => 'Called - No Answer',
                'statusClass' => 'called-no-answer',
                'quality' => 'Medium - 72%',
                'qualityClass' => 'medium',
                'assignedTo' => 'Vikram S.',
                'lastActivity' => '3 hours ago'
            ],
            [
                'company' => 'InfoTech Group',
                'contact' => 'Karthik Iyer',
                'source' => 'LinkedIn Outreach',
                'status' => 'Not Interested',
                'statusClass' => 'not-interested',
                'quality' => 'Low - 45%',
                'qualityClass' => 'low',
                'assignedTo' => 'Priya S.',
                'lastActivity' => '2 days ago'
            ]
        ];
    }

    return $data;
}

echo json_encode(generateLeadsData($team));
?>