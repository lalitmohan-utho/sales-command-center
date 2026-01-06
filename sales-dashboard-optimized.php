<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales & Leads Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
    <link rel="stylesheet" href="css/sales-dashboard.css">
</head>

<?php
include "../api_function.php";

$apiKey = "nKrgfYvTXtRJdLASDHbqspPkGOFmEaxwNCZQUzIeVoWMjyuchiBl";

$sales_person_dropdown = CallAPI('GET', 'staff', [], $apiKey);
$person = json_decode($sales_person_dropdown, true);
$staffList = $person['available_staff'] ?? [];
?>

<body>
    <!-- Sidebar -->
    <?php //include "../sidebar.php"; ?>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Header -->
        <?php include "includes/sales-header.php"; ?>
        <br>

        <!-- Filter Bar -->
        <?php include "includes/sales-filter-bar.php"; ?>

        <!-- Content Area -->
        <div class="content-area">
            <!-- Follow-ups & Tasks -->
            <?php include "includes/sales-followup-tasks.php"; ?>

            <!-- KPI Cards -->
            <?php include "includes/sales-kpi-cards.php"; ?>

            <!-- Charts Section -->
            <?php include "includes/sales-charts.php"; ?>
        </div>

        <!-- Deals & Activity -->
        <?php include "includes/sales-deals.php"; ?>

        <!-- Targets Table -->
        <?php include "includes/sales-targets-table.php"; ?>
    </div>

    <!-- Modals -->
    <?php include "includes/sales-modals.php"; ?>

    <!-- Sidebars -->
    <?php include "includes/sales-sidebars.php"; ?>

    <!-- API Script -->
    <script src="api.js"></script>
    
    <!-- Pass PHP data to JavaScript -->
    <script>
        window.staffList = <?= json_encode($staffList) ?>;
    </script>
    
    <!-- Dashboard JavaScript -->
    <script src="js/sales-dashboard.js"></script>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
