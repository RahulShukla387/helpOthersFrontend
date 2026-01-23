import { toast } from "react-toastify";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function displayRazorpay(backendUrl, amount) {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    toast.error('Razorpay SDK failed to load. Are you online?');
    return;
  }

 
  const data = await fetch( backendUrl + '/api/payment/createOrder', { method: 'POST',  headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }), }).then((t) => t.json());
     console.log( "create order data is", data); 
  const options = {
    key: 'rzp_test_S1SDa1ZD9Y5Bgf', 
    amount: data.amount,
    currency: data.currency,
    name: "AdiYuvan Ngo",
    order_id: data.order.id,
    
    handler: async function (response) {
      toast.success('Payment successful. Payment ID: ' + response.razorpay_payment_id);
 
       const verifyResponse = await fetch(backendUrl + '/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
          toast.success('Payment verified successfully!');
        } else {
          toast.error('Payment verification failed!');
        }
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}