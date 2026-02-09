import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const getStatusBadge = (status) => {
    if (status === 'available') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white/50 text-xs font-semibold rounded-full border border-white/20">
        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
        Unavailable
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const colors = {
      'Kamera': 'bg-blue-500/20 text-blue-200 border-blue-500/30',
      'Lensa': 'bg-purple-500/20 text-purple-200 border-purple-500/30',
      'Alat Lainnya': 'bg-orange-500/20 text-orange-200 border-orange-500/30',
    };

    return (
      <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded border ${colors[category] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
        {category}
      </span>
    );
  };

  return (
    <div className="group glass rounded-2xl overflow-hidden hover:bg-white/20 hover:translate-y-[-4px] transition-all duration-300">
      <div className="relative h-56 overflow-hidden bg-white/5">
        <img
          src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          {getCategoryBadge(item.category)}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-heading font-bold text-white line-clamp-1">{item.name}</h3>
        </div>
        
        <p className="text-blue-200 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {item.description || 'No description available for this item.'}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {getStatusBadge(item.status)}
          
          <Link
            to={`/items/${item.id}`}
            className="text-sm font-semibold text-blue-300 hover:text-white transition-colors flex items-center gap-1"
          >
            View Details

          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
