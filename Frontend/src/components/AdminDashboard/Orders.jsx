import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaCheck, FaTimes, FaFilter, FaClock, FaFileInvoice } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const Bill = React.forwardRef(({ order }, ref) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div ref={ref} className="bg-white p-6 max-w-md mx-auto rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Delicious Restaurant</h2>
        <p className="text-sm text-gray-600">123 Food Street, Mumbai</p>
        <p className="text-sm text-gray-600">Phone: +91 9876543210</p>
      </div>
      
      <div className="border-b border-gray-300 pb-2 mb-4">
        <div className="flex justify-between">
          <span className="font-medium">Bill No:</span>
          <span>#{order._id.slice(-6).toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{currentDate} {currentTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Table No:</span>
          <span>{order.tableNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Customer:</span>
          <span>{order.customerName}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left pb-1">Item</th>
              <th className="text-right pb-1">Qty</th>
              <th className="text-right pb-1">Price</th>
              <th className="text-right pb-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-1">{item.name}</td>
                <td className="text-right py-1">{item.quantity}</td>
                <td className="text-right py-1">₹{item.price?.toFixed(2)}</td>
                <td className="text-right py-1">₹{(item.price * item.quantity)?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t-2 border-gray-400 pt-2">
        <div className="flex justify-between font-bold">
          <span>Total Amount:</span>
          <span>₹{order.totalAmount?.toFixed(2)}</span>
        </div>
        {order.paymentStatus === 'paid' && (
          <div className="flex justify-between mt-1">
            <span>Payment Status:</span>
            <span className="text-green-600 font-medium">Paid</span>
          </div>
        )}
      </div>
      
      {order.notes && (
        <div className="mt-4 text-sm">
          <p className="font-medium">Customer Notes:</p>
          <p className="text-gray-700">{order.notes}</p>
        </div>
      )}
      
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Thank you for dining with us!</p>
        <p>Visit again soon</p>
      </div>
    </div>
  );
});

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    status: '',
    tableNumber: '',
    notes: '',
    paymentStatus: ''
  });
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [billOrder, setBillOrder] = useState(null);
  const billRef = React.useRef();

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/orders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    pageStyle: `
      @page { size: auto; margin: 5mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    `,
    onAfterPrint: () => setBillOrder(null)
  });

  const downloadBillAsPDF = () => {
    const element = billRef.current;
    const opt = {
      margin: 10,
      filename: `bill_${billOrder._id.slice(-6)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
    setBillOrder(null);
  };

  const handleGenerateBill = (order) => {
    setBillOrder(order);
    setTimeout(() => {
      // Choose either print or download
      // handlePrint(); // For printing
      downloadBillAsPDF(); // For downloading as PDF
    }, 500);
  };

  const handleUpdateOrder = async (orderId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/orders/${orderId}`,
        editFormData
      );
      
      setOrders(orders.map(order => 
        order._id === orderId ? data : order
      ));
      setEditingOrderId(null);
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
        setOrders(orders.filter(order => order._id !== orderId));
      } catch (err) {
        console.error('Error deleting order:', err);
      }
    }
  };

  const handleEditClick = (order) => {
    setEditingOrderId(order._id);
    setEditFormData({
      status: order.status,
      tableNumber: order.tableNumber || '',
      notes: order.notes || '',
      paymentStatus: order.paymentStatus
    });
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName?.toLowerCase().includes(searchTerm?.toLowerCase()) || 
                         order._id.includes(searchTerm) ||
                         order.tableNumber.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    const matchesDate = !dateFilter || 
                       new Date(order.createdAt).toDateString() === dateFilter.toDateString();
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'preparing', label: 'Preparing', color: 'bg-blue-100 text-blue-800' },
    { value: 'ready', label: 'Ready', color: 'bg-orange-100 text-orange-800' },
    { value: 'served', label: 'Served', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const paymentOptions = [
    { value: 'paid', label: 'Paid', color: 'text-green-600' },
    { value: 'unpaid', label: 'Unpaid', color: 'text-red-600' }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Restaurant Order Management</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bill Component (hidden) */}
      <div className="hidden">
        {billOrder && <Bill ref={billRef} order={billOrder} />}
      </div>

      <h1 className="text-2xl font-bold mb-6">Restaurant Order Management</h1>
      
      {/* Search and Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          <select
            className="border rounded-lg px-3 py-2 w-full"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="border rounded-lg px-3 py-2 w-full"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-gray-600" />
          <DatePicker
            selected={dateFilter}
            onChange={(date) => setDateFilter(date)}
            placeholderText="Filter by date"
            className="border rounded-lg px-3 py-2 w-full"
            isClearable
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  {orders.length === 0 ? 'No orders found' : 'No orders match your filters'}
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleOrderExpansion(order._id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order._id.slice(-6).toUpperCase()}</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <FaClock className="mr-1" />
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Table {order.tableNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium">₹{order.totalAmount?.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingOrderId === order._id ? (
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={editFormData.paymentStatus}
                          onChange={(e) => setEditFormData({...editFormData, paymentStatus: e.target.value})}
                        >
                          {paymentOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`text-xs ${
                          paymentOptions.find(p => p.value === order.paymentStatus)?.color || 'text-gray-600'
                        }`}>
                          {paymentOptions.find(p => p.value === order.paymentStatus)?.label || order.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingOrderId === order._id ? (
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={editFormData.status}
                          onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          statusOptions.find(s => s.value === order.status)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {statusOptions.find(s => s.value === order.status)?.label || order.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingOrderId === order._id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateOrder(order._id)}
                            className="text-green-600 hover:text-green-900"
                            title="Save"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => setEditingOrderId(null)}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGenerateBill(order);
                            }}
                            className="text-purple-600 hover:text-purple-900"
                            title="Download Bill"
                          >
                            <FaFileInvoice />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(order);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteOrder(order._id);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                  {expandedOrder === order._id && (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{item.quantity}x {item.name}</span>
                                  <span>₹{item.price * item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-2 pt-2 border-t flex justify-between font-medium">
                              <span>Total:</span>
                              <span>₹{order.totalAmount?.toFixed(2)}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Customer Notes</h4>
                            <p className="text-sm text-gray-700">{order.notes || 'No special instructions'}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li className="flex justify-between">
                                <span>Order Date:</span>
                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                              </li>
                              {editingOrderId === order._id && (
                                <>
                                  <li className="mt-2">
                                    <label className="block text-xs text-gray-500">Table Number</label>
                                    <input
                                      type="number"
                                      className="border rounded px-2 py-1 w-full text-sm"
                                      value={editFormData.tableNumber}
                                      onChange={(e) => setEditFormData({...editFormData, tableNumber: e.target.value})}
                                      placeholder="Enter table number"
                                    />
                                  </li>
                                  <li className="mt-2">
                                    <label className="block text-xs text-gray-500">Special Notes</label>
                                    <textarea
                                      className="border rounded px-2 py-1 w-full text-sm"
                                      value={editFormData.notes}
                                      onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                                      placeholder="Add any notes..."
                                      rows="2"
                                    />
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;