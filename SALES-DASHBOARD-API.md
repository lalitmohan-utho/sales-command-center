# Sales Dashboard API Documentation

## Endpoint
```
GET sales-api.php
```

## Method
`GET` (no parameters required for dashboard data)

## Request
```javascript
fetch('sales-api.php')
```

## Response Payload

```json
{
  "followUpTasks": [
    {
      "id": "uuid",
      "name": "Rohan Sharma",
      "company": "Cloud Ventures",
      "task": "Cloud Migration Discussion",
      "type": "Call",
      "time": "2:45 PM",
      "status": "Done"
    }
  ],
  "kpis": {
    "totalAllocated": "₹ 68.02L",
    "contactedHot": "₹ 45.3K",
    "dealsInPipe": "₹ 32.5L",
    "expectedValue": "₹ 125.8L",
    "newMeetings": "1,247",
    "leadQualified": "342",
    "newLeads": "89",
    "coldCalling": "523",
    "followUp": "156",
    "proposalsSent": "78",
    "dealsLost": "23",
    "dealsWon": "45"
  },
  "leadStatus": {
    "newLeads": 89,
    "hotLeads": 523,
    "activeDeals": 234,
    "lostDeals": 83,
    "qualified": 234,
    "unresponsive": 156
  },
  "pipeline": {
    "stages": [
      {
        "name": "New",
        "count": 7,
        "value": "₹ 2.8L",
        "deals": [
          {
            "id": "uuid",
            "name": "Cloud Migration",
            "company": "CloudTechies",
            "value": "₹ 1.8L",
            "rep": "TRM"
          }
        ]
      },
      {
        "name": "Contacted",
        "count": 12,
        "value": "₹ 4.5L",
        "deals": []
      },
      {
        "name": "Qualified",
        "count": 8,
        "value": "₹ 6.2L",
        "deals": []
      },
      {
        "name": "Proposal",
        "count": 5,
        "value": "₹ 8.1L",
        "deals": []
      },
      {
        "name": "Negotiation",
        "count": 3,
        "value": "₹ 3.2L",
        "deals": []
      }
    ]
  },
  "recentActivity": [
    {
      "id": "uuid",
      "user": "Latif",
      "description": "added EMC Corp deal worth ₹2.5L to the pipeline",
      "details": "",
      "time": "2 hours ago",
      "type": "deal"
    }
  ],
  "salesTargets": [
    {
      "id": "uuid",
      "rep": "TRM",
      "quarter": "Q4",
      "month": "October",
      "targetBusiness": "₹ 7.16Lk",
      "achievedRevenue": "₹ 6.23Lk",
      "targetMRR": "₹ 4.40K",
      "achievedMRR": "₹ 3.53K",
      "achievement": "87%",
      "status": "On Track"
    }
  ]
}
```

## Data Field Descriptions

### followUpTasks
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Contact person name |
| company | string | Company name |
| task | string | Task description |
| type | string | "Call", "Meeting", or "Email" |
| time | string | Scheduled time (formatted) |
| status | string | "Done", "Pending", or "Contacted" |

### kpis
| Field | Type | Description |
|-------|------|-------------|
| totalAllocated | string | Total allocated value (formatted) |
| contactedHot | string | Contacted & hot leads value |
| dealsInPipe | string | Total pipeline value |
| expectedValue | string | Expected revenue |
| newMeetings | string | Number of new meetings |
| leadQualified | string | Qualified leads count |
| newLeads | string | New leads count |
| coldCalling | string | Cold calls made |
| followUp | string | Follow-ups count |
| proposalsSent | string | Proposals sent count |
| dealsLost | string | Lost deals count |
| dealsWon | string | Won deals count |

### leadStatus
| Field | Type | Description |
|-------|------|-------------|
| newLeads | number | New leads count |
| hotLeads | number | Hot leads count |
| activeDeals | number | Active deals count |
| lostDeals | number | Lost deals count |
| qualified | number | Qualified leads count |
| unresponsive | number | Unresponsive leads count |

### pipeline.stages[]
| Field | Type | Description |
|-------|------|-------------|
| name | string | Stage name (New, Contacted, Qualified, Proposal, Negotiation) |
| count | number | Number of deals in stage |
| value | string | Total value in stage (formatted) |
| deals | array | Array of deal objects |

### pipeline.stages[].deals[]
| Field | Type | Description |
|-------|------|-------------|
| id | string | Deal unique identifier |
| name | string | Deal name |
| company | string | Company name |
| value | string | Deal value (formatted) |
| rep | string | Assigned sales rep |

### recentActivity[]
| Field | Type | Description |
|-------|------|-------------|
| id | string | Activity unique identifier |
| user | string | User who performed action |
| description | string | Activity description |
| details | string | Additional details |
| time | string | Time ago string |
| type | string | Activity type (deal, meeting, email, call) |

### salesTargets[]
| Field | Type | Description |
|-------|------|-------------|
| id | string | Target unique identifier |
| rep | string | Sales rep code |
| quarter | string | Quarter (Q1-Q4) |
| month | string | Month name |
| targetBusiness | string | Target revenue (formatted) |
| achievedRevenue | string | Achieved revenue (formatted) |
| targetMRR | string | Target MRR (formatted) |
| achievedMRR | string | Achieved MRR (formatted) |
| achievement | string | Achievement percentage |
| status | string | "On Track", "At Risk", or "Behind" |

## PHP API Implementation Example

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Sample response
$response = [
    'followUpTasks' => [
        [
            'id' => '1',
            'name' => 'Rohan Sharma',
            'company' => 'Cloud Ventures',
            'task' => 'Cloud Migration Discussion',
            'type' => 'Call',
            'time' => '2:45 PM',
            'status' => 'Done'
        ],
        [
            'id' => '2',
            'name' => 'Priya Patel',
            'company' => 'DataSync Ltd',
            'task' => 'Product Demo',
            'type' => 'Meeting',
            'time' => '4:00 PM',
            'status' => 'Pending'
        ]
    ],
    'kpis' => [
        'totalAllocated' => '₹ 68.02L',
        'contactedHot' => '₹ 45.3K',
        'dealsInPipe' => '₹ 32.5L',
        'expectedValue' => '₹ 125.8L',
        'newMeetings' => '1,247',
        'leadQualified' => '342',
        'newLeads' => '89',
        'coldCalling' => '523',
        'followUp' => '156',
        'proposalsSent' => '78',
        'dealsLost' => '23',
        'dealsWon' => '45'
    ],
    'leadStatus' => [
        'newLeads' => 89,
        'hotLeads' => 523,
        'activeDeals' => 234,
        'lostDeals' => 83,
        'qualified' => 234,
        'unresponsive' => 156
    ],
    'pipeline' => [
        'stages' => [
            ['name' => 'New', 'count' => 7, 'value' => '₹ 2.8L', 'deals' => []],
            ['name' => 'Contacted', 'count' => 12, 'value' => '₹ 4.5L', 'deals' => []],
            ['name' => 'Qualified', 'count' => 8, 'value' => '₹ 6.2L', 'deals' => []],
            ['name' => 'Proposal', 'count' => 5, 'value' => '₹ 8.1L', 'deals' => []],
            ['name' => 'Negotiation', 'count' => 3, 'value' => '₹ 3.2L', 'deals' => []]
        ]
    ],
    'recentActivity' => [
        [
            'id' => '1',
            'user' => 'Latif',
            'description' => 'added EMC Corp deal worth ₹2.5L to the pipeline',
            'details' => '',
            'time' => '2 hours ago',
            'type' => 'deal'
        ]
    ],
    'salesTargets' => [
        [
            'id' => '1',
            'rep' => 'TRM',
            'quarter' => 'Q4',
            'month' => 'October',
            'targetBusiness' => '₹ 7.16Lk',
            'achievedRevenue' => '₹ 6.23Lk',
            'targetMRR' => '₹ 4.40K',
            'achievedMRR' => '₹ 3.53K',
            'achievement' => '87%',
            'status' => 'On Track'
        ]
    ]
];

echo json_encode($response);
?>
```
