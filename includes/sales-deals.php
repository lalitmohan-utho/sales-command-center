<!-- Deals / Total Funnel Value -->
<div class="section">
    <div class="section-header">
        <h2 class="section-title">Total Funnel Value</h2>
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
                    <th>Deal ID</th>
                    <th>Contact Name</th>
                    <th>Deal Name</th>
                    <th>Deal Amount</th>
                    <th>Assigned to</th>
                    <th>Deal Stage</th>
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
                    <th>Deal ID</th>
                    <th>Contact Name</th>
                    <th>Deal Name</th>
                    <th>Deal Amount</th>
                    <th>Assigned to</th>
                    <th>Deal Stage</th>
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
    </div>
    <div class="activity-timeline" id="activityTimeline">
        <!-- Activities will be populated here -->
    </div>
</div>
