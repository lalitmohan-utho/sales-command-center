<!-- Filter Bar -->
<div class="container-fluid mb-3">
    <div class="row g-3 align-items-end">
        <!-- Date From -->
        <div class="col-md-3">
            <label for="date_from" class="form-label">Date From</label>
            <input type="date" id="date_from" class="form-control">
        </div>

        <!-- Date To -->
        <div class="col-md-3">
            <label for="date_to" class="form-label">Date To</label>
            <input type="date" id="date_to" class="form-control">
        </div>

        <!-- Sales Person Dropdown -->
        <div class="col-md-3">
            <label for="sales_person" class="form-label">Sales Person</label>
            <select id="sales_person" class="form-select">
                <option value="all">All Sales Persons</option>
                <?php foreach ($staffList as $staff) {
                    $fullName = trim($staff['firstname'] . " " . $staff['lastname']);
                ?>
                    <option value="<?= $staff['id']; ?>">
                        <?= htmlspecialchars($fullName); ?>
                    </option>
                <?php } ?>
            </select>
        </div>

        <!-- Get Report Button -->
        <div class="col-md-3">
            <button class="btn btn-primary w-100" id="getReportBtn">
                Get Report
            </button>
        </div>
    </div>
</div>
