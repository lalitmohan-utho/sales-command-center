<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$period = isset($_GET['period']) ? $_GET['period'] : 'month';

function generateAccountData($period) {
    $data = [
        'kpis' => [
            ['label' => 'Total ARR', 'value' => '₹2.4Cr', 'trend' => 18.5],
            ['label' => 'Active Accounts', 'value' => '247', 'trend' => 12.3],
            ['label' => 'Churn Rate', 'value' => '3.2%', 'trend' => -5.8],
            ['label' => 'Avg Health Score', 'value' => '78', 'trend' => 6.4]
        ],
        'revenueTrend' => [
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'mrr' => [1850000, 1920000, 1995000, 2050000, 2145000, 2240000],
            'renewals' => [42, 38, 45, 41, 47, 44]
        ],
        'healthDistribution' => [
            'labels' => ['Healthy', 'At Risk', 'Critical'],
            'values' => [156, 62, 29]
        ],
        'accounts' => [
            [
                'name' => 'Enterprise Cloud Ltd',
                'healthScore' => 45,
                'healthClass' => 'low',
                'arr' => 1250000,
                'renewalDate' => '15 Jan 2026',
                'csm' => 'Priya Sharma',
                'riskLevel' => 'At Risk',
                'riskClass' => 'at-risk'
            ],
            [
                'name' => 'DataFlow Systems',
                'healthScore' => 38,
                'healthClass' => 'low',
                'arr' => 890000,
                'renewalDate' => '28 Jan 2026',
                'csm' => 'Rajesh Kumar',
                'riskLevel' => 'At Risk',
                'riskClass' => 'at-risk'
            ],
            [
                'name' => 'TechVision Inc',
                'healthScore' => 62,
                'healthClass' => 'medium',
                'arr' => 650000,
                'renewalDate' => '10 Feb 2026',
                'csm' => 'Amit Patel',
                'riskLevel' => 'Upcoming',
                'riskClass' => 'upcoming'
            ],
            [
                'name' => 'CloudBase Solutions',
                'healthScore' => 85,
                'healthClass' => 'high',
                'arr' => 1500000,
                'renewalDate' => '22 Mar 2026',
                'csm' => 'Neha Verma',
                'riskLevel' => 'Safe',
                'riskClass' => 'safe'
            ],
            [
                'name' => 'InfoTech Global',
                'healthScore' => 52,
                'healthClass' => 'medium',
                'arr' => 780000,
                'renewalDate' => '05 Feb 2026',
                'csm' => 'Vikram Singh',
                'riskLevel' => 'At Risk',
                'riskClass' => 'at-risk'
            ]
        ]
    ];

    return $data;
}

echo json_encode(generateAccountData($period));
?>