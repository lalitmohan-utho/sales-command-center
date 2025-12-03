# Sales Dashboard API Documentation

## Base URL
```
https://jyxpsdqgrnkgknpskgdv.supabase.co/functions/v1/sales-api
```

## Authentication
No authentication required for public endpoints.

---

## Endpoints

### 1. Dashboard Data
Get all dashboard data including KPIs, pipeline, leads, and activities.

**Request:**
```
GET /sales-api?action=dashboard
```

**Response:**
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
        "value": 280000,
        "deals": [...]
      }
    ]
  },
  "leadSources": [
    { "name": "Website", "count": 45 },
    { "name": "Referral", "count": 30 }
  ],
  "recentActivity": [...],
  "salesTargets": [...],
  "targetChartData": {
    "labels": ["TRM - October", "ZRM - November"],
    "target": [7.16, 8.66],
    "achieved": [6.23, 8.02]
  }
}
```

---

### 2. Leads

#### Get All Leads
```
GET /sales-api?action=leads
```

**Response:**
```json
{
  "leads": [
    {
      "id": "uuid",
      "name": "Rohan Sharma",
      "company": "Cloud Ventures",
      "email": "rohan@cloudventures.com",
      "phone": "+91 98765 43210",
      "source": "Website",
      "stage": "Qualified",
      "status": "Meeting Scheduled",
      "value": 250000,
      "assigned_to": "TRM",
      "notes": "",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Create Lead
```
POST /sales-api?action=lead
Content-Type: application/json

{
  "name": "John Doe",
  "company": "Acme Corp",
  "email": "john@acme.com",
  "phone": "+91 98765 43210",
  "source": "Website",
  "stage": "New",
  "status": "Not Called",
  "value": 100000,
  "assigned_to": "TRM",
  "notes": "Initial contact"
}
```

**Response:**
```json
{
  "success": true,
  "lead": { ... }
}
```

#### Update Lead
```
PUT /sales-api?action=lead&id={lead_id}
Content-Type: application/json

{
  "stage": "Qualified",
  "status": "Meeting Scheduled"
}
```

#### Delete Lead
```
DELETE /sales-api?action=lead&id={lead_id}
```

---

### 3. Deals

#### Get All Deals
```
GET /sales-api?action=deals
```

**Response:**
```json
{
  "deals": [
    {
      "id": "uuid",
      "lead_id": "uuid or null",
      "name": "Cloud Migration",
      "company": "CloudTechies",
      "value": 180000,
      "stage": "New",
      "probability": 10,
      "expected_close_date": "2024-02-15",
      "assigned_to": "TRM",
      "notes": "",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Create Deal
```
POST /sales-api?action=deal
Content-Type: application/json

{
  "name": "ERP Implementation",
  "company": "Tech Corp",
  "value": 500000,
  "stage": "Proposal",
  "probability": 75,
  "expected_close_date": "2024-03-15",
  "assigned_to": "ZRM",
  "notes": "Large enterprise deal"
}
```

#### Update Deal
```
PUT /sales-api?action=deal&id={deal_id}
Content-Type: application/json

{
  "stage": "Negotiation",
  "probability": 90
}
```

#### Delete Deal
```
DELETE /sales-api?action=deal&id={deal_id}
```

---

### 4. Follow-ups

#### Get All Follow-ups
```
GET /sales-api?action=followups
```

**Response:**
```json
{
  "followups": [
    {
      "id": "uuid",
      "lead_id": "uuid or null",
      "deal_id": "uuid or null",
      "name": "Rohan Sharma",
      "company": "Cloud Ventures",
      "task": "Cloud Migration Discussion",
      "task_type": "Call",
      "scheduled_time": "2024-01-15T14:45:00Z",
      "status": "Pending",
      "assigned_to": "TRM",
      "notes": ""
    }
  ]
}
```

#### Create Follow-up
```
POST /sales-api?action=followup
Content-Type: application/json

{
  "name": "John Doe",
  "company": "Acme Corp",
  "task": "Product Demo",
  "task_type": "Meeting",
  "scheduled_time": "2024-01-20T10:00:00Z",
  "status": "Pending",
  "assigned_to": "TRM"
}
```

#### Update Follow-up
```
PUT /sales-api?action=followup&id={followup_id}
Content-Type: application/json

{
  "status": "Done"
}
```

#### Delete Follow-up
```
DELETE /sales-api?action=followup&id={followup_id}
```

---

### 5. Sales Targets

#### Get All Targets
```
GET /sales-api?action=targets
```

**Response:**
```json
{
  "targets": [
    {
      "id": "uuid",
      "rep": "TRM",
      "quarter": "Q4",
      "month": "October",
      "target_business": 716000,
      "achieved_revenue": 623000,
      "target_mrr": 4400,
      "achieved_mrr": 3530,
      "status": "On Track"
    }
  ]
}
```

#### Create Target
```
POST /sales-api?action=target
Content-Type: application/json

{
  "rep": "TRM",
  "quarter": "Q1",
  "month": "January",
  "target_business": 800000,
  "achieved_revenue": 0,
  "target_mrr": 5000,
  "achieved_mrr": 0,
  "status": "On Track"
}
```

#### Update Target
```
PUT /sales-api?action=target&id={target_id}
Content-Type: application/json

{
  "achieved_revenue": 450000,
  "achieved_mrr": 3000,
  "status": "On Track"
}
```

#### Delete Target
```
DELETE /sales-api?action=target&id={target_id}
```

---

### 6. Activities

#### Get Recent Activities
```
GET /sales-api?action=activities
```

**Response:**
```json
{
  "activities": [
    {
      "id": "uuid",
      "user_name": "Latif",
      "description": "added EMC Corp deal worth ₹2.5L to the pipeline",
      "details": "",
      "activity_type": "deal",
      "lead_id": null,
      "deal_id": "uuid",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Database Schema

### sales_leads
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Contact name |
| company | TEXT | Company name |
| email | TEXT | Email address |
| phone | TEXT | Phone number |
| source | TEXT | Lead source (Website, Referral, etc.) |
| stage | TEXT | Pipeline stage (New, Contacted, etc.) |
| status | TEXT | Contact status |
| value | DECIMAL | Estimated value |
| assigned_to | TEXT | Sales rep |
| notes | TEXT | Additional notes |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### sales_deals
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| lead_id | UUID | Reference to lead (optional) |
| name | TEXT | Deal name |
| company | TEXT | Company name |
| value | DECIMAL | Deal value |
| stage | TEXT | Pipeline stage |
| probability | INTEGER | Win probability (0-100) |
| expected_close_date | DATE | Expected close date |
| assigned_to | TEXT | Sales rep |
| notes | TEXT | Additional notes |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### sales_followups
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| lead_id | UUID | Reference to lead (optional) |
| deal_id | UUID | Reference to deal (optional) |
| name | TEXT | Contact name |
| company | TEXT | Company name |
| task | TEXT | Task description |
| task_type | TEXT | Call, Meeting, or Email |
| scheduled_time | TIMESTAMP | Scheduled date/time |
| status | TEXT | Pending, Done, Contacted |
| assigned_to | TEXT | Sales rep |
| notes | TEXT | Additional notes |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### sales_targets
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| rep | TEXT | Sales rep code |
| quarter | TEXT | Q1, Q2, Q3, or Q4 |
| month | TEXT | Month name |
| target_business | DECIMAL | Target revenue |
| achieved_revenue | DECIMAL | Achieved revenue |
| target_mrr | DECIMAL | Target MRR |
| achieved_mrr | DECIMAL | Achieved MRR |
| status | TEXT | On Track, At Risk, Behind |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### sales_activities
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_name | TEXT | User who performed action |
| description | TEXT | Activity description |
| details | TEXT | Additional details |
| activity_type | TEXT | deal, meeting, email, call, etc. |
| lead_id | UUID | Related lead (optional) |
| deal_id | UUID | Related deal (optional) |
| created_at | TIMESTAMP | Activity timestamp |

---

## Related Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `static-sales-dashboard.html` | Main sales dashboard |
| Leads | `sales-leads.html` | Leads management |
| Deals | `sales-deals.html` | Deals/pipeline management |
| Follow-ups | `sales-followups.html` | Follow-up tasks |
| Targets | `sales-targets.html` | Sales targets |

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "error": "Error message description"
}
```

HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (missing parameters)
- `500` - Server Error