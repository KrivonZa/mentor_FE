


function Report(){
  return (  <div className="container mt-4">
    <div className="card p-4 shadow-sm">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">Report Management</h4>
        <button className="btn btn-primary">+ New Report</button>
      </div>

      {/* Summary Cards */}
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="p-3 bg-warning bg-opacity-25 rounded text-center">
            <span className="fw-bold text-warning">😕 Pending Reports</span>
            <h3 className="fw-bold">24</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-success bg-opacity-25 rounded text-center">
            <span className="fw-bold text-success">✅ Approved Reports</span>
            <h3 className="fw-bold">156</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-danger bg-opacity-25 rounded text-center">
            <span className="fw-bold text-danger">❌ Rejected Reports</span>
            <h3 className="fw-bold">45</h3>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="input-group mt-4">
        <input type="text" className="form-control" placeholder="Search reports..." />
        <button className="btn btn-outline-secondary">🔍</button>
        <button className="btn btn-outline-secondary">⚙ Filter</button>
      </div>

      {/* Table */}
      <div className="table-responsive mt-3">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Reporter</th>
              <th>Course</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1001</td>
              <td>John Doe</td>
              <td>Web Development</td>
              <td>Inappropriate content</td>
              <td>
                <span className="badge bg-warning text-dark">Pending</span>
              </td>
              <td>2023-06-15</td>
              <td>
                <button className="btn btn-outline-primary btn-sm me-2">✏</button>
                <button className="btn btn-outline-danger btn-sm">🗑</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="mt-3">
        <ul className="pagination justify-content-end">
          <li className="page-item disabled">
            <a className="page-link" href="#">Previous</a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>); 

}

export default Report;