import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemsAPI, loansAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [loanData, setLoanData] = useState({
    start_date: '',
    end_date: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await itemsAPI.getById(id);
      setItem(response.data.data);
    } catch (error) {
      console.error('Error fetching item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      alert('Please login to request a loan');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await loansAPI.create({
        item_id: item.id,
        ...loanData,
      });
      
      alert('Loan request submitted successfully! Please wait for admin approval.');
      setShowLoanForm(false);
      setLoanData({ start_date: '', end_date: '', description: '' });
    } catch (error) {
      alert(error.response?.data?.msg || 'Failed to submit loan request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-blue-200 text-lg">Item not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/items')}
        className="mb-6 text-white hover:underline flex items-center"
      >
        ← Back to Equipment
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={item.image || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={item.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
              item.category === 'Kamera' ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30' :
              item.category === 'Lensa' ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30' :
              'bg-orange-500/20 text-orange-200 border border-orange-500/30'
            }`}>
              {item.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-white">{item.name}</h1>

          <div className="mb-6">
            {item.status === 'available' ? (
              <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 font-semibold rounded-full">
                ✓ Available for Loan
              </span>
            ) : (
              <span className="inline-block px-4 py-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 font-semibold rounded-full">
                ✗ Currently Not Available
              </span>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Description</h2>
            <p className="text-blue-100 leading-relaxed">
              {item.description || 'No description available'}
            </p>
          </div>

          {/* Loan Request Form */}
          {item.status === 'available' && (
            <div>
              {!showLoanForm ? (
                <button
                  onClick={() => setShowLoanForm(true)}
                  className="w-full btn-primary py-3 text-lg"
                >
                  Request Loan
                </button>
              ) : (
                <div className="glass p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Loan Request Form</h3>
                  
                  <form onSubmit={handleLoanSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-100">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={loanData.start_date}
                        onChange={(e) => setLoanData({ ...loanData, start_date: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-100">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={loanData.end_date}
                        onChange={(e) => setLoanData({ ...loanData, end_date: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-100">
                        Purpose / Description
                      </label>
                      <textarea
                        value={loanData.description}
                        onChange={(e) => setLoanData({ ...loanData, description: e.target.value })}
                        className="input-field"
                        rows="3"
                        placeholder="Describe why you need this equipment..."
                        required
                      ></textarea>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 btn-primary disabled:opacity-50"
                      >
                        {submitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLoanForm(false)}
                        className="flex-1 btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
