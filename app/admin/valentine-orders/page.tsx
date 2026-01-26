 'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Search, Trophy, ShoppingBag, Calendar, Lock } from 'lucide-react';
import Link from 'next/link';

interface Order {
  orderNumber: number;
  name: string;
  phone: string;
  email: string;
  category: string;
  product: string;
  notes: string;
  timestamp: string;
  isWinner?: boolean;
  prize?: string;
}

export default function ValentineAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'winners' | 'date'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  // Simple password - You can change this!
  const ADMIN_PASSWORD = 'cellworld2026';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load all orders from localStorage
  useEffect(() => {
    if (isAuthenticated && mounted) {
      loadOrders();
    }
  }, [isAuthenticated, mounted]);

  const loadOrders = () => {
    const orderCount = parseInt(localStorage.getItem('valentineOrderCount') || '0');
    const loadedOrders: Order[] = [];

    for (let i = 1; i <= orderCount; i++) {
      const orderData = localStorage.getItem(`order_${i}`);
      if (orderData) {
        const order = JSON.parse(orderData);
        
        // Check if winner
        const isWinner = i === 25 || i === 50 || i === 100;
        let prize = '';
        if (i === 25) prize = 'Selfie Stick';
        if (i === 50) prize = 'Wireless Earbuds (ANC)';
        if (i === 100) prize = 'Power Pack Mini + Samsung Galaxy A11';

        loadedOrders.push({
          ...order,
          isWinner,
          prize
        });
      }
    }

    setOrders(loadedOrders);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const exportToCSV = () => {
    const headers = ['Order#', 'Name', 'Phone', 'Email', 'Category', 'Product', 'Notes', 'Timestamp', 'Winner', 'Prize'];
    const csvData = orders.map(order => [
      order.orderNumber,
      order.name,
      order.phone,
      order.email,
      order.category,
      order.product,
      order.notes || '',
      new Date(order.timestamp).toLocaleString(),
      order.isWinner ? 'YES' : 'NO',
      order.prize || ''
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valentine-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'winners' && !order.isWinner) return false;
    if (searchTerm && !order.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.phone.includes(searchTerm)) return false;
    return true;
  });

  const stats = {
    total: orders.length,
    winners: orders.filter(o => o.isWinner).length,
    prize25: orders.find(o => o.orderNumber === 25) ? 'Claimed' : 'Unclaimed',
    prize50: orders.find(o => o.orderNumber === 50) ? 'Claimed' : 'Unclaimed',
    prize100: orders.find(o => o.orderNumber === 100) ? 'Claimed' : 'Unclaimed'
  };

  if (!mounted) return null;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Lock className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-gray-800 mb-2">Admin Access</h1>
            <p className="text-gray-600">Valentine's Order Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-pink-600 hover:text-pink-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2 text-pink-600 hover:text-pink-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </Link>
            <h1 className="text-2xl font-black text-gray-800">Valentine's Orders Dashboard</h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <ShoppingBag className="w-8 h-8 text-pink-500 mb-2" />
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-3xl font-black text-pink-600">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
            <p className="text-sm text-gray-600">Winners</p>
            <p className="text-3xl font-black text-yellow-600">{stats.winners}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-600 mb-2">Prize #25</p>
            <p className={`text-lg font-bold ${stats.prize25 === 'Claimed' ? 'text-green-600' : 'text-gray-400'}`}>
              {stats.prize25}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-600 mb-2">Prize #50</p>
            <p className={`text-lg font-bold ${stats.prize50 === 'Claimed' ? 'text-green-600' : 'text-gray-400'}`}>
              {stats.prize50}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-600 mb-2">Prize #100</p>
            <p className={`text-lg font-bold ${stats.prize100 === 'Claimed' ? 'text-green-600' : 'text-gray-400'}`}>
              {stats.prize100}
            </p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setFilter('winners')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'winners'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Winners Only
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Order #</th>
                  <th className="px-4 py-3 text-left font-bold">Name</th>
                  <th className="px-4 py-3 text-left font-bold">Phone</th>
                  <th className="px-4 py-3 text-left font-bold">Email</th>
                  <th className="px-4 py-3 text-left font-bold">Product</th>
                  <th className="px-4 py-3 text-left font-bold">Details</th>
                  <th className="px-4 py-3 text-left font-bold">Timestamp</th>
                  <th className="px-4 py-3 text-center font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.orderNumber}
                      className={`border-b hover:bg-gray-50 ${
                        order.isWinner ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-bold text-pink-600">
                        #{order.orderNumber}
                      </td>
                      <td className="px-4 py-3">{order.name}</td>
                      <td className="px-4 py-3">{order.phone}</td>
                      <td className="px-4 py-3 text-sm">{order.email}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold">{order.product}</div>
                        <div className="text-xs text-gray-500">{order.category}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {order.notes || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {order.isWinner ? (
                          <div className="inline-block">
                            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                              🏆 WINNER
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{order.prize}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Regular</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-center text-gray-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>
    </div>
  );
}
