<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Get period from query parameter
$period = isset($_GET['period']) ? $_GET['period'] : 'month';

// Generate mock data based on period
function generateSalesData($period) {
    $data = [
        'kpis' => [
            [
                'label' => 'Total Revenue',
                'value' => '₹45.2L',
                'trend' => 12.5
            ],
            [
                'label' => 'Deals Closed',
                'value' => '127',
                'trend' => 8.3
            ],
            [
                'label' => 'Avg Deal Size',
                'value' => '₹35.6K',
                'trend' => 4.2
            ],
            [
                'label' => 'Conversion Rate',
                'value' => '24.8%',
                'trend' => -2.1
            ]
        ],
        'salesTrend' => [
            'labels' => [],
            'revenue' => [],
            'deals' => []
        ],
        'pipeline' => [
            'labels' => ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'],
            'values' => [45, 32, 28, 18, 127]
        ],
        'topPerformers' => [
            [
                'name' => 'Rajesh Kumar',
                'dealsClose' => 23,
                'revenue' => 892000,
                'conversionRate' => 28.5,
                'performance' => 95
            ],
            [
                'name' => 'Priya Sharma',
                'dealsClose' => 19,
                'revenue' => 734000,
                'conversionRate' => 25.2,
                'performance' => 88
            ],
            [
                'name' => 'Amit Patel',
                'dealsClose' => 17,
                'revenue' => 658000,
                'conversionRate' => 23.8,
                'performance' => 82
            ],
            [
                'name' => 'Neha Verma',
                'dealsClose' => 15,
                'revenue' => 589000,
                'conversionRate' => 22.1,
                'performance' => 78
            ],
            [
                'name' => 'Vikram Singh',
                'dealsClose' => 14,
                'revenue' => 512000,
                'conversionRate' => 20.5,
                'performance' => 74
            ]
        ]
    ];

    // Generate labels and data based on period
    switch($period) {
        case 'today':
            $data['salesTrend']['labels'] = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM'];
            $data['salesTrend']['revenue'] = [12000, 28000, 45000, 62000, 78000];
            $data['salesTrend']['deals'] = [2, 5, 8, 12, 15];
            break;
        case 'week':
            $data['salesTrend']['labels'] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            $data['salesTrend']['revenue'] = [125000, 142000, 156000, 138000, 165000, 98000, 85000];
            $data['salesTrend']['deals'] = [18, 21, 24, 20, 25, 14, 12];
            break;
        case 'quarter':
            $data['salesTrend']['labels'] = ['Month 1', 'Month 2', 'Month 3'];
            $data['salesTrend']['revenue'] = [1250000, 1420000, 1560000];
            $data['salesTrend']['deals'] = [95, 110, 127];
            break;
        default: // month
            $data['salesTrend']['labels'] = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            $data['salesTrend']['revenue'] = [892000, 1025000, 1156000, 1325000];
            $data['salesTrend']['deals'] = [28, 32, 35, 42];
    }

    return $data;
}

// Return JSON response
echo json_encode(generateSalesData($period));
?>