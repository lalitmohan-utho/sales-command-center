<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function generateBillingData() {
    $data = [];
    
    // Global KPIs
    $data['kpis'] = [
        [
            'label' => 'Total Invoiced',
            'value' => '₹45.2L',
            'subtitle' => 'This month (excl. tax)',
            'icon' => 'receipt',
            'iconClass' => 'primary',
            'trend' => 12
        ],
        [
            'label' => 'Total Collected',
            'value' => '₹38.8L',
            'subtitle' => '85.8% collection rate',
            'icon' => 'cash-coin',
            'iconClass' => 'success',
            'trend' => 8
        ],
        [
            'label' => 'Pending Receivables',
            'value' => '₹6.4L',
            'subtitle' => '42 customers',
            'icon' => 'hourglass-split',
            'iconClass' => 'warning',
            'trend' => -5
        ],
        [
            'label' => 'Overdue Amount',
            'value' => '₹2.8L',
            'subtitle' => 'Avg 23 days overdue',
            'icon' => 'exclamation-triangle',
            'iconClass' => 'danger',
            'trend' => -12
        ],
        [
            'label' => 'Refunds & Credits',
            'value' => '₹1.2L',
            'subtitle' => '3.1% refund rate',
            'icon' => 'arrow-counterclockwise',
            'iconClass' => 'info',
            'trend' => -18
        ],
        [
            'label' => 'Net Realized Revenue',
            'value' => '₹37.6L',
            'subtitle' => 'After refunds',
            'icon' => 'graph-up-arrow',
            'iconClass' => 'success',
            'trend' => 9
        ],
        [
            'label' => 'GST Collected',
            'value' => '₹8.1L',
            'subtitle' => '18% on taxable value',
            'icon' => 'shield-check',
            'iconClass' => 'info',
            'trend' => 11
        ],
        [
            'label' => 'Bad Debts',
            'value' => '₹45K',
            'subtitle' => '1.2% write-off rate',
            'icon' => 'x-circle',
            'iconClass' => 'danger',
            'trend' => null
        ]
    ];

    // Sales vs Collection
    $data['salesVsCollection'] = [
        'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        'invoiced' => [38, 42, 45, 48, 52, 49, 47, 45],
        'collected' => [35, 39, 41, 44, 48, 46, 44, 39],
        'pending' => [3, 3, 4, 4, 4, 3, 3, 6]
    ];

    // Collection Metrics
    $data['collectionMetrics'] = [
        'efficiency' => 85.8,
        'avgPeriod' => 23,
        'dso' => 28
    ];

    // Top Customers
    $data['topCustomers'] = [
        ['name' => 'TechCorp Solutions', 'amount' => '8.5L'],
        ['name' => 'CloudFast Inc', 'amount' => '6.2L'],
        ['name' => 'GlobalTech USA', 'amount' => '5.8L'],
        ['name' => 'DataSys Ltd', 'amount' => '4.9L'],
        ['name' => 'SecureCloud Pro', 'amount' => '4.2L']
    ];

    // Aging Buckets
    $data['agingBuckets'] = [
        ['label' => 'Not Due Yet', 'amount' => '3.6L', 'count' => 28, 'color' => '#10b981'],
        ['label' => '0-30 Days', 'amount' => '1.8L', 'count' => 15, 'color' => '#f59e0b'],
        ['label' => '31-60 Days', 'amount' => '0.7L', 'count' => 8, 'color' => '#ef4444'],
        ['label' => '61-90 Days', 'amount' => '0.2L', 'count' => 3, 'color' => '#991b1b'],
        ['label' => '>90 Days', 'amount' => '0.1L', 'count' => 2, 'color' => '#7f1d1d']
    ];

    // Overdue Details
    $data['overdueDetails'] = [
        [
            'customer' => 'TechCorp Solutions',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'invoiceNo' => 'INV-2024-1245',
            'invoiceDate' => '2024-02-15',
            'dueDate' => '2024-03-01',
            'amount' => '1,25,000',
            'outstanding' => '1,25,000',
            'daysOverdue' => 45,
            'status' => 'Unpaid',
            'statusClass' => 'unpaid'
        ],
        [
            'customer' => 'CloudFast Inc',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'invoiceNo' => 'INV-2024-1289',
            'invoiceDate' => '2024-02-20',
            'dueDate' => '2024-03-05',
            'amount' => '85,000',
            'outstanding' => '42,500',
            'daysOverdue' => 38,
            'status' => 'Partially Paid',
            'statusClass' => 'partial'
        ],
        [
            'customer' => 'DataSys Ltd',
            'type' => 'Unregistered',
            'typeClass' => 'unregistered',
            'invoiceNo' => 'INV-2024-1312',
            'invoiceDate' => '2024-02-25',
            'dueDate' => '2024-03-10',
            'amount' => '45,000',
            'outstanding' => '45,000',
            'daysOverdue' => 32,
            'status' => 'Unpaid',
            'statusClass' => 'unpaid'
        ],
        [
            'customer' => 'GlobalTech USA',
            'type' => 'Overseas',
            'typeClass' => 'overseas',
            'invoiceNo' => 'INV-2024-1334',
            'invoiceDate' => '2024-03-01',
            'dueDate' => '2024-03-15',
            'amount' => '2,15,000',
            'outstanding' => '2,15,000',
            'daysOverdue' => 27,
            'status' => 'Unpaid',
            'statusClass' => 'unpaid'
        ],
        [
            'customer' => 'SecureCloud Pro',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'invoiceNo' => 'INV-2024-1356',
            'invoiceDate' => '2024-03-05',
            'dueDate' => '2024-03-20',
            'amount' => '95,000',
            'outstanding' => '95,000',
            'daysOverdue' => 22,
            'status' => 'In Collection',
            'statusClass' => 'overdue'
        ],
        [
            'customer' => 'TechFlow Systems',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'invoiceNo' => 'INV-2024-1378',
            'invoiceDate' => '2024-03-08',
            'dueDate' => '2024-03-22',
            'amount' => '68,000',
            'outstanding' => '68,000',
            'daysOverdue' => 19,
            'status' => 'Unpaid',
            'statusClass' => 'unpaid'
        ]
    ];

    // Refund Metrics
    $data['refundMetrics'] = [
        'totalAmount' => '1.2L',
        'count' => 18,
        'rate' => 3.1,
        'reasons' => [
            'labels' => ['Overbilling', 'Trial Cancel', 'Complaint', 'Double Payment', 'Service Issue'],
            'values' => [5, 4, 4, 3, 2]
        ]
    ];

    // Refund Details
    $data['refundDetails'] = [
        [
            'date' => '2024-03-18',
            'customer' => 'TechCorp Solutions',
            'invoiceNo' => 'INV-2024-1198',
            'refundId' => 'REF-2024-045',
            'amount' => '15,000',
            'reason' => 'Overbilling',
            'processedBy' => 'Sneha Verma',
            'status' => 'Processed',
            'statusClass' => 'paid'
        ],
        [
            'date' => '2024-03-17',
            'customer' => 'CloudFast Inc',
            'invoiceNo' => 'INV-2024-1215',
            'refundId' => 'REF-2024-044',
            'amount' => '8,500',
            'reason' => 'Trial Cancellation',
            'processedBy' => 'Rajesh Kumar',
            'status' => 'Processed',
            'statusClass' => 'paid'
        ],
        [
            'date' => '2024-03-16',
            'customer' => 'DataSync Pro',
            'invoiceNo' => 'INV-2024-1234',
            'refundId' => 'REF-2024-043',
            'amount' => '12,000',
            'reason' => 'Customer Complaint',
            'processedBy' => 'Amit Patel',
            'status' => 'Processing',
            'statusClass' => 'partial'
        ],
        [
            'date' => '2024-03-15',
            'customer' => 'SecureCloud Inc',
            'invoiceNo' => 'INV-2024-1256',
            'refundId' => 'REF-2024-042',
            'amount' => '25,000',
            'reason' => 'Double Payment',
            'processedBy' => 'Priya Sharma',
            'status' => 'Processed',
            'statusClass' => 'paid'
        ],
        [
            'date' => '2024-03-14',
            'customer' => 'TechFlow Systems',
            'invoiceNo' => 'INV-2024-1278',
            'refundId' => 'REF-2024-041',
            'amount' => '18,500',
            'reason' => 'Service Issue',
            'processedBy' => 'Sneha Verma',
            'status' => 'Processed',
            'statusClass' => 'paid'
        ],
        [
            'date' => '2024-03-13',
            'customer' => 'CloudBase Ltd',
            'invoiceNo' => 'INV-2024-1298',
            'refundId' => 'REF-2024-040',
            'amount' => '9,800',
            'reason' => 'Overbilling',
            'processedBy' => 'Rajesh Kumar',
            'status' => 'Processed',
            'statusClass' => 'paid'
        ]
    ];

    // GST Metrics
    $data['gstMetrics'] = [
        'registered' => [
            'count' => 324,
            'amount' => '28.5L',
            'gst' => '5.1L'
        ],
        'unregistered' => [
            'count' => 156,
            'amount' => '12.8L',
            'gst' => '2.3L'
        ],
        'overseas' => [
            'count' => 42,
            'amount' => '3.9L',
            'gst' => '0'
        ]
    ];

    // GST Details
    $data['gstDetails'] = [
        [
            'invoiceNo' => 'INV-2024-1245',
            'customer' => 'TechCorp Solutions',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'placeOfSupply' => 'Maharashtra',
            'taxableValue' => '1,25,000',
            'cgst' => '11,250',
            'sgst' => '11,250',
            'igst' => '0',
            'totalGst' => '22,500'
        ],
        [
            'invoiceNo' => 'INV-2024-1289',
            'customer' => 'CloudFast Inc',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'placeOfSupply' => 'Karnataka',
            'taxableValue' => '85,000',
            'cgst' => '0',
            'sgst' => '0',
            'igst' => '15,300',
            'totalGst' => '15,300'
        ],
        [
            'invoiceNo' => 'INV-2024-1312',
            'customer' => 'DataSys Ltd',
            'type' => 'Unregistered',
            'typeClass' => 'unregistered',
            'placeOfSupply' => 'Maharashtra',
            'taxableValue' => '45,000',
            'cgst' => '4,050',
            'sgst' => '4,050',
            'igst' => '0',
            'totalGst' => '8,100'
        ],
        [
            'invoiceNo' => 'INV-2024-1334',
            'customer' => 'GlobalTech USA',
            'type' => 'Overseas',
            'typeClass' => 'overseas',
            'placeOfSupply' => 'United States',
            'taxableValue' => '2,15,000',
            'cgst' => '0',
            'sgst' => '0',
            'igst' => '0',
            'totalGst' => '0'
        ],
        [
            'invoiceNo' => 'INV-2024-1356',
            'customer' => 'SecureCloud Pro',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'placeOfSupply' => 'Delhi',
            'taxableValue' => '95,000',
            'cgst' => '0',
            'sgst' => '0',
            'igst' => '17,100',
            'totalGst' => '17,100'
        ],
        [
            'invoiceNo' => 'INV-2024-1378',
            'customer' => 'TechFlow Systems',
            'type' => 'Registered',
            'typeClass' => 'registered',
            'placeOfSupply' => 'Tamil Nadu',
            'taxableValue' => '68,000',
            'cgst' => '0',
            'sgst' => '0',
            'igst' => '12,240',
            'totalGst' => '12,240'
        ]
    ];

    // Customer Health
    $data['customerHealth'] = [
        [
            'name' => 'TechCorp Solutions',
            'healthScore' => 92,
            'mrr' => '2.5L',
            'avgDelay' => 5,
            'totalOverdues' => '1.2L',
            'refundCount' => 1,
            'riskLevel' => 'Low',
            'riskClass' => 'healthy'
        ],
        [
            'name' => 'CloudFast Inc',
            'healthScore' => 78,
            'mrr' => '1.8L',
            'avgDelay' => 12,
            'totalOverdues' => '0.8L',
            'refundCount' => 2,
            'riskLevel' => 'Medium',
            'riskClass' => 'risk'
        ],
        [
            'name' => 'DataSys Ltd',
            'healthScore' => 45,
            'mrr' => '0.9L',
            'avgDelay' => 35,
            'totalOverdues' => '2.5L',
            'refundCount' => 5,
            'riskLevel' => 'High',
            'riskClass' => 'high-risk'
        ],
        [
            'name' => 'GlobalTech USA',
            'healthScore' => 88,
            'mrr' => '3.2L',
            'avgDelay' => 8,
            'totalOverdues' => '0.5L',
            'refundCount' => 0,
            'riskLevel' => 'Low',
            'riskClass' => 'healthy'
        ],
        [
            'name' => 'SecureCloud Pro',
            'healthScore' => 65,
            'mrr' => '1.5L',
            'avgDelay' => 18,
            'totalOverdues' => '1.8L',
            'refundCount' => 3,
            'riskLevel' => 'Medium',
            'riskClass' => 'risk'
        ],
        [
            'name' => 'TechFlow Systems',
            'healthScore' => 85,
            'mrr' => '2.1L',
            'avgDelay' => 7,
            'totalOverdues' => '0.6L',
            'refundCount' => 1,
            'riskLevel' => 'Low',
            'riskClass' => 'healthy'
        ],
        [
            'name' => 'CloudBase Ltd',
            'healthScore' => 72,
            'mrr' => '1.3L',
            'avgDelay' => 15,
            'totalOverdues' => '1.1L',
            'refundCount' => 2,
            'riskLevel' => 'Medium',
            'riskClass' => 'risk'
        ],
        [
            'name' => 'DataSync Pro',
            'healthScore' => 58,
            'mrr' => '1.1L',
            'avgDelay' => 22,
            'totalOverdues' => '1.9L',
            'refundCount' => 4,
            'riskLevel' => 'High',
            'riskClass' => 'high-risk'
        ]
    ];

    // Product Revenue
    $data['productRevenue'] = [
        'labels' => ['VMs', 'Kubernetes', 'Object Storage', 'Databases', 'Load Balancers'],
        'values' => [18.5, 12.8, 8.2, 4.5, 1.2]
    ];

    // Segment Revenue
    $data['segmentRevenue'] = [
        'labels' => ['Startup', 'SMB', 'Enterprise', 'Government'],
        'values' => [12.5, 18.8, 11.2, 2.7]
    ];

    // Monthly Sales
    $data['monthlySales'] = [
        [
            'month' => 'January 2024',
            'invoiced' => '38.2L',
            'collected' => '35.1L',
            'pending' => '3.1L',
            'refunds' => '0.8L',
            'netRevenue' => '34.3L',
            'collectionPct' => 91.9
        ],
        [
            'month' => 'February 2024',
            'invoiced' => '42.5L',
            'collected' => '39.2L',
            'pending' => '3.3L',
            'refunds' => '1.1L',
            'netRevenue' => '38.1L',
            'collectionPct' => 92.2
        ],
        [
            'month' => 'March 2024',
            'invoiced' => '45.2L',
            'collected' => '38.8L',
            'pending' => '6.4L',
            'refunds' => '1.2L',
            'netRevenue' => '37.6L',
            'collectionPct' => 85.8
        ],
        [
            'month' => 'April 2024',
            'invoiced' => '48.1L',
            'collected' => '44.2L',
            'pending' => '3.9L',
            'refunds' => '0.9L',
            'netRevenue' => '43.3L',
            'collectionPct' => 91.9
        ],
        [
            'month' => 'May 2024',
            'invoiced' => '52.3L',
            'collected' => '48.5L',
            'pending' => '3.8L',
            'refunds' => '1.3L',
            'netRevenue' => '47.2L',
            'collectionPct' => 92.7
        ],
        [
            'month' => 'June 2024',
            'invoiced' => '49.8L',
            'collected' => '46.1L',
            'pending' => '3.7L',
            'refunds' => '1.0L',
            'netRevenue' => '45.1L',
            'collectionPct' => 92.6
        ],
        [
            'month' => 'July 2024',
            'invoiced' => '47.2L',
            'collected' => '43.8L',
            'pending' => '3.4L',
            'refunds' => '0.9L',
            'netRevenue' => '42.9L',
            'collectionPct' => 92.8
        ],
        [
            'month' => 'August 2024',
            'invoiced' => '45.8L',
            'collected' => '39.2L',
            'pending' => '6.6L',
            'refunds' => '1.1L',
            'netRevenue' => '38.1L',
            'collectionPct' => 85.6
        ]
    ];

    // Team Performance
    $data['teamPerformance'] = [
        [
            'name' => 'Sneha Verma',
            'invoicesGenerated' => 145,
            'invoiceAmount' => '18.5L',
            'collectionsAmount' => '15.2L',
            'remindersSent' => 89,
            'refundsProcessed' => 12,
            'errorCount' => 0,
            'avgInvoiceTime' => '2.5 hrs',
            'avgPaymentTime' => '1.8 hrs'
        ],
        [
            'name' => 'Rajesh Kumar',
            'invoicesGenerated' => 132,
            'invoiceAmount' => '16.2L',
            'collectionsAmount' => '13.8L',
            'remindersSent' => 76,
            'refundsProcessed' => 8,
            'errorCount' => 1,
            'avgInvoiceTime' => '3.1 hrs',
            'avgPaymentTime' => '2.2 hrs'
        ],
        [
            'name' => 'Amit Patel',
            'invoicesGenerated' => 98,
            'invoiceAmount' => '10.5L',
            'collectionsAmount' => '8.9L',
            'remindersSent' => 52,
            'refundsProcessed' => 5,
            'errorCount' => 2,
            'avgInvoiceTime' => '4.2 hrs',
            'avgPaymentTime' => '3.5 hrs'
        ],
        [
            'name' => 'Priya Sharma',
            'invoicesGenerated' => 118,
            'invoiceAmount' => '14.8L',
            'collectionsAmount' => '12.5L',
            'remindersSent' => 68,
            'refundsProcessed' => 7,
            'errorCount' => 1,
            'avgInvoiceTime' => '2.8 hrs',
            'avgPaymentTime' => '2.1 hrs'
        ]
    ];

    // Alerts
    $data['alerts'] = [
        [
            'severity' => 'high',
            'title' => 'Large Overdue Amount',
            'description' => 'TechCorp Solutions has ₹1.25L overdue for 45 days',
            'action' => 'Escalate to Account Manager for immediate follow-up'
        ],
        [
            'severity' => 'high',
            'title' => 'High Refund Account',
            'description' => 'DataSys Ltd has requested 5 refunds in last 6 months',
            'action' => 'Review billing practices and service quality'
        ],
        [
            'severity' => 'high',
            'title' => 'Payment Gateway Issue',
            'description' => '12 transactions failed in last 24 hours',
            'action' => 'Contact payment gateway support immediately'
        ],
        [
            'severity' => 'medium',
            'title' => 'Missing GSTIN',
            'description' => '3 registered customers have incomplete GST information',
            'action' => 'Contact customers to update GST details'
        ],
        [
            'severity' => 'medium',
            'title' => 'Collection Efficiency Drop',
            'description' => 'Overall collection efficiency dropped 3% this month',
            'action' => 'Review overdue follow-up processes'
        ],
        [
            'severity' => 'medium',
            'title' => 'Aging Receivables',
            'description' => '₹0.3L in receivables are more than 60 days old',
            'action' => 'Intensify collection efforts'
        ],
        [
            'severity' => 'low',
            'title' => 'Duplicate Payment',
            'description' => 'SecureCloud Inc made duplicate payment of ₹25K',
            'action' => 'Process refund and verify payment gateway logs'
        ],
        [
            'severity' => 'low',
            'title' => 'Long Outstanding',
            'description' => '2 invoices outstanding for more than 90 days',
            'action' => 'Consider marking as bad debt after final escalation'
        ],
        [
            'severity' => 'low',
            'title' => 'Invoice Numbering Gap',
            'description' => 'Missing invoice numbers detected in sequence',
            'action' => 'Verify invoice generation logs for data integrity'
        ]
    ];

    return $data;
}

echo json_encode(generateBillingData());
?>