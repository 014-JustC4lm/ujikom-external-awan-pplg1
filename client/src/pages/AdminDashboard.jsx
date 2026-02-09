import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loansAPI, itemsAPI, usersAPI } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('loans');
  const [loans, setLoans] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Item form state
  const [showItemForm, setShowItemForm] = useState(false);
  const [itemForm, setItemForm] = useState({
    name: '',
    category: 'Kamera',
    description: '',
    image: '',
  });
  const [editingItem, setEditingItem] = useState(null);

  // User form state
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'user',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchLoans();
    fetchItems();
    fetchUsers();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await loansAPI.getAll();
      setLoans(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await itemsAPI.getAll();
      setItems(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handlers (kept same logic, simplified for brevity here)
  const handleApproveLoan = async (id) => {
    if (confirm('Approve this loan request?')) {
      await loansAPI.approve(id);
      fetchLoans();
    }
  };

  const handleRejectLoan = async (id) => {
    if (confirm('Reject this loan request?')) {
      await loansAPI.reject(id);
      fetchLoans();
    }
  };

  const handleApproveReturn = async (id) => {
    if (confirm('Approve return?')) {
      await loansAPI.approveReturn(id);
      fetchLoans();
      fetchItems(); // Update item status
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await itemsAPI.update(editingItem.id, { ...itemForm, status: editingItem.status });
    } else {
      await itemsAPI.create(itemForm);
    }
    setShowItemForm(false);
    setEditingItem(null);
    setItemForm({ name: '', category: 'Kamera', description: '', image: '' });
    fetchItems();
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      category: item.category,
      description: item.description,
      image: item.image,
    });
    setShowItemForm(true);
  };

  const handleDeleteItem = async (id) => {
    if (confirm('Delete this item?')) {
      await itemsAPI.delete(id);
      fetchItems();
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowUserForm(true);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await usersAPI.update(editingUser.id, userForm);
    setShowUserForm(false);
    setEditingUser(null);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    if (confirm('Delete this user?')) {
      await usersAPI.delete(id);
      fetchUsers();
    }
  };

  // Helper Components
  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
      approved: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
      rejected: 'bg-rose-500/20 text-rose-200 border-rose-500/30',
      returned: 'bg-slate-500/20 text-slate-200 border-slate-500/30',
      available: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
      'not available': 'bg-rose-500/20 text-rose-200 border-rose-500/30',
    };

    return (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const SidebarItem = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === id
          ? 'bg-white/20 text-white font-medium'
          : 'text-blue-200 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-64 glass border-r-0 p-6 hidden lg:block overflow-y-auto">
          <div className="space-y-1">
            <SidebarItem 
              id="loans" 
              label="Loan Requests" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              } 
            />
            <SidebarItem 
              id="items" 
              label="Equipment" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              } 
            />
            <SidebarItem 
              id="users" 
              label="Users" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              } 
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass p-6 border-l-4 border-l-primary-500">
                <p className="text-sm font-medium text-blue-200 mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-white">{loans.length}</p>
              </div>
              <div className="glass p-6 border-l-4 border-l-emerald-500">
                <p className="text-sm font-medium text-blue-200 mb-1">Active Equipment</p>
                <p className="text-3xl font-bold text-white">{items.length}</p>
              </div>
              <div className="glass p-6 border-l-4 border-l-purple-500">
                <p className="text-sm font-medium text-blue-200 mb-1">Registered Users</p>
                <p className="text-3xl font-bold text-white">{users.length}</p>
              </div>
            </div>

            {/* Mobile Tabs */}
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
              {['loans', 'items', 'users'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                    activeTab === tab ? 'bg-blue-600 text-white' : 'glass text-blue-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Loans Tab */}
            {activeTab === 'loans' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Loan Requests</h2>
                </div>
                
                <div className="glass rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-white/10 text-blue-100 text-xs uppercase font-semibold">
                        <tr>
                          <th className="px-6 py-4">Item</th>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Dates</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {loans.map((loan) => (
                          <tr key={loan.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                              <span className="font-medium text-white">{loan.item_name}</span>
                              <p className="text-xs text-blue-200 mt-0.5">{loan.item_category}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <p className="font-medium text-white">{loan.user_name}</p>
                                <p className="text-blue-200 text-xs">{loan.user_email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-blue-100">
                                <span className="block text-xs text-blue-300">From</span>
                                {new Date(loan.start_date).toLocaleDateString()}
                                <span className="block text-xs text-blue-300 mt-1">To</span>
                                {new Date(loan.end_date).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <StatusBadge status={loan.status} />
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              {loan.status === 'pending' && (
                                <>
                                  <button onClick={() => handleApproveLoan(loan.id)} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium hover:underline">Approve</button>
                                  <button onClick={() => handleRejectLoan(loan.id)} className="text-rose-400 hover:text-rose-300 text-sm font-medium hover:underline">Reject</button>
                                </>
                              )}
                              {loan.status === 'approved' && (
                                <button onClick={() => handleApproveReturn(loan.id)} className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline">Confirm Return</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Items Tab */}
            {activeTab === 'items' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Equipment Inventory</h2>
                  <button
                    onClick={() => {
                      setShowItemForm(true);
                      setEditingItem(null);
                      setItemForm({ name: '', category: 'Kamera', description: '', image: '' });
                    }}
                    className="btn-primary"
                  >
                    + Add equipment
                  </button>
                </div>

                {showItemForm && (
                  <div className="glass p-6 mb-6">
                    <h3 className="font-bold text-lg mb-4">{editingItem ? 'Edit Item' : 'New Item'}</h3>
                    <form onSubmit={handleItemSubmit} className="space-y-4">
                      {/* Form fields here (simplified for brevity) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="input-field" placeholder="Name" value={itemForm.name} onChange={e => setItemForm({...itemForm, name: e.target.value})} required />
                        <select className="input-field" value={itemForm.category} onChange={e => setItemForm({...itemForm, category: e.target.value})}>
                          <option value="Kamera">Kamera</option>
                          <option value="Lensa">Lensa</option>
                          <option value="Alat Lainnya">Alat Lainnya</option>
                        </select>
                      </div>
                      <textarea className="input-field" rows="3" placeholder="Description" value={itemForm.description} onChange={e => setItemForm({...itemForm, description: e.target.value})} />
                      <input className="input-field" placeholder="Image URL" value={itemForm.image} onChange={e => setItemForm({...itemForm, image: e.target.value})} />
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="btn-primary">Save</button>
                        <button type="button" onClick={() => setShowItemForm(false)} className="btn-secondary">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="glass rounded-xl overflow-hidden hover:bg-white/20 transition-all">
                      <div className="flex p-4 gap-4">
                        <img src={item.image || 'https://via.placeholder.com/80'} className="w-20 h-20 object-cover rounded-lg bg-white/20" alt={item.name} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate">{item.name}</h3>
                          <p className="text-sm text-blue-200 mb-2">{item.category}</p>
                          <StatusBadge status={item.status} />
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex justify-end gap-3">
                        <button onClick={() => handleEditItem(item)} className="text-sm font-medium text-blue-300 hover:text-white">Edit</button>
                        <button onClick={() => handleDeleteItem(item.id)} className="text-sm font-medium text-rose-400 hover:text-rose-300">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">User Management</h2>
                </div>

                {showUserForm && (
                  <div className="glass p-6 mb-6">
                    <h3 className="font-bold text-lg mb-4">Edit User</h3>
                    <form onSubmit={handleUserSubmit} className="space-y-4">
                      {/* User Form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="input-field" placeholder="Name" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} />
                        <input className="input-field" placeholder="Email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} />
                      </div>
                      <div className="flex gap-3">
                        <select className="input-field max-w-xs" value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button type="submit" className="btn-primary">Update</button>
                        <button type="button" onClick={() => setShowUserForm(false)} className="btn-secondary">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="glass rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/10 text-blue-100 text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                          <td className="px-6 py-4 text-blue-200">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                              user.role === 'admin' ? 'bg-purple-500/20 text-purple-200' : 'bg-white/10 text-blue-100'
                            }`}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-3">
                            <button onClick={() => handleEditUser(user)} className="text-blue-300 hover:text-white text-sm font-medium">Edit</button>
                            {user.role !== 'admin' && (
                              <button onClick={() => handleDeleteUser(user.id)} className="text-rose-400 hover:text-rose-300 text-sm font-medium">Delete</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
