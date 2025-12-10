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
            cursor: pointer;
            transition: all 0.2s;
        }

        .task-table tbody tr:hover {
            background: #EEF2FF;
            transform: scale(1.002);
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
            grid-template-columns: repeat(6, 1fr);
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
            color: #C2410C;
        }

        .stat-icon.red {
            background: #FEE2E2;
            color: #991B1B;
        }

        .stat-icon.purple {
            background: #EDE9FE;
            color: #5B21B6;
        }

        /* Chart Styles */
        .chart-container {
            padding: 16px;
            background: #F9FAFB;
            border-radius: 12px;
        }

        .chart-title {
            font-size: 14px;
            font-weight: 600;
            margin: 0 0 4px 0;
        }

        .chart-subtitle {
            font-size: 12px;
            color: #6B7280;
            margin: 0 0 16px 0;
        }

        .chart-wrapper {
            position: relative;
            width: 180px;
            height: 180px;
            margin: 0 auto;
        }

        .chart-center-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

        .chart-center-text h2 {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            color: var(--success-color);
        }

        .chart-center-text small {
            font-size: 11px;
            color: #6B7280;
        }

        .chart-legend {
            margin-top: 20px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
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
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        .legend-value {
            font-weight: 600;
            font-size: 13px;
        }

        /* Pipeline */
        .pipeline-container {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            padding-bottom: 12px;
        }

        .pipeline-stage {
            min-width: 200px;
            background: #F9FAFB;
            border-radius: 12px;
            padding: 16px;
        }

        .stage-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .stage-title {
            font-size: 14px;
            font-weight: 600;
        }

        .stage-count {
            background: var(--primary-color);
            color: white;
            font-size: 11px;
            padding: 2px 8px;
            border-radius: 12px;
        }

        .stage-value {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .pipeline-card {
            background: white;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 8px;
            border: 1px solid var(--border-color);
        }

        .pipeline-card h6 {
            font-size: 13px;
            font-weight: 600;
            margin: 0 0 8px 0;
        }

        .pipeline-card-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #6B7280;
            margin-bottom: 4px;
        }

        .pipeline-card-value {
            font-weight: 500;
            color: #1F2937;
        }

        /* Activity Timeline */
        .activity-timeline {
            max-height: 400px;
            overflow-y: auto;
        }

        .activity-item {
            display: flex;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid var(--border-color);
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
            font-size: 13px;
            margin: 0 0 4px 0;
        }

        .activity-content small {
            font-size: 12px;
            color: #6B7280;
        }

        .activity-time {
            font-size: 12px;
            color: #9CA3AF;
        }

        /* Status Colors */
        .status-new {
            background: #DBEAFE;
            color: #1E40AF;
        }

        .status-contacted {
            background: #D1FAE5;
            color: #065F46;
        }

        .status-qualified {
            background: #FEF3C7;
            color: #92400E;
        }

        .status-proposal {
            background: #E0E7FF;
            color: #3730A3;
        }

        .status-negotiation {
            background: #FFEDD5;
            color: #C2410C;
        }

        /* Targets Table */
        .targets-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }

        .targets-table thead th {
            background: #F9FAFB;
            font-size: 11px;
            font-weight: 600;
            color: #6B7280;
            text-transform: uppercase;
            padding: 10px 12px;
            text-align: left;
            border-bottom: 2px solid var(--border-color);
            white-space: nowrap;
        }

        .targets-table thead th[colspan] {
            text-align: center;
            border-left: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
        }

        .targets-table thead th[rowspan] {
            vertical-align: middle;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }

        .data-table thead th {
            background: linear-gradient(135deg, #F8FAFC, #F1F5F9);
            font-size: 11px;
            font-weight: 600;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 12px 14px;
            font-size: 12px;
        }

        .data-table tbody td {
            padding: 14px 16px;
            font-size: 13px;
            font-weight: 500;
            color: #374151;
            border-bottom: 1px solid #F3F4F6;
            vertical-align: middle;
        }

        .data-table tbody tr {
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .data-table tbody tr:hover {
            background: #EEF2FF;
            transform: scale(1.002);
        }

        .data-table tbody tr:active {
            background: #E0E7FF;
        }

        /* Responsive table wrapper */
        .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -20px;
            padding: 0 20px;
        }

        .data-table tbody td:first-child {
            font-weight: 600;
            color: #6B7280;
        }

        .data-table tbody td:nth-child(2) {
            font-weight: 600;
            color: #1F2937;
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
            transition: width 0.3s ease;
        }

        /* Status badges */
        .badge.ahead {
            background: #D1FAE5;
            color: #054231ff;
        }

        .badge.on-track {
            background: #D1FAE5;
            color: #065F46;
        }

        .badge.at-risk {
            background: #FEF3C7;
            color: #92400E;
        }

        .badge.behind {
            background: #FEE2E2;
            color: #991B1B;
        }

        .badge.pending {
            background: #FEF3C7;
            color: #92400E;
        }

        .badge.completed {
            background: #D1FAE5;
            color: #065F46;
        }

        .badge.overdue {
            background: #FEE2E2;
            color: #991B1B;
        }

        /* Calculated fields preview */
        .calculated-preview {
            background: #F9FAFB;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 16px;
            margin-top: 20px;
        }

        .calculated-preview h4 {
            font-size: 13px;
            font-weight: 600;
            color: #374151;
            margin: 0 0 12px 0;
        }

        .calc-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }

        .calc-item {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            padding: 6px 0;
            border-bottom: 1px dashed #E5E7EB;
        }

        .calc-item:last-child {
            border-bottom: none;
        }

        .calc-label {
            color: #6B7280;
        }

        .calc-value {
            font-weight: 600;
            color: #1F2937;
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
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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

        /* Pagination Styles */
        .pagination-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
            padding: 16px 0;
        }

        .pagination-btn {
            min-width: 36px;
            height: 36px;
            padding: 0 12px;
            border: 1px solid var(--border-color);
            background: white;
            border-radius: 8px;
            font-size: 13px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .pagination-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }

        .pagination-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .pagination-input {
            width: 60px;
            height: 36px;
            text-align: center;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 13px;
        }

        .pagination-input:focus {
            outline: none;
            border-color: var(--primary-color);
        }

        /* Clickable Card */
        .stat-card.clickable {
            cursor: pointer;
            transition: all 0.2s;
        }

        .stat-card.clickable:hover {
            border-color: var(--primary-color);
            box-shadow: 0 4px 12px rgba(0, 102, 255, 0.1);
        }

        .selected-filter {
            display: block;
            font-size: 11px;
            color: var(--primary-color);
            margin-top: 4px;
            font-weight: 500;
        }

        /* Contact Sidebar */
        .contact-sidebar {
            position: fixed;
            right: -450px;
            top: 0;
            width: 450px;
            height: 100vh;
            background: white;
            box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            transition: right 0.3s ease;
            overflow-y: auto;
        }

        .contact-sidebar.show {
            right: 0;
        }

        .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 2999;
            display: none;
        }

        .sidebar-overlay.show {
            display: block;
        }

        .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #F9FAFB;
        }

        .sidebar-header h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }

        .sidebar-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6B7280;
            padding: 0;
            line-height: 1;
        }

        .sidebar-close:hover {
            color: #1F2937;
        }

        .contact-info {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
        }

        .contact-avatar-large {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667EEA, #764BA2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 12px;
        }

        .contact-name {
            font-size: 20px;
            font-weight: 600;
            margin: 0 0 4px 0;
        }

        .contact-email {
            font-size: 13px;
            color: #6B7280;
            margin: 0 0 12px 0;
        }

        .contact-details-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 16px;
        }

        .contact-detail-item {
            display: flex;
            flex-direction: column;
        }

        .contact-detail-label {
            font-size: 11px;
            color: #6B7280;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .contact-detail-value {
            font-size: 13px;
            color: #1F2937;
            font-weight: 500;
        }

        .sidebar-tabs {
            display: flex;
            border-bottom: 1px solid var(--border-color);
            background: #F9FAFB;
        }

        .sidebar-tab {
            flex: 1;
            padding: 12px;
            border: none;
            background: none;
            font-size: 13px;
            font-weight: 500;
            color: #6B7280;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
        }

        .sidebar-tab:hover {
            color: var(--primary-color);
        }

        .sidebar-tab.active {
            color: var(--primary-color);
            border-bottom-color: var(--primary-color);
        }

        .sidebar-content {
            padding: 20px;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .timeline-item {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
            position: relative;
        }

        .timeline-item:not(:last-child)::before {
            content: '';
            position: absolute;
            left: 17px;
            top: 40px;
            width: 2px;
            height: calc(100% - 20px);
            background: #E5E7EB;
        }

        .timeline-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #EEF2FF;
            color: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .timeline-content {
            flex: 1;
        }

        .timeline-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 6px;
        }

        .timeline-user {
            font-size: 13px;
            font-weight: 600;
            color: #1F2937;
        }

        .timeline-date {
            font-size: 11px;
            color: #9CA3AF;
        }

        .timeline-note {
            font-size: 13px;
            color: #4B5563;
            margin: 0;
            line-height: 1.5;
        }

        .timeline-due {
            font-size: 11px;
            color: #EF4444;
            font-weight: 500;
            margin-top: 4px;
        }

        .add-followup-form {
            background: #F9FAFB;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .add-followup-form textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 13px;
            resize: vertical;
            min-height: 80px;
            margin-bottom: 10px;
        }

        .add-followup-form button {
            width: 100%;
            padding: 8px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
        }

        .add-followup-form button:hover {
            background: #0052CC;
        }

        .filter-table-container {
            margin-top: 20px;
            display: none;
        }

        .filter-table-container.show {
            display: block;
        }

        .filter-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
        }

        .filter-table thead th {
            background: #F9FAFB;
            font-size: 11px;
            font-weight: 600;
            color: #6B7280;
            text-transform: uppercase;
            padding: 12px;
            text-align: left;
            border-bottom: 2px solid var(--border-color);
        }

        .filter-table tbody td {
            padding: 12px;
            font-size: 13px;
            border-bottom: 1px solid var(--border-color);
        }

        .filter-table tbody tr:hover {
            background: #F9FAFB;
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

            .contact-sidebar {
                width: 100%;
                right: -100%;
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
                    <div class="user-avatar">AS</div>
                </div>
            </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
            <div class="filter-chips">
                <button class="filter-chip active">All Leads</button>
                <button class="filter-chip">Hot Leads</button>
                <button class="filter-chip">Meetings Today</button>
                <button class="filter-chip">Follow-ups Pending</button>
                <button class="filter-chip">Deals in Progress</button>
            </div>
            <div class="filter-actions">
                <button class="btn-filter"><i class="bi bi-funnel"></i> More Filters</button>
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
                <div class="stats-grid-row-1" id="header_card">
                </div>
                <table class="task-table" style="margin-top: 20px;">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Followup Time</th>
                            <th>Reference #</th>
                            <th>Last Message</th>
                            <th>Assigned to</th>
                            <th>Department</th>
                            <th>Reference</th>
                            <th>Entry Time</th>
                            <th>Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tasksTableBody">
                        <!-- Tasks will be populated here -->
                    </tbody>
                </table>
                <div class="pagination-container" id="tasksPagination">
                    <!-- Pagination will be populated here -->
                </div>
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


            <!-- Stats Grid - Row 2: 6 Smaller Cards -->
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
                <h2 class="section-title">Total Funnel Value</h2>
                <a href="#" style="color: var(--primary-color); text-decoration: none; font-size: 14px;">View Full
                    Pipeline →</a>
            </div>
            <div class="stats-grid-row-1" id="totalFunnelValue">
                <!-- Pipeline stages will be populated here -->
            </div>
            <!-- Filter Tables -->
            <div class="filter-table-container" id="dealsLostTable">
                <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Deals Lost Details</h4>
                <table class="filter-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Value</th>
                            <th>Loss Reason</th>
                            <th>Lost Date</th>
                            <th>Rep</th>
                        </tr>
                    </thead>
                    <tbody id="dealsLostTableBody">
                        <!-- Will be populated dynamically -->
                    </tbody>
                </table>
            </div>
            <div class="filter-table-container" id="dealsWonTable">
                <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Deals Won Details</h4>
                <table class="filter-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Value</th>
                            <th>Contract Type</th>
                            <th>Closed Date</th>
                            <th>Rep</th>
                        </tr>
                    </thead>
                    <tbody id="dealsWonTableBody">
                        <!-- Will be populated dynamically -->
                    </tbody>
                </table>
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
                            <button class="period-dropdown-item"
                                onclick="selectPeriod('Yearly', 'yearly')">Yearly</button>
                            <button class="period-dropdown-item"
                                onclick="selectPeriod('Monthly', 'monthly')">Monthly</button>
                            <button class="period-dropdown-item active"
                                onclick="selectPeriod('Quarterly', 'quarterly')">Quarterly</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q1', 'Q1')">Q1</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q2', 'Q2')">Q2</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q3', 'Q3')">Q3</button>
                            <button class="period-dropdown-item" onclick="selectPeriod('Q4', 'Q4')">Q4</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="data-table targets-table" id="targetsTable">
                    <thead>
                        <tr>
                            <th rowspan="3">#</th>
                            <th rowspan="3">REP</th>
                            <th rowspan="3">QUARTER</th>
                            <th rowspan="3">TOTAL TARGET<br><small style="font-weight: 400; color: #6B7280;">(MRR +
                                    WHOLE)</small></th>
                            <th rowspan="3">TARGET<br>MRR</th>
                            <th colspan="6" style="text-align: center; background: #F3F4F6;">MONTH WISE</th>
                            <th rowspan="3">ACHIEVED<br>REVENUE</th>
                            <th rowspan="3">ACHIEVED<br>MRR</th>
                            <th rowspan="3">ACHIEVEMENT</th>
                            <th rowspan="3">STATUS</th>
                        </tr>
                        <tr>
                            <th colspan="3" style="text-align: center; background: #F9FAFB;">WHOLE</th>
                            <th colspan="3" style="text-align: center; background: #F9FAFB;">MRR</th>
                        </tr>
                        <tr>
                            <th style="text-align: center;">Month 1</th>
                            <th style="text-align: center;">Month 2</th>
                            <th style="text-align: center;">Month 3</th>
                            <th style="text-align: center;">Month 1</th>
                            <th style="text-align: center;">Month 2</th>
                            <th style="text-align: center;">Month 3</th>
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
                        <input type="text" class="form-control" id="targetRep" name="rep"
                            placeholder="e.g., TRM, PRS, AKM" required>
                    </div>

                    <div class="form-group">
                        <label>Quarter <span>*</span></label>
                        <select class="form-control" id="targetQuarter" name="quarter" required
                            onchange="updateCalculatedFields()">
                            <option value="">Select Quarter</option>
                            <option value="Q1">Q1 (Jan-Mar)</option>
                            <option value="Q2">Q2 (Apr-Jun)</option>
                            <option value="Q3">Q3 (Jul-Sep)</option>
                            <option value="Q4">Q4 (Oct-Dec)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Whole Total Target (MRR + WHOLE) ₹ <span>*</span></label>
                        <input type="number" class="form-control" id="wholeTotalTarget" name="wholeTotalTarget"
                            placeholder="e.g., 1000000" required oninput="updateCalculatedFields()">
                        <small style="color: #6B7280; font-size: 11px; margin-top: 4px; display: block;">Enter the
                            combined target for MRR and WHOLE business</small>
                    </div>

                    <!-- Auto-calculated fields preview -->
                    <div class="calculated-preview" id="calculatedPreview" style="display: none;">
                        <h4><i class="bi bi-calculator"></i> Auto-Calculated Breakdown</h4>
                        <div class="calc-grid">
                            <div>
                                <strong style="font-size: 12px; color: #374151;">MRR (33% of Total)</strong>
                                <div class="calc-item">
                                    <span class="calc-label">Month 1 (30%)</span>
                                    <span class="calc-value" id="mrrMonth1">₹0</span>
                                </div>
                                <div class="calc-item">
                                    <span class="calc-label">Month 2 (40%)</span>
                                    <span class="calc-value" id="mrrMonth2">₹0</span>
                                </div>
                                <div class="calc-item">
                                    <span class="calc-label">Month 3 (30%)</span>
                                    <span class="calc-value" id="mrrMonth3">₹0</span>
                                </div>
                                <div class="calc-item"
                                    style="border-top: 1px solid #E5E7EB; margin-top: 8px; padding-top: 8px;">
                                    <span class="calc-label"><strong>Total MRR</strong></span>
                                    <span class="calc-value" id="totalMRR"
                                        style="color: var(--primary-color);">₹0</span>
                                </div>
                            </div>
                            <div>
                                <strong style="font-size: 12px; color: #374151;">WHOLE (67% of Total)</strong>
                                <div class="calc-item">
                                    <span class="calc-label">Month 1 (30%)</span>
                                    <span class="calc-value" id="wholeMonth1">₹0</span>
                                </div>
                                <div class="calc-item">
                                    <span class="calc-label">Month 2 (40%)</span>
                                    <span class="calc-value" id="wholeMonth2">₹0</span>
                                </div>
                                <div class="calc-item">
                                    <span class="calc-label">Month 3 (30%)</span>
                                    <span class="calc-value" id="wholeMonth3">₹0</span>
                                </div>
                                <div class="calc-item"
                                    style="border-top: 1px solid #E5E7EB; margin-top: 8px; padding-top: 8px;">
                                    <span class="calc-label"><strong>Total WHOLE</strong></span>
                                    <span class="calc-value" id="totalWHOLE"
                                        style="color: var(--success-color);">₹0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel" onclick="closeEditModal()">Cancel</button>
                <button class="btn-save" onclick="saveTarget()">Save Target</button>
            </div>
        </div>
    </div>

    <!-- Deals Lost Modal -->
    <div class="modal-overlay" id="dealsLostModal">
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h3>Filter Deals Lost</h3>
                <button class="modal-close" onclick="closeDealsLostModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Select Lost Reason</label>
                    <select class="form-control" id="dealsLostReason" onchange="applyDealsLostFilter()">
                        <option value="">All Reasons</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel" onclick="closeDealsLostModal()">Cancel</button>
                <button class="btn-save" onclick="applyDealsLostFilter()">Apply</button>
            </div>
        </div>
    </div>

    <!-- Deals Won Modal -->
    <div class="modal-overlay" id="dealsWonModal">
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h3>Filter Deals Won</h3>
                <button class="modal-close" onclick="closeDealsWonModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Select Deal Type</label>
                    <select class="form-control" id="dealsWonType" onchange="applyDealsWonFilter()">
                        <option value="">All Types</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel" onclick="closeDealsWonModal()">Cancel</button>
                <button class="btn-save" onclick="applyDealsWonFilter()">Apply</button>
            </div>
        </div>
    </div>

    <!-- Contact Sidebar -->
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeContactSidebar()"></div>
    <div class="contact-sidebar" id="contactSidebar">
        <div class="sidebar-header">
            <h3>Contact Details</h3>
            <button class="sidebar-close" onclick="closeContactSidebar()">&times;</button>
        </div>
        <div class="contact-info" id="contactInfoContent">
            <!-- Contact info will be populated here -->
        </div>
        <div class="sidebar-tabs">
            <button class="sidebar-tab active" onclick="switchTab('timeline')">Timeline</button>
            <button class="sidebar-tab" onclick="switchTab('notes')">Notes</button>
            <button class="sidebar-tab" onclick="switchTab('calls')">Calls</button>
            <button class="sidebar-tab" onclick="switchTab('logs')">Logs</button>
        </div>
        <div class="sidebar-content">
            <div class="tab-content active" id="timeline-tab">
                <div class="add-followup-form">
                    <textarea placeholder="Add a follow-up note..."></textarea>
                    <button>Add Follow-up</button>
                </div>
                <div id="timelineContent">
                    <!-- Timeline items will be populated here -->
                </div>
            </div>
            <div class="tab-content" id="notes-tab">
                <p style="color: #6B7280; font-size: 13px;">No notes available</p>
            </div>
            <div class="tab-content" id="calls-tab">
                <p style="color: #6B7280; font-size: 13px;">No call logs available</p>
            </div>
            <div class="tab-content" id="logs-tab">
                <p style="color: #6B7280; font-size: 13px;">No activity logs available</p>
            </div>
        </div>
    </div>

    <script>
        const API_URL = 'sales-api.php';
        let dashboardData = {};
        let currentPage = 1;
        const itemsPerPage = 10;
        let filteredTasks = [];
        let allTasks = [];
        let dealsLostReasons = [];
        let dealsWonTypes = [];
        let dealsLostData = [];
        let dealsWonData = [];
        let selectedDealsLostReason = '';
        let selectedDealsWonType = '';

        async function loadDashboard() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                dashboardData = data;
                allTasks = data.followUpTasks || [];
                filteredTasks = allTasks;
                dealsLostReasons = data.dealsLostReasons || [];
                dealsWonTypes = data.dealsWonTypes || [];
                dealsLostData = data.dealsLostData || [];
                dealsWonData = data.dealsWonData || [];

                populateDealsLostDropdown();
                populateDealsWonDropdown();
                renderKPICards(data.kpis);
                renderStatsRow2(data.kpis);
                totalFunnelValue(data.total_funnel_value);
                headerCards(data.headerList);
                renderTasks(currentPage);
                renderCharts(data);
                renderActivity(data.recentActivity);
                renderTargetsTable(data.salesTargets);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            }
        }

        function renderKPICards(kpis) {
            const statsGrid = document.getElementById('statsGridRow0');
            const largeStats = [
                { title: 'Total Business', value: kpis.total_business, change: '+12.5% vs last quarter', icon: 'bi-currency-rupee', color: 'blue' },
                { title: 'Active MRR', value: kpis.active_mrr, change: '+8.2% vs last quarter', icon: 'bi-arrow-repeat', color: 'green' },
                { title: 'New Business (This Q)', value: kpis.new_business, change: '+15.3% vs last quarter', icon: 'bi-graph-up-arrow', color: 'purple' },
                { title: 'Total Funnel Size', value: kpis.funnel_size, change: '+18.7% vs last quarter', icon: 'bi-funnel', color: 'orange' }
            ];

            statsGrid.innerHTML = largeStats.map(stat => `
                <div class="col-md-3">
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
        }

        function renderStatsRow2(kpis) {
            const statsRow2 = document.getElementById('statsGridRow2');
            const smallStats = [
                { title: 'New Meetings', value: kpis.newMeetings, icon: 'bi-calendar-check', color: 'blue' },
                { title: 'Lead Qualified', value: kpis.leadQualified, icon: 'bi-check-circle', color: 'green' },
                { title: 'New Leads', value: kpis.newLeads, icon: 'bi-person-plus', color: 'purple' },
                { title: 'Cold Calling', value: kpis.coldCalling, icon: 'bi-telephone-outbound', color: 'orange' },
                { title: 'Follow Up', value: kpis.followUp, icon: 'bi-arrow-clockwise', color: 'yellow' },
                { title: 'Proposals Sent', value: kpis.proposalsSent, icon: 'bi-file-earmark-text', color: 'red' }
            ];

            statsRow2.innerHTML = smallStats.map(stat => `
                <div class="stat-card">
                    <div class="stat-info">
                        <h6>${stat.title}</h6>
                        <h3>${stat.value}</h3>
                    </div>
                    <div class="stat-icon ${stat.color}">
                        <i class="${stat.icon}"></i>
                    </div>
                </div>
            `).join('');
        }

        function filterTasksByCategory(category) {
            filteredTasks = allTasks.filter(task => task.category === category);
            currentPage = 1;
            renderTasks(currentPage);
        }

        function renderTasks(page) {
            const tbody = document.getElementById('tasksTableBody');
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageTasks = filteredTasks.slice(start, end);

            tbody.innerHTML = pageTasks.map((task, index) => `
                <tr onclick="openContactSidebar('${task.id}')">
                    <td>${start + index + 1}</td>
                    <td><span class="badge ${task.type === 'Call' ? 'status-new' : task.type === 'Email' ? 'status-qualified' : 'status-contacted'}">${task.type}</span></td>
                    <td><span class="badge ${task.status === 'Completed' ? 'completed' : task.status === 'Overdue' ? 'overdue' : 'pending'}">${task.status}</span></td>
                    <td>${task.followup_time}</td>
                    <td>${task.reference}</td>
                    <td>${task.last_message}</td>
                    <td>${task.assigned_to}</td>
                    <td>${task.department}</td>
                    <td>${task.refrence}</td>
                    <td>${task.entrytime}</td>
                    <td>${task.completed}</td>
                    <td><button class="btn-sm" onclick="event.stopPropagation(); viewDetails('${task.id}')">View</button></td>
                </tr>
            `).join('');

            renderPagination();
        }

        function renderPagination() {
            const pagination = document.getElementById('tasksPagination');
            const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

            let paginationHTML = `
                <button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                    <i class="bi bi-chevron-left"></i>
                </button>
            `;

            // Show page 1
            paginationHTML += `<button class="pagination-btn ${currentPage === 1 ? 'active' : ''}" onclick="changePage(1)">1</button>`;

            // Show page 2 if exists
            if (totalPages >= 2) {
                paginationHTML += `<button class="pagination-btn ${currentPage === 2 ? 'active' : ''}" onclick="changePage(2)">2</button>`;
            }

            // Show page 3 if exists
            if (totalPages >= 3 && currentPage <= 3) {
                paginationHTML += `<button class="pagination-btn ${currentPage === 3 ? 'active' : ''}" onclick="changePage(3)">3</button>`;
            }

            // Show input if more than 3 pages
            if (totalPages > 3) {
                paginationHTML += `<input type="number" class="pagination-input" value="${currentPage}" min="1" max="${totalPages}" onchange="changePage(parseInt(this.value))">`;
            }

            // Show last pages
            if (totalPages > 3 && currentPage < totalPages - 2) {
                paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages - 1})">${totalPages - 1}</button>`;
                paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
            } else if (totalPages > 3) {
                for (let i = Math.max(4, currentPage); i <= totalPages; i++) {
                    paginationHTML += `<button class="pagination-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
                }
            }

            paginationHTML += `
                <button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                    <i class="bi bi-chevron-right"></i>
                </button>
            `;

            pagination.innerHTML = paginationHTML;
        }

        function changePage(page) {
            const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderTasks(currentPage);
            }
        }

        function viewDetails(id) {
            console.log('View details for task:', id);
        }

        function renderCharts(data) {
            // Quarter Target Chart
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
                    cutout: '75%',
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }
            });

            // Lead Source Chart
            const leadSourceCtx = document.getElementById('leadSourceChart').getContext('2d');
            new Chart(leadSourceCtx, {
                type: 'bar',
                data: {
                    labels: ['Website', 'Referral', 'Cold Call', 'Partner', 'Event'],
                    datasets: [{
                        data: [245, 189, 156, 98, 67],
                        backgroundColor: '#0066FF',
                        borderRadius: 6
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
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

            // Lead Stages Chart
            const leadStagesCtx = document.getElementById('leadStagesChart').getContext('2d');
            new Chart(leadStagesCtx, {
                type: 'bar',
                data: {
                    labels: ['New', 'Contacted', 'Qualified', 'Proposal', 'Won'],
                    datasets: [{
                        data: [89, 156, 234, 178, 123],
                        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'],
                        borderRadius: 6
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
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

            // Sales Target Chart
            const salesTargetCtx = document.getElementById('salesTargetChart').getContext('2d');
            new Chart(salesTargetCtx, {
                type: 'bar',
                data: {
                    labels: ['TRM', 'PRS', 'AKM', 'NKS', 'RMS'],
                    datasets: [
                        {
                            label: 'Target',
                            data: [7.16, 6.5, 8.2, 5.9, 7.8],
                            backgroundColor: '#E5E7EB',
                            borderRadius: 6
                        },
                        {
                            label: 'Achieved',
                            data: [6.23, 5.8, 7.5, 4.2, 6.9],
                            backgroundColor: '#10B981',
                            borderRadius: 6
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
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

        function totalFunnelValue(kpie) {
            const totalFunnelValue = document.getElementById('totalFunnelValue');
            const largeStats = [
                { title: 'Deals Lost', value: kpie.deals_lost, change: '+12.5% vs last quarter', icon: 'bi-x-circle', color: 'red', clickable: true, modal: 'dealsLost' },
                { title: 'Deals Won', value: kpie.deals_won, change: '+8.2% vs last quarter', icon: 'bi-trophy', color: 'green', clickable: true, modal: 'dealsWon' },
                { title: 'Total No. of Aspects Added In Deals', value: kpie.aspects_added, change: '+15.3% vs last quarter', icon: 'bi-plus-circle', color: 'blue', clickable: false },
                { title: 'Total funnel Value', value: kpie.funnel_value, change: '+18.7% vs last quarter', icon: 'bi-currency-rupee', color: 'yellow', clickable: false }
            ];

            totalFunnelValue.innerHTML = largeStats.map(stat => `
                <div class="stat-card stat-card-large ${stat.clickable ? 'clickable' : ''}" 
                     ${stat.clickable ? `onclick="open${stat.modal === 'dealsLost' ? 'DealsLost' : 'DealsWon'}Modal()"` : ''}>
                    <div class="stat-info">
                        <h6>${stat.title}</h6>
                        <h3 class="large">${stat.value}</h3>
                        <small>${stat.change}</small>
                        ${stat.modal === 'dealsLost' && selectedDealsLostReason ? `<span class="selected-filter">Filter: ${selectedDealsLostReason}</span>` : ''}
                        ${stat.modal === 'dealsWon' && selectedDealsWonType ? `<span class="selected-filter">Type: ${selectedDealsWonType}</span>` : ''}
                    </div>
                    <div class="stat-icon large ${stat.color}">
                        <i class="${stat.icon}"></i>
                    </div>
                </div>
            `).join('');
        }

        function headerCards(kpie) {
            const headerCards = document.getElementById('header_card');
            const largeStats = [
                { title: 'Overdue Followups', value: kpie.overdue_followups, icon: 'bi-exclamation-triangle', color: 'red', category: 'overdue' },
                { title: 'Today Due Followups', value: kpie.today_due_followups, icon: 'bi-calendar-check', color: 'blue', category: 'today' },
                { title: 'This Week Due Followup', value: kpie.this_week_due_followups, icon: 'bi-calendar-week', color: 'green', category: 'week' },
                { title: 'Next 30 Days Due', value: kpie.next_30_days_due, icon: 'bi-calendar-range', color: 'yellow', category: 'next30' }
            ];

            headerCards.innerHTML = largeStats.map(stat => `
                <div class="stat-card stat-card-large" style="flex-direction:column; align-items:flex-start;">
                    <!-- Top section (title & icon row) -->
                    <div style="width:100%; display:flex; justify-content:space-between; align-items:center;">
                        <div class="stat-info">
                            <h6>${stat.title}</h6>
                            <h3 class="large">${stat.value}</h3>
                        </div>
                        <div class="stat-icon large ${stat.color}">
                            <i class="bi ${stat.icon}"></i>
                        </div>
                    </div>
                    <!-- HR inside card -->
                    <hr style="width:100%; margin:10px 0;">
                    <!-- View List inside card -->
                    <a href="javascript:void(0)" onclick="filterTasksByCategory('${stat.category}')"
                       class="text-primary"
                       style="font-size:13px; text-decoration:underline; cursor:pointer;">
                       <i class="bi bi-list-ul"></i> View List
                    </a>
                </div>
            `).join('');
        }

        // Deals Lost Modal Functions
        function populateDealsLostDropdown() {
            const select = document.getElementById('dealsLostReason');
            select.innerHTML = '<option value="">All Reasons</option>';
            dealsLostReasons.forEach(reason => {
                select.innerHTML += `<option value="${reason}">${reason}</option>`;
            });
        }

        function openDealsLostModal() {
            document.getElementById('dealsLostModal').classList.add('show');
            document.getElementById('dealsLostReason').value = selectedDealsLostReason;
        }

        function closeDealsLostModal() {
            document.getElementById('dealsLostModal').classList.remove('show');
        }

        function applyDealsLostFilter() {
            selectedDealsLostReason = document.getElementById('dealsLostReason').value;
            closeDealsLostModal();
            
            // Filter and display table
            const filtered = selectedDealsLostReason 
                ? dealsLostData.filter(d => d.lossReason === selectedDealsLostReason)
                : dealsLostData;
            
            const tbody = document.getElementById('dealsLostTableBody');
            tbody.innerHTML = filtered.map((deal, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${deal.name}</td>
                    <td>${deal.company}</td>
                    <td>${deal.value}</td>
                    <td><span class="badge at-risk">${deal.lossReason}</span></td>
                    <td>${deal.lostDate}</td>
                    <td>${deal.rep}</td>
                </tr>
            `).join('');
            
            document.getElementById('dealsLostTable').classList.add('show');
            document.getElementById('dealsWonTable').classList.remove('show');
            
            // Re-render to show selected filter
            loadDashboard();
        }

        // Deals Won Modal Functions
        function populateDealsWonDropdown() {
            const select = document.getElementById('dealsWonType');
            select.innerHTML = '<option value="">All Types</option>';
            dealsWonTypes.forEach(type => {
                select.innerHTML += `<option value="${type}">${type}</option>`;
            });
        }

        function openDealsWonModal() {
            document.getElementById('dealsWonModal').classList.add('show');
            document.getElementById('dealsWonType').value = selectedDealsWonType;
        }

        function closeDealsWonModal() {
            document.getElementById('dealsWonModal').classList.remove('show');
        }

        function applyDealsWonFilter() {
            selectedDealsWonType = document.getElementById('dealsWonType').value;
            closeDealsWonModal();
            
            // Filter and display table
            const filtered = selectedDealsWonType 
                ? dealsWonData.filter(d => d.contractType === selectedDealsWonType)
                : dealsWonData;
            
            const tbody = document.getElementById('dealsWonTableBody');
            tbody.innerHTML = filtered.map((deal, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${deal.name}</td>
                    <td>${deal.company}</td>
                    <td>${deal.value}</td>
                    <td><span class="badge on-track">${deal.contractType}</span></td>
                    <td>${deal.closedDate}</td>
                    <td>${deal.rep}</td>
                </tr>
            `).join('');
            
            document.getElementById('dealsWonTable').classList.add('show');
            document.getElementById('dealsLostTable').classList.remove('show');
            
            // Re-render to show selected filter
            loadDashboard();
        }

        // Contact Sidebar Functions
        function openContactSidebar(taskId) {
            const task = allTasks.find(t => t.id === taskId);
            if (!task || !task.contact) return;

            const contact = task.contact;
            const activities = task.activities || [];

            // Populate contact info
            const initials = (contact.firstname.charAt(0) + contact.lastname.charAt(0)).toUpperCase();
            document.getElementById('contactInfoContent').innerHTML = `
                <div class="contact-avatar-large">${initials}</div>
                <h4 class="contact-name">${contact.firstname} ${contact.lastname}</h4>
                <p class="contact-email">${contact.email}</p>
                <div class="contact-details-grid">
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">Mobile</span>
                        <span class="contact-detail-value">${contact.mobile}</span>
                    </div>
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">Job Title</span>
                        <span class="contact-detail-value">${contact.job_title}</span>
                    </div>
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">City</span>
                        <span class="contact-detail-value">${contact.city}</span>
                    </div>
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">State</span>
                        <span class="contact-detail-value">${contact.state}</span>
                    </div>
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">Country</span>
                        <span class="contact-detail-value">${contact.country}</span>
                    </div>
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">Owner</span>
                        <span class="contact-detail-value">${contact.owner}</span>
                    </div>
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">Status</span>
                        <span class="contact-detail-value">${contact.status}</span>
                    </div>
                    <div class="contact-detail-item">
                        <span class="contact-detail-label">Source</span>
                        <span class="contact-detail-value">${contact.source}</span>
                    </div>
                </div>
            `;

            // Populate timeline
            document.getElementById('timelineContent').innerHTML = activities.map(activity => `
                <div class="timeline-item">
                    <div class="timeline-icon">
                        <i class="bi ${activity.completed ? 'bi-check-circle-fill' : 'bi-clock'}"></i>
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <span class="timeline-user">${activity.user}</span>
                            <span class="timeline-date">${activity.datetime}</span>
                        </div>
                        <p class="timeline-note">${activity.note}</p>
                        ${!activity.completed ? `<div class="timeline-due">Due: ${activity.due}</div>` : ''}
                    </div>
                </div>
            `).join('');

            document.getElementById('sidebarOverlay').classList.add('show');
            document.getElementById('contactSidebar').classList.add('show');
        }

        function closeContactSidebar() {
            document.getElementById('sidebarOverlay').classList.remove('show');
            document.getElementById('contactSidebar').classList.remove('show');
        }

        function switchTab(tabName) {
            // Remove active class from all tabs
            document.querySelectorAll('.sidebar-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to selected tab
            event.target.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        }

        function getStatusClass(status) {
            switch (status) {
                case 'Ahead': return 'ahead';
                case 'On Track': return 'on-track';
                case 'Behind': return 'behind';
                case 'At Risk': return 'at-risk';
                default: return 'at-risk';
            }
        }

        function renderTargetsTable(targets) {
            const tbody = document.querySelector('#targetsTable tbody');
            tbody.innerHTML = targets.map((target, index) => `
                <tr data-id="${target.id || index}" onclick="editTarget(${JSON.stringify(target).replace(/"/g, '&quot;')})">
                    <td>${index + 1}</td>
                    <td style="color: #0066FF; font-weight: 600;">${target.rep}</td>
                    <td>${target.quarter}</td>
                    <td>${target.wholeTotalTarget || target.targetBusiness}</td>
                    <td>${target.targetMRR}</td>
                    <td style="text-align: center;">${target.wholeMonth1 || '-'}</td>
                    <td style="text-align: center;">${target.wholeMonth2 || '-'}</td>
                    <td style="text-align: center;">${target.wholeMonth3 || '-'}</td>
                    <td style="text-align: center;">${target.mrrMonth1 || '-'}</td>
                    <td style="text-align: center;">${target.mrrMonth2 || '-'}</td>
                    <td style="text-align: center;">${target.mrrMonth3 || '-'}</td>
                    <td>${target.achievedRevenue || target.achievedWhole}</td>
                   
                    <td>${target.achievedMRR}</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="progress-bar-custom">
                                <div class="progress-fill" style="width: ${target.achievement}; background: ${getProgressColor(target.status)};"></div>
                            </div>
                            <span style="font-weight: 600;">${target.achievement}</span>
                        </div>
                    </td>
                    <td><span class="badge ${getStatusClass(target.status)}">${target.status}</span></td>
                </tr>
            `).join('');
        }

        function getProgressColor(status) {
            switch (status) {
                case 'On Track': return '#10B981';
                case 'Behind': return '#EF4444';
                case 'At Risk': return '#F59E0B';
                default: return '#10B981';
            }
        }

        // ============ MODAL FUNCTIONS ============
        let currentTargetData = null;
        let allTargetsData = [];

        function formatCurrency(amount) {
            if (amount >= 100000) {
                return '₹' + (amount / 100000).toFixed(2) + 'L';
            } else if (amount >= 1000) {
                return '₹' + (amount / 1000).toFixed(2) + 'K';
            }
            return '₹' + amount.toFixed(0);
        }

        function updateCalculatedFields() {
            const wholeTotalTarget = parseFloat(document.getElementById('wholeTotalTarget').value) || 0;
            const preview = document.getElementById('calculatedPreview');

            if (wholeTotalTarget > 0) {
                preview.style.display = 'block';

                // MRR = 33% of total
                const mrrTotal = wholeTotalTarget * 0.33;
                const mrrMonth1 = mrrTotal * 0.30;
                const mrrMonth2 = mrrTotal * 0.40;
                const mrrMonth3 = mrrTotal * 0.30;

                // WHOLE = 67% of total
                const wholeTotal = wholeTotalTarget * 0.67;
                const wholeMonth1 = wholeTotal * 0.30;
                const wholeMonth2 = wholeTotal * 0.40;
                const wholeMonth3 = wholeTotal * 0.30;

                document.getElementById('mrrMonth1').textContent = formatCurrency(mrrMonth1);
                document.getElementById('mrrMonth2').textContent = formatCurrency(mrrMonth2);
                document.getElementById('mrrMonth3').textContent = formatCurrency(mrrMonth3);
                document.getElementById('totalMRR').textContent = formatCurrency(mrrTotal);

                document.getElementById('wholeMonth1').textContent = formatCurrency(wholeMonth1);
                document.getElementById('wholeMonth2').textContent = formatCurrency(wholeMonth2);
                document.getElementById('wholeMonth3').textContent = formatCurrency(wholeMonth3);
                document.getElementById('totalWHOLE').textContent = formatCurrency(wholeTotal);
            } else {
                preview.style.display = 'none';
            }
        }

        function calculateStatus(achievementPercent) {
            if (achievementPercent > 80) {
                return 'Ahead';
            } else if (achievementPercent >= 70 && achievementPercent <= 80) {
                return 'On Track';
            } else if (achievementPercent >= 40 && achievementPercent < 70) {
                return 'Behind';
            } else if (achievementPercent < 40) {
                return 'At Risk';
            }
        }

        function openEditModal(target = null) {
            const modal = document.getElementById('editTargetModal');
            modal.classList.add('show');

            if (target) {
                currentTargetData = target;
                document.getElementById('targetId').value = target.id || '';
                document.getElementById('targetRep').value = target.rep || '';
                document.getElementById('targetQuarter').value = target.quarter || '';
                const wholeTotalTarget = parseAmount(target.wholeTotalTarget);
                document.getElementById('wholeTotalTarget').value = wholeTotalTarget || '';
                updateCalculatedFields();
            } else {
                currentTargetData = null;
                document.getElementById('editTargetForm').reset();
                document.getElementById('calculatedPreview').style.display = 'none';
            }
        }

        function closeEditModal() {
            const modal = document.getElementById('editTargetModal');
            modal.classList.remove('show');
            currentTargetData = null;
            document.getElementById('calculatedPreview').style.display = 'none';
        }

        function parseAmount(amountStr) {
            if (typeof amountStr === 'number') return amountStr;
            if (!amountStr) return 0;
            const cleaned = amountStr.replace(/[₹,\s]/g, '');
            if (cleaned.includes('Lk') || cleaned.includes('L')) {
                return parseFloat(cleaned.replace(/Lk|L/g, '')) * 100000;
            }
            if (cleaned.includes('K')) {
                return parseFloat(cleaned.replace('K', '')) * 1000;
            }
            return parseFloat(cleaned) || 0;
        }

        function getQuarterMonths(quarter) {
            const monthMap = {
                'Q1': ['January', 'February', 'March'],
                'Q2': ['April', 'May', 'June'],
                'Q3': ['July', 'August', 'September'],
                'Q4': ['October', 'November', 'December']
            };
            return monthMap[quarter] || [];
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

            const wholeTotalTarget = parseFloat(document.getElementById('wholeTotalTarget').value);
            const quarter = document.getElementById('targetQuarter').value;
            const months = getQuarterMonths(quarter);

            const mrrTotal = wholeTotalTarget * 0.33;
            const wholeTotal = wholeTotalTarget * 0.67;
            const monthDistribution = [0.30, 0.40, 0.30];

            const formData = {
                id: document.getElementById('targetId').value || null,
                rep: document.getElementById('targetRep').value,
                quarter: quarter,
                wholeTotalTarget: wholeTotalTarget,
                targetMRR: mrrTotal,
                targetWhole: wholeTotal,
                monthBreakdown: months.map((month, i) => ({
                    month: month,
                    targetMRR: mrrTotal * monthDistribution[i],
                    targetWhole: wholeTotal * monthDistribution[i]
                }))
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
                    loadDashboard();
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

            document.querySelectorAll('.period-dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');

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
        document.addEventListener('click', function (event) {
            const dropdown = document.getElementById('periodDropdown');
            if (!event.target.closest('.period-dropdown')) {
                dropdown.classList.remove('show');
            }
        });

        // Close modals when clicking outside
        document.getElementById('editTargetModal').addEventListener('click', function (event) {
            if (event.target === this) {
                closeEditModal();
            }
        });

        document.getElementById('dealsLostModal').addEventListener('click', function (event) {
            if (event.target === this) {
                closeDealsLostModal();
            }
        });

        document.getElementById('dealsWonModal').addEventListener('click', function (event) {
            if (event.target === this) {
                closeDealsWonModal();
            }
        });

        // Load dashboard on page load
        document.addEventListener('DOMContentLoaded', loadDashboard);
    </script>
</body>

</html>
