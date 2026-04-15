import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Upload, CheckCircle2, X } from 'lucide-react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { useStore } from '../store/useStore';

export function CreateListingPage() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', category: '', condition: 'New', description: '',
    price: '', shippingCost: 'Free', format: 'fixed',
    duration: '7 days',
  });
  const [images, setImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setImages(prev => [...prev, ev.target!.result as string].slice(0, 8));
      reader.readAsDataURL(file);
    });
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setImages(prev => [...prev, ev.target!.result as string].slice(0, 8));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <SearchBar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to create a listing</h2>
          <p className="text-gray-500 mb-6">You need an account to sell on SHILOH.</p>
          <div className="flex gap-4">
            <Link to="/signin" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">Sign In</Link>
            <Link to="/signup" className="border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-sm border border-gray-200">
          <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Created!</h2>
          <p className="text-gray-600 mb-6">Your item <strong>"{form.title || 'New Item'}"</strong> has been listed successfully.</p>
          <div className="flex gap-3">
            <button onClick={() => { setSubmitted(false); setForm({ title:'',category:'',condition:'New',description:'',price:'',shippingCost:'Free',format:'fixed',duration:'7 days' }); setImages([]); setStep(1); }} className="flex-1 border border-gray-300 hover:bg-gray-50 font-semibold py-3 rounded-lg text-sm">List Another</button>
            <button onClick={() => navigate('/account')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm">View Account</button>
          </div>
        </div>
      </div>
    );
  }

  const steps = ['Item Info', 'Photos', 'Pricing', 'Review'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a Listing</h1>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-2 cursor-pointer ${i + 1 <= step ? 'text-blue-600' : 'text-gray-400'}`} onClick={() => i + 1 < step && setStep(i + 1)}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i + 1 < step ? 'bg-blue-600 text-white' : i + 1 === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i + 1 < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            {step === 1 && (
              <>
                <h2 className="font-bold text-lg text-gray-900">Item Information</h2>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">TITLE *</label>
                  <input value={form.title} onChange={update('title')} placeholder="e.g. Sony WH-1000XM4 Wireless Headphones" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  <p className="text-xs text-gray-400 mt-1">{form.title.length}/80 characters</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">CATEGORY *</label>
                    <select value={form.category} onChange={update('category')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select...</option>
                      <option>Electronics</option>
                      <option>Laptops</option>
                      <option>Smartphones</option>
                      <option>Watches</option>
                      <option>Fashion</option>
                      <option>Tablets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">CONDITION *</label>
                    <select value={form.condition} onChange={update('condition')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>New</option>
                      <option>Mint</option>
                      <option>Used</option>
                      <option>Refurbished</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">DESCRIPTION</label>
                  <textarea value={form.description} onChange={update('description')} rows={4} placeholder="Describe your item in detail..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-bold text-lg text-gray-900">Add Photos</h2>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleImageDrop}
                  className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                >
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-medium text-gray-700 mb-1">Drag & drop photos here</p>
                  <p className="text-sm text-gray-400 mb-4">PNG, JPG up to 10MB each · Max 8 photos</p>
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                    Browse Files
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageInput} />
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((src, i) => (
                      <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center">
                          <X className="w-3 h-3" />
                        </button>
                        {i === 0 && <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">MAIN</span>}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="font-bold text-lg text-gray-900">Pricing & Format</h2>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${form.format === 'fixed' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                    <input type="radio" name="format" value="fixed" checked={form.format === 'fixed'} onChange={update('format')} className="sr-only" />
                    <p className="font-semibold text-gray-900">Buy It Now</p>
                    <p className="text-xs text-gray-500 mt-1">Set a fixed price for your item</p>
                  </label>
                  <label className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${form.format === 'auction' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                    <input type="radio" name="format" value="auction" checked={form.format === 'auction'} onChange={update('format')} className="sr-only" />
                    <p className="font-semibold text-gray-900">Auction</p>
                    <p className="text-xs text-gray-500 mt-1">Let buyers bid on your item</p>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">{form.format === 'auction' ? 'STARTING BID ($)' : 'PRICE ($)'} *</label>
                    <input type="number" value={form.price} onChange={update('price')} placeholder="0.00" min="0" step="0.01" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">SHIPPING</label>
                    <select value={form.shippingCost} onChange={update('shippingCost')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Free</option>
                      <option>$5.99</option>
                      <option>$9.99</option>
                      <option>$14.99</option>
                      <option>Buyer pays actual</option>
                    </select>
                  </div>
                </div>
                {form.format === 'auction' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">AUCTION DURATION</label>
                    <select value={form.duration} onChange={update('duration')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>1 day</option>
                      <option>3 days</option>
                      <option>7 days</option>
                      <option>10 days</option>
                    </select>
                  </div>
                )}
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="font-bold text-lg text-gray-900">Review Your Listing</h2>
                <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  {images[0] ? (
                    <img src={images[0]} alt="" className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-400 text-xs text-center">No photo</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{form.title || 'Untitled Item'}</h3>
                    <p className="text-sm text-gray-600">{form.category} · {form.condition}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">${form.price ? Number(form.price).toLocaleString() : '—'}</p>
                    <p className="text-xs text-gray-500">Shipping: {form.shippingCost}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  By submitting, you agree to SHILOH's seller terms and fees (7% final value fee on all sales).
                </p>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(s => s - 1)} className="border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg text-sm transition-colors">
                Back
              </button>
            ) : <div />}
            {step < 4 ? (
              <button type="button" onClick={() => setStep(s => s + 1)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors">
                Continue
              </button>
            ) : (
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors">
                Publish Listing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
