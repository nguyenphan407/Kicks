import React from "react";
import { Truck ,MapPin, User, Phone, Mail, Check, X } from 'lucide-react';

const Modal = ({ isOpen, onClose, onConfirm, userData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900/60 to-gray-800/60 backdrop-blur-sm flex justify-center items-center font-rubik z-50">
      <div className="bg-white w-[400px] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-blue-50 p-6 border-b border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-3">
            <Check className="text-blue-600" size={24} />
            Confirm Your Details
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <User className="text-blue-500" size={24} />
            <div>
              <p className="font-medium text-gray-700">
                {userData.firstName} {userData.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="text-green-500" size={24} />
            <p className="text-gray-600">{userData.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-purple-500" size={24} />
            <p className="text-gray-600">{userData.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Truck className="text-red-500" size={24} />
            <p className="text-gray-600">{userData.deliveryAddress}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 flex justify-end space-x-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <Check size={16} /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
