import React from 'react';
import { XCircle, ChevronLeft, AlertCircle } from 'lucide-react';

const OrderFailed = () => {
  const [surveySubmitted, setSurveySubmitted] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState('');
  const [otherReason, setOtherReason] = React.useState('');
  
  const searchParams = new URLSearchParams(window.location.search);

  const orderDetails = {
    code: searchParams.get('code'),
    id: searchParams.get('id'),
    status: searchParams.get('status'),
    orderCode: searchParams.get('orderCode'),
    cancel: searchParams.get('cancel') === 'true'
  };

  const cancelReasons = [
    'Thay đổi ý định mua hàng',
    'Giá cả không phù hợp',
    'Phương thức thanh toán không phù hợp',
    'Khác'
  ];

  const handleSubmitSurvey = (e) => {
    e.preventDefault();
    // Xử lý gửi khảo sát ở đây
    setSurveySubmitted(true);
  };

  return (
    <div className="container flex items-center justify-center p-4 animate-fade-in font-sans">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
        <div className="flex flex-col items-center relative">
          {/* Error Animation Circle */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
            <XCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 mb-2 text-center">
            Đặt hàng không thành công
          </h1>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r mb-6 w-full">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Rất tiếc, đơn hàng của bạn không thể hoàn tất. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="w-full space-y-4 mb-8">
            <div className="bg-white/80 p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base text-gray-600">Mã đơn hàng:</span>
                <span className="text-sm md:text-base font-medium">{orderDetails.orderCode}</span>
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base text-gray-600">Trạng thái:</span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-full text-sm font-medium shadow-sm">
                  {orderDetails.status || 'FAILED'}
                </span>
              </div>
            </div>
          </div>

          {/* Survey Section */}
          {!surveySubmitted ? (
            <form onSubmit={handleSubmitSurvey} className="w-full">
              <div className="bg-white/80 p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
                <h2 className="text-lg font-semibold mb-4">Giúp chúng tôi cải thiện dịch vụ</h2>
                <div className="space-y-3">
                  {cancelReasons.map((reason) => (
                    <div key={reason} className="flex items-center">
                      <input
                        type="radio"
                        id={reason}
                        name="cancelReason"
                        value={reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={reason} className="ml-2 text-sm text-gray-700">
                        {reason}
                      </label>
                    </div>
                  ))}
                  
                  {selectedReason === 'Khác' && (
                    <textarea
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      placeholder="Vui lòng cho chúng tôi biết lý do của bạn..."
                      className="mt-2 w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                  )}
                </div>
                
                <button
                  type="submit"
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium"
                >
                  Gửi phản hồi
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full bg-green-50 border-l-4 border-green-400 p-4 rounded-r mb-6">
              <p className="text-green-700 text-sm">
                Cảm ơn bạn đã gửi phản hồi. Chúng tôi sẽ cải thiện dịch vụ dựa trên ý kiến của bạn.
              </p>
            </div>
          )}

          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base flex items-center justify-center gap-2 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Quay lại trang chủ
          </button>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-20 left-20 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
      <div className="fixed bottom-20 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
    </div>
  );
};

export default OrderFailed;

// Add these custom animations to your global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
`;
document.head.appendChild(style);