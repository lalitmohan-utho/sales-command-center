<!-- Sales Target & Performance Overview -->
<div class="section">
    <div class="section-header">
        <h2 class="section-title">Sales Target & Performance Overview</h2>
    </div>
    <div class="row">
        <div class="col-md-4">
            <!-- Quarter Target Achievement -->
            <div class="chart-container">
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
        <div class="col-md-8">
            <div class="chart-container">
                <div class="section-header">
                    <h2 class="section-title">Lead Source & Stage Distribution</h2>
                </div>
                <p class="chart-subtitle">Lead Source</p>
                <div style="height: 180px; margin-bottom: 20px;">
                    <canvas id="leadSourceChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
