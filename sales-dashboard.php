<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales & Leads Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
    <style>
        :root {
            --primary-color: #0066FF;
            --success-color: #10B981;
            --warning-color: #F59E0B;
            --danger-color: #EF4444;
            --info-color: #3B82F6;
            --sidebar-bg: #FFFFFF;
            --sidebar-hover: #F3F4F6;
            --sidebar-active: #EEF2FF;
            --border-color: #E5E7EB;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #F9FAFB;
            color: #1F2937;
        }

        
        /* Main Content */
        .main-content {
            margin-left: 240px;
            min-height: 100vh;
        }

        /* Header */
        .top-header {
            background: white;
            border-bottom: 1px solid var(--border-color);
            padding: 16px 32px;
            position: sticky;
            top: 0;
            z-index: 999;
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
        }

        .header-title {
            display: flex;
            flex-direction: column;
        }

        .header-title h1 {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
        }

        .header-title small {
            color: #6B7280;
            font-size: 13px;
        }

        .header-search {
            flex: 1;
            max-width: 400px;
        }

        .header-search input {
            width: 100%;
            padding: 8px 16px 8px 40px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
        }

        .search-wrapper {
            position: relative;
        }

        .search-wrapper i {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .btn-add {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            font-weight: 500;
        }

        .btn-icon {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .notification-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: var(--danger-color);
            color: white;
            font-size: 10px;
            padding: 2px 5px;
            border-radius: 10px;
        }

        .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #E0E7FF;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            font-weight: 600;
        }

        /* Filter Bar */
        .filter-bar {
            background: white;
            padding: 16px 32px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
        }

        .filter-chips {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            flex: 1;
        }

        .filter-chip {
            padding: 6px 14px;
            border: 1px solid var(--border-color);
            border-radius: 20px;
            background: white;
            font-size: 13px;
            color: #6B7280;
            cursor: pointer;
            transition: all 0.2s;
        }

        .filter-chip:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }

        .filter-chip.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .filter-actions {
            display: flex;
            gap: 8px;
        }

        .btn-filter {
            padding: 6px 16px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background: white;
            font-size: 13px;
            cursor: pointer;
        }

        .btn-filter.primary {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        /* Content Area */
        .content-area {
            padding: 24px 32px;
        }

        /* Section */
        .section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid var(--border-color);
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
        }

        .section-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
        }

        .section-actions {
            display: flex;
            gap: 8px;
        }

        .btn-sm {
            padding: 4px 12px;
            font-size: 13px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background: white;
            cursor: pointer;
        }

        /* Task Table */
        .task-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 8px;
        }

        .task-table thead th {
            font-size: 12px;
            font-weight: 600;
            color: #6B7280;
            text-transform: uppercase;
            padding: 8px 12px;
            border-bottom: 1px solid var(--border-color);
        }

        .task-table tbody tr {
            background: #F9FAFB;
            border-radius: 8px;
        }

        .task-table tbody td {
            padding: 12px;
            font-size: 14px;
        }

        .task-table tbody tr td:first-child {
            border-radius: 8px 0 0 8px;
        }

        .task-table tbody tr td:last-child {
            border-radius: 0 8px 8px 0;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .user-avatar-sm {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            color: white;
        }

        .user-details h6 {
            font-size: 14px;
            font-weight: 500;
            margin: 0;
        }

        .user-details small {
            font-size: 12px;
            color: #6B7280;
        }

        .badge {
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }

        .badge.done {
            background: #D1FAE5;
            color: #065F46;
        }

        .badge.contacted {
            background: #DBEAFE;
            color: #1E40AF;
        }

        /* Stats Grid - Two Rows */
        .stats-grid-row-1 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-top: 16px;
        }

        .stats-grid-row-2 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-top: 16px;
        }

        .stat-card {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .stat-card-large {
            padding: 20px;
        }

        .stat-info h6 {
            font-size: 12px;
            color: #6B7280;
            margin: 0 0 6px 0;
            font-weight: 500;
        }

        .stat-info h3 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 4px 0;
        }

        .stat-info h3.large {
            font-size: 28px;
        }

        .stat-info small {
            font-size: 11px;
            color: #6B7280;
        }

        .stat-icon {
            width: 44px;
            height: 44px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .stat-icon.large {
            width: 52px;
            height: 52px;
            font-size: 24px;
        }

        .stat-icon.blue {
            background: #DBEAFE;
            color: #1E40AF;
        }

        .stat-icon.green {
            background: #D1FAE5;
            color: #065F46;
        }

        .stat-icon.yellow {
            background: #FEF3C7;
            color: #92400E;
        }

        .stat-icon.orange {
            background: #FFEDD5;
            color: #9A3412;
        }

        .stat-icon.purple {
            background: #EDE9FE;
            color: #5B21B6;
        }

        .stat-icon.red {
            background: #FEE2E2;
            color: #991B1B;
        }

        /* Two Column Layout */
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .chart-container {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 20px;
        }

        .chart-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .chart-subtitle {
            font-size: 12px;
            color: #6B7280;
            margin-bottom: 16px;
        }

        .chart-wrapper {
            position: relative;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chart-center-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            pointer-events: none;
        }

        .chart-center-text h2 {
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            color: var(--success-color);
        }

        .chart-center-text small {
            font-size: 12px;
            color: #6B7280;
        }

        .chart-legend {
            margin-top: 16px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #F3F4F6;
        }

        .legend-item:last-child {
            border-bottom: none;
        }

        .legend-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
        }

        .legend-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        .legend-value {
            font-weight: 600;
            font-size: 14px;
        }

        /* Status Grid */
        .status-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }

        .status-card {
            padding: 16px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            border: 1px solid var(--border-color);
        }

        .status-card h2 {
            font-size: 28px;
            font-weight: 700;
            margin: 8px 0 4px 0;
        }

        .status-card small {
            font-size: 12px;
            color: #6B7280;
            font-weight: 500;
        }

        .status-card i {
            font-size: 24px;
            padding: 8px;
            border-radius: 8px;
        }

        /* Pipeline */
        .pipeline-container {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            padding: 10px 0;
            width: 100%;
        }

        .pipeline-stage {
            flex: 1 0 260px;
            /* ⭐ FILL FULL WIDTH + AUTO SCROLL */
            min-width: 260px;
            /* Prevent shrinking */
            background: #fff;
            padding: 16px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
        }

        .stage-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .stage-title {
            font-size: 15px;
            font-weight: 600;
        }

        .stage-count {
            font-size: 15px;
            font-weight: bold;
            color: var(--primary-color);
        }

        .stage-value {
            font-size: 14px;
            margin-bottom: 10px;
            color: #4b5563;
        }

        .pipeline-card {
            background: #f9fafb;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 1px solid #e5e7eb;
        }

        .pipeline-card-row {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .pipeline-card-value {
            font-weight: 600;
        }


        /* Activity Timeline */
        .activity-timeline {
            position: relative;
        }

        .activity-item {
            display: flex;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid #F3F4F6;
            position: relative;
        }

        .activity-item:last-child {
            border-bottom: none;
        }

        .activity-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .activity-content {
            flex: 1;
        }

        .activity-content p {
            margin: 0 0 4px 0;
            font-size: 13px;
        }

        .activity-content small {
            color: #9CA3AF;
            font-size: 12px;
        }

        .activity-time {
            font-size: 12px;
            color: #9CA3AF;
        }

        /* Table */
        .data-table {
            width: 100%;
            border-collapse: collapse;
        }

        .data-table thead th {
            background: #F9FAFB;
            padding: 12px;
            font-size: 12px;
            font-weight: 600;
            color: #6B7280;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        .data-table tbody td {
            padding: 12px;
            font-size: 13px;
            border-bottom: 1px solid #F3F4F6;
        }

        .data-table tbody tr:hover {
            background: #F9FAFB;
        }

        .progress-bar-custom {
            background: #E5E7EB;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            width: 100px;
        }

        .progress-fill {
            height: 100%;
            background: var(--success-color);
            border-radius: 4px;
        }

        /* Period Dropdown */
        .period-dropdown {
            position: relative;
            display: inline-block;
        }

        .period-dropdown-btn {
            padding: 4px 12px;
            font-size: 13px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .period-dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            top: 100%;
            background: white;
            min-width: 140px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-radius: 8px;
            z-index: 1000;
            border: 1px solid var(--border-color);
            margin-top: 4px;
        }

        .period-dropdown-content.show {
            display: block;
        }

        .period-dropdown-item {
            padding: 10px 14px;
            cursor: pointer;
            font-size: 13px;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
            display: block;
        }

        .period-dropdown-item:hover {
            background: #F3F4F6;
        }

        .period-dropdown-item:first-child {
            border-radius: 8px 8px 0 0;
        }

        .period-dropdown-item:last-child {
            border-radius: 0 0 8px 8px;
        }

        .period-dropdown-item.active {
            background: var(--primary-color);
            color: white;
        }

        /* Modal Styles */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }

        .modal-overlay.show {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 12px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px;
            border-bottom: 1px solid var(--border-color);
        }

        .modal-header h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6B7280;
            padding: 0;
            line-height: 1;
        }

        .modal-close:hover {
            color: #1F2937;
        }

        .modal-body {
            padding: 24px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 6px;
        }

        .form-group label span {
            color: #EF4444;
        }

        .form-control {
            width: 100%;
            padding: 10px 12px;
            font-size: 14px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: white;
            transition: border-color 0.2s;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            padding: 16px 24px;
            border-top: 1px solid var(--border-color);
            background: #F9FAFB;
            border-radius: 0 0 12px 12px;
        }

        .btn-cancel {
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background: white;
            cursor: pointer;
            font-weight: 500;
        }

        .btn-cancel:hover {
            background: #F3F4F6;
        }

        .btn-save {
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 8px;
            border: none;
            background: var(--primary-color);
            color: white;
            cursor: pointer;
            font-weight: 500;
        }

        .btn-save:hover {
            background: #0052CC;
        }

        @media (max-width: 1200px) {

            .stats-grid-row-1,
            .stats-grid-row-2 {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }

            .main-content {
                margin-left: 0;
            }

            .two-column {
                grid-template-columns: 1fr;
            }

            .status-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .stats-grid-row-1,
            .stats-grid-row-2 {
                grid-template-columns: 1fr;
            }

            .form-row {
                grid-template-columns: 1fr;
            }

            .modal-content {
                margin: 16px;
            }
        }
    </style>
</head>

<body>
    <!-- Sidebar -->
    <?php include "../sidebar.php" ?>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Header -->
        <div class="top-header">
            <div class="header-content">
                <div class="header-title">
                    <h1>Sales & Leads Dashboard</h1>
                    <small>Track all sales & contacts in one place</small>
                </div>
                <div class="header-search">
                    <div class="search-wrapper">
                        <i class="bi bi-search"></i>
                        <input type="text" placeholder="Search leads, contacts, accounts, deals...">
                    </div>
                </div>
                <div class="header-actions">
                    <button class="btn-add">
                        <i class="bi bi-plus-lg"></i>
                        Add
                    </button>
                    <button class="btn-icon">
                        <i class="bi bi-bell"></i>
                        <span class="notification-badge">3</span>
                    </button>
                    <button class="btn-icon">
                        <i class="bi bi-chat-dots"></i>
                    </button>
                    <div class="user-avatar">JD</div>
                </div>
            </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
            <div class="filter-chips">
                <button class="filter-chip">All Years</button>
                <button class="filter-chip active">Today</button>
                <button class="filter-chip">This Week</button>
                <button class="filter-chip">This Month</button>
                <button class="filter-chip">This Quarter</button>
                <button class="filter-chip">Custom</button>
                <button class="filter-chip">All Statuses</button>
            </div>
            <div class="filter-actions">
                <button class="btn-filter">Reset</button>
                <button class="btn-filter primary">Apply</button>
            </div>
        </div>

        <!-- Content Area -->
        <div class="content-area">
            <!-- Follow-ups & Tasks -->
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title">Follow-ups & Tasks</h2>
                    <div class="section-actions">
                        <button class="btn-sm">See Tasks</button>
                        <button class="btn-sm">All Parts</button>
                    </div>
                </div>
                <table class="task-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>TODAY (3)</th>
                            <th>OVERDUE (0)</th>
                            <th>NEXT 7 DAYS (2)</th>
                            <th>NEXT 30 DAYS (0)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tasksTableBody">
                        <!-- Tasks will be populated here -->
                    </tbody>
                </table>
            </div>

            <div class="section">
                <div class="row g-3" id="statsGridRow0"></div>
            </div>

            <!-- Sales Target & Performance Overview -->
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title">Sales Target & Performance Overview</h2>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <!-- Quarter Target Achievement -->
                        <div class="chart-container">
                            <h3 class="chart-title">Quarter Target Achievement</h3>
                            <p class="chart-subtitle">Q4 2024 (Oct, Nov, Dec) Performance to Date</p>
                            <div class="chart-wrapper">
                                <canvas id="quarterTargetChart"></canvas>
                                <div class="chart-center-text">
                                    <h2 id="achievementPercent">86.1%</h2>
                                    <small>ACHIEVED</small>
                                </div>
                            </div>
                            <div class="chart-legend">
                                <div class="legend-item">
                                    <div class="legend-label">
                                        <span class="legend-dot" style="background: #10B981;"></span>
                                        <span>Target Achieved</span>
                                    </div>
                                    <span class="legend-value" id="targetAchieved">₹ 11.5Lk</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-label">
                                        <span class="legend-dot" style="background: #E5E7EB;"></span>
                                        <span>Remaining Target</span>
                                    </div>
                                    <span class="legend-value" id="remainingTarget">₹ 11.5Lk</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="chart-container">                            
                            <div class="section-header">
                                <h2 class="section-title">Lead Source & Stage Distribution</h2>
                            </div>
                            <p class="chart-subtitle">Lead Source</p>
                            <div style="height: 180px; margin-bottom: 20px;">
                                <canvas id="leadSourceChart"></canvas>
                            </div>
                            <p class="chart-subtitle">Lead Stages</p>
                            <div style="height: 180px;">
                                <canvas id="leadStagesChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Stats Grid - Row 1: 4 Large Cards -->
            <div class="stats-grid-row-1" id="statsGridRow1">
                <!-- Large stats will be populated here -->
            </div>

            <!-- Stats Grid - Row 2: 8 Smaller Cards -->
            <div class="stats-grid-row-2" id="statsGridRow2">
                <!-- Small stats will be populated here -->
            </div>
        </div>

        <!-- Sales Target vs Achieved -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Sales Target vs Achieved - Q4 2024</h2>
                <div class="section-actions">
                    <button class="btn-sm">Revenue</button>
                    <button class="btn-sm">MRR</button>
                </div>
            </div>
            <div style="height: 300px; position: relative;">
                <canvas id="salesTargetChart"></canvas>
            </div>
        </div>



        <!-- Deals -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Deals</h2>
                <a href="#" style="color: var(--primary-color); text-decoration: none; font-size: 14px;">View Full
                    Pipeline →</a>
            </div>
            <div class="pipeline-container" id="pipelineContainer">
                <!-- Pipeline stages will be populated here -->
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Recent Activity</h2>
                <div class="section-actions">
                    <button class="btn-sm">Team Activity</button>
                    <button class="btn-sm">All Types</button>
                </div>
            </div>
            <div class="activity-timeline" id="activityTimeline">
                <!-- Activities will be populated here -->
            </div>
            <div style="text-align: center; margin-top: 16px;">
                <button class="btn-sm">Load More Activities</button>
            </div>
        </div>

        <!-- Manage Sales Targets -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Manage Sales Targets</h2>
                <div class="section-actions">
                    <button class="btn-sm" onclick="openEditModal()">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <div class="period-dropdown">
                        <button class="period-dropdown-btn" onclick="togglePeriodDropdown(event)">
                            <span id="selectedPeriod">Quarterly</span>
                            <i class="bi bi-chevron-down"></i>
                        </button>
                        <div class="period-dropdown-content" id="periodDropdown">
                            <button class="period-dropdown-item" onclick="selectPeriod('Yearly', 'yearly')">Yearly</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Monthly', 'monthly')">Monthly</button>
                            <button class="period-dropdown-item active" onclick="selectPeriod('Quarterly', 'quarterly')">Quarterly</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q1', 'Q1')">Q1</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q2', 'Q2')">Q2</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q3', 'Q3')">Q3</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q4', 'Q4')">Q4</button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="data-table" id="targetsTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>REP</th>
                        <th>QUARTER</th>
                        <th>MONTH</th>
                        <th>TARGET BUSINESS</th>
                        <th>ACHIEVED REVENUE</th>
                        <th>TARGET MRR</th>
                        <th>ACHIEVED MRR</th>
                        <th>ACHIEVEMENT</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table rows will be populated here -->
                </tbody>
            </table>
        </div>
    </div>
    </div>

    <!-- Edit Target Modal -->
    <div class="modal-overlay" id="editTargetModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Sales Target</h3>
                <button class="modal-close" onclick="closeEditModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="editTargetForm">
                    <input type="hidden" id="targetId" name="id">
                    
                    <div class="form-group">
                        <label>Sales Rep <span>*</span></label>
                        <input type="text" class="form-control" id="targetRep" name="rep" placeholder="e.g., TRM, PRS, AKM" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Quarter <span>*</span></label>
                            <select class="form-control" id="targetQuarter" name="quarter" required>
                                <option value="">Select Quarter</option>
                                <option value="Q1">Q1</option>
                                <option value="Q2">Q2</option>
                                <option value="Q3">Q3</option>
                                <option value="Q4">Q4</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Month <span>*</span></label>
                            <select class="form-control" id="targetMonth" name="month" required>
                                <option value="">Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Target Business (₹) <span>*</span></label>
                            <input type="number" class="form-control" id="targetBusiness" name="targetBusiness" placeholder="e.g., 716000" required>
                        </div>
                        <div class="form-group">
                            <label>Achieved Revenue (₹) <span>*</span></label>
                            <input type="number" class="form-control" id="achievedRevenue" name="achievedRevenue" placeholder="e.g., 623000" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Target MRR (₹) <span>*</span></label>
                            <input type="number" class="form-control" id="targetMRR" name="targetMRR" placeholder="e.g., 44000" required>
                        </div>
                        <div class="form-group">
                            <label>Achieved MRR (₹) <span>*</span></label>
                            <input type="number" class="form-control" id="achievedMRR" name="achievedMRR" placeholder="e.g., 35300" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Status <span>*</span></label>
                        <select class="form-control" id="targetStatus" name="status" required>
                            <option value="">Select Status</option>
                            <option value="On Track">On Track</option>
                            <option value="At Risk">At Risk</option>
                            <option value="Behind">Behind</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel" onclick="closeEditModal()">Cancel</button>
                <button class="btn-save" onclick="saveTarget()">Save Changes</button>
            </div>
        </div>
    </div>

    <script>
        const API_URL = 'sales-api.php';

        // Fetch and render dashboard data
        async function loadDashboard() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                renderTasks(data.followUpTasks);
                renderStats(data.kpis);
                renderCharts(data);
                // renderStatusGrid(data.leadStatus);
                renderPipeline(data.pipeline);
                renderActivity(data.recentActivity);
                renderTargetsTable(data.salesTargets);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            }
        }

        function renderTasks(tasks) {
            const tbody = document.getElementById('tasksTableBody');
            tbody.innerHTML = tasks.map((task, index) => {
                const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D'];
                const bgColor = colors[index % colors.length];
                return `
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="user-info">
                                <div class="user-avatar-sm" style="background: ${bgColor};">
                                    ${task.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div class="user-details">
                                    <h6>${task.name}</h6>
                                    <small>${task.company}</small>
                                </div>
                            </div>
                        </td>
                        <td>${task.task}</td>
                        <td>
                            <i class="bi bi-${task.type === 'Call' ? 'telephone' : task.type === 'Meeting' ? 'calendar-event' : 'envelope'}"></i>
                            ${task.type}
                        </td>
                        <td>${task.time}</td>
                        <td><span class="badge ${task.status.toLowerCase()}">${task.status}</span></td>
                        <td>
                            <i class="bi bi-telephone"></i>
                            <i class="bi bi-envelope"></i>
                            <i class="bi bi-chat-dots"></i>
                            <i class="bi bi-three-dots-vertical"></i>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function renderStats(kpis) {
            const statsGridRow0 = document.getElementById('statsGridRow0');
            // const statsGridRow1 = document.getElementById('statsGridRow1');
            const statsGridRow2 = document.getElementById('statsGridRow2');

            // Row 1: 6 Large Cards
            const firstStats = [
                { title: 'Total Business', value: kpis.total_business, change: '+12.5% vs last quarter', icon: 'bi-file-earmark-text', color: 'blue' },
                { title: 'Active MRR', value: kpis.active_mrr, change: '+8.2% vs last quarter', icon: 'bi-telephone', color: 'green' },
                { title: 'New Business', value: kpis.new_business, change: '+15.3% vs last quarter', icon: 'bi-pie-chart', color: 'green' },
                { title: 'Funnel Size', value: kpis.funnel_size, change: '+18.7% vs last quarter', icon: 'bi-currency-rupee', color: 'yellow' },
                { title: 'Total Leads', value: kpis.total_leads, change: '+18.7% vs last quarter', icon: 'bi-currency-rupee', color: 'yellow' },
                { title: 'Converted Leads', value: kpis.converted_leads, change: '+18.7% vs last quarter', icon: 'bi-currency-rupee', color: 'yellow' }
            ];
console.log(firstStats);
           statsGridRow0.innerHTML = firstStats.map(stat => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
        <div class="stat-card stat-card-large">
            <div class="stat-info">
                <h6>${stat.title}</h6>
                <h3 class="large">${stat.value}</h3>
                <small>${stat.change}</small>
            </div>
            <div class="stat-icon large ${stat.color}">
                <i class="${stat.icon}"></i>
            </div>
        </div>
    </div>
`).join('');

            // // Row 1: 4 Large Cards
            // const largeStats = [
            //     { title: 'Total Allocated (Q4)', value: kpis.totalAllocated, change: '+12.5% vs last quarter', icon: 'bi-file-earmark-text', color: 'blue' },
            //     { title: 'Contacted & Hot', value: kpis.contactedHot, change: '+8.2% vs last quarter', icon: 'bi-telephone', color: 'green' },
            //     { title: 'Deals In Pipe', value: kpis.dealsInPipe, change: '+15.3% vs last quarter', icon: 'bi-pie-chart', color: 'green' },
            //     { title: 'Expected Value', value: kpis.expectedValue, change: '+18.7% vs last quarter', icon: 'bi-currency-rupee', color: 'yellow' }
            // ];

            // statsGridRow1.innerHTML = largeStats.map(stat => `
            //     <div class="stat-card stat-card-large">
            //         <div class="stat-info">
            //             <h6>${stat.title}</h6>
            //             <h3 class="large">${stat.value}</h3>
            //             <small>${stat.change}</small>
            //         </div>
            //         <div class="stat-icon large ${stat.color}">
            //             <i class="${stat.icon}"></i>
            //         </div>
            //     </div>
            // `).join('');

            // Row 2: 8 Smaller Cards
            const smallStats = [
                { title: 'New Meetings', value: kpis.newMeetings, change: '+6.3% vs last week', icon: 'bi-calendar-check', color: 'blue' },
                { title: 'New Leads', value: kpis.newLeads, change: '-2.4% vs last week', icon: 'bi-person-plus', color: 'blue' },
                { title: 'Qualified Lead', value: kpis.leadQualified, change: '+9.1% vs last week', icon: 'bi-check-circle', color: 'green' },
                { title: 'Follow Up', value: kpis.followUp, change: '+3.2% vs last week', icon: 'bi-clock-history', color: 'yellow' },
                { title: 'Proposals Sent', value: kpis.proposalsSent, change: '+11.5% vs last week', icon: 'bi-file-earmark-arrow-up', color: 'orange' },
                { title: 'Deals Lost', value: kpis.dealsLost, change: '-5.7% vs last week', icon: 'bi-x-circle', color: 'red' },
                { title: 'Deals Won', value: kpis.dealsWon, change: '+14.2% vs last week', icon: 'bi-trophy', color: 'green' }
            ];

            statsGridRow2.innerHTML = smallStats.map(stat => `
                <div class="stat-card">
                    <div class="stat-info">
                        <h6>${stat.title}</h6>
                        <h3>${stat.value}</h3>
                        <small>${stat.change}</small>
                    </div>
                    <div class="stat-icon ${stat.color}">
                        <i class="${stat.icon}"></i>
                    </div>
                </div>
            `).join('');
        }

        function renderCharts(data) {
            // Quarter Target Achievement Chart
            const quarterCtx = document.getElementById('quarterTargetChart').getContext('2d');
            new Chart(quarterCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Achieved', 'Remaining'],
                    datasets: [{
                        data: [86.1, 13.9],
                        backgroundColor: ['#10B981', '#E5E7EB'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '75%',
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            enabled: true,
                            bodyFont: { size: 16 },
                            titleFont: { size: 18 },
                            padding: 12,
                            displayColors: false
                        }
                    }
                }
            });

            // Lead Allocation Chart
            // const leadCtx = document.getElementById('leadAllocationChart').getContext('2d');
            // new Chart(leadCtx, {
            //     type: 'doughnut',
            //     data: {
            //         labels: ['Contacted & Hot', 'In Pipeline', 'Conversion Funnel', 'Remaining'],
            //         datasets: [{
            //             data: [25, 30, 20, 25],
            //             backgroundColor: ['#10B981', '#3B82F6', '#EAB308', '#E5E7EB'],
            //             borderWidth: 0
            //         }]
            //     },
            //     options: {
            //         responsive: true,
            //         maintainAspectRatio: true,
            //         cutout: '60%',
            //         plugins: {
            //             legend: { display: false }
            //         }
            //     }
            // });

            // Sales Target Chart
            const salesCtx = document.getElementById('salesTargetChart').getContext('2d');
            new Chart(salesCtx, {
                type: 'bar',
                data: {
                    labels: ['Q1', 'Q2', 'Q3'],
                    datasets: [
                        {
                            label: 'Target',
                            data: [80, 90, 85, 95],   // dummy target values
                            backgroundColor: '#9CA3AF', // grey
                            borderRadius: 8
                        },
                        {
                            label: 'Achieved',
                            data: [75, 92, 88, 90],   // dummy achieved values
                            backgroundColor: '#3B82F6', // blue
                            borderRadius: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: value => value + '%'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });

            // Lead Source Chart
            const sourceCtx = document.getElementById('leadSourceChart').getContext('2d');
            new Chart(sourceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Partner'],
                    datasets: [{
                        data: [420, 240, 145, 130, 90],
                        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 12,
                                font: {
                                    size: 11
                                }
                            }
                        }
                    }
                }
            });

            // Lead Stages Chart
            const stagesCtx = document.getElementById('leadStagesChart').getContext('2d');
            new Chart(stagesCtx, {
                type: 'bar',
                data: {
                    labels: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed', 'Lost'],
                    datasets: [{
                        data: [89, 342, 234, 156, 78, 523, 45],
                        backgroundColor: '#3B82F6',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }


        function renderPipeline(pipeline) {
            const container = document.getElementById('pipelineContainer');
            container.innerHTML = pipeline.stages.map(stage => `
                <div class="pipeline-stage">
                    <div class="stage-header">
                        <span class="stage-title">${stage.name}</span>
                        <span class="stage-count">${stage.count}</span>
                    </div>
                    <div class="stage-value">${stage.value}</div>
                    ${stage.deals.map(deal => `
                        <div class="pipeline-card">
                            <h6>${deal.name}</h6>
                            <div class="pipeline-card-row">
                                <span>${deal.company}</span>
                            </div>
                            <div class="pipeline-card-row">
                                <span>Value:</span>
                                <span class="pipeline-card-value">${deal.value}</span>
                            </div>
                            <div class="pipeline-card-row">
                                <span>Stage:</span>
                                <span class="pipeline-card-value">${deal.stage}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        }

        function renderActivity(activities) {
            const timeline = document.getElementById('activityTimeline');
            const iconMap = {
                call: { icon: 'bi-telephone-fill', bg: '#DBEAFE', color: '#1E40AF' },
                email: { icon: 'bi-envelope-fill', bg: '#FEF3C7', color: '#92400E' },
                meeting: { icon: 'bi-calendar-event-fill', bg: '#D1FAE5', color: '#065F46' },
                deal: { icon: 'bi-trophy-fill', bg: '#FEE2E2', color: '#991B1B' }
            };

            timeline.innerHTML = activities.map(activity => {
                const iconData = iconMap[activity.type] || iconMap.call;
                return `
                    <div class="activity-item">
                        <div class="activity-icon" style="background: ${iconData.bg}; color: ${iconData.color};">
                            <i class="${iconData.icon}"></i>
                        </div>
                        <div class="activity-content">
                            <p><strong>${activity.user}</strong> ${activity.description}</p>
                            <small>${activity.details}</small>
                        </div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                `;
            }).join('');
        }

        function renderTargetsTable(targets) {
            const tbody = document.querySelector('#targetsTable tbody');
            tbody.innerHTML = targets.map((target, index) => `
                <tr data-id="${target.id || index}" onclick="editTarget(${JSON.stringify(target).replace(/"/g, '&quot;')})">
                    <td>${index + 1}</td>
                    <td>${target.rep}</td>
                    <td>${target.quarter}</td>
                    <td>${target.month}</td>
                    <td>${target.targetBusiness}</td>
                    <td>${target.achievedRevenue}</td>
                    <td>${target.targetMRR}</td>
                    <td>${target.achievedMRR}</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="progress-bar-custom">
                                <div class="progress-fill" style="width: ${target.achievement};"></div>
                            </div>
                            <span>${target.achievement}</span>
                        </div>
                    </td>
                    <td><span class="badge ${target.status === 'On Track' ? 'done' : 'contacted'}">${target.status}</span></td>
                </tr>
            `).join('');
        }

        // ============ MODAL FUNCTIONS ============
        let currentTargetData = null;
        let allTargetsData = [];

        function openEditModal(target = null) {
            const modal = document.getElementById('editTargetModal');
            modal.classList.add('show');
            
            if (target) {
                // Editing existing target
                currentTargetData = target;
                document.getElementById('targetId').value = target.id || '';
                document.getElementById('targetRep').value = target.rep || '';
                document.getElementById('targetQuarter').value = target.quarter || '';
                document.getElementById('targetMonth').value = target.month || '';
                document.getElementById('targetBusiness').value = parseAmount(target.targetBusiness);
                document.getElementById('achievedRevenue').value = parseAmount(target.achievedRevenue);
                document.getElementById('targetMRR').value = parseAmount(target.targetMRR);
                document.getElementById('achievedMRR').value = parseAmount(target.achievedMRR);
                document.getElementById('targetStatus').value = target.status || '';
            } else {
                // New target - clear form
                currentTargetData = null;
                document.getElementById('editTargetForm').reset();
            }
        }

        function closeEditModal() {
            const modal = document.getElementById('editTargetModal');
            modal.classList.remove('show');
            currentTargetData = null;
        }

        function parseAmount(amountStr) {
            if (typeof amountStr === 'number') return amountStr;
            if (!amountStr) return 0;
            // Remove ₹, commas, L, K, Lk suffixes and parse
            const cleaned = amountStr.replace(/[₹,\s]/g, '');
            if (cleaned.includes('Lk') || cleaned.includes('L')) {
                return parseFloat(cleaned.replace(/Lk|L/g, '')) * 100000;
            }
            if (cleaned.includes('K')) {
                return parseFloat(cleaned.replace('K', '')) * 1000;
            }
            return parseFloat(cleaned) || 0;
        }

        function editTarget(target) {
            openEditModal(target);
        }

        async function saveTarget() {
            const form = document.getElementById('editTargetForm');
            
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            const formData = {
                id: document.getElementById('targetId').value || null,
                rep: document.getElementById('targetRep').value,
                quarter: document.getElementById('targetQuarter').value,
                month: document.getElementById('targetMonth').value,
                targetBusiness: parseFloat(document.getElementById('targetBusiness').value),
                achievedRevenue: parseFloat(document.getElementById('achievedRevenue').value),
                targetMRR: parseFloat(document.getElementById('targetMRR').value),
                achievedMRR: parseFloat(document.getElementById('achievedMRR').value),
                status: document.getElementById('targetStatus').value
            };

            try {
                const response = await fetch(API_URL + '?action=targets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    closeEditModal();
                    loadDashboard(); // Refresh the data
                    alert('Target saved successfully!');
                } else {
                    alert('Error saving target: ' + (result.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error saving target:', error);
                alert('Error saving target. Please try again.');
            }
        }

        // ============ PERIOD DROPDOWN FUNCTIONS ============
        function togglePeriodDropdown(event) {
            event.stopPropagation();
            const dropdown = document.getElementById('periodDropdown');
            dropdown.classList.toggle('show');
        }

        function selectPeriod(label, value) {
            document.getElementById('selectedPeriod').textContent = label;
            document.getElementById('periodDropdown').classList.remove('show');
            
            // Update active state
            document.querySelectorAll('.period-dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Fetch filtered data
            filterTargetsByPeriod(value);
        }

        async function filterTargetsByPeriod(period) {
            try {
                const response = await fetch(API_URL + '?action=targets&filter=' + period);
                const data = await response.json();
                
                if (data.salesTargets) {
                    renderTargetsTable(data.salesTargets);
                }
            } catch (error) {
                console.error('Error filtering targets:', error);
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('periodDropdown');
            if (!event.target.closest('.period-dropdown')) {
                dropdown.classList.remove('show');
            }
        });

        // Close modal when clicking outside
        document.getElementById('editTargetModal').addEventListener('click', function(event) {
            if (event.target === this) {
                closeEditModal();
            }
        });

        // Load dashboard on page load
        document.addEventListener('DOMContentLoaded', loadDashboard);
    </script>
</body>

</html>