<!-- Manage Sales Targets -->
<div class="section">
    <div class="section-header">
        <h2 class="section-title">Manage Sales Targets</h2>
        <div class="section-actions">
            <button class="btn-sm" onclick="openEditModal()">
                <i class="bi bi-pencil"></i> Add Target
            </button>
        </div>
    </div>
    <div class="table-responsive">
        <table class="data-table targets-table" id="targetsTable">
            <thead>
                <tr>
                    <th rowspan="3">#</th>
                    <th rowspan="3">REP</th>
                    <th rowspan="3">YEAR</th>
                    <th rowspan="3">QUARTER</th>
                    <th rowspan="3">TOTAL TARGET<br><small style="font-weight: 400; color: #6B7280;">(MRR + WHOLE)</small></th>
                    <th rowspan="3">TARGET<br>MRR</th>
                    <th colspan="6" style="text-align: center; background: #F3F4F6;">MONTH WISE</th>
                    <th rowspan="3">ACHIEVED<br>REVENUE</th>
                    <th rowspan="3">ACHIEVED<br>MRR</th>
                    <th rowspan="3">ACHIEVEMENT</th>
                    <th rowspan="3">STATUS</th>
                    <th rowspan="3">ACTION</th>
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
