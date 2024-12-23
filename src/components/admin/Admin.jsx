// Admin.js
import React from 'react';
// Add this import for custom hover effects

const Admin = () => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="display-6 mb-4">Welcome to Admin Panel</h2>
          
          <hr className="mb-4"/>
          
          <div className="d-grid gap-3">
            <a 
              href="/existingrooms"
              className="btn btn-primary btn-lg text-white shadow admin-btn"
            >
              Manage Rooms
            </a>
            
            <a 
              href="/existingbookings"
              className="btn btn-success btn-lg text-white shadow admin-btn"
            >
              Manage Bookings
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;

